import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getProducts } from "../../../../../../redux/products/operationProducts";
import { selectProducts } from "../../../../../../redux/products/selectorsProducts";
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

  const categories = [...new Set(products.map((p) => p.category))];
  const subcats = {};
  products.forEach((p) => {
    if (!subcats[p.category]) subcats[p.category] = new Set();
    subcats[p.category].add(p.subcategory);
  });

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!selectedCategory || product.category === selectedCategory) &&
      (!selectedSubcategory || product.subcategory === selectedSubcategory),
  );

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.productId === product._id);
      if (exists) return prev;
      return [
        ...prev,
        {
          productId: product._id,
          productName: product.name,
          productIndex: product.index,
          photoUrl: product.photoUrl,
          quantity: 1,
          unitPrice: product.purchasePrice?.value || 0,
          price: product.price || 0,
          size: product.size || null,
          sku: product.sku || null,
        },
      ];
    });
  };

  const updateItem = (productId, updates) => {
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, ...updates } : item,
      ),
    );
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 3,
        alignItems: "flex-start",
      }}
    >
      {/* 📘 Ліва колонка — фільтри */}
      <Box sx={{ width: { xs: "80%", md: "25%" } }}>
        <Stack spacing={2}>
          <TextField
            placeholder="🔍 Введіть назву товару..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
          />

          <Typography variant="subtitle1">📂 Категорії</Typography>
          <Stack spacing={1}>
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "contained" : "outlined"}
                onClick={() => {
                  setSelectedCategory(cat);
                  setSelectedSubcategory("");
                }}
              >
                {cat}
              </Button>
            ))}
          </Stack>

          {selectedCategory && (
            <>
              <Typography variant="subtitle1">📑 Підкатегорії</Typography>
              <Stack spacing={1}>
                {[...subcats[selectedCategory]].map((sub) => (
                  <Button
                    key={sub}
                    variant={
                      selectedSubcategory === sub ? "contained" : "outlined"
                    }
                    onClick={() => setSelectedSubcategory(sub)}
                  >
                    {sub}
                  </Button>
                ))}
              </Stack>
            </>
          )}

          <Typography variant="subtitle1">
            🛒 Кошик приходу ({cart.length})
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setViewCart(!viewCart)}
          >
            {viewCart ? "⬅️ Назад до товарів" : "📥 Переглянути кошик"}
          </Button>
        </Stack>
      </Box>

      {/* 📦 Права частина — товарні картки */}
      <Box sx={{ flexGrow: 1 }}>
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
            <Typography variant="h6" gutterBottom>
              📦 Обрати товари
            </Typography>
            <Grid container columns={12} columnSpacing={2} rowSpacing={2}>
              {filteredProducts.map((product) => {
                const isInCart = cart.some(
                  (item) => item.productId === product._id,
                );

                return (
                  <Grid
                    key={product._id}
                    sx={{
                      gridColumn: {
                        xs: "span 12",
                        sm: "span 6",
                        md: "span 4",
                        lg: "span 3",
                      },
                      display: "flex",
                    }}
                  >
                    <Card
                      sx={{
                        flexGrow: 1,
                        height: "auto",
                        width: "200px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        borderRadius: 3,
                        boxShadow: 3,
                        transition: "transform 0.2s ease-in-out",
                        "&:hover": {
                          transform: "scale(1.015)",
                          boxShadow: 6,
                        },
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={product.photoUrl}
                        alt={product.name}
                        sx={{
                          height: "50%",
                          width: "60%",
                          objectFit: "cover",
                          borderRadius: "12px",
                          m: 2,
                        }}
                      />
                      <CardContent sx={{ px: 2 }}>
                        <Typography variant="subtitle1" fontWeight={600}>
                          {product.name}
                        </Typography>
                        <Typography>
                          📏 Розмір: {product.size || "-"}
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                          💰 {product.price} zł
                        </Typography>
                      </CardContent>
                      <CardActions sx={{ px: 2, pb: 2 }}>
                        <Button
                          fullWidth
                          variant={isInCart ? "outlined" : "contained"}
                          onClick={() => addToCart(product)}
                          disabled={isInCart}
                        >
                          {isInCart ? "✅ Додано" : "➕ Додати"}
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </>
        )}
      </Box>
    </Box>
  );
};

export default PurchaseImport;
