import CheckIcon from "@mui/icons-material/Check";
import {
  Box,
  Button,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  createPlatformOrder,
  createPlatformSale,
} from "../../../../../../redux/finance/platform/operationPlatform";

import {
  selectPlatformErrorOrders,
  selectPlatformLoadingOrders,
  selectPlatformOrders,
} from "../../../../../../redux/finance/platform/selectorsPlatform";

const PlatformOrderForm = ({ platformCart, setPlatformCart }) => {
  const dispatch = useDispatch();
  const orders = useSelector(selectPlatformOrders);
  const loading = useSelector(selectPlatformLoadingOrders);
  const error = useSelector(selectPlatformErrorOrders);
  const [comment, setComment] = useState("");
  const [platformName, setPlatformName] = useState("Allegro");
  const [orderNumber, setOrderNumber] = useState("");
  const [saleDate, setSaleDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("payu");
  const [buyerType, setBuyerType] = useState("anonim");

  const [buyerInfo, setBuyerInfo] = useState({
    buyerName: "",
    buyerFirstName: "",
    buyerLastName: "",
    buyerAddress: "",
    buyerPhone: "",
    buyerNIP: "",
    clientNumber: "",
    allegroClientId: "",
  });

  const calculateTotal = (platformCart) =>
    platformCart.reduce((sum, item) => {
      const price = Number(item.price);
      return sum + (isNaN(price) ? 0 : price * (item.quantity || 0));
    }, 0);

  const handleOrder = async () => {
    if (!Array.isArray(platformCart) || platformCart.length === 0) {
      return alert("⚠️ Кошик порожній або не ініціалізований");
    }

    const clientFilled =
      buyerInfo.buyerFirstName.trim() && buyerInfo.buyerLastName.trim();

    const client = clientFilled
      ? {
          firstName: buyerInfo.buyerFirstName.trim(),
          lastName: buyerInfo.buyerLastName.trim(),
          phone: buyerInfo?.buyerPhone || "",
          allegroClientId: buyerInfo?.allegroClientId || "",
        }
      : null;
    if (
      platformName.toLowerCase() === "allegro" &&
      (!client || !client.firstName || !client.lastName)
    ) {
      alert("⚠️ Введіть ім’я та прізвище клієнта");
      return;
    }

    const payload = {
      platform: platformName.toLowerCase(),
      externalOrderId: orderNumber,
      products: platformCart.map(
        ({ productId, quantity, price, name, color, index, manualPrice }) => ({
          productId,
          quantity: Number(quantity ?? 1),
          price: Number(price ?? 0),
          name,
          color,
          index,
          manualPrice: !!manualPrice,
        })
      ),
      totalPrice: calculateTotal(platformCart),
      paymentMethod: selectedPaymentMethod,
      platformFee: 0,
      notes: comment,
      client,
    };
    try {
      const response = await dispatch(createPlatformOrder(payload));
      console.log("📦 Відповідь на створення замовлення:", response);

      const createdOrder = response?.payload;
      if (!createdOrder?._id) {
        alert("❌ Створення замовлення без ID!");
        return;
      }

      alert("✅ Замовлення створено!");
      if (response.meta?.requestStatus !== "fulfilled") {
        alert("❌ Замовлення не вдалося");
        return;
      }
      await new Promise((r) => setTimeout(r, 500));
      await dispatch(
        createPlatformSale({ orderId: createdOrder._id, saleDate })
      );
      alert("💸 Продаж проведено!");
      setPlatformCart([]);
      localStorage.removeItem("platformCart");
    } catch (err) {
      alert("❌ Не вдалося завершити оформлення або продаж");
      console.error("🔥 Помилка:", err);
    }
  };

  return (
    <Box sx={{ p: 2, maxWidth: 700, mx: "auto" }}>
      <Typography variant="h5" gutterBottom>
        🛒 Замовлення з платформи
      </Typography>
      <Stack spacing={3}>
        <Box>
          <Typography variant="subtitle1">🌐 Платформа</Typography>
          <Select
            fullWidth
            value={platformName}
            onChange={(e) => setPlatformName(e.target.value)}
          >
            <MenuItem value="Allegro">Allegro</MenuItem>
            <MenuItem value="Facebook">Facebook</MenuItem>
            <MenuItem value="Instagram">Instagram</MenuItem>
          </Select>
        </Box>

        <TextField
          fullWidth
          label="Номер замовлення"
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
        />
        <TextField
          fullWidth
          multiline
          rows={2}
          label="Коментар"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        {platformName === "Allegro" && (
          <Box>
            <Typography variant="subtitle1">📇 Дані Allegro-клієнта</Typography>
            <Stack spacing={2}>
              <TextField
                label="Ім’я"
                value={buyerInfo.buyerFirstName}
                onChange={(e) =>
                  setBuyerInfo({ ...buyerInfo, buyerFirstName: e.target.value })
                }
              />
              <TextField
                label="Прізвище"
                value={buyerInfo.buyerLastName}
                onChange={(e) =>
                  setBuyerInfo({ ...buyerInfo, buyerLastName: e.target.value })
                }
              />
              <TextField
                label="Телефон"
                value={buyerInfo.buyerPhone}
                onChange={(e) =>
                  setBuyerInfo({ ...buyerInfo, buyerPhone: e.target.value })
                }
              />
              <TextField
                label="Allegro ID"
                value={buyerInfo.allegroClientId}
                onChange={(e) =>
                  setBuyerInfo({
                    ...buyerInfo,
                    allegroClientId: e.target.value,
                  })
                }
              />
            </Stack>
          </Box>
        )}
        <Box>
          <Typography variant="subtitle1">💰 Спосіб оплати</Typography>
          <Select
            fullWidth
            value={selectedPaymentMethod}
            onChange={(e) => setSelectedPaymentMethod(e.target.value)}
          >
            <MenuItem value="payu">PayU</MenuItem>
            <MenuItem value="blik">BLIK</MenuItem>
            <MenuItem value="bank_transfer">Банківський переказ</MenuItem>
            <MenuItem value="credit_card">Кредитна картка</MenuItem>
            <MenuItem value="installment">Оплата частинами</MenuItem>
            <MenuItem value="allegro_balance">Баланс Allegro</MenuItem>
            <MenuItem value="terminal">Термінал</MenuItem>
            <MenuItem value="other">Інше</MenuItem>
          </Select>
          {selectedPaymentMethod === "terminal" && (
            <Typography sx={{ fontStyle: "italic", mt: 1 }}>
              ⚠️ Чек видається автоматично. Не генерується фактура.
            </Typography>
          )}
        </Box>
        <Box>
          <Typography variant="subtitle1">👤 Тип покупця</Typography>
          <Select
            fullWidth
            value={buyerType}
            onChange={(e) => setBuyerType(e.target.value)}
          >
            <MenuItem value="anonim">Анонім</MenuItem>
            <MenuItem value="registered">Клієнт</MenuItem>
            <MenuItem value="przedsiębiorca">Підприємець</MenuItem>
          </Select>

          <Stack spacing={2} mt={2}>
            {buyerType === "registered" && (
              <>
                <TextField
                  label="Ім’я"
                  value={buyerInfo.buyerName}
                  onChange={(e) =>
                    setBuyerInfo({ ...buyerInfo, buyerName: e.target.value })
                  }
                />
                <TextField
                  label="Адреса"
                  value={buyerInfo.buyerAddress}
                  onChange={(e) =>
                    setBuyerInfo({ ...buyerInfo, buyerAddress: e.target.value })
                  }
                />
                <TextField
                  label="Номер клієнта"
                  value={buyerInfo.clientNumber}
                  onChange={(e) =>
                    setBuyerInfo({ ...buyerInfo, clientNumber: e.target.value })
                  }
                />
              </>
            )}
            {buyerType === "przedsiębiorca" && (
              <>
                <TextField
                  label="Назва підприємця"
                  value={buyerInfo.buyerName}
                  onChange={(e) =>
                    setBuyerInfo({ ...buyerInfo, buyerName: e.target.value })
                  }
                />
                <TextField
                  label="Адреса"
                  value={buyerInfo.buyerAddress}
                  onChange={(e) =>
                    setBuyerInfo({ ...buyerInfo, buyerAddress: e.target.value })
                  }
                />
                <TextField
                  label="NIP"
                  value={buyerInfo.buyerNIP}
                  onChange={(e) =>
                    setBuyerInfo({ ...buyerInfo, buyerNIP: e.target.value })
                  }
                />
              </>
            )}
          </Stack>
        </Box>
        <TextField
          label="Дата продажу"
          type="date"
          fullWidth
          value={saleDate}
          onChange={(e) => setSaleDate(e.target.value)}
        />
        <Button
          variant="contained"
          color="success"
          size="large"
          startIcon={<CheckIcon />}
          onClick={handleOrder}
        >
          Оформити замовлення
        </Button>
      </Stack>
    </Box>
  );
};

export default PlatformOrderForm;
