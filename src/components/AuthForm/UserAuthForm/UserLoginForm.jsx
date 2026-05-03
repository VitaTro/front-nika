import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  const location = useLocation();
  const from = location.state?.from || "/user/main";

  const handleLogin = async (e) => {
    e.preventDefault();
    setCustomError("");
    setLoading(true);

    const formData = new FormData(e.target);
    const credentials = Object.fromEntries(formData.entries());

    try {
      await dispatch(loginUser(credentials)).unwrap();
      navigate(from, { replace: true });
    } catch (error) {
      console.error("❌ Login failed:", error);

      if (error.response?.status === 401) {
        setCustomError("❌ Nieprawidłowy email lub hasło! Spróbuj ponownie.");
      } else {
        setCustomError(`❌ Błąd: ${error.message || "Nieznany problem"}`);
      }
    } finally {
      setLoading(false);
    }
  };
  if (loading) return <Loader />;
  return (
    <ResponsiveContainer>
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
          <Link
            to={"/user/auth/register"}
            style={{ fontSize: "24px", fontWeight: "600" }}
          >
            {t("register_here")}
          </Link>
        </ItemForm>
        <ItemForm>
          <Link to={"/user/auth/reset-password"}>{t("forgot_password")}</Link>
        </ItemForm>
      </AuthForm>
    </ResponsiveContainer>
  );
};

export default UserLoginForm;
