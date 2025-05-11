import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../../../../components/Loader";
import {
  fetchOnlineOrderById,
  fetchOnlineOrders,
} from "../../../../../../redux/finance/onlineOrder/operationOnlineOrder";
import {
  selectOnlineOrders,
  selectOnlineOrdersError,
  selectOnlineOrdersLoading,
} from "../../../../../../redux/finance/onlineOrder/selectorsOnlineOrder";
import OnlineOrderDetails from "./OnlineOrderDetails";
import OrderStatus from "./OrderStatus";

const statusColors = {
  new: "info",
  received: "primary",
  assembled: "warning",
  shipped: "success",
  completed: "success",
  cancelled: "error",
};

const OnlineOrder = () => {
  const dispatch = useDispatch();
  const onlineOrders = useSelector(selectOnlineOrders);
  const loading = useSelector(selectOnlineOrdersLoading);
  const error = useSelector(selectOnlineOrdersError);

  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    dispatch(fetchOnlineOrders());
  }, [dispatch]);
  const handleSelectOrder = (orderId) => {
    dispatch(fetchOnlineOrderById(orderId)); // ✅ Отримуємо конкретне замовлення
    setSelectedOrder(orderId);
  };
  if (loading) return <Loader />;
  if (error) return <p>❌ Помилка: {error}</p>;

  const handleCloseDetails = () => {
    setSelectedOrder(null);
  };

  return (
    <div>
      <h2>📦 Онлайн-замовлення</h2>

      {onlineOrders.map((order) => (
        <Card key={order._id} sx={{ marginBottom: 2, padding: 2 }}>
          <CardContent
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography variant="h6">ID: {order.orderId}</Typography>
              <Chip
                label={order.status}
                color={statusColors[order.status]}
                sx={{ marginBottom: 1 }}
              />
            </Box>

            <Button
              variant="contained"
              color="primary"
              onClick={() => setSelectedOrder(order)}
            >
              🔎 Переглянути деталі
            </Button>

            {selectedOrder && (
              <OnlineOrderDetails
                order={selectedOrder}
                onClose={handleCloseDetails}
              />
            )}

            {/* ✅ Використовуємо новий компонент `OrderStatus` замість старих кнопок */}
            <OrderStatus order={order} />
          </CardContent>
        </Card>
      ))}

      {selectedOrder && (
        <OnlineOrderDetails
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default OnlineOrder;
