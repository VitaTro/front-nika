import { useTranslation } from "react-i18next";

const Section3 = () => {
  const { t } = useTranslation();
  return (
    <section>
      <h2>{t("regulations.sections3.title")}</h2>

      <p>{t("regulations.sections3.content_1")}</p>
      <p>{t("regulations.sections3.content_2")}</p>
      <p>{t("regulations.sections3.content_3")}</p>
      <p>{t("regulations.sections3.content_4")}</p>
      <p>{t("regulations.sections3.content_5")}</p>
      <p>{t("regulations.sections3.content_6")}</p>
    </section>
  );
};
export default Section3;
