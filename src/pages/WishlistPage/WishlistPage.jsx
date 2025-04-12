import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";
import Loader from "../../components/Loader";
import ProductsCard from "../../components/ProductsCard/ProductsCard"; // Картка продукту
// import {
//   getWishlist,
//   removeProductFromWishlist,
// } from "../../redux/wishlist/operationWishlist";
// import {
//   selectWishlistError,
//   selectWishlistLoading,
//   selectWishlistProducts,
// } from "../../redux/wishlist/selectorsWishlist";

const WishlistPage = ({ t }) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 5;
  // const wishlist = useSelector(selectWishlistProducts);
  // const isLoading = useSelector(selectWishlistLoading);
  // const error = useSelector(selectWishlistError);

  // useEffect(() => {
  //   dispatch(getWishlist());
  // }, [dispatch]);
  const isLoading = false; // Тимчасова заглушка
  const error = null; // Тимчасова заглушка

  // Заглушка для списку бажаних продуктів:
  const wishlist = []; // Тимчасова заглушка (порожній масив)

  if (isLoading) return <Loader />;
  if (error)
    return (
      <p>
        {t("error")}: {error}
      </p>
    );
  if (!wishlist.length && !isLoading) {
    return (
      <div>
        {/* <img src={sadFace} alt="No items" /> */}
        <p>{t("no_items_in_wishlist")}</p>
      </div>
    );
  }

  const displayProducts = wishlist
    .slice(currentPage * productsPerPage, (currentPage + 1) * productsPerPage)
    .map((product) => (
      <li key={product.id}>
        <ProductsCard product={product} isAuthenticated={true} t={t} />
        <button onClick={() => dispatch(removeProductFromWishlist(product.id))}>
          ❌ {t("remove")}
        </button>
      </li>
    ));

  const pageCount = Math.ceil(wishlist.length / productsPerPage);
  return (
    <div>
      <h1>{t("wishlist")}</h1>
      <ul>{displayProducts}</ul>
      {wishlist.length > productsPerPage && (
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          pageCount={pageCount}
          onPageChange={({ selected }) => setCurrentPage(selected)}
        />
      )}
    </div>
  );
};

export default WishlistPage;
