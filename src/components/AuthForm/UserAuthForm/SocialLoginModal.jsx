import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../../../redux/auth/userAuth/userAuthSlice";
import EmailIcon from "../../icons/email.png";
import FacebookIcon from "../../icons/facebook.svg";
import GoogleIcon from "../../icons/google.svg";
import { Backdrop, Modal, SocialButton } from "../AuthFormRegister.styled";

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
            "https://nika-gold-back-fe0ff35469d7.herokuapp.com/api/user/auth/facebook",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ accessToken }),
            },
          )
            .then((res) => res.json())
            .then((data) => {
              dispatch(
                loginSuccess({
                  user: data.user,
                  accessToken: data.accessToken,
                  refreshToken: data.refreshToken,
                }),
              );
              onClose();
              navigate("/user/main");
            });
        }
      },
      { scope: "email" },
    );
  };

  //   GOOGLE
  const waitForGoogleSDK = () =>
    new Promise((resolve) => {
      const check = () => {
        if (
          window.google &&
          window.google.accounts &&
          window.google.accounts.id
        ) {
          resolve();
        } else {
          setTimeout(check, 50);
        }
      };
      check();
    });

  const handleGoogleLogin = async () => {
    await waitForGoogleSDK();

    window.google.accounts.id.initialize({
      client_id:
        "738133641682-a1gt7dqs0p82pkt5htgeqb9i5e6i1fds.apps.googleusercontent.com",
      callback: async (response) => {
        try {
          const res = await fetch(
            "https://nika-gold-back-fe0ff35469d7.herokuapp.com/api/user/auth/google",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ credential: response.credential }),
            },
          );
          const data = await res.json();
          if (data?.accessToken) {
            dispatch(
              loginSuccess({
                user: data.user,
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
              }),
            );
            onClose();
            navigate("/user/main");
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
        <SocialButton
          style={{
            background: "#f58e8e",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={onClose}
        >
          {" "}
          {t("close")}{" "}
        </SocialButton>{" "}
      </Modal>{" "}
    </Backdrop>
  );
};
export default SocialLoginModal;
