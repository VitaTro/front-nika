import { useTranslation } from "react-i18next";

const Section13 = () => {
  const { t } = useTranslation();
  return (
    <section>
      <h2>{t("privacy_policy.section13.title")}</h2>
      <p>{t("privacy_policy.section13.content_1")}</p>

      <p>
        {t("privacy_policy.section13.content_2")}
        <a href="/data-access-request">/data-access-request</a>
      </p>
    </section>
  );
};

export default Section13;
