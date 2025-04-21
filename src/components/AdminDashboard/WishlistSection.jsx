const WishlistSection = ({ wishlist }) => (
  <section>
    <h2>Список бажань</h2>
    <ul>
      {wishlist?.map((item) => (
        <li key={item.name}>
          {item.name} - кількість: {item.count}
        </li>
      ))}
    </ul>
  </section>
);

export default WishlistSection;
