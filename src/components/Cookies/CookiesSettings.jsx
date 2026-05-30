import styled from "styled-components";

const Wrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: "Noto Sans", sans-serif;
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

  p {
    font-size: 16px;
    line-height: 1.6;
  }
`;

const CookiesSettings = () => {
  return (
    <Wrapper>
      <Section>
        <h2>Cookies Settings</h2>

        <p>
          On this page you can manage your cookie preferences. We only use
          essential cookies required for the website to function, and optional
          cookies that help us improve user experience.
        </p>

        <h3>Strictly Necessary Cookies</h3>
        <p>
          These cookies are required for the website to work properly. They
          cannot be disabled.
        </p>

        <h3>Analytics Cookies</h3>
        <p>
          These cookies help us understand how visitors interact with the site.
          Currently, analytics cookies are <strong>disabled</strong> unless you
          accept them in the cookie banner.
        </p>

        <h3>Marketing Cookies</h3>
        <p>We do not use marketing or advertising cookies on this website.</p>

        <h3>Change Your Consent</h3>
        <p>You can reset your cookie choice at any time:</p>

        <button
          onClick={() => {
            localStorage.removeItem("cookieConsent");
            window.location.reload();
          }}
          style={{
            padding: "10px 20px",
            borderRadius: "6px",
            border: "1px solid #00e0ff",
            background: "transparent",
            color: "#00e0ff",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Reset Cookie Consent
        </button>
      </Section>
    </Wrapper>
  );
};

export default CookiesSettings;
