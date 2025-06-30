import { useTranslation } from "react-i18next";
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

const CookiesPolicy = () => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Section>
        <h2>{t("cookies_policy.title")}</h2>
        <p>{t("cookies_policy.intro")}</p>

        <h3>{t("cookies_policy.what_are")}</h3>
        <p>{t("cookies_policy.what_are_text")}</p>
        <ul>
          {t("cookies_policy.list_what_are", { returnObjects: true }).map(
            (item, index) => (
              <li key={index}>{item}</li>
            )
          )}
        </ul>

        <h3>{t("cookies_policy.types")}</h3>
        <ul>
          {t("cookies_policy.type_list", { returnObjects: true }).map(
            (item, index) => (
              <li key={index}>{item}</li>
            )
          )}
        </ul>

        <h3>{t("cookies_policy.management")}</h3>
        <p>{t("cookies_policy.management_text")}</p>

        <h3>{t("cookies_policy.contact")}</h3>
        <p>{t("cookies_policy.contact_text")}</p>
      </Section>
    </Wrapper>
  );
};

export default CookiesPolicy;
