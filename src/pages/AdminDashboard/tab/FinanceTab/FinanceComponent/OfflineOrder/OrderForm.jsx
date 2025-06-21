import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../../../../../redux/axiosConfig";
import { createOfflineOrder } from "../../../../../../redux/finance/offlineOrder/operationOfflineOrder";

const OrderForm = ({ cart, setCart }) => {
  const dispatch = useDispatch();
  const orderState = useSelector((state) => state.offlineOrders);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("BLIK");
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
    if (!orderState.loading && orderState.offlineOrders.length > 0) {
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

  const handleOrder = () => {
    if (cart.length === 0) {
      alert("⚠️ Кошик порожній! Додайте товари перед оформленням.");
      return;
    }

    const orderData = {
      products: cart.map(({ productId, name, price, quantity, photoUrl }) => ({
        productId,
        name,
        price,
        quantity,
        photoUrl,
      })),
      totalPrice: cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      ),
      paymentMethod: selectedPaymentMethod,
      status: "pending",
      // notes: "-",
      buyerType,
      ...(buyerType === "przedsiębiorca" && {
        buyerName: buyerInfo.buyerName,
        buyerAddress: buyerInfo.buyerAddress,
        buyerNIP: buyerInfo.buyerNIP,
      }),
    };
    dispatch(createOfflineOrder(orderData));
    setCart([]);
    localStorage.removeItem("cart");
  };
  // try {
  //   const response = await axios.post(
  //     "/api/admin/finance/offline/orders",
  //     orderData
  //   );
  //   console.log("✅ Замовлення успішно оформлене!", response.data);

  //   const orderId = response.data?.order?._id;
  //   помилки;
  //   if (!orderId) {
  //     throw new Error("❌ Не вдалося отримати `orderId`!");
  //   }

  // 🔥 Оновлюємо статус замовлення
  //     await updateOrderStatus(orderId);

  //     setCart([]);
  //     localStorage.removeItem("cart");
  //   } catch (error) {
  //     console.error("🔥 Помилка при оформленні замовлення:", error);
  //     alert("❌ Сервер не прийняв запит. Перевір структуру даних.");
  //   }
  // };

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
        <option value="BLIK">BLIK</option>
        <option value="bank_transfer">Банківський переказ</option>
      </select>
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
