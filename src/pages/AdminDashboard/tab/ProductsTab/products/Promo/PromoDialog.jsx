import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

const PromoDialog = ({ open, onClose, product, handleUpdate }) => {
  const [promoPrice, setPromoPrice] = useState("");

  const handleSave = () => {
    handleUpdate(product._id, { promoPrice: Number(promoPrice) });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      {product && (
        <>
          <DialogTitle>Aкційна ціна для {product.name}</DialogTitle>
          <DialogContent>
            <Typography sx={{ mb: 1 }}>
              Поточна ціна: {product.price} zł
            </Typography>
            <TextField
              label="Нова акційна ціна"
              type="number"
              value={promoPrice}
              onChange={(e) => setPromoPrice(e.target.value)}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Скасувати</Button>
            <Button variant="contained" color="success" onClick={handleSave}>
              Підтвердити
            </Button>
          </DialogActions>
        </>
      )}{" "}
    </Dialog>
  );
};
export default PromoDialog;
