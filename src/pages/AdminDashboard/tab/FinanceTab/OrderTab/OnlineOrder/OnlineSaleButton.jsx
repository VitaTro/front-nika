import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { createOnlineSale } from "../../../../../../redux/finance/onlineSale/operationOnlineSale";

const OnlineSaleButton = ({ orderId }) => {
  const dispatch = useDispatch();

  const handleSale = () => {
    dispatch(createOnlineSale({ onlineOrderId: orderId }));
  };

  return (
    <Button
      variant="contained"
      color="success"
      onClick={handleSale}
      sx={{ mt: 2 }}
    >
      💸 Завершити продаж
    </Button>
  );
};

export default OnlineSaleButton;
