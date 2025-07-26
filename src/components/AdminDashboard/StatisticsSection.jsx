const StatisticsSection = ({ stats }) => (
  <section>
    <h2>Статистика</h2>
    <p>Загальна кількість користувачів: {stats?.totalUsers}</p>
    <p>Загальна кількість товарів: {stats?.totalProducts}</p>
  </section>
);

export default StatisticsSection;
