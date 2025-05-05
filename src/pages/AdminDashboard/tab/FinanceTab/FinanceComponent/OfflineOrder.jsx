import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../../../components/Loader";
import {
  createOfflineOrder,
  fetchOfflineOrders,
  updateOfflineOrderStatus,
} from "../../../../../redux/finance/offlineOrder/operationOfflineOrder";
import {
  selectOfflineOrders,
  selectOfflineOrdersError,
  selectOfflineOrdersLoading,
} from "../../../../../redux/finance/offlineOrder/selectorsOfflineOrder";
import { getProducts } from "../../../../../redux/products/operationProducts";
import { selectProducts } from "../../../../../redux/products/selectorsProducts";

const OfflineOrder = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOfflineOrders);
  const isLoading = useSelector(selectOfflineOrdersLoading);
  const error = useSelector(selectOfflineOrdersError);
  const [searchQuery, setSearchQuery] = useState("");
  const products = useSelector(selectProducts);
  const [orderData, setOrderData] = useState({
    products: [],
    totalPrice: 0,
    paymentMethod: "cash",
    status: "pending",
  });

  useEffect(() => {
    dispatch(getProducts());
    dispatch(fetchOfflineOrders());
  }, [dispatch]);

  const handleUpdateStatus = (id, newStatus) => {
    dispatch(updateOfflineOrderStatus({ orderId: id, status: newStatus }));
  };

  const handleSelectProduct = (product) => {
    setOrderData((prevData) => {
      const existingProductIndex = prevData.products.findIndex(
        (item) => item.productId === product._id
      );
      let updatedProducts = [...prevData.products];

      if (existingProductIndex !== -1) {
        updatedProducts[existingProductIndex].quantity += 1;
      } else {
        updatedProducts.push({
          productId: product._id,
          name: product.name,
          price: product.price,
          photoUrl: product.photoUrl,
          quantity: 1,
        });
      }

      const newTotalPrice = updatedProducts.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      return {
        ...prevData,
        products: updatedProducts,
        totalPrice: newTotalPrice,
      };
    });
  };

  const handleQuantityChange = (index, value) => {
    setOrderData((prevData) => {
      const updatedProducts = [...prevData.products];
      updatedProducts[index].quantity = Number(value);

      const newTotalPrice = updatedProducts.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      return {
        ...prevData,
        products: updatedProducts,
        totalPrice: newTotalPrice,
      };
    });
  };

  const handleCreateOrder = (e) => {
    e.preventDefault();

    // 🔥 Перевіряємо доступну кількість товару
    const insufficientStockProducts = orderData.products.filter((product) => {
      const selectedProduct = products.find((p) => p._id === product.productId);
      return selectedProduct && selectedProduct.quantity < product.quantity;
    });

    if (insufficientStockProducts.length > 0) {
      alert(
        `❌ Недостатньо товару на складі: ${insufficientStockProducts
          .map((p) => p.name)
          .join(", ")}`
      );
      return; // 🚀 Зупиняємо оформлення замовлення
    }

    dispatch(createOfflineOrder(orderData));
  };

  if (isLoading) return <Loader />;
  if (error) return <Typography color="error">❌ {error}</Typography>;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          🛍 Офлайн-Замовлення
        </Typography>
      </Grid>

      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={6} md={4} key={product._id}>
            <Card
              sx={{ cursor: "pointer", textAlign: "center" }}
              onClick={() => handleSelectProduct(product)}
            >
              <CardMedia
                component="img"
                height="140"
                image={product.photoUrl}
                alt={product.name}
              />
              <CardContent>
                <Typography variant="body1">{product.name}</Typography>
                <Typography variant="body2">
                  Ціна: {product.price} грн
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid item xs={12} md={6}>
        <form onSubmit={handleCreateOrder}>
          <Typography variant="h6">📝 Створити замовлення</Typography>

          <Select
            fullWidth
            name="paymentMethod"
            value={orderData.paymentMethod}
            onChange={(e) =>
              setOrderData({ ...orderData, paymentMethod: e.target.value })
            }
          >
            <MenuItem value="cash">Готівка</MenuItem>
            <MenuItem value="bank_transfer">Банківський переказ</MenuItem>
          </Select>

          <Select
            fullWidth
            name="status"
            value={orderData.status}
            onChange={(e) =>
              setOrderData({ ...orderData, status: e.target.value })
            }
          >
            <MenuItem value="pending">Очікує</MenuItem>
            <MenuItem value="completed">Завершено</MenuItem>
            <MenuItem value="cancelled">Скасовано</MenuItem>
          </Select>

          <Typography variant="h6" gutterBottom>
            📦 Додані товари
          </Typography>

          {orderData.products.map((product, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card sx={{ maxWidth: 300 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={product.photoUrl}
                  alt={product.name}
                />
                <CardContent>
                  <Typography variant="body1">{product.name}</Typography>
                  <Typography variant="body2">
                    Ціна: {product.price} грн
                  </Typography>
                  <TextField
                    type="number"
                    label="Кількість"
                    value={product.quantity}
                    onChange={(e) =>
                      handleQuantityChange(index, e.target.value)
                    }
                    margin="normal"
                    sx={{ width: "80px" }}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}

          <TextField
            fullWidth
            label="💵 Загальна сума"
            name="totalPrice"
            value={orderData.totalPrice}
            disabled
            margin="normal"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            📦 Створити замовлення
          </Button>
        </form>
      </Grid>

      <Grid item xs={12} md={6}>
        <Typography variant="h6">📜 Список замовлень</Typography>
        {orders.length === 0 ? (
          <Typography color="error">❌ Немає офлайн-замовлень.</Typography>
        ) : (
          <Grid container spacing={2}>
            {orders.map((order) => (
              <Grid item xs={12} md={6} key={order.id}>
                <Card sx={{ maxWidth: 300 }}>
                  <CardContent>
                    <Typography>ID: {order.id}</Typography>
                    <Typography>Статус: {order.status}</Typography>
                    <Typography>Метод оплати: {order.paymentMethod}</Typography>
                    <Button
                      variant="contained"
                      color="success"
                      sx={{ marginTop: 1 }}
                      onClick={() => handleUpdateStatus(order.id, "completed")}
                    >
                      ✅ Завершити
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      sx={{ marginTop: 1, marginLeft: 1 }}
                      onClick={() => handleUpdateStatus(order.id, "cancelled")}
                    >
                      ❌ Скасувати
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default OfflineOrder;
