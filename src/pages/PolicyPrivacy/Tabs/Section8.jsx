import { Trans, useTranslation } from "react-i18next";

const Section8 = () => {
  const { t } = useTranslation();
  return (
    <section>
      <h2>{t("privacy_policy.section8.title")}</h2>
      <p>
        <Trans
          i18nKey="privacy_policy.section8.content_1"
          components={{ strong: <strong /> }}
        />
      </p>
      <p>{t("privacy_policy.section8.content_2")}</p>
      <p>
        {t("privacy_policy.section8.content_3")}{" "}
        <a href="mailto:huping.nika.gold@gmail.com">
          huping.nika.gold@gmail.com
        </a>
      </p>
    </section>
  );
};

export default Section8;
