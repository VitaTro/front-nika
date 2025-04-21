const StatisticsSection = ({ stats }) => (
  <section>
    <h2>Статистика</h2>
    <p>Загальна кількість користувачів: {stats?.totalUsers}</p>
    <p>Загальна кількість товарів: {stats?.totalProducts}</p>
    <p>Активні користувачі: {stats?.activeUsers}</p>
    <p>Продажі: {stats?.salesCount}</p>
    <p>Чистий прибуток: ${stats?.netProfit}</p>
  </section>
);

export default StatisticsSection;
