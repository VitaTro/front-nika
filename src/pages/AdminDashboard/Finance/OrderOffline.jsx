import { Box, Button, MenuItem, Select, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminProducts } from "../../../redux/admin/operationsAdmin";
import { createOrder } from "../../../redux/finance/order/operationOrder";
import OrderProducts from "../order/OrderProducts";
import FilterPanel from "../products/FilterPanel";

const OrderOffline = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    paymentMethod: "cash",
  });
  const [selectedProducts, setSelectedProducts] = useState([]); // Додані товари
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]); // Для фільтрації

  const products = useSelector((state) => state.admin.products);

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  useEffect(() => {
    if (products && searchTerm) {
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [products, searchTerm]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = (productId) => {
    console.log("Adding productId:", productId);

    if (!productId) {
      console.error("productId is null or undefined");
      alert("Не вдалося додати продукт. Перевірте ID продукту.");
      return;
    }

    const product = products.find((p) => p.id === productId);

    if (!product) {
      console.error(`Product with ID ${productId} not found`);
      alert("Продукт не знайдено.");
      return;
    }

    const existingProduct = selectedProducts.find(
      (p) => p.productId === productId
    );

    if (existingProduct) {
      alert("Товар вже доданий до замовлення.");
      return;
    }

    setSelectedProducts((prev) => [
      ...prev,
      {
        productId: product.id,
        name: product.name,
        quantity: 1, // Початково додається 1 одиниця
        price: product.price,
        availableQuantity: product.quantity,
      },
    ]);
  };

  const handleRemoveProduct = (productId) => {
    setSelectedProducts((prev) =>
      prev.filter((product) => product.productId !== productId)
    );
  };

  const handleSubmit = (e) => {
    console.log("Selected products:", selectedProducts);

    e.preventDefault();

    if (selectedProducts.length === 0) {
      alert("Додайте хоча б один товар до замовлення.");
      return;
    }

    const dataToSubmit = {
      products: selectedProducts.map(({ productId, quantity }) => ({
        productId,
        quantity,
      })),
      paymentMethod: formData.paymentMethod,
    };

    console.log("Дані для запиту:", dataToSubmit);

    dispatch(createOrder(dataToSubmit));
  };

  return (
    <Box sx={{ maxWidth: 800, margin: "0 auto", padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Створення замовлення
      </Typography>

      {/* Панель пошуку */}
      <FilterPanel
        searchTerm={searchTerm}
        handleSearchChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Таблиця продуктів */}
      <OrderProducts
        filteredProducts={filteredProducts}
        handleAdd={handleAddProduct}
      />

      {/* Список вибраних товарів */}
      {selectedProducts.length > 0 && (
        <Box sx={{ marginTop: 3 }}>
          <Typography variant="h6">Додані товари:</Typography>
          {selectedProducts.map((product, index) => (
            <Box
              key={`${product.productId}+${product.name}-${index}`}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                border: "1px solid #ccc",
                padding: 1,
                marginBottom: 2,
              }}
            >
              <Typography>
                {product.name} - {product.quantity} шт.
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleRemoveProduct(product.productId)}
              >
                Видалити
              </Button>
            </Box>
          ))}
        </Box>
      )}

      {/* Форма замовлення */}
      <form onSubmit={handleSubmit}>
        <Box sx={{ marginTop: 3 }}>
          <Typography variant="body1" gutterBottom>
            Метод оплати:
          </Typography>
          <Select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleInputChange}
            fullWidth
          >
            <MenuItem value="cash">Готівка</MenuItem>
            <MenuItem value="card">Картка</MenuItem>
          </Select>
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: 3 }}
          fullWidth
        >
          Створити замовлення
        </Button>
      </form>
    </Box>
  );
};

export default OrderOffline;
