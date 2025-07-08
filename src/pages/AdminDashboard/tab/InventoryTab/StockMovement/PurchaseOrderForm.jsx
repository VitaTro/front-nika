import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { uploadBulkMovements } from "../../../../../redux/inventory/bulkUpload/operationsBulkUpload";
const PurchaseOrderForm = ({ cart, setCart }) => {
  const dispatch = useDispatch();
  const [meta, setMeta] = useState({
    note: "",
    date: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e) => {
    setMeta({ ...meta, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (cart.length === 0) {
      alert("🚨 Кошик порожній! Додайте товари.");
      return;
    }

    const movements = cart.map((item) => ({
      product: item.productId,
      type: "purchase",
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      price: item.price,
      currency: item.currency || "PLN", // 💸 додаємо
      exchangeRateToPLN: item.exchangeRateToPLN || 1, // 💱 додаємо
      note: meta.note,
      date: meta.date,
    }));

    dispatch(uploadBulkMovements(movements));
    setCart([]);
    alert("✅ Прихід оформлено!");
  };

  return (
    <Box sx={{ mt: 3, display: "grid", gap: 2 }}>
      <Typography variant="h6">🧾 Дані накладної</Typography>
      <TextField
        label="Номер накладної / примітка"
        name="note"
        value={meta.note}
        onChange={handleChange}
      />
      <TextField
        label="Дата приходу"
        name="date"
        type="date"
        value={meta.date}
        onChange={handleChange}
      />
      <Button variant="contained" color="success" onClick={handleSubmit}>
        📤 Оформити прихід
      </Button>
    </Box>
  );
};
export default PurchaseOrderForm;
