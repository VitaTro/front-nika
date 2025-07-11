import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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
} from "../../../FinanceTab/FinanceComponent/OfflineOrder/OfflineOrder.styled";
import PurchaseCart from "./PurchaseCart";
import PurchaseOrderForm from "./PurchaseOrderForm";
const PurchaseImport = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [cart, setCart] = useState([]);
  const [viewCart, setViewCart] = useState(false);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

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
    setCart((prevCart) => {
      const exists = prevCart.find((item) => item.productId === product._id);
      if (exists) return prevCart;
      return [
        ...prevCart,
        {
          productId: product._id,
          productName: product.name,
          productIndex: product.index,
          photoUrl: product.photoUrl,
          quantity: 1,
          unitPrice: product.purchasePrice?.value || 0,
          price: product.price || 0,
        },
      ];
    });
  };

  const updateItem = (productId, updates) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.productId === productId ? { ...item, ...updates } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.productId !== productId)
    );
  };
  const requiredFields = [
    "productName",
    "productIndex",
    "type",
    "quantity",
    "unitPurchasePrice",
    "price",
  ];

  return (
    <GeneralOfflineOrder>
      <LeftColumn>
        <SearchBox
          placeholder="🔍 Введіть назву товару..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <h4>📂 Категорії</h4>
        {categories.map((cat) => (
          <CategoryButton
            key={cat}
            $selected={selectedCategory === cat}
            onClick={() => {
              setSelectedCategory(cat);
              setSelectedSubcategory("");
            }}
          >
            {cat}
          </CategoryButton>
        ))}
        {selectedCategory && (
          <>
            <h4>📑 Підкатегорії</h4>
            {[...subcategoriesByCategory[selectedCategory]].map((sub) => (
              <CategoryButton
                key={sub}
                $selected={selectedSubcategory === sub}
                onClick={() => setSelectedSubcategory(sub)}
              >
                {sub}
              </CategoryButton>
            ))}
          </>
        )}

        <h4>🛒 Кошик приходу ({cart.length})</h4>
        <button onClick={() => setViewCart(!viewCart)}>
          {viewCart ? "⬅️ Назад до товарів" : "📥 Переглянути кошик"}
        </button>
      </LeftColumn>

      <RightColumn>
        {viewCart ? (
          <>
            <PurchaseCart
              cart={cart}
              updateItem={updateItem}
              removeFromCart={removeFromCart}
            />
            <PurchaseOrderForm
              cart={cart}
              setCart={setCart}
              products={products}
            />
          </>
        ) : (
          <>
            <h4>📦 Обрати товари</h4>
            <ProductGrid>
              {filteredProducts.map((product) => {
                const isInCart = cart.some(
                  (item) => item.productId === product._id
                );
                return (
                  <ProductCard key={product._id}>
                    <ProductImage src={product.photoUrl} alt={product.name} />
                    <ProductTitle>{product.name}</ProductTitle>
                    <p>Ціна: {product.price} zł</p>
                    <Button
                      variant="contained"
                      onClick={() => addToCart(product)}
                      disabled={isInCart}
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

export default PurchaseImport;
