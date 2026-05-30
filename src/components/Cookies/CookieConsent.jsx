import { useEffect, useState } from "react";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) setVisible(true);
  }, []);

  const handleConsent = (value) => {
    localStorage.setItem("cookieConsent", value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        background: "#f6eedb",
        color: "#090909",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 0 10px rgba(0,0,0,0.3)",
        zIndex: 9999,
        maxWidth: "600px",
        width: "90%",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: window.innerWidth > 768 ? "row" : "column",
        }}
      >
        <img
          src="https://res.cloudinary.com/dblh78pvc/image/upload/v1780157428/flat-design-chocolate-chip-cookie-icon-vector-removebg-preview_ur13j9.png"
          alt="cookie"
          style={{
            width: window.innerWidth > 768 ? "120px" : "70px",
            height: "auto",
          }}
        />
        <div style={{ textAlign: window.innerWidth > 768 ? "left" : "center" }}>
          <p style={{ fontSize: "14px", marginBottom: "10px" }}>
            We use cookies to improve your browsing experience and for marketing
            purposes.{" "}
            <a
              href="/policy-cookies"
              style={{ color: "#391df5", textDecoration: "underline" }}
            >
              Read our Privacy Policy
            </a>
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: window.innerWidth > 768 ? "flex-start" : "center",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => handleConsent("rejected")}
              style={{
                background: "transparent",
                border: "1px solid #391df5",
                color: "#391df5",
                padding: "8px 16px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Reject All
            </button>

            <button
              onClick={() => handleConsent("accepted")}
              style={{
                background: "#f5f7ae",
                border: "none",
                color: "#111",
                padding: "8px 16px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Accept All
            </button>

            <button
              onClick={() => (window.location.href = "/cookies-settings")}
              style={{
                background: "transparent",
                border: "1px solid #391df5",
                color: "#391df5",
                padding: "8px 16px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Cookies Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
