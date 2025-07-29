import { useTranslation } from "react-i18next";

const Section9 = () => {
  const { t } = useTranslation();
  return (
    <section>
      <h2>{t("regulations.sections9.title")}</h2>
      <p>{t("regulations.sections9.content_1")}</p>
      <p>{t("regulations.sections9.content_2")}</p>
      <p>{t("regulations.sections9.content_3")}</p>
    </section>
  );
};
export default Section9;
