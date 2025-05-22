import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { fetchUserMain } from "../../redux/user/userOperations";
import { selectWishlistProducts } from "../../redux/wishlist/selectorsWishlist";
import ProductsPage from "../ProductsPage/ProductsPage";

const MainPage = () => {
  const dispatch = useDispatch();

  const wishlist = useSelector(selectWishlistProducts);
  const loading = useSelector((state) => state?.user?.loading || false);
  const error = useSelector((state) => state?.user?.error || null);

  useEffect(() => {
    dispatch(fetchUserMain());
  }, [dispatch]);

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      {/* <Header /> */}
      {/* // <ImageWork src={HoursOfWork} alt="hours of work" /> */}
      <ProductsPage />
    </>
  );
};

export default MainPage;
