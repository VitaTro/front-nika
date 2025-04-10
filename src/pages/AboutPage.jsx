import React from "react";
import { useTranslation } from "react-i18next";
import {
  HeaderForm,
  ItemForm,
} from "../components/AuthForm/AuthFormRegister.styled";
import Header from "../components/Header/Header";
const AboutPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Header />
      <HeaderForm>{t("about_us")}</HeaderForm>
      <ItemForm>{t("about_info")}</ItemForm>
      <HeaderForm>{t("contact_us")}</HeaderForm>
      <ItemForm>{t("contact_info")}</ItemForm>
    </div>
  );
};
export default AboutPage;
