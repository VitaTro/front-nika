import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { FooterItem } from "./Footer.styled";

const Footer = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const { t, i18n } = useTranslation();
  return (
    <FooterItem
      style={{
        backgroundColor: isDarkMode ? "#212521" : "#F8FFF8",
        color: isDarkMode ? "#fff" : "#000",
      }}
    >
      © 2025
      <a href="https://github.com/VitaTro"> Vita Tro </a>.{t("reserved")}.
    </FooterItem>
  );
};
export default Footer;
