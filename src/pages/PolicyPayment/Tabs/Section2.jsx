import { Trans, useTranslation } from "react-i18next";

const Section2 = () => {
  const { t } = useTranslation();
  return (
    <section>
      <h2>{t("regulations.sections2.title")}</h2>

      <p>
        <Trans
          i18nKey="regulations.sections2.content_1"
          components={{ strong: <strong /> }}
        />
      </p>
      <p>
        <Trans
          i18nKey="regulations.sections2.content_2"
          components={{ strong: <strong /> }}
        />
      </p>
      <p>
        <Trans
          i18nKey="regulations.sections2.content_3"
          components={{ strong: <strong /> }}
        />
      </p>
      <p>
        <Trans
          i18nKey="regulations.sections2.content_4"
          components={{ strong: <strong /> }}
        />
      </p>
      <p>
        <Trans
          i18nKey="regulations.sections2.content_5"
          components={{ strong: <strong /> }}
        />
      </p>
      <p>
        <Trans
          i18nKey="regulations.sections2.content_6"
          components={{ strong: <strong /> }}
        />
      </p>
      <p>
        <Trans
          i18nKey="regulations.sections2.content_7"
          components={{ strong: <strong /> }}
        />
      </p>
      <p>
        <Trans
          i18nKey="regulations.sections2.content_8"
          components={{ strong: <strong /> }}
        />
      </p>
      <p>
        <Trans
          i18nKey="regulations.sections2.content_9"
          components={{ strong: <strong /> }}
        />
      </p>
      <p>
        <Trans
          i18nKey="regulations.sections2.content_10"
          components={{ strong: <strong /> }}
        />
      </p>
      <p>
        <Trans
          i18nKey="regulations.sections2.content_11"
          components={{ strong: <strong /> }}
        />
      </p>
    </section>
  );
};
export default Section2;
