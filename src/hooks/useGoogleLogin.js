// import { useEffect } from "react";

// export const useGoogleLogin = (clientId, callback) => {
//   useEffect(() => {
//     // Load Google SDK only once
//     if (!document.getElementById("google-client")) {
//       const script = document.createElement("script");
//       script.src = "https://accounts.google.com/gsi/client";
//       script.async = true;
//       script.defer = true;
//       script.id = "google-client";
//       document.body.appendChild(script);
//     }

//     // Initialize only once
//     const initGoogle = () => {
//       if (
//         window.google &&
//         window.google.accounts &&
//         window.google.accounts.id &&
//         !window.googleInitialized
//       ) {
//         window.google.accounts.id.initialize({
//           client_id: clientId,
//           callback,
//         });

//         window.googleInitialized = true;
//       }
//     };

//     const check = () => {
//       if (
//         window.google &&
//         window.google.accounts &&
//         window.google.accounts.id
//       ) {
//         initGoogle();
//       } else {
//         setTimeout(check, 50);
//       }
//     };

//     check();
//   }, [clientId, callback]);

//   const promptGoogle = () => {
//     if (window.google && window.google.accounts && window.google.accounts.id) {
//       window.google.accounts.id.prompt();
//     }
//   };

//   return { promptGoogle };
// };
import { useEffect, useRef } from "react";

export const useGoogleLogin = (clientId, callback) => {
  const initializedRef = useRef(false);

  useEffect(() => {
    // Load SDK only once
    if (!document.getElementById("google-client")) {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.id = "google-client";
      document.body.appendChild(script);
    }

    const initGoogle = () => {
      if (
        !initializedRef.current &&
        window.google &&
        window.google.accounts &&
        window.google.accounts.id
      ) {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback,
        });

        initializedRef.current = true;
        window.googleInitialized = true;
      }
    };

    const waitForSDK = () => {
      if (
        window.google &&
        window.google.accounts &&
        window.google.accounts.id
      ) {
        initGoogle();
      } else {
        setTimeout(waitForSDK, 50);
      }
    };

    waitForSDK();
  }, [clientId, callback]);

  const promptGoogle = () => {
    if (window.google && window.google.accounts && window.google.accounts.id) {
      window.google.accounts.id.prompt();
    }
  };

  return { promptGoogle };
};
