import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { loginSuccess } from "../../../redux/auth/userAuth/userAuthSlice";
import EmailIcon from "../../icons/email.png";
import FacebookIcon from "../../icons/facebook.svg";
import GoogleIcon from "../../icons/google.svg";

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: rgb(140, 149, 87);
  text-shadow: 0 0 5px rgb(173, 226, 160);
  background: rgba(0, 0, 0, 0.5);

  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;
const Modal = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  width: 350px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`;

const SocialButton = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px 16px;
  margin-top: 12px;
  border-radius: 8px;
  border: none;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s ease;
  color: black;

  img {
    width: 24px;
    height: 24px;
    object-fit: contain;
  }

  &:hover {
    opacity: 0.9;
  }
`;

const SocialLoginModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    // Inject Facebook SDK script
    if (!document.getElementById("facebook-jssdk")) {
      const script = document.createElement("script");
      script.id = "facebook-jssdk";
      script.src = "https://connect.facebook.net/en_US/sdk.js";
      document.body.appendChild(script);
    }

    window.fbAsyncInit = function () {
      FB.init({
        appId: import.meta.env.VITE_FACEBOOK_APP_ID,
        cookie: true,
        xfbml: true,
        version: "v24.0",
      });
    };
  }, []);

  useEffect(() => {
    // Inject Google SDK
    if (!document.getElementById("google-client")) {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.id = "google-client";
      script.onload = () => {
        console.log("Google SDK loaded");
      };
      document.body.appendChild(script);
    }
  }, []);

  const handleFacebookLogin = () => {
    FB.login(
      function (response) {
        if (response.authResponse) {
          const accessToken = response.authResponse.accessToken;
          fetch(
            "https://nika-gold-backend.herokuapp.com/api/user/auth/facebook",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ accessToken }),
            },
          )
            .then((res) => res.json())
            .then((data) => {
              dispatch(loginSuccess(data));
              onClose();
              navigate("/user/main");
            });
        }
      },
      { scope: "email" },
    );
  };

  const handleGoogleLogin = () => {
    if (!window.google) {
      console.error("Google SDK not loaded yet");
      return;
    }

    window.google.accounts.id.initialize({
      client_id:
        "738133641682-a1gt7dqs0p82pkt5htgeqb9i5e6i1fds.apps.googleusercontent.com",
      callback: async (response) => {
        try {
          const res = await fetch(
            "https://nika-gold-backend.herokuapp.com/api/user/auth/google",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ credential: response.credential }),
            },
          );
          const data = await res.json();
          if (data?.token) {
            localStorage.setItem("token", data.token);
            window.location.reload();
          } else {
            console.error("Google login error:", data);
          }
        } catch (err) {
          console.error("Google login failed:", err);
        }
      },
    });

    window.google.accounts.id.prompt();
  };

  return (
    <Backdrop onClick={onClose}>
      {" "}
      <Modal onClick={(e) => e.stopPropagation()}>
        {" "}
        <h2>{t("user_login")}</h2>{" "}
        <SocialButton onClick={handleGoogleLogin}>
          <img src={GoogleIcon} alt="Google" /> {t("user_login")} Google{" "}
        </SocialButton>{" "}
        <SocialButton onClick={handleFacebookLogin}>
          <img src={FacebookIcon} alt="Facebook" /> {t("user_login")}{" "}
          Facebook{" "}
        </SocialButton>{" "}
        <SocialButton
          onClick={() => {
            onClose();
            navigate("/user/auth/login");
          }}
        >
          <img src={EmailIcon} alt="Email" /> {t("user_login")} email{" "}
        </SocialButton>{" "}
        <SocialButton style={{ background: "#ccc" }} onClick={onClose}>
          {" "}
          {t("close")}{" "}
        </SocialButton>{" "}
      </Modal>{" "}
    </Backdrop>
  );
};
export default SocialLoginModal;
