import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectOfflineOrders } from "../../../../../../redux/finance/offlineOrder/selectorsOfflineOrder";
import { getProducts } from "../../../../../../redux/products/operationProducts";
import { selectProducts } from "../../../../../../redux/products/selectorsProducts";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const orderState = useSelector(selectOfflineOrders);
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });
  const [viewCart, setViewCart] = useState(false);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter(
        (item) => item.productId !== productId
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const categories = [...new Set(products.map((product) => product.category))];
  const subcategoriesByCategory = {};
  products.forEach((product) => {
    if (!subcategoriesByCategory[product.category]) {
      subcategoriesByCategory[product.category] = new Set();
    }
    subcategoriesByCategory[product.category].add(product.subcategory);
  });

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

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item.productId === product._id
      );

      if (existingProduct) {
        const updatedCart = prevCart.map((item) =>
          item.productId === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
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
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  return (
    <GeneralOfflineOrder>
      {/* 🔍 Лівий блок */}
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
              )
            )}
          </>
        )}
        <Typography variant="h6">🛒 Кошик ({cart.length} товарів)</Typography>{" "}
        <Typography>
          Загальна сума:{" "}
          {cart.reduce((acc, item) => acc + item.price * item.quantity, 0)} zł
        </Typography>{" "}
        <Button variant="contained" onClick={() => setViewCart(!viewCart)}>
          {viewCart ? "⬅️ Назад до товарів" : "➡️ Переглянути кошик"}
        </Button>
      </LeftColumn>

      <RightColumn>
        {viewCart ? (
          <>
            <Cart
              cart={cart}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
            />
            <OrderForm cart={cart} setCart={setCart} />
            {orderState.success && orderState.offlineOrders.length > 0 && (
              <SaleButton
                orderId={orderState.offlineOrders.slice(-1)[0]._id}
                saleDate={new Date()}
              />
            )}
          </>
        ) : (
          <>
            <Typography variant="h6">📦 Вибір товарів</Typography>
            <ProductGrid>
              {filteredProducts.map((product) => {
                const isInCart = cart.some(
                  (item) => item.productId === product._id
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
