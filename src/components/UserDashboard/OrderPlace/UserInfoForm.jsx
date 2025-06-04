import { useTranslation } from "react-i18next";
import { InputField, SelectField } from "./OrderPlace.styled";
const UserInfoForm = ({ formData, setFormData }) => {
  const { t } = useTranslation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <label>{t("first_name")}</label>{" "}
      <InputField
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        required
      />
      <label>{t("last_name")}</label>{" "}
      <InputField
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        required
      />
      <label>{t("phone")}</label>
      <InputField
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        required
      />
      <label>{t("payment_method")}</label>
      <SelectField
        name="paymentMethod"
        value={formData.paymentMethod}
        onChange={handleChange}
      >
        <option value="blik">BLIK</option>
        <option value="transfer">{t("bank_transfer")}</option>
      </SelectField>
    </div>
  );
};
export default UserInfoForm;
