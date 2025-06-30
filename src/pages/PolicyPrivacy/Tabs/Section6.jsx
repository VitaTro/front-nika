import { Trans, useTranslation } from "react-i18next";

const Section6 = () => {
  const { t } = useTranslation();
  return (
    <section>
      <h2>{t("privacy_policy.section6.title")}</h2>
      <p>
        <Trans
          i18nKey="privacy_policy.section6.content_1"
          components={{ strong: <strong /> }}
        />
      </p>

      <p>{t("privacy_policy.section6.content_2")}</p>

      <p>{t("privacy_policy.section6.content_3")}</p>
    </section>
  );
};
export default Section6;
