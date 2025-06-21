import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createExpense,
  fetchExpenses,
} from "../../../../../redux/finance/expense/operationsExpense";
import {
  selectExpenses,
  selectExpensesLoading,
} from "../../../../../redux/finance/expense/selectorsExpense";

import {
  Box,
  Button,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

const ExpenseManager = () => {
  const dispatch = useDispatch();
  const expenses = useSelector(selectExpenses);
  const isLoading = useSelector(selectExpensesLoading);
  const [form, setForm] = useState({
    category: "",
    amount: "",
    invoiceNumber: "",
    note: "",
    date: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    dispatch(fetchExpenses());
  }, [dispatch]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const parsedAmount = parseFloat(form.amount);
    if (!form.category || isNaN(parsedAmount)) return;

    dispatch(
      createExpense({
        ...form,
        amount: parsedAmount,
      })
    );
    setForm({
      category: "",
      amount: "",
      invoiceNumber: "",
      note: "",
      date: form.date,
    });
  };

  return (
    <Box sx={{ maxWidth: "600px", margin: "auto", paddingBottom: "40px" }}>
      <Paper sx={{ padding: "20px", marginBottom: "30px" }}>
        <Typography variant="h6" gutterBottom>
          ➕ Додати витрату
        </Typography>
        <TextField
          fullWidth
          select
          label="Категорія"
          name="category"
          value={form.category}
          onChange={handleChange}
          sx={{ mb: 2 }}
        >
          <MenuItem value="podatek ZUS">Podatek ZUS</MenuItem>
          <MenuItem value="podatek Urząd Skarbowy">
            Podatek Urząd Skarbowy
          </MenuItem>
          <MenuItem value="księgowa">Księgowa</MenuItem>
          <MenuItem value="towar">Zakup towaru</MenuItem>
          <MenuItem value="podatek na towar">Podatek na towar</MenuItem>
          <MenuItem value="opakowanie">Opakowanie</MenuItem>
          <MenuItem value="доставка">Dostawa</MenuItem>
          <MenuItem value="інше">Inne</MenuItem>
        </TextField>
        <TextField
          fullWidth
          label="Сума (zł)"
          name="amount"
          type="number"
          value={form.amount}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Номер фактури (опціонально)"
          name="invoiceNumber"
          value={form.invoiceNumber}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Коментар"
          name="note"
          value={form.note}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          name="date"
          type="date"
          label="Дата"
          value={form.date}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" onClick={handleSubmit}>
          Зберегти витрату
        </Button>
      </Paper>
      {/* Вивід списку витрат */}
      <Paper sx={{ padding: "20px" }}>
        <Typography variant="h6" gutterBottom>
          🧾 Останні витрати
        </Typography>
        {isLoading ? (
          <Typography>Завантаження...</Typography>
        ) : Array.isArray(expenses) ? (
          expenses.length === 0 ? (
            <Typography>Витрати ще не додано</Typography>
          ) : (
            expenses.map((exp, index) => (
              <Box key={index} sx={{ mb: 1 }}>
                <Typography>
                  {new Date(exp.date).toLocaleDateString()} — {exp.category}:{" "}
                  <strong>{exp.amount} zł</strong> | Faktura:{" "}
                  {exp.invoiceNumber ? `#${exp.invoiceNumber}` : "—"}
                  {exp.note && ` (${exp.note})`}
                </Typography>
              </Box>
            ))
          )
        ) : (
          <Typography color="error">
            Неможливо завантажити витрати (невірний формат даних)
          </Typography>
        )}
      </Paper>
    </Box>
  );
};
export default ExpenseManager;
