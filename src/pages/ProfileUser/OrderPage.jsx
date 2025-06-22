import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import BankTransferInfo from "../../components/Payment/BankTransferInfo";
import BlikPhoneTransferInfo from "../../components/Payment/BlikPhoneTransferInfo";
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
import { updateUserInfo } from "../../redux/user/userOperations";
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
      paymentMethod: savedData.paymentMethod || "BLIK",
      pickupPointId: savedData.pickupPointId || "",
    };
  });

  const [createdOrderId, setCreatedOrderId] = useState(null);

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

    await dispatch(
      updateUserInfo({
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
      })
    );

    const cleanedProducts = shoppingCart.map((item) => ({
      productId: item.productId?._id || item.productId,
      quantity: item.quantity,
    }));

    console.log("🟡 Sending order data:", {
      ...formData,
      products: cleanedProducts,
      totalPrice: totalAmount,
      deliveryType: "pickup",
    });

    const orderResponse = await dispatch(
      createOrder({
        formData: {
          ...formData,
          deliveryType: "pickup", // або "courier", коли буде потрібно
        },
        cleanedProducts,
        totalPrice: totalAmount,
      })
    );

    console.log("📦 Order response:", orderResponse);

    const createdOrder = orderResponse.payload?.order || orderResponse.payload;

    if (!createdOrder?._id) {
      alert("❌ Błąd przy tworzeniu zamówienia.");
      return;
    }

    setCreatedOrderId(createdOrder._id);

    const result = await dispatch(
      initiatePayment({
        orderId: createdOrder._id,
        amount: totalAmount,
        paymentMethod: formData.paymentMethod,
      })
    );

    if (result.payload) {
      dispatch(checkPaymentStatus(createdOrder._id));
    }

    alert("✅ Zamówienie zostało złożone!"); // 🎉 Побачити це — коштує всіх зусиль
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

      {/* 🧾 Відображення оплати */}
      {createdOrderId && formData.paymentMethod === "BLIK" && (
        <BlikPhoneTransferInfo
          orderId={createdOrderId}
          totalPrice={totalAmount}
        />
      )}
      {createdOrderId && formData.paymentMethod === "bank_transfer" && (
        <BankTransferInfo orderId={createdOrderId} totalPrice={totalAmount} />
      )}
    </FormContainer>
  );
};

export default UserOrderPage;
