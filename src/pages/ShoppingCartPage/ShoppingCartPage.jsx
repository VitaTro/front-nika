import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../components/Loader";
import noShopImg from "../../components/UserDashboard/tab/ProfileMain/No_shop.png";
import ZoomableProductImage from "../../components/ZoomableProductImage";
import { selectStockMovements } from "../../redux/inventory/stockMovement/selectorsStockMovement";
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
import { fetchUserOrders } from "../../redux/user/userOrders/operationsUserOrders";
import { getWishlist } from "../../redux/wishlist/operationWishlist";
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
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectShoppingCartItems);

  const wishlist = useSelector((state) => state.wishlist.items || []);
  // const shoppingCart = useSelector(selectShoppingCartItems) || [];
  const totalAmount = useSelector(selectTotalAmount);
  const error = useSelector(selectShoppingCartError);
  const isLoading = useSelector(selectShoppingCartLoading);
  const movements = useSelector(selectStockMovements);
  useEffect(() => {
    dispatch(getShoppingCart());
    dispatch(getWishlist());
    dispatch(fetchUserOrders());
    console.log("🔄 Fetching orders after new order...");
  }, [dispatch]);
  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return;
    dispatch(updateProductToShoppingCart({ id, quantity }));
  };

  const handleRemove = (id) => {
    dispatch(removeProductFromShoppingCart(id));
  };

  const handleMoveToWishlist = (id) => {
    dispatch(moveProductToWishlist(id));
  };
  const getLatestStockForProduct = (productId) => {
    const filtered = movements.filter((m) => m.productId === productId);
    return filtered.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
  };
  const handleToggleWishlist = async (product) => {
    if (!product || !product.productId) {
      console.error("⚠️ Missing productId, cannot move to wishlist!");
      return;
    }

    try {
      const response = await dispatch(
        moveProductToWishlist(product._id)
      ).unwrap();
      console.log("✅ Moved to wishlist:", response);
      dispatch(getWishlist());
    } catch (error) {
      console.error("❌ Error moving product to wishlist:", error);
    }
  };

  // const handleQuantityChange = async (id, quantity) => {
  //   if (quantity < 1) return;
  //   dispatch(updateProductToShoppingCart({ id, quantity }));
  // };

  // const handleRemove = async (id) => {
  //   dispatch(removeProductFromShoppingCart(id));
  // };

  // Сортування кошика за датою додавання
  const sortedCart = cartItems.slice().sort((a, b) => {
    const dateA = a.addedAt ? new Date(a.addedAt) : new Date(0);
    const dateB = b.addedAt ? new Date(b.addedAt) : new Date(0);
    return dateB - dateA;
  });

  const displayProducts = sortedCart.map((item) => {
    const latest = getLatestStockForProduct(item.productId);
    const displayPrice = latest?.price ?? item.price;

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
            <span>{item.quantity * displayPrice} zł</span>
          </ProductPrice>
          {latest?.quantity < item.quantity && (
            <Typography fontSize="0.75rem" color="error">
              {t("limited_stock")}
            </Typography>
          )}
          <ButtonHeart
            onClick={() => handleToggleWishlist(item)}
            $isActive={wishlist.some((w) => w.productId === item.productId)}
          >
            {wishlist.some((w) => w.productId === item.productId) ? "❤️" : "🖤"}
          </ButtonHeart>
          <RemoveButton onClick={() => handleRemove(item._id)}>🗑️</RemoveButton>
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
        <Box
          sx={{
            textAlign: "center",
            py: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <img
            src={noShopImg}
            alt="No orders"
            style={{ width: 200, maxWidth: "80%", opacity: 0.8 }}
          />
          <Typography variant="h6" color="text.secondary">
            {t("empty_cart")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("add_products_hint")}
          </Typography>
        </Box>
      )}
      {cartItems.length > 0 && <ShoppingList>{displayProducts}</ShoppingList>}
      {cartItems.length > 0 && (
        <TotalHeader style={{ color: isDarkMode ? "#0c0" : "#333" }}>
          {t("total")}:{" "}
          <TotalAmount style={{ color: isDarkMode ? "#e1a42b" : "#333" }}>
            {totalAmount} zł
          </TotalAmount>
        </TotalHeader>
      )}

      {cartItems.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <ButtonOrder>
            <Link to="/user/orders" style={{ textDecoration: "none" }}>
              {t("place_order")}
            </Link>
          </ButtonOrder>
        </div>
      )}

      <ToastContainer />
    </>
  );
};

export default ShoppingCartPage;
