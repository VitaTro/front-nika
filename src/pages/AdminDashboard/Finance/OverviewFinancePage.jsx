import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import { fetchFinanceOverview } from "../../../redux/finance/overview/operationOverview";
import {
  selectFinanceError,
  selectFinanceLoading,
  selectFinanceOverview,
} from "../../../redux/finance/overview/selectorsOverview";

const OverviewFinancePage = () => {
  const dispatch = useDispatch();
  const overview = useSelector(selectFinanceOverview);
  const loading = useSelector(selectFinanceLoading);
  const error = useSelector(selectFinanceError);
  useEffect(() => {
    dispatch(fetchFinanceOverview());
  }, [dispatch]);

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;
  return (
    <div>
      <h1>Фінансовий огляд</h1>
      {overview && (
        <>
          <h2>Статистика</h2>
          <p>Загальні користувачі: {overview.stats.totalUsers}</p>
          <p>Продукти: {overview.stats.totalProducts}</p>
          <p>Замовлення: {overview.stats.totalOrders}</p>
          <p>Продажі: {overview.stats.totalSales}</p>

          <h2>Огляд продуктів</h2>
          <ul>
            {overview.productsOverview.lowStockItems.map((item) => (
              <li key={`${item.index}-${item.name}`}>
                {item.name} - Низький залишок: {item.stock}
              </li>
            ))}
          </ul>

          <h2>Продажі</h2>
          <p>Загальні продажі: {overview.salesOverview.salesCount} zł</p>
          <p>Чистий прибуток: {overview.salesOverview.netProfit} zł</p>

          <h2>Замовлення</h2>
          <ul>
            {overview.ordersOverview.map((order) => (
              <li key={order.orderId}>
                ID: {order.orderId}, Статус: {order.status}, Сума:{" "}
                {order.totalPrice} zł
              </li>
            ))}
          </ul>

          <h2>Wishlist</h2>
          <ul>
            {overview.wishlistOverview.map((item) => (
              <li key={`${item.index}-${item.name}`}>
                {item.name} - Кількість: {item.count}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default OverviewFinancePage;
