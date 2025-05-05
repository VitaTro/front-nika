// import { useEffect, useState } from "react";
// import axios from "../../../../../redux/axiosConfig"; // 👈 Налаштований axios

// const OnlineSale = () => {
//   const [sales, setSales] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     console.log("🌍 Fetching sales directly from API...");
//     axios
//       .get("/api/admin/finance/online/sales") // 👈 Отримуємо дані напряму
//       .then((response) => {
//         console.log("✅ API Response:", response.data);
//         setSales(response.data); // 🔹 Записуємо продажі в `state`
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("❌ API Fetch Error:", error);
//         setError("Не вдалося завантажити продажі");
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <p>🔄 Завантаження продажів...</p>;
//   if (error) return <p>❌ {error}</p>;

//   return (
//     <div>
//       <h2>💰 Онлайн-продажі</h2>
//       {sales.map((sale) => (
//         <div
//           key={sale._id}
//           style={{
//             border: "1px solid black",
//             padding: "10px",
//             marginBottom: "10px",
//           }}
//         >
//           <h3>Продаж ID: {sale._id}</h3>
//           <p>Статус: {sale.status}</p>
//           <p>Сума: {sale.totalAmount} zł</p>
//           <p>Метод оплати: {sale.paymentMethod}</p>
//           <p>Кількість товарів: {sale.products.length}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default OnlineSale;
// src/pages/AdminDashboard/tab/FinanceTab/FinanceComponent/OnlineSale.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOnlineSales } from "../../../../../redux/finance/onlineSale/operationOnlineSale";
import {
  selectOnlineSales,
  selectOnlineSalesError,
  selectOnlineSalesLoading,
} from "../../../../../redux/finance/onlineSale/selectorsOnlineSale";

const OnlineSale = () => {
  const dispatch = useDispatch();
  const onlineSales = useSelector(selectOnlineSales);
  const loading = useSelector(selectOnlineSalesLoading);
  const error = useSelector(selectOnlineSalesError);

  useEffect(() => {
    dispatch(fetchOnlineSales());
  }, [dispatch]);

  if (loading) return <p>🔄 Завантаження продажів...</p>;
  if (error) return <p>❌ Помилка: {error}</p>;

  return (
    <div>
      <h2>💰 Онлайн-продажі</h2>
      {onlineSales.map((sale) => (
        <div
          key={sale._id}
          style={{
            border: "1px solid black",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>Продаж ID: {sale._id}</h3>
          <p>Статус: {sale.status}</p>
          <p>Сума: {sale.totalAmount} zł</p>
          <p>Метод оплати: {sale.paymentMethod}</p>
          <p>Кількість товарів: {sale.products.length}</p>
        </div>
      ))}
    </div>
  );
};

export default OnlineSale;
