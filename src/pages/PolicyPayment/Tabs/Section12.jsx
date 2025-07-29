import { useTranslation } from "react-i18next";

const Section12 = () => {
  const { t } = useTranslation();
  return (
    <section>
      <h2>{t("regulations.sections12.title")}</h2>
      <p>{t("regulations.sections12.content_1")}</p>
      <p>{t("regulations.sections12.content_2")}</p>
      <p>{t("regulations.sections12.content_3")}</p>
      <p>{t("regulations.sections12.content_4")}</p>
      <p>{t("regulations.sections12.content_5")}</p>
    </section>
  );
};
export default Section12;
