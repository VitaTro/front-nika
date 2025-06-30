import { Trans, useTranslation } from "react-i18next";

const GeneralPolicy = () => {
  const { t } = useTranslation();
  return (
    <section>
      <h2>{t("privacy_policy.summary.title")}</h2>
      <p>
        <Trans
          i18nKey="privacy_policy.summary.last_updated"
          components={{ strong: <strong /> }}
        />
      </p>
      <p>
        <Trans
          i18nKey="privacy_policy.summary.intro"
          components={{ em: <em /> }}
        />
      </p>
      <p>
        <Trans
          i18nKey="privacy_policy.summary.questions"
          components={{ strong: <strong /> }}
        />
      </p>
      <h2>{t("privacy_policy.summary.summary_title")}</h2>
      <p>
        <Trans
          i18nKey="privacy_policy.summary.summary_intro"
          components={{ em: <em /> }}
        />
      </p>
      <h3>{t("privacy_policy.summary.summary_subtitle")}</h3>
      <p>
        <Trans
          i18nKey="privacy_policy.summary.what_info"
          components={{ a: <a /> }}
        />
      </p>
      <h3>{t("privacy_policy.summary.summary_subtitle_1")}</h3>
      <p>{t("privacy_policy.summary.sensitive_info")}</p>

      <h3>{t("privacy_policy.summary.summary_subtitle_2")}</h3>
      <p>
        <Trans
          i18nKey="privacy_policy.summary.third_parties"
          components={{ a: <a /> }}
        />
      </p>
      <h2>{t("privacy_policy.summary.summary_title_1")}</h2>
      <p>
        <Trans
          i18nKey="privacy_policy.summary.how_process"
          components={{ a: <a /> }}
        />
      </p>

      <h2>{t("privacy_policy.summary.summary_title_2")}</h2>

      <p>
        <Trans
          i18nKey="privacy_policy.summary.who_share"
          components={{ a: <a /> }}
        />
      </p>

      <h2> {t("privacy_policy.summary.summary_title_3")}</h2>
      <p>
        <Trans
          i18nKey="privacy_policy.summary.your_rights"
          components={{ a: <a /> }}
        />
      </p>

      <h2> {t("privacy_policy.summary.summary_title_4")}</h2>

      <p> {t("privacy_policy.summary.exercise_rights")}</p>

      <p>
        <Trans
          i18nKey="privacy_policy.summary.learn_more"
          components={{ a: <a /> }}
        />
      </p>
    </section>
  );
};
export default GeneralPolicy;
