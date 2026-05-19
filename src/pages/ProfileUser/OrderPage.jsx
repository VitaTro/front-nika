import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import UserInfoForm from "../../components/UserDashboard/OrderPlace/UserInfoForm";
import {
  selectShoppingCartItems,
  selectTotalAmount,
} from "../../redux/shopping/selectorsShopping";
import { updateUserInfo } from "../../redux/user/userOperations";
import { createOrder } from "../../redux/user/userOrders/operationsUserOrders";
import { calculateDiscount } from "../../utils/calculateDiscount";
import {
  ButtonWrapper,
  FormContainer,
  HeaderOrder,
  SubmitButton,
} from "./ProfileUser.styled";

const UserOrderPage = () => {
  const dispatch = useDispatch();
  const shoppingCart = useSelector(selectShoppingCartItems);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const totalAmount = useSelector(selectTotalAmount);
  const { t } = useTranslation();

  const [formData, setFormData] = useState(() => {
    const savedData = JSON.parse(localStorage.getItem("orderForm")) || {};
    return {
      firstName: savedData.firstName || "",
      lastName: savedData.lastName || "",
      phone: savedData.phone || "",
      paymentMethod: "tpay",
      pickupPointId: savedData.pickupPointId || "",
    };
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.pickupPointId) {
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

    const { final } = calculateDiscount(totalAmount);
    const finalPrice = Number(final);

    const orderResponse = await dispatch(
      createOrder({
        formData: {
          ...formData,
          deliveryType: "pickup",
          paymentMethod: "tpay",
        },
        cleanedProducts,
        totalPrice: totalAmount,
        finalPrice,
      }),
    );

    const createdOrder = orderResponse.payload?.order || orderResponse.payload;

    if (!createdOrder?._id) {
      alert("❌ Błąd przy tworzeniu zamówienia.");
      return;
    }

    // 🔵 Tpay
    const res = await fetch("/api/payments/tpay/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId: createdOrder._id,
        amount: finalPrice,
        email: formData.email,
      }),
    });

    const data = await res.json();

    if (data.transactionUrl) {
      window.location.href = data.transactionUrl;
      return;
    }

    alert("❌ Błąd przy tworzeniu transakcji Tpay.");
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

        <ButtonWrapper>
          <SubmitButton type="submit">{t("place_order")}</SubmitButton>
        </ButtonWrapper>
      </form>
    </FormContainer>
  );
};

export default UserOrderPage;
