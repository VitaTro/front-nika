import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { returnOnlineSale } from "../../../../../../redux/finance/onlineSale/operationOnlineSale";

const ReturnOnlineSale = ({ sale, onClose }) => {
  const dispatch = useDispatch();
  const [refundAmount, setRefundAmount] = useState(sale.totalAmount);

  const handleReturn = () => {
    dispatch(returnOnlineSale(sale._id, refundAmount));
    onClose();
  };

  return (
    <Dialog open={!!sale} onClose={onClose}>
      <DialogTitle>🔄 Повернення товару</DialogTitle>
      <DialogContent>
        <p>
          <strong>Сума продажу:</strong> {sale.totalAmount} zł
        </p>
        <TextField
          label="Сума повернення"
          type="number"
          fullWidth
          margin="normal"
          value={refundAmount}
          onChange={(e) => setRefundAmount(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error">
          ❌ Закрити
        </Button>
        <Button onClick={handleReturn} variant="contained">
          ✅ Повернути товар
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ReturnOnlineSale;
