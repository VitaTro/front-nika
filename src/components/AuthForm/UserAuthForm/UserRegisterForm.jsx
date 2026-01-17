import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../../redux/auth/userAuth/operationAuth";
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
import PasswordValidator from "./PasswordValidator";
import VerificationNotice from "./VerificationNotice";

const UserRegisterForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const [error, setError] = useState("");
  const loading = useSelector(selectAuthLoading);
  const errorMessage = useSelector(selectAuthError);
  const [emailSent, setEmailSent] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData.entries());

    if (
      !userData.username ||
      !userData.email ||
      !userData.password ||
      !userData.confirmPassword
    ) {
      setError("Wszystkie pola muszą być wypełnione!");
      return;
    }

    if (userData.password.length < 8) {
      setError("Hasło musi zawierać co najmniej 8 znaków!");
      return;
    }
    // 🔹 Перевіряємо, чи паролі співпадають
    if (userData.password !== userData.confirmPassword) {
      setError("Hasła nie pasują. Spróbuj ponownie!");
      return;
    }

    try {
      const result = await dispatch(registerUser(userData)).unwrap();
      console.log("📦 Registration result:", result);

      setEmailSent(true);
      setTimeout(() => setShowModal(true), 1500);
    } catch (err) {
      console.error("❌ Registration error:", err);
      setError("Rejestracja nie powiodła się. Spróbuj ponownie.");
    }
  };
  const handleVerification = () => {
    setVerificationSuccess(true);
  };

  {
    errorMessage && (
      <p style={{ color: "red", fontWeight: "bold" }}>{error.errorMessage}</p>
    );
  }

  return (
    <ResponsiveContainer>
      <HeaderForm>{t("user_register")}</HeaderForm>
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
      {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}{" "}
      {errorMessage && (
        <p style={{ color: "red", fontWeight: "bold" }}>{errorMessage}</p>
      )}
      {loading && <Loader />}
      {!emailSent && (
        <AuthForm onSubmit={handleRegister}>
          <LabelForm>{t("username_label")}</LabelForm>
          <InputForm name="username" type="text" required />

          <LabelForm>{t("email_label")}</LabelForm>
          <InputForm name="email" type="email" required />

          <LabelForm>{t("password_label")}</LabelForm>
          <InputForm
            name="password"
            type="password"
            value={password}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <PasswordValidator password={password} isFocused={isFocused} />
          <LabelForm>{t("confirm_password")}</LabelForm>
          <InputForm
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {password !== confirmPassword && (
            <p style={{ color: "red", fontWeight: "bold" }}>
              ❌ Hasła nie pasują. Spróbuj ponownie!
            </p>
          )}
          <ButtonForm type="submit">{t("register_button")}</ButtonForm>
          <ItemForm>
            {t("already_registered")}{" "}
            <Link to="/user/auth/login">{t("login_here")}</Link>
          </ItemForm>
        </AuthForm>
      )}
      {emailSent && showModal && <VerificationNotice />}
      {/* {emailSent && (
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
      )} */}
    </ResponsiveContainer>
  );
};

export default UserRegisterForm;
