import { useTranslation } from "react-i18next";

const Section8 = () => {
  const { t } = useTranslation();
  return (
    <section>
      <h2>{t("regulations.sections8.title")}</h2>
      <p>{t("regulations.sections8.content_1")}</p>
      <p>{t("regulations.sections8.content_2")}</p>
      <p>{t("regulations.sections8.content_3")}</p>
      <p>{t("regulations.sections8.content_4")}</p>
      <p>{t("regulations.sections8.content_5")}</p>
      <p>{t("regulations.sections8.content_6")}</p>
      <p>{t("regulations.sections8.content_7")}</p>
      <p>{t("regulations.sections8.content_8")}</p>
      <p>{t("regulations.sections8.content_9")}</p>
      <p>{t("regulations.sections8.content_10")}</p>
    </section>
  );
};
export default Section8;
