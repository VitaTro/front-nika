import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import UserInfoForm from "../../components/UserDashboard/OrderPlace/UserInfoForm";
import {
  checkPaymentStatus,
  initiatePayment,
} from "../../redux/payment/operationPayment";
import {
  selectShoppingCartItems,
  selectTotalAmount,
} from "../../redux/shopping/selectorsShopping";
import { updateUserInfo } from "../../redux/user/userOperations";
import { createOrder } from "../../redux/user/userOrders/operationsUserOrders";
import { calculateDiscount } from "../../utils/calculateDiscount";
import PaymentMethodNotice from "./Payment/PaymentBanner";
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
      paymentMethod: savedData.paymentMethod || "bank_transfer",
      pickupPointId: savedData.pickupPointId || "",
    };
  });

  const [bankDetails, setBankDetails] = useState(null);

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
    console.log("FINAL PRICE:", finalPrice);

    const orderResponse = await dispatch(
      createOrder({
        formData: {
          ...formData,
          deliveryType: "pickup",
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

    const result = await dispatch(
      initiatePayment({
        orderId: createdOrder._id,
        paymentMethod: formData.paymentMethod,
      }),
    );

    // 🔵 Elavon online payment → redirect
    if (result.payload?.payLink) {
      window.location.href = result.payload.payLink;
      return;
    }

    // 🟡 Bank transfer → show bank details
    if (result.payload?.bankDetails) {
      setBankDetails(result.payload.bankDetails);
    }

    dispatch(checkPaymentStatus(createdOrder._id));
    alert("✅ Zamówienie zostało złożone!");
  };

  return (
    <FormContainer
      style={{
        backgroundColor: isDarkMode ? "#E8E8E8" : "#ffffff",
        marginBottom: "40px",
      }}
    >
      <HeaderOrder>{t("order_placement")}</HeaderOrder>

      <PaymentMethodNotice method={formData.paymentMethod} />

      <form onSubmit={handleSubmit}>
        <UserInfoForm formData={formData} setFormData={setFormData} />

        <ButtonWrapper>
          <SubmitButton type="submit">{t("place_order")}</SubmitButton>
        </ButtonWrapper>
      </form>

      {/* 🧾 Bank transfer details */}
      {bankDetails && (
        <div style={{ marginTop: "20px" }}>
          <h3>{t("bank_transfer_details")}</h3>
          <p>
            <b>Bank:</b> {bankDetails.bankName}
          </p>
          <p>
            <b>IBAN:</b> {bankDetails.iban}
          </p>
          <p>
            <b>SWIFT:</b> {bankDetails.swift}
          </p>
          <p>
            <b>Odbiorca:</b> {bankDetails.recipientName}
          </p>
          <p>
            <b>Tytuł:</b> {bankDetails.reference}
          </p>
          <p>
            <b>Kwota:</b> {bankDetails.amount} PLN
          </p>
        </div>
      )}
    </FormContainer>
  );
};

export default UserOrderPage;
