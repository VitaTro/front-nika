import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header/Header";
import Loader from "../../components/Loader";
import NoResults from "../../components/NoResults/NoResults";
import PaginationComponent from "../../components/PaginationComponent/PaginationComponent";
import ZoomableProductImage from "../../components/ZoomableProductImage";
import {
  getShoppingCart,
  removeProductFromShoppingCart,
  updateProductToShoppingCart,
} from "../../redux/shopping/operationShopping";
import { WelcomeGeneral } from "../ProductsPage/ProductsPage.styled";
import {
  AllButton,
  ProductName,
  ProductPrice,
  ShoppingActions,
  ShoppingContainer,
  ShoppingItem,
} from "./ShoppingCartPage.styled";

const ShoppingCartPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 18;
  const shoppingCart = useSelector((state) => state.shoppingCart.items);
  const isLoading = useSelector((state) => state.shoppingCart.loading);
  const error = useSelector((state) => state.shoppingCart.error);
  const totalAmount = useSelector((state) => state.shoppingCart.totalAmount);
  console.log("Items in the cart:", shoppingCart);

  useEffect(() => {
    dispatch(getShoppingCart());
  }, [dispatch]);

  const handleQuantityChange = (productId, quantity) => {
    dispatch(updateProductToShoppingCart({ productId, quantity }));
  };

  const handleRemove = (id) => {
    dispatch(removeProductFromShoppingCart(id));
  };
  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentCart = shoppingCart.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(shoppingCart.length / productsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const displayProducts = currentCart.map((item) => (
    <ShoppingItem key={item._id}>
      <ZoomableProductImage src={item.photoUrl} alt={item.name} tabIndex="0" />
      <ProductName>{item.name}</ProductName>
      <ShoppingActions>
        <button
          onClick={() =>
            handleQuantityChange(item._id, Math.max(item.quantity - 1, 1))
          }
        >
          ➖
        </button>
        <span>{item.quantity}</span>
        <button
          onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
        >
          ➕
        </button>
      </ShoppingActions>
      <ProductPrice>{item.price} zł</ProductPrice>
      <p>
        {t("quantity")}: {item.quantity}
      </p>
      <AllButton>
        {/* <AddToCartButton
          onClick={() => dispatch(addProductToCart(product.productId))}
        >
          🛒
        </AddToCartButton> */}
        <button onClick={() => handleRemove(item._id)}>🗑️</button>
      </AllButton>
    </ShoppingItem>
  ));

  return (
    <ShoppingContainer>
      <Header />
      <WelcomeGeneral>{t("basket")}</WelcomeGeneral>
      {isLoading && <Loader />}
      {error && (
        <p>
          {t("error")}: {error}
        </p>
      )}
      {!shoppingCart.length && !isLoading && <NoResults />}
      {shoppingCart.length > 0 && <ul>{displayProducts}</ul>}

      <h2>
        {t("total")}: {totalAmount} zł
      </h2>
      {shoppingCart.length > productsPerPage && (
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
    </ShoppingContainer>
  );
};

export default ShoppingCartPage;
