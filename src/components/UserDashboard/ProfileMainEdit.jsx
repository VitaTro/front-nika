import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { updateUserInfo } from "../../redux/user/userOperations";
import { selectUser } from "../../redux/user/userSelectors";
import {
  UserDashboardButtonForm,
  UserDashboardForm,
  UserDashboardHeader,
  UserDashboardInputForm,
  UserDashboardLabelForm,
} from "./UserDashboard.styled";

const ProfileMainEdit = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [formData, setFormData] = useState({
    username: user?.username || "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

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

export default ProfileMainEdit;
