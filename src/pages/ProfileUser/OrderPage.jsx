import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import OrderAddressPicker from "../../components/UserDashboard/OrderPlace/OrderAddressPicker";
import UserInfoForm from "../../components/UserDashboard/OrderPlace/UserInfoForm";
import {
  checkPaymentStatus,
  initiatePayment,
} from "../../redux/payment/operationPayment";
import {
  selectShoppingCartItems,
  selectTotalAmount,
} from "../../redux/shopping/selectorsShopping";
import {
  createOrder,
  fetchPickupPoints,
} from "../../redux/user/userOrders/operationsUserOrders";
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
      city: savedData.city || "",
      street: savedData.street || "",
      postalCode: savedData.postalCode || "",
      houseNumber: savedData.houseNumber || "",
      apartmentNumber: savedData.apartmentNumber || "",
      isPrivateHouse: savedData.isPrivateHouse || false,
      paymentMethod: savedData.paymentMethod || "blik",
      pickupPointId: savedData.pickupPointId || "",
    };
  });
  // useEffect(() => {
  //   localStorage.setItem("orderForm", JSON.stringify(formData));

  //   fetch("/api/user/profile/info", {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(formData),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => console.log("User data saved:", data))
  //     .catch((error) => console.error("Error saving user data:", error));
  // }, [formData]);

  // useEffect(() => {
  //   dispatch(fetchPickupPoints({ cache: "reload" }));
  // }, [dispatch]);

  // useEffect(() => {
  //   localStorage.setItem("orderForm", JSON.stringify(formData));
  // }, [formData]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!formData.pickupPointId) {
  //     alert("Proszę wybrać paczkomat!");
  //     return;
  //   }
  //   dispatch(
  //     createOrder({
  //       ...formData,
  //       products: shoppingCart,
  //       totalPrice: totalAmount,
  //     })
  //   );
  //   const response = await dispatch(
  //     initiatePayment({
  //       orderId: formData.orderId,
  //       amount: totalAmount,
  //       paymentMethod: formData.paymentMethod,
  //     })
  //   );

  //   if (response.payload) {
  //     dispatch(checkPaymentStatus(formData.orderId));
  //   }
  // };
  useEffect(() => {
    dispatch(fetchPickupPoints({ cache: "reload" }));
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.pickupPointId) {
      alert("Proszę wybrać paczkomat!");
      return;
    }

    localStorage.setItem("orderForm", JSON.stringify(formData));

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/user/profile/info", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        console.warn("Update response:", text);
        throw new Error("Błąd przy zapisie danych użytkownika.");
      }

      const updatedUser = await response.json();
      console.log("✅ User updated:", updatedUser);
    } catch (error) {
      console.error("❌ Error updating user:", error);
    }

    dispatch(
      createOrder({
        ...formData,
        products: shoppingCart,
        totalPrice: totalAmount,
      })
    );

    const result = await dispatch(
      initiatePayment({
        orderId: formData.orderId,
        amount: totalAmount,
        paymentMethod: formData.paymentMethod,
      })
    );

    if (result.payload) {
      dispatch(checkPaymentStatus(formData.orderId));
    }
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
        <OrderAddressPicker formData={formData} setFormData={setFormData} />
        <ButtonWrapper>
          <SubmitButton type="submit">{t("place_order")}</SubmitButton>
        </ButtonWrapper>
      </form>
    </FormContainer>
  );
};

export default UserOrderPage;
