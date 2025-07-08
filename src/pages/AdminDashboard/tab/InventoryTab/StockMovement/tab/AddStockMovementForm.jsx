import {
  Alert,
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadSingleMovement } from "../../../../../../redux/inventory/stockMovement/operationsStockMovement";
import {
  selectStockError,
  selectStockLoading,
} from "../../../../../../redux/inventory/stockMovement/selectorsStockMovement";

const AddStockMovementForm = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectStockLoading);
  const error = useSelector(selectStockError);

  const [form, setForm] = useState({
    index: "",
    type: "purchase",
    quantity: "",
    unitPrice: "",
    note: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Замість product ID — бек підтримає пошук по index
      const movementData = {
        index: form.index.trim(),
        type: form.type,
        quantity: Number(form.quantity),
        unitPrice: Number(form.unitPrice),
        note: form.note,
      };

      dispatch(uploadSingleMovement(movementData));
      setForm({
        index: "",
        type: "purchase",
        quantity: "",
        unitPrice: "",
        note: "",
      });
    } catch (err) {
      console.error("❌ Submission error:", err);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ mb: 3, display: "grid", gap: 2 }}
    >
      <Typography variant="h6">➕ Додати рух товару</Typography>
      <TextField
        label="Index товару"
        name="index"
        value={form.index}
        onChange={handleChange}
        required
      />
      <TextField
        label="Тип"
        name="type"
        select
        value={form.type}
        onChange={handleChange}
        required
      >
        <MenuItem value="purchase">Прихід</MenuItem>
        <MenuItem value="sale">Продаж</MenuItem>
        <MenuItem value="return">Повернення</MenuItem>
        <MenuItem value="writeOff">Списання</MenuItem>
        <MenuItem value="restock">Поповнення</MenuItem>
      </TextField>
      <TextField
        label="Кількість"
        name="quantity"
        type="number"
        value={form.quantity}
        onChange={handleChange}
        required
      />
      <TextField
        label="Ціна за одиницю"
        name="unitPrice"
        type="number"
        value={form.unitPrice}
        onChange={handleChange}
      />
      <TextField
        label="Примітка"
        name="note"
        value={form.note}
        onChange={handleChange}
        multiline
        rows={2}
      />
      <Button type="submit" variant="contained" disabled={loading}>
        {loading ? "Збереження..." : "Додати рух"}
      </Button>
      {error && <Alert severity="error">{error}</Alert>}
    </Box>
  );
};

export default AddStockMovementForm;
