import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import deTranslations from "./Locales/de.json";
import enTranslations from "./Locales/en.json";
import plTranslations from "./Locales/pl.json";
import uaTranslations from "./Locales/ua.json";

const resources = {
  en: { translation: enTranslations },
  ua: { translation: uaTranslations },
  de: { translation: deTranslations },
  pl: { translation: plTranslations },
};
i18n.use(initReactI18next).init({
  resources,
  lng: "pl", // Мова за замовчуванням
  fallbackLng: "pl",
  interpolation: {
    escapeValue: false, // React вже екранує значення
  },
});

export default i18n;
