import { useTranslation } from "react-i18next";

const Section1 = () => {
  const { t } = useTranslation();
  return (
    <section>
      <h2>{t("regulations.sections1.title")}</h2>

      <p>{t("regulations.sections1.content_1")}</p>
      <p>{t("regulations.sections1.content_2")}</p>
      <p>{t("regulations.sections1.content_3")}</p>
      <p>{t("regulations.sections1.content_4")}</p>
      <ul>
        <li>{t("regulations.sections1.content_list_1")}</li>
        <li>{t("regulations.sections1.content_list_2")}</li>
        <li>{t("regulations.sections1.content_list_3")}</li>
        <li>{t("regulations.sections1.content_list_4")}</li>
      </ul>
    </section>
  );
};
export default Section1;
