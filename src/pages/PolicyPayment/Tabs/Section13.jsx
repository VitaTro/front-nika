import { useTranslation } from "react-i18next";
const Section13 = () => {
  const { t } = useTranslation();
  return (
    <section>
      <h2>{t("regulations.sections13.title")}</h2>
      <p>{t("regulations.sections13.content_1")}</p>
      <p>{t("regulations.sections13.content_2")}</p>
      <p>{t("regulations.sections13.content_3")}</p>
      <p>{t("regulations.sections13.content_4")}</p>
      <p>{t("regulations.sections13.content_5")}</p>
      <p>{t("regulations.sections13.content_6")}</p>
      <p>{t("regulations.sections13.content_7")}</p>
      <p>{t("regulations.sections13.content_8")}</p>
    </section>
  );
};
export default Section13;
