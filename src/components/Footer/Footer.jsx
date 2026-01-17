import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import ContactModal from "../DataRequest/ContactModal";
import {
  DevNote,
  FooterBottom,
  FooterLink,
  FooterSection,
  FooterTitle,
  FooterWrapper,
  SocialLinks,
} from "./Footer.styled";
const Footer = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  return (
    <FooterWrapper>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          rowGap: "24px",
        }}
      >
        <FooterSection>
          <FooterTitle>NIKA GOLD</FooterTitle>
          <div>{t("jewelry")}</div>
          <SocialLinks>
            <a
              href="https://www.instagram.com/nika_gold_huping/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://www.facebook.com/nika.gold.420361/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <FaFacebook size={20} />
            </a>
          </SocialLinks>
          <DevNote>
            developed by{" "}
            <a
              href="https://github.com/VitaTro"
              target="_blank"
              rel="noreferrer"
            >
              VT
            </a>
          </DevNote>
        </FooterSection>

        <FooterSection>
          <FooterTitle>{t("info")}</FooterTitle>
          <FooterLink to="/about">{t("about")}</FooterLink>
          <FooterLink to="/products">{t("products")}</FooterLink>
          <FooterLink to="/policy-payment">{t("payment")}</FooterLink>
          <FooterLink to="/policy-privacy">{t("privacy")}</FooterLink>
          <FooterLink to="/policy-returns">{t("returns")}</FooterLink>
          <FooterLink to="/policy-cookies">{t("cookies")}</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>{t("contact")}</FooterTitle>
          <FooterLink onClick={() => setOpen(true)}>
            {t("contact_admin")}
          </FooterLink>

          <ContactModal open={open} handleClose={() => setOpen(false)} />
          <a href="tel:+48516174555">+48 516 174 555</a>
        </FooterSection>
      </div>
      <FooterBottom>
        <DevNote>{t("footer.legal_info")}</DevNote>
        <DevNote>
          ©2025 - {new Date().getFullYear()}
          {t("footer.rights_reserved")}
        </DevNote>
      </FooterBottom>
    </FooterWrapper>
  );
};

export default Footer;
