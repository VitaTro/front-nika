import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../../../../../redux/axiosConfig";
import { createOfflineSale } from "../../../../../../redux/finance/offlineSale/operationOfflineSale";

const OrderForm = ({ cart, setCart }) => {
  const dispatch = useDispatch();
  const orderState = useSelector((state) => state.offlineOrders);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("terminal");
  const [saleDate, setSaleDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [buyerType, setBuyerType] = useState("anonim");
  const [buyerInfo, setBuyerInfo] = useState({
    buyerName: "",
    buyerAddress: "",
    buyerNIP: "",
  });

  useEffect(() => {
    if (orderState.error) {
      alert("❌ Помилка створення замовлення: " + orderState.error);
    }
    if (
      !orderState.loading &&
      orderState.offlineOrders.length > 0 &&
      orderState.success
    ) {
      const lastOrder = orderState.offlineOrders.slice(-1)[0];
      if (lastOrder?._id) {
        dispatch(
          createOfflineSale({
            orderId: lastOrder._id,
            saleDate,
          })
        );
      }
      alert("✅ Замовлення створено!");
    }
  }, [orderState]);

  // ✅ Переносимо `updateOrderStatus` перед `handleOrder`
  const updateOrderStatus = async (orderId) => {
    try {
      const response = await axios.patch(
        `/api/admin/finance/offline/orders/${orderId}`,
        {
          status: "completed",
        }
      );

      console.log("✅ Статус замовлення оновлено!", response.data);
      alert("✅ Замовлення підтверджено як 'completed'!");
    } catch (error) {
      console.error("🔥 Помилка при оновленні статусу:", error);
      alert("❌ Не вдалося оновити статус замовлення.");
    }
  };

  const handleOrder = async () => {
    if (cart.length === 0) {
      alert("⚠️ Кошик порожній! Додайте товари перед оформленням.");
      return;
    }

    const orderData = {
      products: cart.map(
        ({ productId, name, price, quantity, photoUrl, index }) => ({
          productId,
          name,
          price,
          quantity,
          photoUrl,
          saleDate,
          index,
        })
      ),
      totalPrice: cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      ),
      paymentMethod: selectedPaymentMethod,
      status: "pending",
      buyerType,
      ...(buyerType === "przedsiębiorca" && {
        buyerName: buyerInfo.buyerName,
        buyerAddress: buyerInfo.buyerAddress,
        buyerNIP: buyerInfo.buyerNIP,
      }),
    };

    try {
      // 1️⃣ Створення замовлення
      const response = await axios.post(
        "/api/admin/finance/offline/orders",
        orderData
      );
      console.log("📦 Order Response:", response.data);
      const createdOrder = response.data.order;

      if (!createdOrder?._id) {
        alert("❌ Створення замовлення без ID!");
        return;
      }

      alert("✅ Замовлення створено!");

      // 2️⃣ Продаж
      await axios.post("/api/admin/finance/offline/sales", {
        orderId: createdOrder._id,
        saleDate,
      });
      alert("✅ Продаж завершено!");

      // 3️⃣ Оновлення статусу
      await updateOrderStatus(createdOrder._id);

      // 4️⃣ Очищення інтерфейсу
      setCart([]);
      localStorage.removeItem("cart");
    } catch (error) {
      console.error("🔥 Щось пішло не так:", error);
      alert("❌ Помилка під час обробки замовлення!");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "16px" }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1976D2" }}>
        💰 Спосіб оплати
      </Typography>
      <select
        value={selectedPaymentMethod}
        onChange={(e) => setSelectedPaymentMethod(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "16px",
          borderRadius: "5px",
          border: "2px solid #1976D2",
          cursor: "pointer",
          marginBottom: "12px",
        }}
      >
        <option value="terminal">Термінал</option>
        <option value="BLIK">BLIK</option>
        <option value="bank_transfer">Банківський переказ</option>
      </select>
      {selectedPaymentMethod === "terminal" && (
        <Typography
          sx={{ color: "#757575", fontStyle: "italic", marginBottom: "8px" }}
        >
          ⚠️ При оплаті через термінал фактура не генерується — чек видається
          автоматично.
        </Typography>
      )}

      <Typography variant="h6">🧾 Тип покупця</Typography>
      <select
        value={buyerType}
        onChange={(e) => setBuyerType(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "16px",
          borderRadius: "5px",
          border: "2px solid #1976D2",
          cursor: "pointer",
          marginBottom: "12px",
        }}
      >
        <option value="anonim">Анонім</option>
        <option value="przedsiębiorca">Підприємець</option>
      </select>
      {buyerType === "przedsiębiorca" && (
        <div style={{ marginTop: "12px" }}>
          <input
            type="text"
            placeholder="Назва підприємця"
            value={buyerInfo.buyerName}
            onChange={(e) =>
              setBuyerInfo({ ...buyerInfo, buyerName: e.target.value })
            }
            style={{ marginBottom: "8px", width: "100%", padding: "8px" }}
          />
          <input
            type="text"
            placeholder="Адреса"
            value={buyerInfo.buyerAddress}
            onChange={(e) =>
              setBuyerInfo({ ...buyerInfo, buyerAddress: e.target.value })
            }
            style={{ marginBottom: "8px", width: "100%", padding: "8px" }}
          />
          <input
            type="text"
            placeholder="NIP"
            value={buyerInfo.buyerNIP}
            onChange={(e) =>
              setBuyerInfo({ ...buyerInfo, buyerNIP: e.target.value })
            }
            style={{ marginBottom: "12px", width: "100%", padding: "8px" }}
          />
        </div>
      )}
      <Typography variant="h6">📅 Дата продажу</Typography>
      <input
        type="date"
        value={saleDate}
        onChange={(e) => setSaleDate(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "12px" }}
      />

      <button
        onClick={handleOrder}
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          fontSize: "16px",
          padding: "10px 20px",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
          fontWeight: "bold",
          transition: "0.3s",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#45A049")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
      >
        ✅ Оформити замовлення
      </button>
    </div>
  );
};

export default OrderForm;
