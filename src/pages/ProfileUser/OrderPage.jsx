import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import UserInfoForm from "../../components/UserDashboard/OrderPlace/UserInfoForm";
import { selectAuthUser } from "../../redux/auth/userAuth/selectorsAuth";
import {
  selectShoppingCartItems,
  selectTotalAmount,
} from "../../redux/shopping/selectorsShopping";
import { updateUserInfo } from "../../redux/user/userOperations";
import { createOrder } from "../../redux/user/userOrders/operationsUserOrders";
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
  const user = useSelector(selectAuthUser);
  const [formData, setFormData] = useState(() => {
    const savedData = JSON.parse(localStorage.getItem("orderForm")) || {};
    return {
      firstName: savedData.firstName || "",
      lastName: savedData.lastName || "",
      phone: savedData.phone || "",
      email: savedData.email || "",
      paymentMethod: "tpay",
      pickupPointId: savedData.pickupPointId || "",
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
        paymentMethod: "tpay",
      }));
    }
  }, [user]);

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

    const orderResponse = await dispatch(
      createOrder({
        products: cleanedProducts,
        country: "Poland",
        pickupPointId: formData.pickupPointId,
        paymentMethod: "tpay",
        notes: "",
      }),
    );

    const createdOrder = orderResponse.payload;

    if (!createdOrder?.order?._id) {
      alert("❌ Błąd przy tworzeniu zamówienia.");
      return;
    }

    if (createdOrder.paymentUrl) {
      window.location.href = createdOrder.paymentUrl;
      return;
    }
    alert("❌ Błąd linku do płatności");
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
