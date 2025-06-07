import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import OrderAddressPicker from "../../components/UserDashboard/OrderPlace/OrderAddressPicker";
import UserInfoForm from "../../components/UserDashboard/OrderPlace/UserInfoForm";
import {
  selectShoppingCartItems,
  selectTotalAmount,
} from "../../redux/shopping/selectorsShopping";
import { fetchPickupPoints } from "../../redux/user/userOrders/operationsUserOrders";
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
  useEffect(() => {
    dispatch(fetchPickupPoints({ cache: "reload" }));
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("orderForm", JSON.stringify(formData));
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.pickupPointId) {
      alert("Proszę wybrać paczkomat!");
      return;
    }
    dispatch(
      createOrder({
        ...formData,
        products: shoppingCart,
        totalPrice: totalAmount,
      })
    );
  };

  return (
    <FormContainer style={{ backgroundColor:  isDarkMode ? "#E8E8E8" : "#fff", marginBottom: "40px"}}>
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
