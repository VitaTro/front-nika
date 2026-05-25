import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectOfflineOrders } from "../../../../../../redux/finance/offlineOrder/selectorsOfflineOrder";
import { selectActiveReservations } from "../../../../../../redux/finance/reservation/selectorsReserve";
import { getProducts } from "../../../../../../redux/products/operationProducts";
import { selectProducts } from "../../../../../../redux/products/selectorsProducts";
import { calculateDiscount } from "../../../../../../utils/calculateDiscount";
import ReservationForm from "../Reservation/ReservationForm";
import Cart from "./Cart";
import {
  CategoryButton,
  GeneralOfflineOrder,
  LeftColumn,
  ProductCard,
  ProductGrid,
  ProductImage,
  ProductTitle,
  RightColumn,
  SearchBox,
} from "./OfflineOrder.styled";
import OrderForm from "./OrderForm";
import SaleButton from "./SaleButton";
const OfflineOrder = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const activeReservations = useSelector(selectActiveReservations);
  const orderState = useSelector(selectOfflineOrders);
  const offlineOrders = orderState?.offlineOrders || [];
  const success = orderState?.success;
  const [mode, setMode] = useState("sale");

  // 🧭 Режим роботи: продаж або резервація
  // const [mode, setMode] = useState(
  //   () => localStorage.getItem("mode") || "sale",
  // );
  // useEffect(() => {
  //   localStorage.setItem("mode", mode);
  // }, [mode]);

  // 🛒 Стан кошика
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });
  const [viewCart, setViewCart] = useState(false);

  // 🔍 Фільтри
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // 🧩 Видалення з кошика
  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter(
        (item) => item.productId !== productId,
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  // 🧩 Категорії та підкатегорії
  const categories = [...new Set(products.map((product) => product.category))];
  const subcategoriesByCategory = {};
  products.forEach((product) => {
    if (!subcategoriesByCategory[product.category]) {
      subcategoriesByCategory[product.category] = new Set();
    }
    subcategoriesByCategory[product.category].add(product.subcategory);
  });

  // 🔎 Фільтрація товарів
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      !selectedCategory || product.category === selectedCategory;
    const matchesSubcategory =
      !selectedSubcategory || product.subcategory === selectedSubcategory;
    const isAvailable =
      product.inStock !== false &&
      (product.currentStock ?? product.quantity ?? 0) > 0;

    return (
      matchesSearch && matchesCategory && matchesSubcategory && isAvailable
    );
  });

  // ➕ Додавання до кошика
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item.productId === product._id,
      );
      if (existingProduct) {
        const updatedCart = prevCart.map((item) =>
          item.productId === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return updatedCart;
      }
      const updatedCart = [
        ...prevCart,
        {
          productId: product._id,
          name: product.name,
          price: product.lastRetailPrice,
          photoUrl: product.photoUrl,
          quantity: 1,
        },
      ];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  // 🔄 Оновлення кількості
  const updateQuantity = (productId, newQuantity) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.productId === productId
          ? { ...item, quantity: newQuantity }
          : item,
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  // 💰 Підрахунок суми
  const totalAmount = cart.reduce(
    (acc, item) => acc + (Number(item.price) || 0) * item.quantity,
    0,
  );
  const { discount, discountPercent, final } = calculateDiscount(totalAmount);

  // 🔐 Активні резерви
  const reservedOrders = offlineOrders.filter(
    (order) => order.status === "reserved",
  );

  return (
    <GeneralOfflineOrder>
      {/* 🔹 Ліва колонка */}
      <LeftColumn
      // style={{ backgroundColor: mode === "reserve" ? "#fff7e6" : "#e6f7ff" }}
      >
        {/* <Typography variant="h6">⚙️ Режим роботи</Typography>
        <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
          <Button
            variant={mode === "sale" ? "contained" : "outlined"}
            color="primary"
            onClick={() => setMode("sale")}
          >
            💸 Продаж
          </Button>
          <Button
            variant={mode === "reserve" ? "contained" : "outlined"}
            color="warning"
            onClick={() => setMode("reserve")}
          >
            🔐 Резервація
          </Button>
        </Box> */}

        <Typography variant="h6">🔎 Пошук</Typography>
        <SearchBox
          placeholder="Введіть назву товару..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <Typography variant="h6">📂 Категорії</Typography>
        {categories.map((category) => (
          <CategoryButton
            key={category}
            $selected={selectedCategory === category}
            onClick={() => {
              setSelectedCategory(category);
              setSelectedSubcategory("");
            }}
          >
            {category}
          </CategoryButton>
        ))}

        {selectedCategory && (
          <>
            <Typography variant="h6">📑 Субкатегорії</Typography>
            {[...subcategoriesByCategory[selectedCategory]].map(
              (subcategory) => (
                <CategoryButton
                  key={subcategory}
                  $selected={selectedSubcategory === subcategory}
                  onClick={() => setSelectedSubcategory(subcategory)}
                >
                  {subcategory}
                </CategoryButton>
              ),
            )}
          </>
        )}

        <Typography variant="h6">🛒 Кошик ({cart.length} товарів)</Typography>
        <Typography>💰 Сума до знижки: {totalAmount.toFixed(2)} zł</Typography>
        {discount > 0 && (
          <Typography sx={{ color: "red" }}>
            🔻 Знижка: −{discount.toFixed(2)} zł ({discountPercent}%)
          </Typography>
        )}
        <Typography sx={{ fontWeight: "bold", mt: 1 }}>
          ✅ До сплати: {final.toFixed(2)} zł
        </Typography>
        <Button variant="contained" onClick={() => setViewCart(!viewCart)}>
          {viewCart ? "⬅️ Назад до товарів" : "➡️ Переглянути кошик"}
        </Button>
      </LeftColumn>

      {/* 🔹 Права колонка */}
      <RightColumn>
        {viewCart ? (
          <>
            <Cart
              cart={cart}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
            />
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <Button
                variant={mode === "sale" ? "contained" : "outlined"}
                onClick={() => setMode("sale")}
              >
                💸 Продаж
              </Button>

              <Button
                variant={mode === "reserve" ? "contained" : "outlined"}
                onClick={() => setMode("reserve")}
              >
                🔐 Резервація
              </Button>
            </Box>

            {mode === "sale" ? (
              <>
                <OrderForm
                  cart={cart}
                  setCart={setCart}
                  finalPrice={final}
                  discount={discount}
                  discountPercent={discountPercent}
                />

                {orderState.success && orderState.offlineOrders.length > 0 && (
                  <SaleButton
                    orderId={orderState.offlineOrders.slice(-1)[0]._id}
                    saleDate={new Date()}
                    finalPrice={final}
                    discount={discount}
                    discountPercent={discountPercent}
                  />
                )}
              </>
            ) : (
              <ReservationForm
                cart={cart}
                setCart={setCart}
                finalPrice={final}
                discount={discount}
                discountPercent={discountPercent}
              />
            )}
          </>
        ) : (
          <>
            {mode === "reserve" && (
              <>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  🔐 Активні резерви
                </Typography>

                {activeReservations.length === 0 ? (
                  <Typography sx={{ mb: 2 }}>
                    Немає активних резервів
                  </Typography>
                ) : (
                  activeReservations.map((order) => (
                    <Box
                      key={order._id}
                      sx={{
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        p: 2,
                        mb: 2,
                        background: "#fff7e6",
                      }}
                    >
                      <Typography sx={{ fontWeight: "bold" }}>
                        Резерв № {order._id.slice(-6)}
                      </Typography>

                      {order.reservationExpiresAt && (
                        <Typography>
                          До:{" "}
                          {new Date(
                            order.reservationExpiresAt,
                          ).toLocaleDateString("uk-UA")}
                        </Typography>
                      )}
                    </Box>
                  ))
                )}
              </>
            )}

            <Typography variant="h6">📦 Вибір товарів</Typography>

            <ProductGrid>
              {filteredProducts.map((product) => {
                const isInCart = cart.some(
                  (item) => item.productId === product._id,
                );

                return (
                  <ProductCard key={product._id}>
                    <ProductImage src={product.photoUrl} alt={product.name} />
                    <ProductTitle>{product.name}</ProductTitle>

                    <Typography sx={{ fontSize: "18px" }}>
                      Ціна: {product.lastRetailPrice} zł
                    </Typography>

                    <Button
                      variant="contained"
                      onClick={() => addToCart(product)}
                      sx={{
                        backgroundColor: isInCart ? "#4CAF50" : "#1976D2",
                        color: "white",
                      }}
                    >
                      {isInCart ? "✅ Додано" : "➕ Додати"}
                    </Button>
                  </ProductCard>
                );
              })}
            </ProductGrid>
          </>
        )}
      </RightColumn>
    </GeneralOfflineOrder>
  );
};

export default OfflineOrder;
