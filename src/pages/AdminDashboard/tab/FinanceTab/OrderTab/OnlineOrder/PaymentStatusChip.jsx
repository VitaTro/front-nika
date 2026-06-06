import { Chip } from "@mui/material";

const PaymentStatusChip = ({ status }) => {
  return (
    <Chip
      label={status === "paid" ? "Оплачено" : "Не оплачено"}
      color={status === "paid" ? "success" : "warning"}
    />
  );
};
export default PaymentStatusChip;
