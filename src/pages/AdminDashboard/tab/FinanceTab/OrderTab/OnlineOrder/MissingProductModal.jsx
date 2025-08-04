import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

const MissingProductModal = ({ open, onClose, missingProduct, onConfirm }) => {
  const [comment, setComment] = useState("");

  if (!missingProduct) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        ❌ Товар відсутній: {missingProduct?.name || "Невідомий"}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <Typography>
            <strong>Кількість запитана:</strong>{" "}
            {missingProduct.quantity || "?"}
          </Typography>
          <TextField
            label="Коментар адміністратора"
            fullWidth
            variant="outlined"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error">
          ❌ Закрити
        </Button>
        <Button
          onClick={() => onConfirm(missingProduct, comment)}
          variant="contained"
          color="success"
        >
          ✅ Підтвердити
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MissingProductModal;
