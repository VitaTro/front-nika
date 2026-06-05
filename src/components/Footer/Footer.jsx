import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FaEnvelope,
  FaFacebook,
  FaIdCard,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhone,
  FaTiktok,
} from "react-icons/fa";
import { LuUser } from "react-icons/lu";

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
            <a
              href="https://www.tiktok.com/@vita.trojan_nikagold?_r=1&_t=ZN-96kCikAQFFe"
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok"
            >
              <FaTiktok size={20} />
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
          <FooterLink to="/policy-terms">{t("terms1")}</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>{t("contact")}</FooterTitle>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <LuUser size={16} color="#bfa76f" />
            <span>Nika Gold - Vitaliia Troian</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <FaMapMarkerAlt size={16} color="#bfa76f" />
            <span>ul. Świeradowska 51/57, 50-559 Wrocław</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <FaIdCard size={16} color="#bfa76f" />
            <span>NIP: 9121950449</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <FaPhone size={16} color="#bfa76f" />
            <a href="tel:+48516174555">+48 516 174 555</a>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <FaEnvelope size={16} color="#bfa76f" />
            <a href="mailto:huping.nika.gold@gmail.com">
              huping.nika.gold@gmail.com
            </a>
          </div>
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
