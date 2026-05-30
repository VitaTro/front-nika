import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useFacebookLogin } from "../../../hooks/useFacebookLogin";

import EmailIcon from "../../icons/email.png";
import FacebookIcon from "../../icons/facebook.svg";
import GoogleIcon from "../../icons/google.svg";

import { checkUserSession } from "../../../redux/auth/userAuth/operationAuth";
import { Backdrop, Modal, SocialButton } from "../AuthFormRegister.styled";

const SocialLoginModal = ({
  open,
  onClose,
  redirectAfterLogin,
  promptGoogle,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState("");

  const redirectTo = location.state?.from || redirectAfterLogin || "/user/main";

  // ---------------- FACEBOOK ----------------
  const facebookAppId = import.meta.env.VITE_FACEBOOK_APP_ID;

  const handleFacebookCallback = async (accessToken) => {
    try {
      const res = await fetch(
        "https://nika-gold-back-fe0ff35469d7.herokuapp.com/api/user/auth/facebook",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // 🔥 ОБОВʼЯЗКОВО
          body: JSON.stringify({ accessToken }),
        },
      );

      const data = await res.json();

      if (!data.user) {
        setErrorMessage(data.message || "Facebook login failed");
        return;
      }

      dispatch(checkUserSession());

      setTimeout(() => {
        onClose();
        navigate(redirectTo);
      }, 200);
    } catch (err) {
      console.error("Facebook login failed:", err);
      setErrorMessage("Facebook login failed");
    }
  };

  const { loginWithFacebook } = useFacebookLogin(
    facebookAppId,
    handleFacebookCallback,
  );

  // ---------------- GOOGLE ----------------
  const googleClientId =
    "738133641682-a1gt7dqs0p82pkt5htgeqb9i5e6i1fds.apps.googleusercontent.com";

  const handleGoogleCallback = async (response) => {
    try {
      const res = await fetch(
        "https://nika-gold-back-fe0ff35469d7.herokuapp.com/api/user/auth/google",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // 🔥 ОБОВʼЯЗКОВО
          body: JSON.stringify({ credential: response.credential }),
        },
      );

      const data = await res.json();

      if (!data.user) {
        setErrorMessage(data.message || "Google login failed");
        return;
      }

      dispatch(checkUserSession());

      setTimeout(() => {
        onClose();
        navigate(redirectTo);
      }, 200);
    } catch (err) {
      console.error("Google login failed:", err);
      setErrorMessage("Google login failed");
    }
  };

  // const { promptGoogle } = useGoogleLogin(googleClientId, handleGoogleCallback);

  if (!open) return null;

  return (
    <Backdrop onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <h2>{t("user_login")}</h2>

        <SocialButton onClick={promptGoogle}>
          <img src={GoogleIcon} alt="Google" /> {t("user_login")} Google
        </SocialButton>

        <SocialButton onClick={loginWithFacebook}>
          <img src={FacebookIcon} alt="Facebook" /> {t("user_login")} Facebook
        </SocialButton>

        <SocialButton
          onClick={() => {
            onClose();
            navigate("/user/auth/login", { state: { from: redirectTo } });
          }}
        >
          <img src={EmailIcon} alt="Email" /> {t("user_login")} email
        </SocialButton>

        <SocialButton
          style={{
            background: "#f58e8e",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={onClose}
        >
          {t("close")}
        </SocialButton>

        {errorMessage && (
          <div
            style={{
              background: "#ffdddd",
              padding: "10px",
              borderRadius: "8px",
              marginTop: "10px",
              color: "#a00",
              textAlign: "center",
              fontSize: "14px",
            }}
          >
            {errorMessage}
          </div>
        )}
      </Modal>
    </Backdrop>
  );
};

export default SocialLoginModal;
