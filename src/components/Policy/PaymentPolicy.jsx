import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import PolicyPaymentTabs from "../../pages/PolicyPayment/PolicyPaymentTabs";

const Wrapper = styled.div`
  max-width: 900px;

  padding: 20px 40px;
  font-family: "Noto Sans", sans-serif;
  color: ${({ theme }) => (theme.isDarkMode ? "#fff" : "#000")};
`;

const Section = styled.section`
  h2 {
    font-size: 22px;
    margin-bottom: 15px;
  }

  h3 {
    font-size: 18px;
    margin-top: 10px;
  }

  p,
  li {
    font-size: 12px;
    line-height: 1.2;
  }
`;
const PaymentPolicy = () => {
  return (
    <>
      <Helmet>
        <title>{t("meta.policies.title")}</title>
        <meta name="description" content={t("meta.policies.description")} />
      </Helmet>
      <Wrapper>
        <Section>
          <PolicyPaymentTabs />
        </Section>
      </Wrapper>
    </>
  );
};
export default PaymentPolicy;
