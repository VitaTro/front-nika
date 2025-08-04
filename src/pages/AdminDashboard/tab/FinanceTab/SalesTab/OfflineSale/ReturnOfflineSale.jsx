import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { returnOfflineSale } from "../../../../../../redux/finance/offlineSale/operationOfflineSale";

const ReturnOfflineSale = ({ sale, onClose }) => {
  const dispatch = useDispatch();
  const [refundAmount, setRefundAmount] = useState(sale.totalAmount);
  const isMobile = useMediaQuery("(max-width:768px)");

  const handleReturn = () => {
    dispatch(returnOfflineSale(sale._id, refundAmount));
    onClose();
  };

  return (
    <Dialog open={!!sale} onClose={onClose} fullWidth>
      <DialogTitle>🔄 Повернення товару</DialogTitle>
      <DialogContent>
        <Typography>
          <strong>Сума продажу:</strong> {sale.totalAmount} zł
        </Typography>
        <TextField
          label="Сума повернення"
          type="number"
          fullWidth
          margin="normal"
          value={refundAmount}
          onChange={(e) => setRefundAmount(e.target.value)}
        />
      </DialogContent>
      <DialogActions
        sx={{ flexDirection: isMobile ? "column" : "row", gap: 1 }}
      >
        <Button onClick={onClose} color="error" fullWidth={isMobile}>
          ❌ Закрити
        </Button>
        <Button onClick={handleReturn} variant="contained" fullWidth={isMobile}>
          ✅ Повернути товар
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ReturnOfflineSale;
