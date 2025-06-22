import {
  Box,
  Button,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
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

const ExpenseManager = () => {
  const dispatch = useDispatch();
  const expenses = useSelector(selectExpenses);
  const isLoading = useSelector(selectExpensesLoading);
  const isMobile = useMediaQuery("(max-width: 768px)");

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
    <Box sx={{ px: isMobile ? 1 : 3, pb: 4 }}>
      <Paper sx={{ p: isMobile ? 2 : 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          ➕ Додати витрату
        </Typography>
        <Stack spacing={2}>
          <TextField
            select
            fullWidth
            label="Категорія"
            name="category"
            value={form.category}
            onChange={handleChange}
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
            label="Сума (zł)"
            name="amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
          />
          <TextField
            label="Номер фактури (опціонально)"
            name="invoiceNumber"
            value={form.invoiceNumber}
            onChange={handleChange}
          />
          <TextField
            label="Коментар"
            name="note"
            value={form.note}
            onChange={handleChange}
          />
          <TextField
            name="date"
            type="date"
            label="Дата"
            value={form.date}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
          <Button
            variant="contained"
            onClick={handleSubmit}
            fullWidth={isMobile}
          >
            Зберегти витрату
          </Button>
        </Stack>
      </Paper>

      <Paper sx={{ p: isMobile ? 2 : 3 }}>
        <Typography variant="h6" gutterBottom>
          🧾 Останні витрати
        </Typography>
        {isLoading ? (
          <Typography>Завантаження...</Typography>
        ) : Array.isArray(expenses) && expenses.length > 0 ? (
          <Stack spacing={1}>
            {expenses.map((exp, index) => (
              <Box key={index} sx={{ borderBottom: "1px solid #eee", pb: 1 }}>
                <Typography fontSize={14}>
                  {new Date(exp.date).toLocaleDateString()} —{" "}
                  <strong>{exp.category}</strong>: {exp.amount} zł
                </Typography>
                {exp.invoiceNumber && (
                  <Typography fontSize={13}>
                    🧾 Фактура: #{exp.invoiceNumber}
                  </Typography>
                )}
                {exp.note && (
                  <Typography fontSize={13} color="text.secondary">
                    💬 {exp.note}
                  </Typography>
                )}
              </Box>
            ))}
          </Stack>
        ) : (
          <Typography>Витрати ще не додано</Typography>
        )}
      </Paper>
    </Box>
  );
};

export default ExpenseManager;
