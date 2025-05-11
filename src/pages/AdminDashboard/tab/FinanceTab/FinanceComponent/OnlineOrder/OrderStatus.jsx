import { Button, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { updateOnlineOrderStatus } from "../../../../../../redux/finance/onlineOrder/operationOnlineOrder";

const statuses = [
  { key: "new", label: "🆕 Нове", color: "info" },
  { key: "received", label: "📥 Отримано", color: "primary" },
  { key: "assembled", label: "🛠 Зібрано", color: "success" },
  { key: "shipped", label: "🚚 Відправлено", color: "warning" },
  { key: "completed", label: "✅ Виконано", color: "secondary" },
  { key: "cancelled", label: "❌ Скасовано", color: "error" },
];

const OrderStatus = ({ order }) => {
  const dispatch = useDispatch();

  const handleStatusChange = (newStatus) => {
    dispatch(
      updateOnlineOrderStatus({ orderId: order._id, status: newStatus })
    );
  };

  return (
    <Stack direction="row" spacing={1}>
      {statuses.map(({ key, label, color }) => (
        <Button
          key={key}
          variant="contained"
          color={color}
          onClick={() => handleStatusChange(key)}
          disabled={order.status === key} // ✅ Вимикаємо кнопку, якщо статус уже встановлено
        >
          {label}
        </Button>
      ))}
    </Stack>
  );
};

export default OrderStatus;
