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

const TermsPolicy = () => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Section>
        <h2>{t("terms.title")}</h2>

        <h3>{t("terms.section1.title")}</h3>
        <p>{t("terms.section1.p1")}</p>
        <p>{t("terms.section1.p2")}</p>

        <h3>{t("terms.section2.title")}</h3>
        <p>{t("terms.section2.p1")}</p>
        <p>{t("terms.section2.p2")}</p>

        <h3>{t("terms.section3.title")}</h3>
        <p>{t("terms.section3.p1")}</p>
        <ul>
          {t("terms.section3.list", { returnObjects: true }).map(
            (item, index) => (
              <li key={index}>{item}</li>
            ),
          )}
        </ul>

        <h3>{t("terms.section4.title")}</h3>
        <p>{t("terms.section4.p1")}</p>
        <ul>
          {t("terms.section4.list", { returnObjects: true }).map(
            (item, index) => (
              <li key={index}>{item}</li>
            ),
          )}
        </ul>

        <h3>{t("terms.section5.title")}</h3>
        <p>{t("terms.section5.p1")}</p>

        <h3>{t("terms.section6.title")}</h3>
        <p dangerouslySetInnerHTML={{ __html: t("terms.section6.p1") }} />

        <h3>{t("terms.section7.title")}</h3>
        <p>{t("terms.section7.p1")}</p>

        <h3>{t("terms.section8.title")}</h3>
        <p>{t("terms.section8.p1")}</p>

        <h3>{t("terms.section9.title")}</h3>
        <p>{t("terms.section9.p1")}</p>
      </Section>
    </Wrapper>
  );
};

export default TermsPolicy;
