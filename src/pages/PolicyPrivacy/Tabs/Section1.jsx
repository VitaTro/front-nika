import { Trans, useTranslation } from "react-i18next";

const Section1 = () => {
  const { t } = useTranslation();
  return (
    <section>
      <h2>{t("privacy_policy.section1.title")}</h2>
      <h3>{t("privacy_policy.section1.subtitle_1")}</h3>
      <Trans
        i18nKey="privacy_policy.section1.summary_1"
        components={{ strong: <strong /> }}
      />
      <p>{t("privacy_policy.section1.content_1")}</p>
      <p>
        <Trans
          i18nKey="privacy_policy.section1.sensitive_info"
          components={{ strong: <strong /> }}
        />
      </p>
      <p>
        <Trans
          i18nKey="privacy_policy.section1.accuracy"
          components={{ strong: <strong /> }}
        />
      </p>

      <h3>{t("privacy_policy.section1.subtitle_2")}</h3>
      <Trans
        i18nKey="privacy_policy.section1.summary_2"
        components={{ strong: <strong /> }}
      />
      <p>{t("privacy_policy.section1.content_2")}</p>

      <ul>
        <li>Device and usage information</li>
        <li>IP address</li>
        <li>Browser and device characteristics</li>
        <li>Operating system</li>
        <li>Language preferences</li>
        <li>Referring URLs</li>
        <li>Device name</li>
        <li>Country, location</li>
        <li>Information about how and when you use our Services</li>
        <li>Other technical information</li>
      </ul>

      <p>{t("privacy_policy.section1.purpose")}</p>
      <p>{t("privacy_policy.section1.cookies")}</p>
    </section>
  );
};
export default Section1;
