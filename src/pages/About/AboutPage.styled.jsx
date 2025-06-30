import styled from "styled-components";

export const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  @media (max-width: 1024px) {
    padding: 0 15px;
  }

  @media (max-width: 768px) {
    padding: 0 10px;
  }
`;

export const BlockContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  max-width: 900px;
  text-align: left;
  @media (max-width: 1024px) {
    max-width: 800px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    max-width: 100%;
  }
`;

export const BlockContainerSecond = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  max-width: 900px;
  text-align: left;
  flex-direction: row-reverse;

  @media (max-width: 1024px) {
    max-width: 800px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    max-width: 100%;
  }
`;
export const TextContainer = styled.div`
  max-width: 600px;
  flex: 1;
  text-align: justify;
  @media (max-width: 768px) {
    text-align: center;
    text-align: justify;
    max-width: 100%;
  }
`;
export const AboutHeader = styled.h4`
  font-family: "Noto Sans", sans-serif;
  font-size: 20px;
  font-weight: 600;
  @media (min-width: 928px and max-width: 1024px) {
    font-size: 18px;
    font-weight: 500;
  }

  @media (min-width: 768px max-width: 927px) {
    font-size: 16px;
    font-weight: 500;
  }
  @media (min-width: 468px max-width: 767px) {
    font-size: 14px;
    font-weight: 400;
  }
`;
export const AboutItem = styled.p`
  font-family: "Noto Sans", sans-serif;
  font-size: 16px;
  @media (min-width: 928px and max-width: 1024px) {
    font-size: 14px;
  }

  @media (min-width: 768px max-width: 927px) {
    font-size: 14x;
  }
  @media (min-width: 468px max-width: 767px) {
    font-size: 12px;
  }
`;
export const AboutItemStrong = styled.strong`
  font-family: "Noto Sans", sans-serif;
  font-size: 18px;
  @media (min-width: 928px and max-width: 1024px) {
    font-size: 16px;
  }

  @media (min-width: 768px max-width: 927px) {
    font-size: 14x;
  }
  @media (min-width: 468px max-width: 767px) {
    font-size: 12px;
  }
`;
export const ImageOne = styled.img`
  border-radius: 10px;
  width: auto;
  height: 270px;
  @media (min-width: 928px and max-width: 1024px) {
    width: auto;
    height: 230px;
  }

  @media (min-width: 768px max-width: 927px) {
    width: auto;
    height: 170px;
  }
  @media (min-width: 468px max-width: 767px) {
    width: auto;
    height: 140px;
  }
`;
export const ImageTwo = styled.img`
  width: auto;
  height: 350px;
  border-radius: 10px;

  @media (max-width: 1024px) {
    height: 300px;
  }

  @media (max-width: 768px) {
    height: 270px;
  }

  @media (max-width: 468px) {
    height: 230px;
  }
`;

export const ContactContainer = styled.div`
  padding: 80px;
  margin: 0 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 20px;
  font-family: "Noto Sans", sans-serif;
  color: ${({ theme }) => (theme.isDarkMode ? "#fff" : "#000")};

  @media (max-width: 1024px) {
    padding: 50px;
  }

  @media (max-width: 768px) {
    padding: 30px;
    margin: 0 10px;
    width: 95%;
  }

  @media (max-width: 480px) {
    padding: 20px;
    margin: 0 2px;
    width: 90%;
  }
`;

export const ContactItem = styled.div`
  font-size: 18px;
  font-family: "Noto Sans", sans-serif;
  margin: 5px 0;
  color: ${({ theme }) => (theme.isDarkMode ? "#fff" : "#000")};
  padding-bottom: 10px;
  width: 80%;
  text-align: center;

  @media (max-width: 1024px) {
    font-size: 17px;
    width: 90%;
  }

  @media (max-width: 768px) {
    font-size: 15px;
    width: 95%;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    width: 100%;
    padding-bottom: 5px;
  }
`;
export const ContactLink = styled.a`
  color: ${({ theme }) => (theme.isDarkMode ? "#fff" : "#000")};
  text-decoration: none;
  font-size: ${({ size }) => size || "16px"};
  position: relative;
  top: ${({ top }) => top || "0"};

  &:hover {
    text-decoration: underline;
  }
`;

export const SocialRow = styled(ContactItem)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;
