import {
  Alert,
  Box,
  Button,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { uploadBulkMovements } from "../../../../../../redux/inventory/bulkUpload/operationsBulkUpload";

const PurchaseOrderForm = ({ cart, setCart }) => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width:768px)");
  const [meta, setMeta] = useState({
    note: "",
    date: new Date().toISOString().split("T")[0],
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    setMeta({ ...meta, [e.target.name]: e.target.value });
  };

  const updateItem = (productId, updates) => {
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, ...updates } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
  };

  const handleSubmit = () => {
    if (cart.length === 0) {
      setErrorMsg("🚨 Кошик порожній! Додайте товари.");
      return;
    }

    const movements = cart.map((item) => ({
      productName: item.productName,
      productIndex: item.productIndex,
      type: "purchase",
      quantity: Number(item.quantity),
      unitPurchasePrice: Number(item.unitPurchasePrice),
      price: Number(item.price),
      note: meta.note || "",
      date: new Date(meta.date).toISOString(),
    }));

    const requiredFields = [
      "productName",
      "productIndex",
      "type",
      "quantity",
      "unitPurchasePrice",
      "price",
    ];
    const hasInvalid = movements.some((m) =>
      requiredFields.some((f) => m[f] === undefined || m[f] === "")
    );

    if (hasInvalid) {
      setErrorMsg("⚠️ Деякі товари мають незаповнені поля.");
      return;
    }

    dispatch(uploadBulkMovements(movements));
    setCart([]);
    setSuccessMsg("✅ Прихід успішно оформлено!");
  };

  return (
    <Box sx={{ mt: 4, mb: 6 }}>
      <Paper
        elevation={3}
        sx={{
          p: isMobile ? 2 : 4,
          borderRadius: 3,
          mx: "auto",
        }}
      >
        <Stack spacing={4}>
          <Typography variant="h5">🧾 Оформлення приходу</Typography>
          <Stack spacing={2}>
            <TextField
              label="Номер накладної / примітка"
              name="note"
              value={meta.note}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Дата приходу"
              name="date"
              type="date"
              value={meta.date}
              onChange={handleChange}
              fullWidth
            />
            <Button variant="contained" color="success" onClick={handleSubmit}>
              📤 Оформити
            </Button>
          </Stack>
        </Stack>
      </Paper>

      <Snackbar
        open={!!errorMsg}
        autoHideDuration={4000}
        onClose={() => setErrorMsg("")}
      >
        <Alert severity="error" onClose={() => setErrorMsg("")}>
          {errorMsg}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!successMsg}
        autoHideDuration={3000}
        onClose={() => setSuccessMsg("")}
      >
        <Alert severity="success" onClose={() => setSuccessMsg("")}>
          {successMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PurchaseOrderForm;
