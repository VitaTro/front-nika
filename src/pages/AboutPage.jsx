import { useTranslation } from "react-i18next";
import {
  HeaderForm,
  ItemForm,
} from "../components/AuthForm/AuthFormRegister.styled";
const AboutPage = () => {
  const { t } = useTranslation();

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      {/* <Header /> */}

      <HeaderForm>{t("about_us")}</HeaderForm>
      <ItemForm>{t("about_info")}</ItemForm>
      <HeaderForm>{t("contact_us")}</HeaderForm>
      <ItemForm>{t("contact_info")}</ItemForm>
    </div>
  );
};
export default AboutPage;
