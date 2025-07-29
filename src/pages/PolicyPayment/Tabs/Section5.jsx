import { useTranslation } from "react-i18next";

const Section5 = () => {
  const { t } = useTranslation();
  return (
    <section>
      <h2>{t("regulations.sections5.title")}</h2>

      <p>{t("regulations.sections5.content_1")}</p>
      <ul>
        <li>{t("regulations.sections5.content_list_1")}</li>
        <li>{t("regulations.sections5.content_list_2")}</li>
      </ul>
      <p>{t("regulations.sections5.content_2")}</p>
      <p>{t("regulations.sections5.content_3")}</p>
      <p>{t("regulations.sections5.content_4")}</p>

      <p>{t("regulations.sections5.content_5")}</p>
    </section>
  );
};
export default Section5;
