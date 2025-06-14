import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../components/Loader";
import NoResults from "../../components/NoResults/NoResults";
import ZoomableProductImage from "../../components/ZoomableProductImage";
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

  const wishlist = useSelector((state) => state.wishlist.items || []);
  const shoppingCart = useSelector(selectShoppingCartItems) || [];
  const totalAmount = useSelector(selectTotalAmount);
  const error = useSelector(selectShoppingCartError);
  const isLoading = useSelector(selectShoppingCartLoading);

  useEffect(() => {
    dispatch(getShoppingCart());
    dispatch(getWishlist());
    dispatch(fetchUserOrders());
    console.log("🔄 Fetching orders after new order...");
  }, [dispatch]);

  const handleToggleWishlist = async (product) => {
    if (!product || !product.productId) {
      console.error("⚠️ Missing productId, cannot move to wishlist!");
      return;
    }

    console.log(
      "📌 Moving product:",
      product.name,
      "to wishlist with ID:",
      product._id
    );

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

  const handleQuantityChange = async (id, quantity) => {
    if (quantity < 1) return;
    dispatch(updateProductToShoppingCart({ id, quantity }));
  };

  const handleRemove = async (id) => {
    dispatch(removeProductFromShoppingCart(id));
  };

  // const handlePlaceOrder = async () => {
  //   try {
  //     const orderData = {
  //       paymentMethod: "transfer",
  //       products: shoppingCart.map((item) => ({
  //         productId: item.productId,
  //         quantity: item.quantity,
  //         price: item.price,
  //       })),
  //       totalPrice: totalAmount,
  //     };

  //     console.log("📦 Sending order data:", orderData);

  //     const response = await dispatch(createOrder(orderData)).unwrap();
  //     console.log("✅ Order placed successfully!", response);
  //     if (!response || !response.order) {
  //       throw new Error("Invalid response from server");
  //     }

  //     console.log("✅ Order dispatched, no errors");
  //     console.log("🔄 Navigating to /user/orders...");
  //     navigate("/user/orders");
  //   } catch (error) {
  //     console.error("❌ Error placing order:", error);
  //   }
  // };

  // Сортування кошика за датою додавання
  const sortedCart = shoppingCart.slice().sort((a, b) => {
    const dateA = a.addedAt ? new Date(a.addedAt) : new Date(0);
    const dateB = b.addedAt ? new Date(b.addedAt) : new Date(0);
    return dateB - dateA;
  });

  const displayProducts = sortedCart.map((item) => (
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
          onClick={() => handleToggleWishlist(item)}
          $isActive={wishlist.some((w) => w.productId === item.productId)}
        >
          {wishlist.some((w) => w.productId === item.productId) ? "❤️" : "🖤"}
        </ButtonHeart>
        <RemoveButton onClick={() => handleRemove(item._id)}>🗑️</RemoveButton>
      </ContainerCart>
    </ShoppingItem>
  ));

  return (
    <>
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
      <TotalHeader style={{ color: isDarkMode ? "#0c0" : "#333" }}>
        {t("total")}:{" "}
        <TotalAmount style={{ color: isDarkMode ? "#e1a42b" : "#333" }}>
          {totalAmount} zł
        </TotalAmount>
      </TotalHeader>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <ButtonOrder>
          <Link to="/user/orders" style={{ textDecoration: "none" }}>
            {t("place_order")}
          </Link>
        </ButtonOrder>
      </div>
      <ToastContainer />
    </>
  );
};

export default ShoppingCartPage;
