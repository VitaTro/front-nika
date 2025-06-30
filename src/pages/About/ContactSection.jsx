import { useTranslation } from "react-i18next";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { useSelector } from "react-redux";
import {
  ContactContainer,
  ContactItem,
  ContactLink,
  SocialRow,
} from "./AboutPage.styled";

const ContactSection = () => {
  const { t } = useTranslation();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
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
        ✉️{" "}
        <ContactLink href="mailto:huping.nika.gold@gmail.com">
          huping.nika.gold@gmail.com
        </ContactLink>
      </ContactItem>

      <ContactItem>📞 +48 516 174 555</ContactItem>
      <ContactItem>NIP 9121950449</ContactItem>

      <ContactItem>
        🌍{" "}
        <ContactLink href="https://nika-gold.net/main">
          https://nika-gold.net
        </ContactLink>
      </ContactItem>

      <ContactItem>
        🌍 <ContactLink href="https://nika-gold.net/">Nika Gold</ContactLink>
      </ContactItem>

      <SocialRow>
        <FaInstagram size={24} color="#E4405F" />
        <ContactLink
          href="https://www.instagram.com/nika_gold_huping/"
          size="18px"
          top="-2px"
        >
          Instagram
        </ContactLink>
      </SocialRow>

      <SocialRow>
        <FaFacebook size={24} color="#1877F2" />
        <ContactLink
          href="https://www.facebook.com/nika.gold.420361/"
          size="18px"
          top="-2px"
        >
          Facebook
        </ContactLink>
      </SocialRow>
    </ContactContainer>
  );
};
export default ContactSection;
