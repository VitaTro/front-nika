import { Trans, useTranslation } from "react-i18next";
import styled from "styled-components";
const Wrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: "Noto Sans", sans-serif;
  color: ${({ theme }) => (theme.isDarkMode ? "#fff" : "#000")};
`;

const Section = styled.section`
  margin-bottom: 40px;

  h2 {
    font-size: 28px;
    margin-bottom: 20px;
  }

  h3 {
    font-size: 20px;
    margin-top: 20px;
  }

  p,
  li {
    font-size: 16px;
    line-height: 1.6;
  }

  ul {
    padding-left: 20px;
  }
`;
const ReturnsPolicy = () => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <Section>
        <h2>{t("policy-returns.title")}</h2>
        <p>
          <Trans
            i18nKey="policy-returns.last_updated"
            components={{ strong: <strong /> }}
          />
        </p>
        <p> {t("policy-returns.content")}</p>
        <h3>{t("policy-returns.title_1")}</h3>
        <p>
          {" "}
          <Trans
            i18nKey="policy-returns.content_1"
            components={{ strong: <strong /> }}
          />
        </p>
        <h3>{t("policy-returns.title_2")}</h3>
        <ul>
          <li> {t("policy-returns.content_list_1")}</li>
          <li>{t("policy-returns.content_list_2")}</li>
          <li>{t("policy-returns.content_list_3")}</li>
        </ul>
        <h3>{t("policy-returns.title_3")}</h3>
        <ul>
          <li> {t("policy-returns.content_list_4")}</li>
          <li>{t("policy-returns.content_list_5")}</li>
          <li>{t("policy-returns.content_list_6")}</li>
        </ul>
        <h3>{t("policy-returns.title_6")}</h3>
        <ul>
          <li>{t("policy-returns.content_list_11")}</li>
          <li>{t("policy-returns.content_list_12")}</li>
          <li>
            {t("policy-returns.content_list_13")}
            <ul>
              <li>{t("policy-returns.content_list_14")}</li>
              <li>{t("policy-returns.content_list_15")}</li>
            </ul>
          </li>
        </ul>
        <h3>{t("policy-returns.title_4")}</h3>
        <p>
          <Trans
            i18nKey="policy-returns.content_2"
            components={{ strong: <strong /> }}
          />
        </p>
        <p> {t("policy-returns.content_3")}</p>
        <h3>{t("policy-returns.title_5")}</h3>
        <ol>
          <li>
            {" "}
            <Trans
              i18nKey="policy-returns.content_list_7"
              components={{ strong: <strong /> }}
            />{" "}
          </li>
          <li>
            {" "}
            <Trans
              i18nKey="policy-returns.content_list_8"
              components={{ strong: <strong /> }}
            />{" "}
          </li>
          <li>{t("policy-returns.content_list_9")}</li>
          <li>
            {" "}
            <Trans
              i18nKey="policy-returns.content_list_10"
              components={{ strong: <strong /> }}
            />{" "}
          </li>
        </ol>
        <h3>{t("policy-returns.title_7")}</h3>
        <p> {t("policy-returns.content_4")}</p>
        <ul>
          <li>{t("policy-returns.content_list_16")}</li>
          <li>{t("policy-returns.content_list_17")}</li>
        </ul>
        <h3>{t("policy-returns.content_5")}</h3>
      </Section>
    </Wrapper>
  );
};
export default ReturnsPolicy;
