// import { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   selectShoppingCartItems,
//   selectTotalAmount,
// } from "../../redux/shopping/selectorsShopping";
// import {
//   createOrder,
//   fetchPickupPoints,
// } from "../../redux/user/userOrders/operationsUserOrders";
// import { selectPickupPoints } from "../../redux/user/userOrders/selectorsUserOrders";
// import {
//   ButtonWrapper,
//   FormContainer,
//   FormContainerAddress,
//   HeaderOrder,
//   HeaderOrderAddress,
//   InputField,
//   SelectField,
//   SubmitButton,
// } from "./ProfileUser.styled";
// import axios from "../../redux/axiosConfig";

// const UserOrderPage = () => {
//   const dispatch = useDispatch();
//   const pickupPoints = useSelector(selectPickupPoints);
//   const shoppingCart = useSelector(selectShoppingCartItems);
//   const totalAmount = useSelector(selectTotalAmount);
//   const { t } = useTranslation();
//   const [formData, setFormData] = useState(() => {
//     const savedData = JSON.parse(localStorage.getItem("orderForm")) || {};
//     return {
//       firstName: savedData.firstName || "",
//       lastName: savedData.lastName || "",
//       postalCode: savedData.postalCode || "",
//       city: savedData.city || "",
//       street: savedData.street || "",
//       houseNumber: savedData.houseNumber || "",
//       apartmentNumber: savedData.apartmentNumber || "",
//       isPrivateHouse: savedData.isPrivateHouse || false,
//       phone: savedData.phone || "",
//       paymentMethod: savedData.paymentMethod || "blik",
//       pickupPointId: savedData.pickupPointId || "",
//     };
//   });

//   useEffect(() => {
//     dispatch(fetchPickupPoints({ cache: "reload" }));
//   }, [dispatch]);

//   console.log("Всi поштомати:", pickupPoints);
//   console.log("Місто з форми:", formData.city);

//   const filteredPickupPoints = pickupPoints?.filter(
//     (point) =>
//       point.address_details.city &&
//       formData.city &&
//       point.address_details.city
//         .toLowerCase()
//         .normalize("NFD")
//         .replace(/[\u0300-\u036f]/g, "") ===
//         formData.city
//           .toLowerCase()
//           .normalize("NFD")
//           .replace(/[\u0300-\u036f]/g, "")
//   );
//   console.log("Фільтровані поштомати:", filteredPickupPoints);

//   const handleCheckboxChange = (e) => {
//     setFormData({
//       ...formData,
//       isPrivateHouse: e.target.checked,
//       apartmentNumber: "",
//     });
//   };
//   useEffect(() => {
//     localStorage.setItem("orderForm", JSON.stringify(formData));
//   }, [formData]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!formData.pickupPointId) {
//       alert("Proszę wybrać paczkomat!");
//       return;
//     }
//     dispatch(
//       createOrder({
//         ...formData,
//         products: shoppingCart,
//         totalPrice: totalAmount,
//         pickupPointId: formData.pickupPointId,
//       })
//     );
//   };

//   return (
//     <FormContainer>
//       <HeaderOrder>{t("order_placement")}</HeaderOrder>
//       <form onSubmit={handleSubmit}>
//         <label>{t("first_name")}</label>
//         <InputField
//           name="firstName"
//           value={formData.firstName}
//           onChange={handleChange}
//           required
//         />
//         <label>{t("last_name")}</label>
//         <InputField
//           name="lastName"
//           value={formData.lastName}
//           onChange={handleChange}
//           required
//         />
//         <label>{t("phone")}</label>
//         <InputField
//           name="phone"
//           value={formData.phone}
//           onChange={handleChange}
//           required
//         />
//         <HeaderOrderAddress>{t("your_address")} </HeaderOrderAddress>
//         <FormContainerAddress>
//           <div>
//             <label>{t("city")}</label>
//             <InputField
//               name="city"
//               value={formData.city}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div>
//             <label>{t("street")}</label>
//             <InputField
//               name="street"
//               vformData.street}
//               onChange={handleChange}
//               required
//             />
//           </div>
//         </FormContainerAddress>
//         <FormContainerAddress>
//           <div>
//             <label>{t("postal_code")}</label>
//             <InputField
//               name="postalCode"
//               value={formData.postalCode}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div>
//             <label>{t("house_number")}</label>
//             <InputField
//               name="houseNumber"
//               value={formData.houseNumber}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <label style={{ gridColumn: "span 2" }}>
//             <InputField
//               type="checkbox" value={
//               name="isPrivateHouse"
//               checked={formData.isPrivateHouse}
//               onChange={handleCheckboxChange}
//             />
//             {t("private_house")}
//           </label>
//           {!formData.isPrivateHouse && (
//             <div style={{ gridColumn: "span 2" }}>
//               <label>{t("apartment_number")}</label>
//               <InputField
//                 name="apartmentNumber"
//                 value={formData.apartmentNumber}
//                 onChange={handleChange}
//               />
//             </div>
//           )}
//         </FormContainerAddress>
//         <label>{t("payment_method")}</label>
//         <SelectField
//           name="paymentMethod"
//           value={formData.paymentMethod}
//           onChange={handleChange}
//         >
//           <option value="blik">BLIK</option>
//           <option value="transfer">{t("bank_transfer")}</option>
//         </SelectField>

//         <label>{t("parcel_locker")}</label>
//         <select
//           name="pickupPointId"
//           value={formData.pickupPointId}
//           onChange={handleChange}
//           required
//           style={{ maxHeight: "200px", overflow: "auto" }}
//         >
//           {filteredPickupPoints?.map((point) => (
//             <option key={point.id} value={point.id}>
//               {point.name} - {point.address.line1} {point.address.line2}
//             </option>
//           ))}
//         </select>

//         <ButtonWrapper>
//           <SubmitButton type="submit">{t("place_order")}</SubmitButton>
//         </ButtonWrapper>
//       </form>
//     </FormContainer>
//   );
// };
// export default UserOrderPage;
// import axios from "axios";
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
    <FormContainer>
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
