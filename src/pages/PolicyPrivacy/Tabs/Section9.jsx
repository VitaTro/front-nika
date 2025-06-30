import { Trans, useTranslation } from "react-i18next";

const Section9 = () => {
  const { t } = useTranslation();
  return (
    <section>
      <h2>{t("privacy_policy.section9.title")}</h2>
      <p>
        <Trans
          i18nKey="privacy_policy.section9.content_1"
          components={{ strong: <strong /> }}
        />
      </p>
      <h3>{t("privacy_policy.section9.subtitle")}</h3>
      <p>{t("privacy_policy.section9.subtitle_content_1")}</p>
      <p>{t("privacy_policy.section9.subtitle_content_2")}</p>
      <h3>{t("privacy_policy.section9.subtitle_1")}</h3>
      <p>{t("privacy_policy.section9.subtitle_content_11")}</p>
      <ul>
        <li>{t("privacy_policy.section9.list_content_1")}</li>
        <li>{t("privacy_policy.section9.list_content_2")}</li>
      </ul>
      <p>{t("privacy_policy.section9.subtitle_content_12")}</p>
      <ul>
        <li>{t("privacy_policy.section9.list_content_3")}</li>
        <li>{t("privacy_policy.section9.list_content_4")}</li>
        <li>{t("privacy_policy.section9.list_content_5")}</li>
        <li>{t("privacy_policy.section9.list_content_6")}</li>
        <li>{t("privacy_policy.section9.list_content_7")}</li>
      </ul>
    </section>
  );
};

export default Section9;
