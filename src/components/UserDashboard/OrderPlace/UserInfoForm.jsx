import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getPaymentMethods } from "../../../redux/payment/operationPayment";
import { selectPaymentMethods } from "../../../redux/payment/selectorPayment";
import { InputField, SelectField } from "./OrderPlace.styled";

const UserInfoForm = ({ formData, setFormData }) => {
  const paymentMethods = useSelector(selectPaymentMethods);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    dispatch(getPaymentMethods());
  }, [dispatch]);

  return (
    <div>
      {/* First name */}
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

      {/* Last name */}
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

      {/* Phone */}
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <label style={{ color: isDarkMode ? "#060270" : "#1f871a" }}>
          {t("phone")}
        </label>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginTop: "5px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "0 8px",
              border: "1px solid #ddd",
              borderRadius: "6px",
              background: isDarkMode ? "#ffffff10" : "#fff",
              height: "42px",
              gap: "6px",
            }}
          >
            <span style={{ fontSize: "14px" }}>🇵🇱</span>
            <span style={{ color: "#666", fontSize: "14px" }}>+48</span>
          </div>

          <InputField
            type="tel"
            name="phone"
            placeholder="123 456 789"
            value={formData.phone}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                phone: e.target.value.replace(/\D/g, ""),
              }))
            }
            required
          />
        </div>
      </div>

      {/* Paczkomat */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          marginTop: "20px",
        }}
      >
        <label style={{ color: isDarkMode ? "#060270" : "#1f871a" }}>
          {t("parcel_locker")} (np WRO15N)
        </label>

        <InputField
          name="pickupPointId"
          value={formData.pickupPointId}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              pickupPointId: e.target.value.toUpperCase(),
            }))
          }
          required
          style={{ marginTop: "5px" }}
        />
      </div>

      {/* Payment method */}
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <label style={{ color: isDarkMode ? "#060270" : "#1f871a" }}>
          {t("payment_method")}
        </label>

        <SelectField
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
        >
          <option value="elavon_link">{t("online_payment")}</option>
          <option value="bank_transfer">{t("bank_transfer")}</option>
        </SelectField>
      </div>
    </div>
  );
};

export default UserInfoForm;
