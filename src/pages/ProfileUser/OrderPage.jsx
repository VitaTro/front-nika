import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Tpay from "../../components/icons/tpay.png";
import DeliverySection from "../../components/UserDashboard/OrderPlace/DeliverySection";
import PaymentEmailModal from "../../components/UserDashboard/OrderPlace/PaymentEmailModal";
import UserInfoForm from "../../components/UserDashboard/OrderPlace/UserInfoForm";
import { selectAuthUser } from "../../redux/auth/userAuth/selectorsAuth";
import { selectShoppingCartItems } from "../../redux/shopping/selectorsShopping";
import { updateUserInfo } from "../../redux/user/userOperations";
import { createOrder } from "../../redux/user/userOrders/operationsUserOrders";
import { ButtonOrderNeutral } from "../ShoppingCartPage/ShoppingCartPage.styled";
import {
  ButtonWrapper,
  FormContainer,
  HeaderOrder,
} from "./ProfileUser.styled";

const UserOrderPage = () => {
  const dispatch = useDispatch();
  const shoppingCart = useSelector(selectShoppingCartItems);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const { t } = useTranslation();
  const user = useSelector(selectAuthUser);
  const navigate = useNavigate();
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const [formData, setFormData] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("orderForm")) || {};
    return {
      firstName: saved.firstName || "",
      lastName: saved.lastName || "",
      phone: saved.phone || "",
      email: saved.email || "",
      paymentMethod: "tpay",

      deliveryType: saved.deliveryType || "pickup",
      parcelSize: saved.parcelSize || null,
      deliveryPrice: saved.deliveryPrice || 0,

      pickupPointId: saved.pickupPointId || "",

      deliveryAddress: saved.deliveryAddress || {
        fullName: "",
        street: "",
        houseNumber: "",
        apartmentNumber: "",
        city: "",
        postalCode: "",
      },
    };
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        firstName: prev.firstName || user.firstName || "",
        lastName: prev.lastName || user.lastName || "",
        phone: prev.phone || user.phone || "",
        email: prev.email || user.email || "",
      }));
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.deliveryType === "pickup" && !formData.pickupPointId) {
      alert("Proszę wybrać paczkomat!");
      return;
    }

    localStorage.setItem("orderForm", JSON.stringify(formData));

    await dispatch(
      updateUserInfo({
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
      }),
    );

    const cleanedProducts = shoppingCart.map((item) => ({
      productId: item.productId?._id || item.productId,
      quantity: item.quantity,
    }));

    const productsTotal = shoppingCart.reduce(
      (sum, item) => sum + Number(item.quantity) * Number(item.price),
      0,
    );

    const finalPrice =
      Number(productsTotal) + Number(formData.deliveryPrice || 0);

    const orderResponse = await dispatch(
      createOrder({
        products: cleanedProducts,
        productsTotal,
        deliveryType: formData.deliveryType,
        parcelSize: formData.parcelSize,
        deliveryPrice: formData.deliveryPrice,
        finalPrice,
        buyerName: `${formData.firstName} ${formData.lastName}`,
        buyerEmail: formData.email,
        buyerPhone: formData.phone,

        pickupPointId:
          formData.deliveryType === "pickup" ? formData.pickupPointId : null,

        deliveryAddress:
          formData.deliveryType === "courier" ? formData.deliveryAddress : null,

        country: "Poland",
        notes: "",
      }),
    );

    const createdOrder = orderResponse.payload;

    if (!createdOrder?.order?._id) {
      alert("❌ Błąd przy tworzeniu zamówienia.");
      return;
    }
    // очищення корзини
    dispatch({ type: "shopping/clearCart" });
    // модалка з повідомленням
    setShowPaymentModal(true);

    // перехід на замовлення
    navigate(`/user/orders/${createdOrder.order._id}`);
  };
  return (
    <FormContainer
      style={{
        backgroundColor: isDarkMode ? "#E8E8E8" : "#ffffff",
        marginBottom: "40px",
      }}
    >
      <HeaderOrder>{t("order_placement")}</HeaderOrder>

      <form onSubmit={handleSubmit}>
        <UserInfoForm formData={formData} setFormData={setFormData} />
        <DeliverySection formData={formData} setFormData={setFormData} />

        <ButtonWrapper>
          <ButtonOrderNeutral type="submit">
            <img
              src={Tpay}
              alt="Tpay"
              height="26"
              style={{ marginRight: "8px" }}
            />
            {t("place_order")}
          </ButtonOrderNeutral>
        </ButtonWrapper>
      </form>

      <PaymentEmailModal
        open={showPaymentModal}
        onClose={() => {
          setShowPaymentModal(false);
        }}
      />
    </FormContainer>
  );
};

export default UserOrderPage;
