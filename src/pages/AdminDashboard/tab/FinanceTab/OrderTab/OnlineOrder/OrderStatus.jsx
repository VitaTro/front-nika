import { Button, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { updateOnlineOrderStatus } from "../../../../../../redux/finance/onlineOrder/operationOnlineOrder";

const statuses = [
  { key: "new", label: "🆕 Нове", color: "info" },
  { key: "received", label: "📥 Отримано", color: "primary" },
  { key: "paid", label: "💳 Оплачено", color: "secondary" },
  { key: "assembled", label: "🛠 Зібрано", color: "success" },
  { key: "shipped", label: "🚚 Відправлено", color: "warning" },
  { key: "completed", label: "✅ Виконано", color: "secondary" },
  { key: "cancelled", label: "❌ Скасовано", color: "error" },
];

const OrderStatus = ({ order, isMobile }) => {
  const dispatch = useDispatch();

  const handleStatusChange = (status) => {
    dispatch(
      updateOnlineOrderStatus({
        orderId: order._id,
        status,
      }),
    );
  };

  return (
    <Stack
      direction={isMobile ? "column" : "row"}
      spacing={1}
      flexWrap="wrap"
      maxWidth={isMobile ? "100%" : "fit-content"}
    >
      {statuses.map(({ key, color, label }) => (
        <Button
          key={key}
          size="small"
          variant="contained"
          color={color}
          onClick={() => handleStatusChange(key)}
          disabled={order.status === key}
          fullWidth={isMobile}
        >
          {label}
        </Button>
      ))}
    </Stack>
  );
};

export default OrderStatus;
