const FinancialOverviewSection = ({ financialOverview }) => (
  <section>
    <h2>Фінансовий огляд</h2>
    <h3>Ціни закупівель:</h3>
    <ul>
      {financialOverview?.purchasePrices.map((item) => (
        <li key={item.name}>
          {item.name} - ${item.purchasePrice}
        </li>
      ))}
    </ul>
    <h3>Націнка:</h3>
    <ul>
      {financialOverview?.markupOverview.map((item) => (
        <li key={item.name}>
          {item.name} - ${item.markup}
        </li>
      ))}
    </ul>
  </section>
);

export default FinancialOverviewSection;
