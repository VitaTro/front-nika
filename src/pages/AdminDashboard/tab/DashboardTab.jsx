import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import { fetchAdminDashboard } from "../../../redux/admin/operationsAdmin";
import {
  selectAdminDashboard,
  selectAdminError,
  selectAdminLoading,
} from "../../../redux/admin/selectorsAdmin";

const DashboardTab = () => {
  const dispatch = useDispatch();
  const dashboard = useSelector(selectAdminDashboard);
  const loading = useSelector(selectAdminLoading);
  const error = useSelector(selectAdminError);

  useEffect(() => {
    dispatch(fetchAdminDashboard());
  }, [dispatch]);

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {/* Загальна статистика */}
      <section>
        <h2>Статистика</h2>
        <p>Загальна кількість користувачів: {dashboard.stats?.totalUsers}</p>
        <p>Загальна кількість товарів: {dashboard.stats?.totalProducts}</p>
        <p>Активні користувачі: {dashboard.stats?.activeUsers}</p>
        <p>Продажі: {dashboard.stats?.salesCount}</p>
        <p>Чистий прибуток: ${dashboard.stats?.netProfit}</p>
      </section>

      {/* Огляд продуктів */}
      <section>
        <h2>Товари з низькими залишками</h2>
        <ul>
          {dashboard.productsOverview?.lowStockItems.map((item) => (
            <li key={item.name}>
              {item.name} - залишок: {item.stock}
            </li>
          ))}
        </ul>

        <h2>Популярні товари</h2>
        <ul>
          {dashboard.productsOverview?.popularItems.map((item) => (
            <li key={item.name}>
              {item.name} - популярність: {item.popularity}
            </li>
          ))}
        </ul>
      </section>

      {/* Список бажань */}
      <section>
        <h2>Список бажань</h2>
        <ul>
          {dashboard.wishlistOverview?.map((item) => (
            <li key={item.name}>
              {item.name} - кількість: {item.count}
            </li>
          ))}
        </ul>
      </section>

      {/* Фінансова статистика */}
      <section>
        <h2>Фінансовий огляд</h2>
        <h3>Ціни закупівель:</h3>
        <ul>
          {dashboard.financialOverview?.purchasePrices.map((item) => (
            <li key={item.name}>
              {item.name} - ${item.purchasePrice}
            </li>
          ))}
        </ul>
        <h3>Націнка:</h3>
        <ul>
          {dashboard.financialOverview?.markupOverview.map((item) => (
            <li key={item.name}>
              {item.name} - ${item.markup}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default DashboardTab;
