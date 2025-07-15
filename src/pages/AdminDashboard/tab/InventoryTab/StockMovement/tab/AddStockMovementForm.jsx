import {
  Alert,
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadSingleMovement } from "../../../../../../redux/inventory/stockMovement/operationsStockMovement";
import {
  selectStockError,
  selectStockLoading,
} from "../../../../../../redux/inventory/stockMovement/selectorsStockMovement";
import { getProducts } from "../../../../../../redux/products/operationProducts";
import { selectProducts } from "../../../../../../redux/products/selectorsProducts";
const AddStockMovementForm = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const loading = useSelector(selectStockLoading);
  const error = useSelector(selectStockError);

  const [form, setForm] = useState({
    index: "",
    type: "purchase",
    quantity: "",
    price: "",
    unitPrice: "",
    note: "",
    date: new Date().toISOString().split("T")[0],
  });
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      "🧾 Всі продукти:",
      products.map((p) => p.index)
    );

    const product = products.find((p) => p.index === form.index.trim());
    if (!product) {
      alert("🚨 Товар із таким індексом не знайдено!");
      return;
    }

    const movementData = {
      productIndex: product.index,
      productName: product.name,
      type: form.type,
      quantity: Number(form.quantity),
      unitPurchasePrice: Number(form.unitPrice),
      price: Number(form.price), // якщо хочеш одразу передавати
      note: form.note,
      date: form.date,
    };

    dispatch(uploadSingleMovement(movementData));
    setForm({
      index: "",
      type: "purchase",
      quantity: "",
      unitPrice: "",
      note: "",
    });
  };
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        mb: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 600,
        mx: "auto",
      }}
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
        label="Закупочна ціна"
        name="unitPrice"
        type="number"
        value={form.unitPrice}
        onChange={handleChange}
      />
      <TextField
        label="Роздрібна ціна"
        name="price"
        type="number"
        value={form.price}
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
      <TextField
        label="Дата руху"
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
      />

      <Button type="submit" variant="contained" disabled={loading}>
        {loading ? "Збереження..." : "Додати рух"}
      </Button>
      {error && <Alert severity="error">{error}</Alert>}
    </Box>
  );
};

export default AddStockMovementForm;
