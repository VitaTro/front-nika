import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";

const PaymentMethodDialog = ({ onClose, open, onSubmit }) => {
  const methods = [
    { id: "cash", label: "Готівка" },
    { id: "terminal", label: "Термінал" },
    { id: "BLIK", label: "BLIK" },
    { id: "bank_transfer", label: "Банківський переказ" },
  ];

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>💳 Провести продаж</DialogTitle>
      <DialogContent>
        <Stack spacing={1} sx={{ mt: 1 }}>
          {methods.map((m) => (
            <Button
              key={m.id}
              variant="outlined"
              onClick={() => onSubmit(m.id)}
            >
              {m.label}
            </Button>
          ))}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error">
          ❌ Скасувати
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default PaymentMethodDialog;
