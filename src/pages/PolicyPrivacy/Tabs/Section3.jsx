import { Trans, useTranslation } from "react-i18next";

const Section3 = () => {
  const { t } = useTranslation();
  return (
    <section>
      <h2>{t("privacy_policy.section3.title")}</h2>
      <p>
        <Trans
          i18nKey="privacy_policy.section3.content_1"
          components={{ strong: <strong /> }}
        />
      </p>

      <p>{t("privacy_policy.section3.content_2")}</p>

      <ul>
        <li>
          <Trans
            i18nKey="privacy_policy.section3.list_1"
            components={{ strong: <strong /> }}
          />
        </li>
        <li>
          <Trans
            i18nKey="privacy_policy.section3.list_2"
            components={{ strong: <strong /> }}
          />
        </li>
        <li>
          <Trans
            i18nKey="privacy_policy.section3.list_3"
            components={{ strong: <strong /> }}
          />
        </li>
      </ul>
    </section>
  );
};
export default Section3;
