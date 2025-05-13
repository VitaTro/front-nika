import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchAdminRegister,
  sendAdminEmail,
} from "../../../redux/auth/adminAuth/operationsAdminAuth";
import {
  selectAdminError,
  selectAdminLoading,
} from "../../../redux/auth/adminAuth/selectorsAdminAuth";
import Loader from "../../Loader";
import {
  AuthForm,
  ButtonForm,
  HeaderForm,
  InputForm,
  ItemForm,
  LabelForm,
  ResponsiveContainer,
} from "../AuthFormRegister.styled";

const AdminRegisterForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminSecret, setAdminSecret] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const errorMessage = useSelector(selectAdminError);
  const loading = useSelector(selectAdminLoading);

  const handleRegister = async (e) => {
    e.preventDefault();
    dispatch(fetchAdminRegister({ username, email, password, adminSecret }))
      .unwrap()
      .then(() => {
        setSuccessMessage("Admin registered successfully!");
        dispatch(
          sendAdminEmail({
            to: email,
            subject: "Welcome!",
            text: `Hello, ${username}! You are now an admin.`,
          })
        );
      })
      .catch((error) => console.error("Registration failed:", error));
  };

  return (
    <ResponsiveContainer>
      <HeaderForm>{t("admin_register")}</HeaderForm>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {loading && <Loader />}
      <AuthForm onSubmit={handleRegister}>
        <LabelForm>{t("username_label")}</LabelForm>
        <InputForm
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <LabelForm>{t("email_label")}</LabelForm>
        <InputForm
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <LabelForm>{t("password_label")}</LabelForm>
        <InputForm
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <LabelForm>{t("admin_secret_label")}</LabelForm>
        <InputForm
          type="text"
          value={adminSecret}
          onChange={(e) => setAdminSecret(e.target.value)}
          required
        />

        <ButtonForm type="submit">{t("register_button")}</ButtonForm>
        <ItemForm>
          <Link to="/admin/auth/login">{t("login_here")}</Link>
        </ItemForm>
      </AuthForm>
    </ResponsiveContainer>
  );
};

export default AdminRegisterForm;
