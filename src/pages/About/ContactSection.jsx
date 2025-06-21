import { useTranslation } from "react-i18next";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { ContactContainer, ContactItem } from "./AboutPage.styled";
const ContactSection = () => {
  const { t } = useTranslation();
  return (
    <ContactContainer>
      <h2 style={{ fontSize: "28px", fontWeight: "bold" }}>
        {t("contact_info")}
      </h2>
      <p>{t("questions_any_time")}</p>
      <ContactItem>
        🏢 Polska, ul. Świeradowska 51-57, 50-559 Wrocław
      </ContactItem>
      <ContactItem>🕒 {t("working_hours")}</ContactItem>
      <ContactItem>🛒 {t("order_processing_24_7")}</ContactItem>
      <ContactItem>
        ✉️
        <a href="mailto:huping.nika.gold@gmail.com" style={{ color: "#000" }}>
          huping.nika.gold@gmail.com
        </a>
      </ContactItem>
      <ContactItem>📞 +48 516 174 555</ContactItem>
      <ContactItem>NIP 9121950449</ContactItem>
      <ContactItem>
        🌍 <a href="https://nika-gold.net/main">https://nika-gold.net</a>
      </ContactItem>
      <ContactItem>
        🌍 <a href="https://nika-gold.netlify.app/">Nika Gold</a>
      </ContactItem>
      <ContactItem
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <FaInstagram size={24} color="#E4405F" />
        <a
          href="https://www.instagram.com/nika_gold_huping/"
          style={{
            color: "#000",
            fontSize: "18px",
            position: "relative",
            top: "-2px",
          }}
        >
          Instagram
        </a>
      </ContactItem>
      <ContactItem
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <FaFacebook size={24} color="#1877F2" />
        <a
          href="https://www.facebook.com/nika.gold.420361/"
          style={{
            color: "#000",
            fontSize: "18px",
            position: "relative",
            top: "-2px",
          }}
        >
          Facebook
        </a>
      </ContactItem>
    </ContactContainer>
  );
};
export default ContactSection;
