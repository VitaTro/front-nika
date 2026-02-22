import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SocialLoginModal from "../../components/AuthForm/UserAuthForm/SocialLoginModal";
import Loader from "../../components/Loader";
import noShopImg from "../../components/UserDashboard/tab/ProfileMain/No_shop.png";
import ZoomableProductImage from "../../components/ZoomableProductImage";
import { selectIsUserAuthenticated } from "../../redux/auth/userAuth/selectorsAuth";
import {
  selectDiscount,
  selectDiscountPercent,
  selectFinalPrice,
} from "../../redux/finance/onlineOrder/selectorsOnlineOrder";
import { selectGuestCart } from "../../redux/guest/shopping/guestShoppingSelectors";
import {
  mergeGuestCart,
  removeGuestCartItem,
  updateGuestCartQuantity,
} from "../../redux/guest/shopping/guestShoppingSlice";
import { getProducts } from "../../redux/products/operationProducts";
import { selectProducts } from "../../redux/products/selectorsProducts";
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
import { getWishlist } from "../../redux/wishlist/operationWishlist";
import { calculateDiscount } from "../../utils/calculateDiscount";
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
  QuantityValueCartDesktop,
  QuantityValueCartMobile,
  RemoveButton,
  ShoppingItem,
  ShoppingList,
  TotalAmount,
  TotalHeader,
} from "./ShoppingCartPage.styled";
const ShoppingCartPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [hasMerged, setHasMerged] = useState(false);

  const navigate = useNavigate();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const isUserAuthenticated = useSelector(selectIsUserAuthenticated);
  const allProducts = useSelector(selectProducts);
  const cartItems = isUserAuthenticated
    ? useSelector(selectShoppingCartItems)
    : useSelector(selectGuestCart);

  const wishlist = isUserAuthenticated
    ? useSelector((state) => state.wishlist.items)
    : [];

  // Total amount
  const totalAmount = isUserAuthenticated
    ? useSelector(selectTotalAmount)
    : cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  let discount = 0;
  let discountPercent = 0;
  let finalPrice = totalAmount;

  if (isUserAuthenticated) {
    discount = useSelector(selectDiscount);
    discountPercent = useSelector(selectDiscountPercent);
    finalPrice = useSelector(selectFinalPrice);
  } else {
    const d = calculateDiscount(totalAmount);
    discount = d.discount;
    discountPercent = d.discountPercent;
    finalPrice = d.final;
  }

  const isLoading = isUserAuthenticated
    ? useSelector(selectShoppingCartLoading)
    : false;

  const error = isUserAuthenticated
    ? useSelector(selectShoppingCartError)
    : null;

  useEffect(() => {
    if (!allProducts.length) {
      dispatch(getProducts());
    }
  }, [dispatch, allProducts.length]);

  useEffect(() => {
    if (!isUserAuthenticated || hasMerged) return;

    if (cartItems.length === 0) {
      dispatch(getShoppingCart());
      dispatch(getWishlist());
      setHasMerged(true);
      return;
    }

    dispatch(mergeGuestCart(cartItems))
      .unwrap()
      .then(() => {
        dispatch(removeGuestCartItem(null));
      })
      .finally(() => {
        dispatch(getShoppingCart());
        dispatch(getWishlist());
        setHasMerged(true);
      });
  }, [dispatch, isUserAuthenticated, cartItems.length, hasMerged]);

  useEffect(() => {
    if (isUserAuthenticated) setIsLoginModalOpen(false);
  }, [isUserAuthenticated]);

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

  const handleRemove = (id) => {
    if (isUserAuthenticated) {
      dispatch(removeProductFromShoppingCart(id));
    } else {
      dispatch(removeGuestCartItem(id));
    }
  };

  const handleMoveToWishlist = (id) => {
    if (!isUserAuthenticated) {
      toast.info(t("login_required"));
      return;
    }
    dispatch(moveProductToWishlist(id));
  };

  useEffect(() => {
    if (isUserAuthenticated) {
      setIsLoginModalOpen(false);
    }
  }, [isUserAuthenticated]);

  // Sort cart by addedAt
  const sortedCart = cartItems.slice().sort((a, b) => {
    const dateA = a.addedAt ? new Date(a.addedAt) : new Date(0);
    const dateB = b.addedAt ? new Date(b.addedAt) : new Date(0);
    return dateB - dateA;
  });

  const displayProducts = sortedCart.map((item) => {
    const id = item._id || item.id;

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

          <QuantityValueCartDesktop>
            {t("available")}: {stock} szt
          </QuantityValueCartDesktop>
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
          <QuantityValueCartMobile>
            {t("available")}: {stock} szt
          </QuantityValueCartMobile>
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
          <div style={{ textAlign: "right" }}>
            <div>
              {t("total")}: <TotalAmount>{totalAmount} zł</TotalAmount>
            </div>

            {discount > 0 && (
              <div style={{ color: "red", fontSize: "0.9rem" }}>
                {t("discount")}: -{discount} zł ({discountPercent}%)
              </div>
            )}

            {discount > 0 && (
              <div style={{ fontWeight: "bold", marginTop: "5px" }}>
                {t("final_price")}: <TotalAmount>{finalPrice} zł</TotalAmount>
              </div>
            )}
          </div>
        </TotalHeader>
      )}

      {cartItems.length > 0 && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          {isUserAuthenticated ? (
            <ButtonOrder>
              <Link to="/user/orders">{t("place_order")}</Link>
            </ButtonOrder>
          ) : (
            <ButtonOrder onClick={() => setIsLoginModalOpen(true)}>
              {t("place_order")}
            </ButtonOrder>
          )}
        </div>
      )}
      <SocialLoginModal
        open={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
};

export default ShoppingCartPage;
