import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ButtonForm, ResponsiveContainer } from "../AuthFormRegister.styled";

const VerificationNotice = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <ResponsiveContainer
      style={{
        maxWidth: "420px",
        width: "100%",
        padding: "20px",
        borderRadius: "12px",
        backgroundColor: "#fff",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        margin: "0 auto",
        marginTop: "20px",
      }}
    >
      <h2
        style={{
          fontSize: "1.4rem",
          marginBottom: "12px",
          textAlign: "center",
          color: "#D4A400",
        }}
      >
        📩 Potwierdzenie wysłane!
      </h2>
      <p
        style={{ fontSize: "1rem", textAlign: "center", marginBottom: "10px" }}
      >
        Wysłaliśmy wiadomość e-mail z linkiem aktywacyjnym. Sprawdź swoją
        skrzynkę odbiorczą.
      </p>
      <p
        style={{
          fontSize: "0.85rem",
          color: "#888",
          textAlign: "center",
          lineHeight: 1.4,
        }}
      >
        Nie widzisz wiadomości? Zajrzyj do folderu Spam lub Oferty 📥
      </p>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <ButtonForm onClick={() => navigate("/user/auth/login")}>
          Przejdź do logowania
        </ButtonForm>
      </div>
    </ResponsiveContainer>
  );
};

export default VerificationNotice;
