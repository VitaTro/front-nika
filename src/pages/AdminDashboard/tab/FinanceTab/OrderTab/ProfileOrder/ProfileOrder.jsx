import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPlatformOrders } from "../../../../../../redux/finance/platform/selectorsPlatform";
import { getProducts } from "../../../../../../redux/products/operationProducts";
import { selectProducts } from "../../../../../../redux/products/selectorsProducts";
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
} from "../OfflineOrder/OfflineOrder.styled";
import CartPlatform from "./CartPlatform";
import PlatformOrderForm from "./OrderForm";
import SaleButton from "./SaleButton";

const ProfileOrder = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const orderState = useSelector(selectPlatformOrders);
  // const [inputPrices, setInputPrices] = useState({});

  const [platformCart, setPlatformCart] = useState(() => {
    return JSON.parse(localStorage.getItem("platformCart")) || [];
  });
  const [viewCart, setViewCart] = useState(false);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const removeFromCart = (productId) => {
    setPlatformCart((prevCart) => {
      const updatedCart = prevCart.filter(
        (item) => item.productId !== productId
      );
      localStorage.setItem("platformCart", JSON.stringify(updatedCart));
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
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!selectedCategory || product.category === selectedCategory) &&
      (!selectedSubcategory || product.subcategory === selectedSubcategory)
  );
  const addToCart = (product) => {
    setPlatformCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item.productId === product._id
      );

      if (existingProduct) {
        const updatedCart = prevCart.map((item) =>
          item.productId === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        localStorage.setItem("platformCart", JSON.stringify(updatedCart));
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
      localStorage.setItem("platformCart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const updateQuantity = (productId, newQuantity = null, newPrice = null) => {
    setPlatformCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.productId === productId
          ? {
              ...item,
              quantity: newQuantity !== null ? newQuantity : item.quantity,
              price: newPrice !== null ? newPrice : item.price,
            }
          : item
      );
      localStorage.setItem("platformCart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  return (
    <GeneralOfflineOrder>
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
        <Typography variant="h6">
          🛒 Кошик ({platformCart.length} товарів)
        </Typography>{" "}
        <Typography>
          Загальна сума:{" "}
          {platformCart.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
          )}{" "}
          zł
        </Typography>{" "}
        <Button variant="contained" onClick={() => setViewCart(!viewCart)}>
          {viewCart ? "⬅️ Назад до товарів" : "➡️ Переглянути кошик"}
        </Button>
      </LeftColumn>
      <RightColumn>
        {viewCart ? (
          <>
            <CartPlatform
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
            />
            <PlatformOrderForm
              platformCart={platformCart}
              setPlatformCart={setPlatformCart}
            />
            {orderState.success && orderState.orders.length > 0 && (
              <SaleButton
                orderId={orderState.orders.slice(-1)[0]._id}
                saleDate={new Date()}
              />
            )}
          </>
        ) : (
          <>
            <Typography variant="h6">📦 Вибір товарів</Typography>
            <ProductGrid>
              {filteredProducts.map((product) => {
                const isInCart = platformCart.some(
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

export default ProfileOrder;
