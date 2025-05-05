import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOfflineOrders } from "../../../../../redux/finance/offlineOrder/operationOfflineOrder";
import {
  selectOfflineOrders,
  selectOfflineOrdersError,
  selectOfflineOrdersLoading,
} from "../../../../../redux/finance/offlineOrder/selectorsOfflineOrder";

const OfflineOrder = () => {
  const dispatch = useDispatch();
  const offlineOrders = useSelector(selectOfflineOrders);
  const loading = useSelector(selectOfflineOrdersLoading);
  const error = useSelector(selectOfflineOrdersError);

  useEffect(() => {
    dispatch(fetchOfflineOrders());
  }, [dispatch]);

  if (loading) return <p>🔄 Завантаження замовлень...</p>;
  if (error) return <p>❌ Помилка: {error}</p>;

  return (
    <div>
      <h2>🏪 Офлайн-замовлення</h2>
      {offlineOrders.map((order) => (
        <div
          key={order._id}
          style={{
            border: "1px solid black",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>Замовлення ID: {order._id}</h3>
          <p>Статус: {order.status}</p>
          <p>Сума: {order.totalPrice} zł</p>
          <p>Метод оплати: {order.paymentMethod}</p>
          <p>Кількість товарів: {order.products.length}</p>
        </div>
      ))}
    </div>
  );
};

export default OfflineOrder;
