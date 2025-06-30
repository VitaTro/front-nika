import { Trans, useTranslation } from "react-i18next";

const Section2 = () => {
  const { t } = useTranslation();
  return (
    <section>
      <h2>{t("privacy_policy.section2.title")}</h2>
      <p>
        <Trans
          i18nKey="privacy_policy.section2.content_1"
          components={{ strong: <strong /> }}
        />
      </p>

      <p>{t("privacy_policy.section2.content_2")}</p>
    </section>
  );
};
export default Section2;
