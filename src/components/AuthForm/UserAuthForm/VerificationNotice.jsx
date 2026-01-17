import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  ModalBox,
  ModalButton,
  ModalOverlay,
} from "../AuthFormRegister.styled";

const VerificationNotice = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <ModalOverlay>
      <ModalBox>
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
          style={{
            fontSize: "1rem",
            textAlign: "center",
            marginBottom: "10px",
          }}
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

        <ModalButton onClick={() => navigate("/user/auth/login")}>
          Przejdź do logowania
        </ModalButton>
      </ModalBox>
    </ModalOverlay>
  );
};

export default VerificationNotice;
