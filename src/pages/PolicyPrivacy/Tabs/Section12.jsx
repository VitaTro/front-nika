import { useTranslation } from "react-i18next";

const Section12 = () => {
  const { t } = useTranslation();
  return (
    <section>
      <h2>{t("privacy_policy.section12.title")}</h2>
      <p>{t("privacy_policy.section12.content_1")}</p>
      <address>
        <p>Nika Gold</p>
        <p> Polska, ul. Świeradowska 51-57, 50-559 Wrocław</p>
      </address>
    </section>
  );
};

export default Section12;
