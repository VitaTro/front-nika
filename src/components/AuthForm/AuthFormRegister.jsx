import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  AuthForm,
  ButtonForm,
  HeaderForm,
  InputForm,
  ItemForm,
  LabelForm,
  ResponsiveContainer,
} from "./AuthFormRegister.styled";
const AuthFormRegister = ({ isAdmin }) => {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminSecret, setAdminSecret] = useState(""); // Спеціальне поле для адміністратора
  const [isFirstAdmin, setIsFirstAdmin] = useState(false); // Стан для перевірки першого адміністратора
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Перевірити, чи є перший адміністратор
  useEffect(() => {
    const checkFirstAdmin = async () => {
      try {
        const response = await axios.get(
          "https://nika-gold-back-fe0ff35469d7.herokuapp.com/api/auth/check-admin"
        );
        setIsFirstAdmin(response.data.isFirstAdmin);
      } catch (error) {
        setErrorMessage("Failed to check admin status.");
      }
    };
    checkFirstAdmin();
  }, [t]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        isAdmin
          ? "https://nika-gold-back-fe0ff35469d7.herokuapp.com/api/auth/register/admin"
          : "https://nika-gold-back-fe0ff35469d7.herokuapp.com/api/auth/register/user",
        {
          username,
          email,
          password,
          adminSecret: isFirstAdmin ? adminSecret : undefined, // Передавати поле тільки якщо це перший адміністратор
        }
      );
      setSuccessMessage("Registration successful!");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || t("registration_error");
      setErrorMessage(errorMessage);
    } finally {
      setLoading(false); // Завантаження завершено
    }
  };

  return (
    <ResponsiveContainer>
      <HeaderForm>
        {isAdmin ? t("admin_register") : t("user_register")}
      </HeaderForm>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {loading && <Loader />}
      <AuthForm onSubmit={handleRegister}>
        <div>
          <LabelForm>{t("username_label")}</LabelForm>

          <InputForm
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <LabelForm>{t("email_label")}</LabelForm>

          <InputForm
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <LabelForm>{t("password_label")}</LabelForm>

          <InputForm
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {isAdmin && isFirstAdmin && (
          <div>
            <label>{t("admin_secret_label")}</label>
            <input
              type="text"
              value={adminSecret}
              onChange={(e) => setAdminSecret(e.target.value)}
              required
            />
          </div>
        )}
        <ButtonForm type="submit">{t("register_button")}</ButtonForm>
        <ItemForm>
          {t("already_registered")}{" "}
          <Link to={isAdmin ? "/auth/admin/login" : "/auth/login"}>
            {t("login_here")}
          </Link>
        </ItemForm>
      </AuthForm>
    </ResponsiveContainer>
  );
};

export default AuthFormRegister;
