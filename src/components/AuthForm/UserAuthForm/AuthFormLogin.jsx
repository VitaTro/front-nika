import axios from "axios";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../redux/auth/userAuth/operationAuth";
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

const AuthFormLogin = ({ isAdmin }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        isAdmin
          ? "https://nika-gold-back-fe0ff35469d7.herokuapp.com/api/auth/login/admin"
          : "https://nika-gold-back-fe0ff35469d7.herokuapp.com/api/auth/login/user",
        {
          email,
          password,
        }
      );

      // Збереження токена в локальному сховищі
      localStorage.setItem("token", response.data.token);

      console.log("Role from response:", response.data.role);
      // Збереження інформації про користувача в Redux
      dispatch(
        login({
          userName: response.data.userName || (isAdmin ? "Admin" : "User"),
          userPhoto: response.data.userPhoto || "",
          userRole: response.data.role, // Зберігаємо роль у Redux
        })
      );

      // Перенаправлення залежно від ролі
      navigate(isAdmin ? "/admin/dashboard" : "/main");
      setSuccessMessage(t("login_success"));
    } catch (error) {
      const errorMessage = error.response?.data?.message || t("login_error");
      setErrorMessage(errorMessage);
      setSuccessMessage("");
    } finally {
      setLoading(false); // Завершення завантаження
    }
  };

  return (
    <ResponsiveContainer>
      <HeaderForm>{isAdmin ? t("admin_login") : t("user_login")}</HeaderForm>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <AuthForm onSubmit={handleLogin}>
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
        {loading ? (
          <Loader />
        ) : (
          <ButtonForm type="submit">{t("login_button")}</ButtonForm>
        )}

        <ItemForm>
          {t("no_account")}{" "}
          <Link to={isAdmin ? "/auth/register/admin" : "/auth/register/user"}>
            {t("register_here")}
          </Link>
        </ItemForm>
      </AuthForm>
    </ResponsiveContainer>
  );
};

export default AuthFormLogin;
