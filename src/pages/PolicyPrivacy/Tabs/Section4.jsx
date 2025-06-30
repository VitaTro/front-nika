import { Trans, useTranslation } from "react-i18next";

const Section4 = () => {
  const { t } = useTranslation();
  return (
    <section>
      <h2>{t("privacy_policy.section4.title")}</h2>
      <p>
        <Trans
          i18nKey="privacy_policy.section4.content_1"
          components={{ strong: <strong /> }}
        />
      </p>

      <p>
        {t("privacy_policy.section4.content_2")}{" "}
        <strong>
          <a href="/policy-cookies">{t("cookies_notice")}</a>
        </strong>{" "}
        .
      </p>

      <p>{t("privacy_policy.section4.content_3")}</p>

      <ul>
        <li> {t("privacy_policy.section4.list_1")}</li>
        <li> {t("privacy_policy.section4.list_2")}</li>
        <li> {t("privacy_policy.section4.list_3")}</li>
      </ul>
    </section>
  );
};
export default Section4;
