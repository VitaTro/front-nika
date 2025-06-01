import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../components/Loader";
import NoResults from "../../components/NoResults/NoResults";
import PaginationComponent from "../../components/PaginationComponent/PaginationComponent";
import ZoomableProductImage from "../../components/ZoomableProductImage";
import { getShoppingCart } from "../../redux/shopping/operationShopping";
import {
  getWishlist,
  moveProductToShoppingCart,
  removeProductFromWishlist,
} from "../../redux/wishlist/operationWishlist";
import {
  selectWishlistError,
  selectWishlistLoading,
  selectWishlistProducts,
} from "../../redux/wishlist/selectorsWishlist";
import { WelcomeGeneral } from "../ProductsPage/ProductsPage.styled";
import {
  AddToCartButton,
  AllButton,
  ProductName,
  ProductPrice,
  RemoveButton,
  WishlistItem,
} from "./WishlistPage.styled";

const WishlistPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 18;
  const wishlist = useSelector(selectWishlistProducts);
  const isLoading = useSelector(selectWishlistLoading);
  const error = useSelector(selectWishlistError);

  useEffect(() => {
    dispatch(getWishlist());
  }, [dispatch]);

  // Оновлення списку після видалення
  const handleRemove = (_id) => {
    dispatch(removeProductFromWishlist(_id)).then(() => {
      dispatch(getWishlist());
    });
  };

  const handleMoveToCart = async (id) => {
    try {
      const response = await dispatch(moveProductToShoppingCart(id)).unwrap();
      console.log("✅ Product successfully moved!", response);

      // 🎉 Відображаємо повідомлення
      toast.success(t("productAdded"), {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // 🔄 Оновлюємо кошик і вішліст
      dispatch(getShoppingCart());
      dispatch(getWishlist());
    } catch (error) {
      console.error("❌ Error moving product to cart:", error);
      toast.error(t("errorMessage"), {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentWishlist = wishlist.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(wishlist.length / productsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const displayProducts = currentWishlist.map((product, index) => (
    <WishlistItem
      key={`${product.productId}-${product.name}`}
      $isLastItem={
        wishlist.length <= productsPerPage &&
        index === currentWishlist.length - 1
      }
    >
      <ZoomableProductImage
        src={product.photoUrl}
        alt={product.name}
        tabIndex="0"
      />
      <ProductName>{product.name}</ProductName>
      <ProductPrice>{product.price} zł</ProductPrice>
      <AllButton>
        <AddToCartButton onClick={() => handleMoveToCart(product._id)}>
          🛒
        </AddToCartButton>
        <RemoveButton onClick={() => handleRemove(product._id)}>
          🗑️
        </RemoveButton>
      </AllButton>
    </WishlistItem>
  ));

  return (
    <>
      <WelcomeGeneral>{t("wishlist_page")}</WelcomeGeneral>
      {/* Показуємо різний контент залежно від стану */}
      {isLoading && <Loader />}
      {error && (
        <p>
          {t("error")}: {error}
        </p>
      )}
      {!wishlist.length && !isLoading && <NoResults />}
      {wishlist.length > 0 && <>{displayProducts}</>}
      {wishlist.length > productsPerPage && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <PaginationComponent
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={paginate}
          />
          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default WishlistPage;
