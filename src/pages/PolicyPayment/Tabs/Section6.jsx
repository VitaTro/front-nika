import { useTranslation } from "react-i18next";

const Section6 = () => {
  const { t } = useTranslation();
  return (
    <section>
      <h2>{t("regulations.sections6.title")}</h2>

      <p>{t("regulations.sections6.content_1")}</p>
      <p>{t("regulations.sections6.content_2")}</p>
      <ul>
        <li>{t("regulations.sections6.content_list_1")}</li>
        <li>{t("regulations.sections6.content_list_2")}</li>
      </ul>

      <p>{t("regulations.sections6.content_3")}</p>
      <p>{t("regulations.sections6.content_4")}</p>
    </section>
  );
};
export default Section6;
