import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header/Header";
import Loader from "../../components/Loader";
import NoResults from "../../components/NoResults/NoResults";
import PaginationComponent from "../../components/PaginationComponent/PaginationComponent";
import ZoomableProductImage from "../../components/ZoomableProductImage";
import {
  getWishlist,
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
  WishlistContainer,
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
  const [lightboxImage, setLightboxImage] = useState(null);

  useEffect(() => {
    dispatch(getWishlist());
  }, [dispatch]);

  // Оновлення списку після видалення
  const handleRemove = (productId) => {
    dispatch(removeProductFromWishlist(productId)).then(() => {
      dispatch(getWishlist());
    });
  };

  // pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentWishlist = wishlist.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(wishlist.length / productsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Прокрутка вгору
  };

  const displayProducts = currentWishlist.map((product) => (
    <WishlistItem key={product._id}>
      <ZoomableProductImage
        src={product.photoUrl}
        alt={product.name}
        tabIndex="0"
      />
      <ProductName>{product.name}</ProductName>
      <ProductPrice>{product.price} zł</ProductPrice>
      <AllButton>
        <AddToCartButton
          onClick={() => dispatch(addProductToCart(product._id))}
        >
          🛒
        </AddToCartButton>
        <RemoveButton onClick={() => handleRemove(product._id)}>
          🗑️
        </RemoveButton>
      </AllButton>
    </WishlistItem>
  ));

  return (
    <WishlistContainer>
      <Header />
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
        </div>
      )}
      {/* Компонент Lightbox */}
    </WishlistContainer>
  );
};

export default WishlistPage;
