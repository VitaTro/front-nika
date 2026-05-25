import { Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createReservation } from "../../../../../../redux/finance/reservation/operationReserve";

const ReservationForm = ({ cart, setCart }) => {
  const dispatch = useDispatch();
  const [reservationDate, setReservationDate] = useState("");

  const handleReserve = async () => {
    if (cart.length === 0) {
      alert("⚠️ Кошик порожній!");
      return;
    }
    if (!reservationDate) {
      alert("⚠️ Вкажіть дату до якої резерв!");
      return;
    }

    const reservationData = {
      products: cart.map(({ productId, quantity }) => ({
        productId,
        quantity,
      })),
      reservationExpiresAt: reservationDate,
    };

    const result = await dispatch(createReservation(reservationData));
    if (result?._id) {
      alert("🔐 Товар зарезервовано!");
      setCart([]);
      localStorage.removeItem("cart");
    } else {
      alert("❌ Помилка при створенні резерву!");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "16px" }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", color: "#FF9800" }}>
        {" "}
        🔐 Резервація товару
      </Typography>
      <Typography variant="h6">📅 Дата резерву</Typography>
      <input
        type="date"
        value={reservationDate}
        onChange={(e) => setReservationDate(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "12px" }}
      />

      <button
        onClick={handleReserve}
        style={{
          backgroundColor: "#FF9800",
          color: "white",
          fontSize: "16px",
          padding: "10px 20px",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
          fontWeight: "bold",
          transition: "0.3s",
          marginTop: "12px",
        }}
      >
        🔐 Створити резерв
      </button>
    </div>
  );
};
export default ReservationForm;
