import { Chip } from "@mui/material";

const colors = {
  new: "info",
  received: "primary",
  assembled: "warning",
  shipped: "success",
  completed: "success",
  cancelled: "error",
};
const OrderStatusChip = ({ status }) => {
  return <Chip label={status} color={colors[status] || "default"} />;
};

export default OrderStatusChip;
