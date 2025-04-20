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
import {
  addProductToWishlist,
  removeProductFromWishlist,
} from "../../redux/wishlist/operationWishlist";
import { selectWishlistProducts } from "../../redux/wishlist/selectorsWishlist";
import { WelcomeGeneral } from "../ProductsPage/ProductsPage.styled";
import {
  ButtonHeart,
  ButtonQuantity,
  ContainerCart,
  ItemHeader,
  ProductName,
  ProductPrice,
  QuantityController,
  RemoveButton,
  ShoppingItem,
  ShoppingList,
  TotalAmount,
  TotalHeader,
} from "./ShoppingCartPage.styled";

const ShoppingCartPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 18;

  const shoppingCart = useSelector(
    (state) => state.shoppingCart.products || []
  );
  const wishlist = useSelector(selectWishlistProducts);
  const isLoading = useSelector((state) => state.shoppingCart.loading);
  const error = useSelector((state) => state.shoppingCart.error);
  const totalAmount = useSelector((state) => state.shoppingCart.totalAmount);

  // Локальний стан сердечок
  const [heartStates, setHeartStates] = useState({});

  // Оновлення стану сердечок під час першого рендера
  useEffect(() => {
    const initialStates = shoppingCart.reduce((acc, item) => {
      const isInWishlist = wishlist.some(
        (wishlistItem) =>
          wishlistItem.name && item.name && wishlistItem.name === item.name // Порівнюємо за назвою
      );
      acc[item.name] = isInWishlist; // Використовуємо `name` як ключ
      return acc;
    }, {});
    setHeartStates(initialStates);
  }, [shoppingCart, wishlist]);

  // Обробка кліку на сердечко
  const handleToggleWishlist = async (name) => {
    if (!name) {
      console.error("Invalid product name:", name);
      return;
    }

    const isInWishlist = heartStates[name];
    try {
      if (isInWishlist) {
        console.log("Removing from wishlist:", name);
        await dispatch(removeProductFromWishlist(name)); // Передаємо назву
        setHeartStates((prev) => ({ ...prev, [name]: false }));
      } else {
        console.log("Adding to wishlist:", name);
        await dispatch(addProductToWishlist(name)); // Передаємо назву
        setHeartStates((prev) => ({ ...prev, [name]: true }));
      }
    } catch (error) {
      console.error("Error toggling wishlist:", error.message);
    }
  };

  // Обробка зміни кількості
  const handleQuantityChange = (id, quantity) => {
    console.log("Updating quantity for ID:", id, "Quantity:", quantity);
    dispatch(updateProductToShoppingCart({ id, quantity }));
  };

  // Обробка видалення продукту
  const handleRemove = (id) => {
    dispatch(removeProductFromShoppingCart(id));
    dispatch(getShoppingCart());
  };

  // Пагінація
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

  // Рендеринг продуктів
  const displayProducts = currentCart.map((item) => {
    const isProductInWishlist = heartStates[item.name]; // Використовуємо назву

    return (
      <ShoppingItem key={item._id}>
        <ItemHeader>
          <ZoomableProductImage
            src={item.photoUrl}
            alt={item.name}
            tabIndex="0"
          />
          <ProductName>{item.name}</ProductName>
        </ItemHeader>
        <ContainerCart>
          <QuantityController>
            <ButtonQuantity
              onClick={() =>
                handleQuantityChange(item._id, Math.max(item.quantity - 1, 1))
              }
            >
              ➖
            </ButtonQuantity>
            <span>{item.quantity}</span>
            <ButtonQuantity
              onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
            >
              ➕
            </ButtonQuantity>
          </QuantityController>
          <ProductPrice>
            <span>{item.quantity * item.price} zł</span>
          </ProductPrice>

          <ButtonHeart
            onClick={() => handleToggleWishlist(item.name)}
            $isActive={heartStates[item.name]}
          >
            {heartStates[item.name] ? "❤️" : "🖤"}
          </ButtonHeart>

          <RemoveButton onClick={() => handleRemove(item._id)}>🗑️</RemoveButton>
        </ContainerCart>
      </ShoppingItem>
    );
  });

  return (
    <>
      <Header />
      <WelcomeGeneral>{t("basket")}</WelcomeGeneral>
      {isLoading && <Loader />}
      {error && (
        <p>
          {t("error")}: {error}
        </p>
      )}
      {!shoppingCart.length && !isLoading && <NoResults />}
      {shoppingCart.length > 0 && (
        <ShoppingList>{displayProducts}</ShoppingList>
      )}
      <TotalHeader>
        {t("total")}: <TotalAmount>{totalAmount} zł</TotalAmount>
      </TotalHeader>
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
    </>
  );
};

export default ShoppingCartPage;
