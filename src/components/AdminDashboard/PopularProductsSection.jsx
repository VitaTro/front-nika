// Components/PopularProductsSection.js
const PopularProductsSection = ({ popularItems }) => (
  <section>
    <h2>Популярні товари</h2>
    <ul>
      {popularItems?.map((item) => (
        <li key={item.name}>
          {item.name} - популярність: {item.popularity}
        </li>
      ))}
    </ul>
  </section>
);

export default PopularProductsSection;
