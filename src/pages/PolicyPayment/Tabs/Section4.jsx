import { useTranslation } from "react-i18next";

const Section4 = () => {
  const { t } = useTranslation();
  return (
    <section>
      <h2>{t("regulations.sections4.title")}</h2>

      <p>{t("regulations.sections4.content_1")}</p>
      <p>{t("regulations.sections4.content_2")}</p>
      <p>{t("regulations.sections4.content_3")}</p>
      <p>{t("regulations.sections4.content_4")}</p>
      <ul>
        <li>{t("regulations.sections4.content_list_1")}</li>
        <li>{t("regulations.sections4.content_list_2")}</li>
        <li>{t("regulations.sections4.content_list_3")}</li>
      </ul>
      <p>{t("regulations.sections4.content_5")}</p>
      <p>{t("regulations.sections4.content_6")}</p>
    </section>
  );
};
export default Section4;
