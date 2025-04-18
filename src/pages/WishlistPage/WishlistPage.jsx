import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import NoResults from "../../components/NoResults/NoResults";
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
  ProductImage,
  ProductName,
  ProductPrice,
  RemoveButton,
  WishlistContainer,
  WishlistItem,
} from "./WishlistPage.styled";

const WishlistPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 10;
  const wishlist = useSelector(selectWishlistProducts);
  const isLoading = useSelector(selectWishlistLoading);
  const error = useSelector(selectWishlistError);

  useEffect(() => {
    dispatch(getWishlist());
  }, [dispatch]);

  const handleRemove = (productId) => {
    dispatch(removeProductFromWishlist(productId)).then(() => {
      dispatch(getWishlist()); // Оновлення списку після видалення
    });
  };
  const displayProducts = wishlist
    .slice(currentPage * productsPerPage, (currentPage + 1) * productsPerPage)
    .map((product) => (
      <WishlistItem key={product._id}>
        <ProductImage src={product.photoUrl} alt={product.name} />
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

  const pageCount = Math.ceil(wishlist.length / productsPerPage);

  return (
    <WishlistContainer>
      {/* Заголовок завжди відображається */}
      <WelcomeGeneral>{t("wishlist_page")}</WelcomeGeneral>

      {/* Показуємо різний контент залежно від стану */}
      {isLoading && <Loader />}
      {error && (
        <p>
          {"error"}: {error}
        </p>
      )}
      {!wishlist.length && !isLoading && <NoResults />}
      {wishlist.length > 0 && <>{displayProducts}</>}
      {wishlist.length > productsPerPage && (
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          pageCount={pageCount}
          onPageChange={({ selected }) => setCurrentPage(selected)}
        />
      )}
    </WishlistContainer>
  );
};

export default WishlistPage;
