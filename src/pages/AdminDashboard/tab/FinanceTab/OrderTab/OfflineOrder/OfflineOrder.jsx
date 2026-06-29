import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectOfflineOrders } from "../../../../../../redux/finance/offlineOrder/selectorsOfflineOrder";
import { selectActiveReservations } from "../../../../../../redux/finance/reservation/selectorsReserve";
import { getProducts } from "../../../../../../redux/products/operationProducts";
import { selectProducts } from "../../../../../../redux/products/selectorsProducts";
import { calculateDiscount } from "../../../../../../utils/calculateDiscount";
import ReservationForm from "../../SalesTab/Reservation/ReservationForm";
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
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });
  const [viewCart, setViewCart] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // 🧩 Видалення з кошика
  // const removeFromCart = (productId) => {
  //   setCart((prevCart) => {
  //     const updatedCart = prevCart.filter(
  //       (item) => item.productId !== productId,
  //     );
  //     localStorage.setItem("cart", JSON.stringify(updatedCart));
  //     return updatedCart;
  //   });
  // };
  const removeFromCart = (id) => {
    setCart((prev) => {
      const updated = prev.filter((item) => item._id !== id);
      localStorage.setItem("cart", JSON.stringify(updated));
      return updated;
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
  // const addToCart = ({ productId, size, sku, quantity = 1 }) => {
  //   const product = products.find((p) => p._id === productId);
  //   if (!product) return;
  //   setCart((prevCart) => {
  //     const existingProduct = prevCart.find(
  //       (item) => item.productId === productId && item.sku === sku,
  //     );
  //     if (existingProduct) {
  //       const updatedCart = prevCart.map((item) =>
  //         item.productId === productId && item.sku === sku
  //           ? { ...item, quantity: item.quantity + quantity }
  //           : item,
  //       );
  //       localStorage.setItem("cart", JSON.stringify(updatedCart));
  //       return updatedCart;
  //     }
  const addToCart = ({ productId, size, sku, quantity = 1 }) => {
    const product = products.find((p) => p._id === productId);
    if (!product) return;

    const isRing =
      product.subcategory === "rings" || product.category === "rings";

    const resolvedSize = isRing ? size : (product.size ?? "N/A");
    const resolvedSku = isRing ? sku : null;

    setCart((prev) => {
      const existing = prev.find(
        (item) => item.productId === productId && item.sku === resolvedSku,
      );

      if (existing) {
        const updated = prev.map((item) =>
          item.productId === productId && item.sku === resolvedSku
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
        localStorage.setItem("cart", JSON.stringify(updated));
        return updated;
      }

      const newItem = {
        _id: crypto.randomUUID(),
        productId,
        totalPrice: totalAmount,
        name: product.name,
        price: product.lastRetailPrice,
        photoUrl: product.photoUrl,
        quantity,
        size: resolvedSize,
        sku: resolvedSku,
        variants: product.variants || [],
      };

      const updated = [...prev, newItem];
      localStorage.setItem("cart", JSON.stringify(updated));
      return updated;
    });
  };

  //     const updatedCart = [
  //       ...prevCart,
  //       {
  //         productId: product._id,
  //         name: product.name,
  //         price: product.lastRetailPrice,
  //         photoUrl: product.photoUrl,
  //         quantity: 1,
  //       },
  //     ];
  //     localStorage.setItem("cart", JSON.stringify(updatedCart));
  //     return updatedCart;
  //   });
  // };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;

    setCart((prev) => {
      const updated = prev.map((item) =>
        item._id === id ? { ...item, quantity: newQuantity } : item,
      );
      localStorage.setItem("cart", JSON.stringify(updated));
      return updated;
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
      <LeftColumn>
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
            {/* <Cart
              cart={cart}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
              addToCart={addToCart}
            /> */}
            <Cart
              cart={cart.map((item) => ({
                ...item,
                variants:
                  products.find((p) => p._id === item.productId)?.variants ||
                  [],
              }))}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
              addToCart={addToCart}
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
                    <select
                      onChange={(e) => {
                        const size = e.target.value;
                        const variant = product.variants.find(
                          (v) => v.size === size,
                        );
                        if (!variant) return;

                        addToCart({
                          productId: product._id,
                          size,
                          sku: variant.variantIndex,
                        });
                      }}
                    >
                      <option value="">Обрати розмір</option>
                      {product.variants.map((v) => (
                        <option key={v.size} value={v.size}>
                          {v.size}
                        </option>
                      ))}
                    </select>
                    <Button
                      variant="contained"
                      onClick={() =>
                        addToCart({
                          productId: product._id,
                          size: product.subcategory === "rings" ? size : null,
                          sku: product.subcategory === "rings" ? sku : null,
                          quantity: 1,
                        })
                      }
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
