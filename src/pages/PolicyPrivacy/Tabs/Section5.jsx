import { Trans, useTranslation } from "react-i18next";

const Section5 = () => {
  const { t } = useTranslation();
  return (
    <section>
      <h2>{t("privacy_policy.section5.title")}</h2>
      <p>
        <Trans
          i18nKey="privacy_policy.section5.content_1"
          components={{ strong: <strong /> }}
        />
      </p>

      <p>{t("privacy_policy.section5.content_2")}</p>

      <p>{t("privacy_policy.section5.content_3")}</p>
    </section>
  );
};
export default Section5;
