import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOfflineSales } from "../../../../../redux/finance/offlineSale/operationOfflineSale";
import {
  selectOfflineSales,
  selectOfflineSalesError,
  selectOfflineSalesLoading,
} from "../../../../../redux/finance/offlineSale/selectorsOfflineSale";

const OfflineSale = () => {
  const dispatch = useDispatch();
  const offlineSales = useSelector(selectOfflineSales);
  const loading = useSelector(selectOfflineSalesLoading);
  const error = useSelector(selectOfflineSalesError);

  useEffect(() => {
    dispatch(fetchOfflineSales());
  }, [dispatch]);

  if (loading) return <p>🔄 Завантаження продажів...</p>;
  if (error) return <p>❌ Помилка: {error}</p>;

  return (
    <div>
      <h2>🏪 Офлайн-продажі</h2>
      {offlineSales.map((sale) => (
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

export default OfflineSale;
