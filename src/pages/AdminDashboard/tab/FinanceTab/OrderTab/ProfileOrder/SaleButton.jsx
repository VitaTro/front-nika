import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { createPlatformSale } from "../../../../../../redux/finance/platform/operationPlatform";

const SaleButton = ({ orderId, saleDate }) => {
  const dispatch = useDispatch();

  const handleSale = () => {
    dispatch(
      createPlatformSale({
        orderId,
        saleDate: saleDate || new Date(),
      })
    );
  };

  return (
    <Button variant="contained" color="success" onClick={handleSale}>
      💸 Завершити продаж
    </Button>
  );
};

export default SaleButton;
