import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import SocialLoginModal from "../../components/AuthForm/UserAuthForm/SocialLoginModal";
import ApplePay from "../../components/icons/apple_pay.png";
import Blik from "../../components/icons/blik.png";
import GooglePay from "../../components/icons/google_pay.png";
import Mastercard from "../../components/icons/mastercard.png";
import shop from "../../components/icons/shop.png";
import Tpay from "../../components/icons/tpay.png";
import Visa from "../../components/icons/visa.png";
import Loader from "../../components/Loader";
import ZoomableProductImage from "../../components/ZoomableProductImage";
import { selectIsLoggedIn } from "../../redux/auth/userAuth/selectorsAuth";
import { selectGuestCart } from "../../redux/guest/shopping/guestShoppingSelectors";
import {
  clearGuestCart,
  mergeGuestCart,
  removeGuestCartItem,
  updateGuestCartQuantity,
} from "../../redux/guest/shopping/guestShoppingSlice";

import { useNavigate } from "react-router-dom";
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
  ButtonOrderNeutral,
  ButtonQuantity,
  CartLayout,
  CartLeft,
  CartRight,
  CheckoutBox,
  ContainerCart,
  ItemHeader,
  PaymentLogos,
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

const ShoppingCartPage = ({ promptGoogle }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [hasMerged, setHasMerged] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const isUserAuthenticated = useSelector(selectIsLoggedIn);
  const allProducts = useSelector(selectProducts) || [];
  const guestCart = useSelector(selectGuestCart) || [];
  const backendCartItems = useSelector(selectShoppingCartItems) || [];
  const wishlist = useSelector((state) => state.wishlist.items) || [];
  const backendTotalAmount = useSelector(selectTotalAmount) || 0;
  const isLoading = useSelector(selectShoppingCartLoading);
  const error = useSelector(selectShoppingCartError);
  const navigate = useNavigate();
  const cartItems = isUserAuthenticated ? backendCartItems : guestCart;
  const totalAmount = isUserAuthenticated
    ? backendTotalAmount
    : cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const {
    discount,
    discountPercent,
    final: finalPrice,
  } = calculateDiscount(totalAmount);

  useEffect(() => {
    if (!allProducts.length) {
      dispatch(getProducts());
    }
  }, [dispatch, allProducts.length]);

  useEffect(() => {
    if (!isUserAuthenticated || hasMerged) return;

    const merge = async () => {
      try {
        if (!guestCart.length) {
          await dispatch(getShoppingCart());
          await dispatch(getWishlist());
          setHasMerged(true);
          return;
        }

        await dispatch(mergeGuestCart(guestCart)).unwrap();
        await dispatch(getShoppingCart());
        dispatch(clearGuestCart());
        await dispatch(getWishlist());

        setHasMerged(true);
      } catch (err) {
        console.error("Merge error:", err);
        setHasMerged(true);
      }
    };

    merge();
  }, [dispatch, isUserAuthenticated, guestCart, hasMerged]);

  // --- закривати модалку логіну, якщо вже залогований ---
  useEffect(() => {
    if (isUserAuthenticated) setIsLoginModalOpen(false);
  }, [isUserAuthenticated]);

  // --- зміна кількості ---
  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) {
      handleRemove(id);
      return;
    }

    if (isUserAuthenticated) {
      dispatch(updateProductToShoppingCart({ id, quantity }))
        .unwrap()
        .then(() => dispatch(getShoppingCart()));
    } else {
      dispatch(updateGuestCartQuantity({ id, quantity }));
    }
  };

  // --- видалення товару ---
  const handleRemove = (id) => {
    if (isUserAuthenticated) {
      dispatch(removeProductFromShoppingCart(id))
        .unwrap()
        .then(() => dispatch(getShoppingCart()));
    } else {
      dispatch(removeGuestCartItem(id));
    }
  };

  // --- move to wishlist ---
  const handleMoveToWishlist = (id) => {
    if (!isUserAuthenticated) {
      toast.info(t("login_required"));
      return;
    }
    dispatch(moveProductToWishlist(id))
      .unwrap()
      .then(() => dispatch(getShoppingCart()));
  };

  // --- сортування кошика ---
  const sortedCart = cartItems.slice().sort((a, b) => {
    const dateA = a.addedAt ? new Date(a.addedAt) : new Date(0);
    const dateB = b.addedAt ? new Date(b.addedAt) : new Date(0);
    return dateB - dateA;
  });

  const displayProducts = sortedCart.map((item) => {
    const id = isUserAuthenticated ? item._id : item.id || item.productId;

    let stock = 0;

    if (isUserAuthenticated) {
      // бекенд уже додає availableQuantity
      stock = item.availableQuantity ?? 0;
    } else {
      // гість: беремо зі списку продуктів
      const product = allProducts.find(
        (p) => p._id === (item.productId || item.id),
      );
      stock = product?.currentStock ?? 0;
    }

    return (
      <ShoppingItem key={id}>
        <ItemHeader>
          <ZoomableProductImage src={item.photoUrl} alt={item.name} />

          <div style={{ display: "flex", flexDirection: "column" }}>
            <ProductName>{item.name}</ProductName>

            {/* SKU — тільки для каблучок */}
            {item.subcategory?.toLowerCase() === "rings" && item.sku && (
              <span style={{ fontSize: "0.85rem", color: "#666" }}>
                SKU: {item.sku}
              </span>
            )}
          </div>
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
                disabled={stock === 0 || item.quantity >= stock}
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
              $isActive={wishlist.some(
                (w) => w.productId?.toString() === item.productId?.toString(),
              )}
            >
              {wishlist.some(
                (w) => w.productId?.toString() === item.productId?.toString(),
              )
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
      <WelcomeGeneral style={{ marginTop: "auto" }}>
        {t("basket")}
      </WelcomeGeneral>

      {/* 🟡 Якщо кошик порожній — показуємо окремий блок */}
      {!cartItems.length && !isLoading ? (
        <Box
          sx={{
            width: "100%",
            minHeight: "60vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <img src={shop} alt="No orders" style={{ width: 200 }} />
          <Typography variant="h6">{t("empty_cart")}</Typography>
          <Typography variant="body2">{t("add_products_hint")}</Typography>
        </Box>
      ) : (
        // 🟢 Якщо товари є — звичайний layout
        <CartLayout>
          <CartLeft>
            {isLoading && <Loader />}
            {error && (
              <p>
                {t("error")}: {error}
              </p>
            )}
            <ShoppingList>{displayProducts}</ShoppingList>
          </CartLeft>

          <CartRight style={{ marginTop: "calc(var(--header-height) + 20px)" }}>
            <CheckoutBox>
              <TotalHeader>
                <div style={{ textAlign: "right" }}>
                  <div>
                    {t("total")}: <TotalAmount>{totalAmount} zł</TotalAmount>
                  </div>
                  {discount > 0 && (
                    <>
                      <div style={{ color: "red", fontSize: "0.9rem" }}>
                        {t("discount")}: -{discount} zł ({discountPercent}%)
                      </div>
                      <div style={{ fontWeight: "bold", marginTop: "5px" }}>
                        {t("final_price")}:{" "}
                        <TotalAmount>{finalPrice} zł</TotalAmount>
                      </div>
                    </>
                  )}
                </div>
              </TotalHeader>

              <ButtonOrderNeutral
                onClick={() => {
                  if (!isUserAuthenticated) {
                    setIsLoginModalOpen(true);
                  } else {
                    navigate("/user/orders");
                  }
                }}
              >
                <img
                  src={Tpay}
                  alt="Tpay"
                  height="26"
                  style={{ marginRight: "8px" }}
                />
                {t("place_order")}
              </ButtonOrderNeutral>

              <PaymentLogos>
                <p style={{ fontWeight: 600, marginBottom: "10px" }}>
                  {t("tpay_place")}
                </p>
                <div className="logos">
                  <img src={Visa} alt="Visa" height="32" />
                  <img src={Mastercard} alt="MasterCard" height="32" />
                  <img src={Blik} alt="BLIK" height="32" />
                  <img src={ApplePay} alt="Apple Pay" height="32" />
                  <img src={GooglePay} alt="Google Pay" height="34" />
                </div>
              </PaymentLogos>
            </CheckoutBox>
          </CartRight>
        </CartLayout>
      )}

      <SocialLoginModal
        open={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        promptGoogle={promptGoogle}
        redirectAfterLogin="/user/shopping-cart"
      />
    </>
  );
};

export default ShoppingCartPage;
