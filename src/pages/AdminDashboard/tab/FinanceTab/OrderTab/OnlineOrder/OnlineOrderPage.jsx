import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchOnlineOrderById } from "../../../../../../redux/finance/onlineOrder/operationOnlineOrder";
import OnlineOrderActions from "./OnlineOrderActions";
import OnlineOrderCart from "./OnlineOrderCart";
import OnlineOrderForm from "./OnlineOrderForm";
import OrderStatusChip from "./OrderStatusChip";
import PaymentStatusChip from "./PaymentStatusChip";

const OnlineOrderPage = () => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width:768px)");
  const navigate = useNavigate();
  const order = useSelector((state) => state.onlineOrders.currentOrder);

  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    dispatch(fetchOnlineOrderById(id));
  }, [dispatch, id]);

  if (!order) return <Typography> Завантаження...</Typography>;

  return (
    <Box sx={{ p: isMobile ? 1 : 3, maxWidth: 1200, mx: "auto" }}>
      <Box sx={{ mb: 2 }}>
        <Button
          variant="outlined"
          onClick={() => navigate("/admin/finance/orders/online")}
        >
          ←Повернутись до всіх замовлень
        </Button>
      </Box>

      <Typography variant="h4" sx={{ mb: 2 }}>
        📦 Онлайн‑замовлення #{order.orderId}
      </Typography>

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 3 }}>
        <OrderStatusChip status={order.status} />
        <PaymentStatusChip status={order.paymentStatus} />
      </Box>
      <Box sx={{ mb: 3 }}>
        <Typography>
          <strong>Ім’я:</strong> {order.buyerName}
        </Typography>
        <Typography>
          <strong>Email:</strong> {order.buyerEmail}
        </Typography>
        <Typography>
          <strong>Телефон:</strong> {order.buyerPhone}
        </Typography>
        <Typography>
          <strong>Доставка:</strong> {order.deliveryType}
        </Typography>

        {order.deliveryAddress && (
          <Typography>
            <strong>Адреса:</strong> {JSON.stringify(order.deliveryAddress)}
          </Typography>
        )}
      </Box>

      <OnlineOrderCart
        products={order.products}
        deliveryPrice={order.deliveryPrice}
      />

      <OnlineOrderActions order={order} />

      <OnlineOrderForm order={order} />
    </Box>
  );
};
export default OnlineOrderPage;
