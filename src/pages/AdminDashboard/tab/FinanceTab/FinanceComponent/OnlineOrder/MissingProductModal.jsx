import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";

const MissingProductModal = ({ open, onClose, missingProduct, onConfirm }) => {
  const [comment, setComment] = useState("");

  if (!missingProduct) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>❌ Товар відсутній: {missingProduct.name}</DialogTitle>
      <DialogContent>
        <p>
          <strong>Кількість запитана:</strong> {missingProduct.quantity}
        </p>
        <TextField
          label="Коментар адміністратора"
          fullWidth
          variant="outlined"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          sx={{ marginTop: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error">
          Закрити
        </Button>
        <Button
          onClick={() => onConfirm(missingProduct, comment)}
          variant="contained"
          color="success"
        >
          ✅ Підтвердити зміни
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default MissingProductModal;
