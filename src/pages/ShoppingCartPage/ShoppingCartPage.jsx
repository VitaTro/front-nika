import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import noShopImg from "../../components/UserDashboard/tab/ProfileMain/No_shop.png";
import ZoomableProductImage from "../../components/ZoomableProductImage";

import { selectIsUserAuthenticated } from "../../redux/auth/userAuth/selectorsAuth";

// Guest cart
import { selectGuestCart } from "../../redux/guest/shopping/guestShoppingSelectors";
import {
  removeGuestCartItem,
  updateGuestCartQuantity,
} from "../../redux/guest/shopping/guestShoppingSlice";

// Backend cart
import {
  getShoppingCart,
  moveProductToWishlist,
  removeProductFromShoppingCart,
  updateProductToShoppingCart,
} from "../../redux/shopping/operationShopping";
import {
  selectShoppingCartError,
  selectShoppingCartItems,
  selectShoppingCartLoading,
  selectTotalAmount,
} from "../../redux/shopping/selectorsShopping";

// Wishlist
import { getWishlist } from "../../redux/wishlist/operationWishlist";

// Products list (for guest stock lookup)
import { selectProducts } from "../../redux/products/selectorsProducts";

import { QuantityValue } from "../ProductDetailsPage/ProductDetailsPage.styled";
import { WelcomeGeneral } from "../ProductsPage/ProductsPage.styled";
import {
  ButtonHeart,
  ButtonOrder,
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
  const navigate = useNavigate();

  const isUserAuthenticated = useSelector(selectIsUserAuthenticated);

  // Full products list (for guest stock lookup)
  const allProducts = useSelector(selectProducts);

  // Cart items
  const cartItems = isUserAuthenticated
    ? useSelector(selectShoppingCartItems)
    : useSelector(selectGuestCart);

  // Wishlist (only for authenticated)
  const wishlist = isUserAuthenticated
    ? useSelector((state) => state.wishlist.items)
    : [];

  // Total amount
  const totalAmount = isUserAuthenticated
    ? useSelector(selectTotalAmount)
    : cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Loading & error (only backend)
  const isLoading = isUserAuthenticated
    ? useSelector(selectShoppingCartLoading)
    : false;

  const error = isUserAuthenticated
    ? useSelector(selectShoppingCartError)
    : null;

  // Load backend data only for authenticated users
  useEffect(() => {
    if (isUserAuthenticated) {
      dispatch(getShoppingCart());
      dispatch(getWishlist());
    }
  }, [dispatch, isUserAuthenticated]);

  // Quantity change
  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) {
      handleRemove(id);
      return;
    }

    if (isUserAuthenticated) {
      dispatch(updateProductToShoppingCart({ id, quantity }));
    } else {
      dispatch(updateGuestCartQuantity({ id, quantity }));
    }
  };

  // Remove item
  const handleRemove = (id) => {
    if (isUserAuthenticated) {
      dispatch(removeProductFromShoppingCart(id));
    } else {
      dispatch(removeGuestCartItem(id));
    }
  };

  // Move to wishlist (only for authenticated)
  const handleMoveToWishlist = (id) => {
    if (!isUserAuthenticated) {
      toast.info(t("login_required"));
      return;
    }
    dispatch(moveProductToWishlist(id));
  };

  // Sort cart by addedAt
  const sortedCart = cartItems.slice().sort((a, b) => {
    const dateA = a.addedAt ? new Date(a.addedAt) : new Date(0);
    const dateB = b.addedAt ? new Date(b.addedAt) : new Date(0);
    return dateB - dateA;
  });

  const displayProducts = sortedCart.map((item) => {
    const id = item._id || item.id;

    // Correct stock logic
    let stock = item.currentStock ?? 0;

    if (!isUserAuthenticated) {
      const product = allProducts.find(
        (p) => p._id === (item.productId || item.id),
      );
      stock = product?.currentStock ?? 0;
    }

    return (
      <ShoppingItem key={id}>
        <ItemHeader>
          <ZoomableProductImage src={item.photoUrl} alt={item.name} />
          <ProductName>{item.name}</ProductName>
        </ItemHeader>

        <ContainerCart>
          <ProductPrice>
            <span>{item.quantity * item.price} zł</span>
          </ProductPrice>

          <QuantityValue style={{ textAlign: "center", marginTop: "4px" }}>
            {t("available")}: {stock} szt
          </QuantityValue>

          {item.quantity > stock && (
            <Typography fontSize="0.75rem" color="error" textAlign="center">
              {t("limited_stock")}
            </Typography>
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "8px",
            }}
          >
            <QuantityController>
              <ButtonQuantity
                onClick={() =>
                  handleQuantityChange(id, Math.max(item.quantity - 1, 1))
                }
              >
                ➖
              </ButtonQuantity>

              <span>{item.quantity}</span>

              <ButtonQuantity
                disabled={item.quantity >= stock}
                onClick={() => {
                  if (item.quantity < stock) {
                    handleQuantityChange(id, item.quantity + 1);
                  }
                }}
              >
                ➕
              </ButtonQuantity>
            </QuantityController>
          </div>

          {isUserAuthenticated && (
            <ButtonHeart
              onClick={() => handleMoveToWishlist(id)}
              $isActive={wishlist.some((w) => w.productId === item.productId)}
            >
              {wishlist.some((w) => w.productId === item.productId)
                ? "❤️"
                : "🖤"}
            </ButtonHeart>
          )}

          <RemoveButton onClick={() => handleRemove(id)}>🗑️</RemoveButton>
        </ContainerCart>
      </ShoppingItem>
    );
  });

  return (
    <>
      <WelcomeGeneral>{t("basket")}</WelcomeGeneral>

      {isLoading && <Loader />}
      {error && (
        <p>
          {t("error")}: {error}
        </p>
      )}

      {!cartItems.length && !isLoading && (
        <Box sx={{ textAlign: "center", py: 6 }}>
          <img src={noShopImg} alt="No orders" style={{ width: 200 }} />
          <Typography variant="h6">{t("empty_cart")}</Typography>
          <Typography variant="body2">{t("add_products_hint")}</Typography>
        </Box>
      )}

      {cartItems.length > 0 && <ShoppingList>{displayProducts}</ShoppingList>}

      {cartItems.length > 0 && (
        <TotalHeader>
          {t("total")}: <TotalAmount>{totalAmount} zł</TotalAmount>
        </TotalHeader>
      )}

      {cartItems.length > 0 && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          {isUserAuthenticated ? (
            <ButtonOrder>
              <Link to="/user/orders">{t("place_order")}</Link>
            </ButtonOrder>
          ) : (
            <ButtonOrder onClick={() => navigate("/user/auth/login")}>
              {t("login_required")}
            </ButtonOrder>
          )}
        </div>
      )}
    </>
  );
};

export default ShoppingCartPage;
