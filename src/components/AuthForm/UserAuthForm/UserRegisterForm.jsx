import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  registerUser,
  verifyEmail,
} from "../../../redux/auth/userAuth/operationAuth";
import {
  selectAuthError,
  selectAuthLoading,
} from "../../../redux/auth/userAuth/selectorsAuth";
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

const UserRegisterForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector(selectAuthLoading);
  const errorMessage = useSelector(selectAuthError);
  const [emailSent, setEmailSent] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData.entries());

    const result = await dispatch(registerUser(userData));

    if (result.payload?.verificationToken) {
      dispatch(verifyEmail(result.payload.verificationToken));
      setEmailSent(true); // Показати повідомлення про email
    }
  };

  const handleVerification = () => {
    setVerificationSuccess(true);
  };

  return (
    <ResponsiveContainer>
      <HeaderForm>{t("user_register")}</HeaderForm>

      {/* 📌 Повідомлення про підтвердження email */}
      {emailSent && !verificationSuccess && (
        <div
          style={{
            backgroundColor: "#FFE6E6",
            padding: "15px",
            borderRadius: "8px",
          }}
        >
          <p style={{ color: "blue", fontWeight: "bold" }}>
            {t("please_verify_email")}
          </p>
          <p style={{ color: "gray", fontSize: "12px" }}>{t("check_spam")}</p>
        </div>
      )}

      {/* ✅ Верифікація успішна */}
      {verificationSuccess && (
        <div
          style={{
            backgroundColor: "#DFFFD6",
            padding: "15px",
            borderRadius: "8px",
          }}
        >
          <p style={{ color: "green", fontWeight: "bold" }}>
            {t("email_verified_success")}
          </p>

          <ButtonForm onClick={() => navigate("/user/auth/login")}>
            {t("ok")}
          </ButtonForm>
        </div>
      )}

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {loading && <Loader />}

      {!emailSent && (
        <AuthForm onSubmit={handleRegister}>
          <LabelForm>{t("username_label")}</LabelForm>
          <InputForm name="username" type="text" required />

          <LabelForm>{t("email_label")}</LabelForm>
          <InputForm name="email" type="email" required />

          <LabelForm>{t("password_label")}</LabelForm>
          <InputForm name="password" type="password" required />

          <ButtonForm type="submit">{t("register_button")}</ButtonForm>
          <ItemForm>
            {t("already_registered")}{" "}
            <Link to="/user/auth/login">{t("login_here")}</Link>
          </ItemForm>
        </AuthForm>
      )}
      {emailSent && (
        <div
          style={{
            backgroundColor: "#FFE6E6",
            padding: "15px",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <h2>📩 Check Your Email!</h2>
          <p>
            We've sent a confirmation link to your email. Please check your
            inbox and click on the link to verify your account.
          </p>
          <p style={{ color: "red", fontWeight: "bold" }}>
            ⚠️ If you don't see the email, check your Spam folder!
          </p>
          <button onClick={() => setEmailSent(false)}>OK</button>
        </div>
      )}
    </ResponsiveContainer>
  );
};

export default UserRegisterForm;
