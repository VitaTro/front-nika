import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import { getPaymentMethods } from "../../../redux/payment/operationPayment";
import { selectPaymentMethods } from "../../../redux/payment/selectorPayment";
import PaymentBlik from "../../Payment/PaymentBlik";
import PaymentMethod from "../../Payment/PaymentMethod";
import { InputField, SelectField } from "./OrderPlace.styled";
const UserInfoForm = ({ formData, setFormData }) => {
  const paymentMethods = useSelector(selectPaymentMethods);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const renderPaymentSection = () => {
    switch (formData.paymentMethod) {
      case "blik":
        return <PaymentBlik />;
      case "transfer":
        return <PaymentMethod />;
      default:
        return null;
    }
  };
  {
    renderPaymentSection();
  }

  useEffect(() => {
    dispatch(getPaymentMethods());
  }, [dispatch]);
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <label style={{ color: isDarkMode ? "#060270" : "#1f871a" }}>
          {t("first_name")}
        </label>
        <InputField
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <label style={{ color: isDarkMode ? "#060270" : "#1f871a" }}>
          {t("last_name")}
        </label>
        <InputField
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <label style={{ color: isDarkMode ? "#060270" : "#1f871a" }}>
          {t("phone")}
        </label>
        <InputField
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <label style={{ color: isDarkMode ? "#060270" : "#1f871a" }}>
          {t("payment_method")}
        </label>
        <SelectField
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
        >
          {/* <option value="blik">BLIK</option>
          <option value="transfer">{t("bank_transfer")}</option> */}
          {paymentMethods.map((method) => {
            <option key={method} value={method}>
              {method === "blik" ? "BLIK" : "Bank transfer"}
            </option>;
          })}
        </SelectField>
      </div>
    </div>
  );
};
export default UserInfoForm;
