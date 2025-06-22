import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../../redux/user/userSelectors";
import {
  UserDashboardButtonForm,
  UserDashboardForm,
  UserDashboardHeader,
  UserDashboardInputForm,
  UserDashboardLabelForm,
} from "../../UserDashboard.styled";

const ProfileMain = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  useEffect(() => {
    if (user) {
      const filled = {
        username: user.username || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
      };
      const isEqual = Object.entries(filled).every(
        ([key, value]) => formData[key] === value
      );
      if (!isEqual) {
        setFormData(filled);
        const savedOrderForm = JSON.parse(
          localStorage.getItem("orderForm") || "{}"
        );
        const merged = { ...savedOrderForm, ...filled };
        localStorage.setItem("orderForm", JSON.stringify(merged));
      }
    }
  }, [user, formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserInfo(formData));
    alert("✅ Dane zostały pomyślnie zaktualizowane!");
  };

  return (
    <UserDashboardForm onSubmit={handleSubmit}>
      <UserDashboardHeader>{t("basic_information")}</UserDashboardHeader>
      <UserDashboardLabelForm>Username</UserDashboardLabelForm>
      <UserDashboardInputForm
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
      />
      <UserDashboardLabelForm>{t("first_name")}</UserDashboardLabelForm>
      <UserDashboardInputForm
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
      />
      <UserDashboardLabelForm>{t("last_name")}</UserDashboardLabelForm>
      <UserDashboardInputForm
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
      />
      <UserDashboardLabelForm>Email</UserDashboardLabelForm>
      <UserDashboardInputForm
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <UserDashboardLabelForm>{t("phone")}</UserDashboardLabelForm>
      <UserDashboardInputForm
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
      />
      <UserDashboardButtonForm type="submit">
        {t("save_changes")}
      </UserDashboardButtonForm>
    </UserDashboardForm>
  );
};

export default ProfileMain;
