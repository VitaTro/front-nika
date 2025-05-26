import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../../redux/auth/userAuth/operationAuth";
import { selectAuthError } from "../../../redux/auth/userAuth/selectorsAuth";
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

const UserLoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const errorMessage = useSelector(selectAuthError);
  const [customError, setCustomError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setCustomError("");
    setLoading(true); // ✅ Вмикаємо Loader

    const formData = new FormData(e.target);
    const credentials = Object.fromEntries(formData.entries());

    try {
      await dispatch(loginUser(credentials)).unwrap();
      navigate("/main");
    } catch (error) {
      console.error("❌ Login failed:", error);

      if (error.response?.status === 401) {
        setCustomError("❌ Nieprawidłowy email lub hasło! Spróbuj ponownie.");
      } else {
        setCustomError(`❌ Błąd: ${error.message || "Nieznany problem"}`);
      }
    } finally {
      setLoading(false); // ⏳ Вимикаємо Loader
    }
  };
  if (loading) return <Loader />;
  return (
    <ResponsiveContainer>
      {/* 🔹 Затемнення фону під час лоаду */}
      {/* {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <Loader /> {/* ✅ Центруємо один лоадер */}
      {/* </div>
      )} */}

      <HeaderForm>{t("user_login")}</HeaderForm>

      {errorMessage && (
        <p style={{ color: "red", fontWeight: "bold" }}>{errorMessage}</p>
      )}
      {customError && (
        <p style={{ color: "red", fontWeight: "bold" }}>{customError}</p>
      )}

      {/* 🔹 Блокуємо форму під час лоаду */}

      <AuthForm
        onSubmit={handleLogin}
        style={{ pointerEvents: loading ? "none" : "auto" }}
      >
        <LabelForm>{t("email_label")}</LabelForm>
        <InputForm name="email" type="email" required />

        <LabelForm>{t("password_label")}</LabelForm>
        <InputForm name="password" type="password" required />
        <ButtonForm type="submit">{t("login_button")}</ButtonForm>

        <ItemForm>
          {t("no_account")}{" "}
          <Link to={"/user/auth/register"}>{t("register_here")}</Link>
        </ItemForm>
        <ItemForm>
          <Link to={"/user/auth/reset-password"}>{t("forgot_password")}</Link>
        </ItemForm>
      </AuthForm>
    </ResponsiveContainer>
  );
};

export default UserLoginForm;
