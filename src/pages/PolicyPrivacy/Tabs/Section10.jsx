import { useTranslation } from "react-i18next";

const Section10 = () => {
  const { t } = useTranslation();
  return (
    <section>
      <h2>{t("privacy_policy.section10.title")}</h2>
      <p>{t("privacy_policy.section10.content_1")}</p>
      <p>{t("privacy_policy.section10.content_2")}</p>
    </section>
  );
};

export default Section10;
