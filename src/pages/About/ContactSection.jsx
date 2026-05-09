import { useTranslation } from "react-i18next";
import {
  FaEnvelope,
  FaFacebook,
  FaGlobe,
  FaIdCard,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhone,
  FaShoppingCart,
} from "react-icons/fa";
import {
  ContactContainer,
  ContactItem,
  ContactLink,
  SocialRow,
} from "./AboutPage.styled";

const ContactSection = () => {
  const { t } = useTranslation();
  return (
    <ContactContainer>
      <h2 style={{ fontSize: "28px", fontWeight: "700", color: "#bfa76f" }}>
        {t("contact_info")}
      </h2>
      <p style={{ marginBottom: "20px" }}>{t("questions_any_time")}</p>

      <ContactItem>
        <FaMapMarkerAlt color="#bfa76f" /> Polska, ul. Świeradowska 51-57,
        50-559 Wrocław
      </ContactItem>

      <ContactItem>
        <FaShoppingCart color="#bfa76f" /> Przetwarzanie zamówień 24/7!
      </ContactItem>

      <ContactItem>
        <FaEnvelope color="#bfa76f" />{" "}
        <ContactLink href="mailto:huping.nika.gold@gmail.com">
          huping.nika.gold@gmail.com
        </ContactLink>
      </ContactItem>

      <ContactItem>
        <FaPhone color="#bfa76f" />{" "}
        <ContactLink href="tel:+48516174555">+48 516 174 555</ContactLink>
      </ContactItem>

      <ContactItem>
        <FaIdCard color="#bfa76f" /> NIP 9121950449
      </ContactItem>

      <ContactItem>
        <FaGlobe color="#bfa76f" />{" "}
        <ContactLink href="https://nika-gold.net">
          https://nika-gold.net
        </ContactLink>
      </ContactItem>

      <SocialRow
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <ContactLink
          href="https://www.instagram.com/nika_gold_huping/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "#000",
            transition: "all 0.3s ease",
          }}
        >
          <FaInstagram size={18} color="#E4405F" />
          <span>Instagram</span>
        </ContactLink>

        <ContactLink
          href="https://www.facebook.com/nika.gold.420361/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "#000",
            transition: "all 0.3s ease",
          }}
        >
          <FaFacebook size={18} color="#1877F2" />
          <span>Facebook</span>
        </ContactLink>
      </SocialRow>
    </ContactContainer>
  );
};
export default ContactSection;
