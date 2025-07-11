import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { uploadBulkMovements } from "../../../../../../redux/inventory/bulkUpload/operationsBulkUpload";
const PurchaseOrderForm = ({ cart, setCart, products }) => {
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
      productName: item.productName,
      productIndex: item.productIndex,
      type: "purchase",
      quantity: Number(item.quantity),
      unitPurchasePrice: Number(item.unitPurchasePrice),
      price: Number(item.price),
      note: meta.note || "",
      date: new Date(meta.date).toISOString(),
    }));

    // ✅ Тепер movements існує!
    const requiredFields = [
      "productName",
      "productIndex",
      "type",
      "quantity",
      "unitPurchasePrice",
      "price",
    ];
    const hasInvalid = movements.some((m) =>
      requiredFields.some((field) => m[field] === undefined || m[field] === "")
    );

    if (hasInvalid) {
      console.warn("🚨 Деякі поля відсутні в рухах!");
      console.table(movements);
      alert("⚠️ Помилка: деякі товари мають незаповнені поля.");
      return;
    }

    console.log("📦 movements:", movements);
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
