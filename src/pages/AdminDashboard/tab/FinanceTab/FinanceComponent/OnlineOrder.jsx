// src/pages/AdminDashboard/tab/FinanceTab/FinanceComponent/OnlineOrder.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOnlineOrders } from "../../../../../redux/finance/onlineOrder/operationOnlineOrder";
import {
  selectOnlineOrders,
  selectOnlineOrdersError,
  selectOnlineOrdersLoading,
} from "../../../../../redux/finance/onlineOrder/selectorsOnlineOrder";

const OnlineOrder = () => {
  const dispatch = useDispatch();
  const onlineOrders = useSelector(selectOnlineOrders);
  const loading = useSelector(selectOnlineOrdersLoading);
  const error = useSelector(selectOnlineOrdersError);

  useEffect(() => {
    dispatch(fetchOnlineOrders());
  }, [dispatch]);

  if (loading) return <p>🔄 Завантаження замовлень...</p>;
  if (error) return <p>❌ Помилка: {error}</p>;

  return (
    <div>
      <h2>📦 Онлайн-замовлення</h2>
      {onlineOrders.map((order) => (
        <div
          key={order._id}
          style={{
            border: "1px solid black",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>Замовлення ID: {order.orderId}</h3>
          <p>Статус: {order.status}</p>
          <p>Сума: {order.totalPrice} zł</p>
          <p>Метод оплати: {order.paymentMethod}</p>
          <p>Кількість товарів: {order.products.length}</p>
        </div>
      ))}
    </div>
  );
};

export default OnlineOrder;
