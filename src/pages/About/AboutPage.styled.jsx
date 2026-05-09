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
  font-size: 16px;
  font-family: "Noto Sans", sans-serif;
  margin: 8px 0;
  width: 80%;
  padding: 10px 0 10px 14px;
  position: relative;
  text-align: center;
  opacity: 0;
  animation: fadeIn 0.6s ease forwards;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  svg {
    margin-right: 10px;
    transition: all 0.3s ease;
  }

  svg:hover {
    filter: drop-shadow(0 0 4px #bfa76f);
    transform: scale(1.12);
  }

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
  }
`;

export const ContactLink = styled.a`
  color: ${({ theme }) => (theme.isDarkMode ? "#fff" : "#000")};
  text-decoration: none;
  font-size: ${({ size }) => size || "16px"};
  transition: all 0.3s ease;

  &:hover {
    color: #bfa76f;
    text-decoration: underline;
  }
`;

export const SocialRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  margin-top: 20px;
  padding-top: 10px;
  border-top: 1px solid #bfa76f;

  a {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    color: ${({ theme }) => (theme.isDarkMode ? "#fff" : "#000")};
    transition: all 0.3s ease;

    &:hover {
      color: #bfa76f;
      transform: translateY(-2px);
    }

    svg {
      transition: all 0.3s ease;
    }

    &:hover svg {
      filter: drop-shadow(0 0 4px #bfa76f);
      transform: scale(1.1);
    }
  }
`;
