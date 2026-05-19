import { useEffect } from "react";

export const useFacebookLogin = (appId, callback) => {
  useEffect(() => {
    // fbAsyncInit MUST be defined before loading SDK
    window.fbAsyncInit = function () {
      if (!window.fbInitialized) {
        FB.init({
          appId,
          cookie: true,
          xfbml: true,
          version: "v24.0",
        });

        window.fbInitialized = true;
      }
    };

    // Load SDK only once
    if (!document.getElementById("facebook-jssdk")) {
      const script = document.createElement("script");
      script.id = "facebook-jssdk";
      script.src = "https://connect.facebook.net/en_US/sdk.js";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, [appId]);

  const loginWithFacebook = () => {
    if (!window.FB) {
      console.warn("Facebook SDK not loaded yet");
      return;
    }

    FB.login(
      (response) => {
        if (response.authResponse) {
          callback(response.authResponse.accessToken);
        }
      },
      { scope: "email" },
    );
  };

  return { loginWithFacebook };
};
