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
import { returnOfflineSale } from "../../../../../../redux/finance/offlineSale/operationOfflineSale";

const ReturnOfflineSale = ({ sale, onClose }) => {
  const dispatch = useDispatch();
  const [refundAmount, setRefundAmount] = useState(sale.totalAmount);

  const handleReturn = () => {
    dispatch(returnOfflineSale(sale._id, refundAmount));
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
export default ReturnOfflineSale;
