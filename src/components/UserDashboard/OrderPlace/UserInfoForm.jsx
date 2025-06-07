import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { InputField, SelectField } from "./OrderPlace.styled";
const UserInfoForm = ({ formData, setFormData }) => {
  const { t } = useTranslation();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
          <option value="blik">BLIK</option>
          <option value="transfer">{t("bank_transfer")}</option>
        </SelectField>
      </div>
    </div>
  );
};
export default UserInfoForm;
