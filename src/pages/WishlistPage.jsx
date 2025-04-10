import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const WishlistPage = () => {
  const dispatch = useDispatch();
  const { wishlist, isLoading, error } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(geWishlist());
  }, [dispatch]);

  if (isLoading) return <p>Loading wishlist...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>{t("wishlist")}</h1>
      <ul>
        {wishlist.map((product) => (
          <li key={product._id}>
            <span>{product.name}</span>
            <button onClick={() => dispatch(removeFromWishlist(product))}>
              ❌ {t("remove")}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default WishlistPage;
