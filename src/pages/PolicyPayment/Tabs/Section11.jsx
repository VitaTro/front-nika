import { useTranslation } from "react-i18next";

const Section11 = () => {
  const { t } = useTranslation();
  return (
    <section>
      <h2>{t("regulations.sections11.title")}</h2>
      <p>{t("regulations.sections11.content_1")}</p>
      <p>{t("regulations.sections11.content_2")}</p>
      <p>{t("regulations.sections11.content_3")}</p>
      <p>{t("regulations.sections11.content_4")}</p>
    </section>
  );
};
export default Section11;
