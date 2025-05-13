import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import axios from "../../../redux/axiosConfig";
import Loader from "../../Loader";
import {
  AuthForm,
  ButtonForm,
  HeaderForm,
  InputForm,
  ItemForm,
  LabelForm,
  ResponsiveContainer,
} from "./AuthFormRegister.styled";

const UserRegisterForm = () => {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/auth/register/user", {
        username,
        email,
        password,
      });
      setSuccessMessage("User registered successfully!");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Registration error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ResponsiveContainer>
      <HeaderForm>{t("user_register")}</HeaderForm>
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

        <ButtonForm type="submit">{t("register_button")}</ButtonForm>
        <ItemForm>
          {t("already_registered")}{" "}
          <Link to="/auth/login">{t("login_here")}</Link>
        </ItemForm>
      </AuthForm>
    </ResponsiveContainer>
  );
};

export default UserRegisterForm;
