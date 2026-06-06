import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateOnlineOrder } from "../../../../../../redux/finance/onlineOrder/operationOnlineOrder";

const OnlineOrderForm = ({ order }) => {
  const dispatch = useDispatch();

  // локальний стейт
  const [buyerType, setBuyerType] = useState(order.buyerType || "person");

  const [form, setForm] = useState({
    buyerName: order.buyerName || "",
    buyerPhone: order.buyerPhone || "",
    buyerEmail: order.buyerEmail || "",
    companyName: order.companyName || "",
    companyAddress: order.companyAddress || "",
    companyNip: order.companyNip || "",
  });

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const saveChanges = () => {
    dispatch(
      updateOnlineOrder({
        orderId: order._id,
        data: {
          buyerType,
          ...form,
        },
      }),
    );
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        👤 Дані покупця
      </Typography>

      {/* Тип покупця */}
      <TextField
        select
        fullWidth
        label="Тип покупця"
        value={buyerType}
        onChange={(e) => setBuyerType(e.target.value)}
        sx={{ mb: 2 }}
      >
        <MenuItem value="person">Фізична особа</MenuItem>
        <MenuItem value="company">Компанія</MenuItem>
      </TextField>

      {/* Фізична особа */}
      {buyerType === "person" && (
        <>
          <TextField
            fullWidth
            label="Ім’я та прізвище"
            value={form.buyerName}
            onChange={handleChange("buyerName")}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Телефон"
            value={form.buyerPhone}
            onChange={handleChange("buyerPhone")}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Email"
            value={form.buyerEmail}
            onChange={handleChange("buyerEmail")}
            sx={{ mb: 2 }}
          />

          {order.deliveryAddress && (
            <TextField
              fullWidth
              label="Адреса доставки"
              value={
                order.deliveryAddress
                  ? `${order.deliveryAddress.street} ${order.deliveryAddress.houseNumber}, ${order.deliveryAddress.city} ${order.deliveryAddress.postalCode}`
                  : ""
              }
              InputProps={{ readOnly: true }}
              sx={{ mb: 2 }}
            />
          )}
        </>
      )}

      {/* Компанія */}
      {buyerType === "company" && (
        <>
          <TextField
            fullWidth
            label="Назва компанії"
            value={form.companyName}
            onChange={handleChange("companyName")}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Адреса компанії"
            value={form.companyAddress}
            onChange={handleChange("companyAddress")}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="NIP"
            value={form.companyNip}
            onChange={handleChange("companyNip")}
            sx={{ mb: 2 }}
          />
        </>
      )}

      {/* Оплата */}
      <Typography variant="h6" sx={{ mt: 3 }}>
        💳 Оплата
      </Typography>

      <Typography sx={{ fontSize: "18px", mt: 1 }}>
        Статус оплати:{" "}
        <strong>
          {order.paymentStatus === "paid" ? "Оплачено" : "Не оплачено"}
        </strong>
      </Typography>

      <Typography sx={{ color: "#888", fontStyle: "italic" }}>
        (Метод оплати: Tpay — автоматично)
      </Typography>

      {/* Кнопка збереження */}
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
        onClick={saveChanges}
      >
        💾 Зберегти зміни
      </Button>
    </Box>
  );
};

export default OnlineOrderForm;
