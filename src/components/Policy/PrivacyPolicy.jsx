import styled from "styled-components";
import PrivacyPolicyTabs from "../../pages/PolicyPrivacy/PrivacyPolicyTabs";

const Wrapper = styled.div`
  max-width: 900px;

  padding: 20px 10px;
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

const PrivacyPolicy = () => {
  return (
    <Wrapper>
      <Section>
        <PrivacyPolicyTabs />
      </Section>
    </Wrapper>
  );
};

export default PrivacyPolicy;
