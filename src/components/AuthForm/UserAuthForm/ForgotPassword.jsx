import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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
import ResetCodeInput from "./ResetCodeInput";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    if (resetCode.length === 6) {
      setStep(3);
    }
  }, [resetCode]);

  const handleResetRequest = (e) => {
    e.preventDefault();
    dispatch(resetPassword(email)).then(() => {
      setStep(2);
    });
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (!newPassword.trim() || !confirmPassword.trim()) {
      alert("Wprowadź nowe hasło!");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Hasła się nie zgadzają!");
      return;
    }
    dispatch(
      updatePassword({ email, resetCode, newPassword, confirmNewPassword })
    ).then(() => {
      navigate("/user/auth/login");
    });
  };

  return (
    <ResponsiveContainer>
      <HeaderForm>{t("password_reset")}</HeaderForm>

      {step === 1 && (
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
      )}

      {step === 2 && (
        <>
          <ResetCodeInput onComplete={setResetCode} />
          <ButtonForm
            onClick={handleResetRequest}
            style={{ marginTop: "10px" }}
          >
            Otrzymać nowy kod
          </ButtonForm>
        </>
      )}

      {step === 3 && (
        <AuthForm onSubmit={handlePasswordUpdate}>
          <LabelForm>Nowe hasło</LabelForm>
          <InputForm
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <LabelForm>Powtórz nowe hasło</LabelForm>
          <InputForm
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <ButtonForm type="submit">{t("update_password")}</ButtonForm>
        </AuthForm>
      )}
    </ResponsiveContainer>
  );
};

export default ForgotPassword;
