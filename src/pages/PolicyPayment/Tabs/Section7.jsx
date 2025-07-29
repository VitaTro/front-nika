import { Trans, useTranslation } from "react-i18next";

const Section7 = () => {
  const { t } = useTranslation();
  return (
    <section>
      <h2>{t("regulations.sections7.title")}</h2>
      <p>
        {" "}
        <Trans
          i18nKey="regulations.sections7.content_1"
          components={{ strong: <strong /> }}
        />
      </p>
      <p>{t("regulations.sections7.content_2")}</p>
      <p>{t("regulations.sections7.content_3")}</p>
      <p>
        {" "}
        <Trans
          i18nKey="regulations.sections7.content_4"
          components={{ strong: <strong /> }}
        />
      </p>
      <p>
        {" "}
        <Trans
          i18nKey="regulations.sections7.content_5"
          components={{ strong: <strong /> }}
        />{" "}
        <a href="mailto:huping.nika.gold@gmail.com">
          huping.nika.gold@gmail.com
        </a>
      </p>
      <p>
        {" "}
        <Trans
          i18nKey="regulations.sections7.content_6"
          components={{ strong: <strong /> }}
        />
      </p>
      <p>{t("regulations.sections7.content_7")}</p>
      <p>
        {" "}
        <Trans
          i18nKey="regulations.sections7.content_8"
          components={{ strong: <strong /> }}
        />
      </p>
      <p>
        {" "}
        <Trans
          i18nKey="regulations.sections7.content_9"
          components={{ strong: <strong /> }}
        />
      </p>
      <p>{t("regulations.sections7.content_10")}</p>
      <ul>
        <li>{t("regulations.sections7.content_list_1")}</li>
        <li>{t("regulations.sections7.content_list_2")}</li>
        <li>{t("regulations.sections7.content_list_3")}</li>
      </ul>
      <p>
        {" "}
        <Trans
          i18nKey="regulations.sections7.content_11"
          components={{ strong: <strong /> }}
        />
      </p>
      <p>
        {" "}
        <Trans
          i18nKey="regulations.sections7.content_12"
          components={{ strong: <strong /> }}
        />
      </p>
    </section>
  );
};
export default Section7;
