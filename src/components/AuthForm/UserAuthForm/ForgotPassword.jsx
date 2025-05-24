import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import {
  resetPassword,
  updatePassword,
} from "../../../redux/auth/userAuth/operationAuth";
import {
  AuthForm,
  ButtonForm,
  HeaderForm,
  InputForm,
  LabelForm,
  ResponsiveContainer,
} from "../AuthFormRegister.styled";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { t } = useTranslation();

  const searchParams = new URLSearchParams(window.location.search);
  const resetToken = searchParams.get("token");

  const handleResetRequest = (e) => {
    e.preventDefault();
    dispatch(resetPassword(email)).then(() => {
      setTimeout(() => setEmailSent(true), 300000);
    });
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (!resetToken) {
      alert("Token nie znaleziono! Sprawdź link.");
      return;
    }
    if (!newPassword.trim()) {
      alert("Podaj nowe hasło!");
      return;
    }
    dispatch(updatePassword({ resetToken, newPassword }));
  };

  return (
    <ResponsiveContainer>
      <HeaderForm>{t("password_reset")}</HeaderForm>

      {!emailSent ? (
        <AuthForm onSubmit={handleResetRequest}>
          <LabelForm>Email:</LabelForm>
          <InputForm
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <ButtonForm type="submit">{t("send_request")}</ButtonForm>
        </AuthForm>
      ) : (
        <AuthForm onSubmit={handlePasswordUpdate}>
          <LabelForm>{t("new_password")}</LabelForm>
          <InputForm
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <ButtonForm type="submit">{t("update_password")}</ButtonForm>
        </AuthForm>
      )}
    </ResponsiveContainer>
  );
};

export default ForgotPassword;
