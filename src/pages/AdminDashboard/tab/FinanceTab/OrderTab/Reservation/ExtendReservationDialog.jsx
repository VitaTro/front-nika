import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";

const ExtendReservationDialog = ({ open, onClose, onSubmit }) => {
  const [date, setDate] = useState("");

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>📅 Продовжити резерв</DialogTitle>
      <DialogContent>
        <TextField
          type="date"
          fullWidth
          value={date}
          onChange={(e) => setDate(e.target.value)}
          sx={{ mt: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error">
          ❌ Скасувати
        </Button>
        <Button
          onClick={() => {
            onSubmit(date);
            onClose();
          }}
          variant="contained"
        >
          ✔ Продовжити
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExtendReservationDialog;
