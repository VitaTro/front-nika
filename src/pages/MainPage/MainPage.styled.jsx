import styled from "styled-components";

export const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: ${(props) => (props.theme.isDarkMode ? "#333" : "#fff")};
  color: ${(props) => (props.theme.isDarkMode ? "#fff" : "#333")};
`;

export const WelcomeMessage = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

export const InfoContainer = styled.div`
  font-size: 1.2rem;
  text-align: center;
  line-height: 1.5;
`;
export const ImageWork = styled.img`
  display: flex;
    text-align: center;
    justify-content: center;
    margin: 0 auto;
img {
      max-width: 100%; /* Зображення адаптується до контейнера */
      height: auto; /* Зберігає пропорції */
      @media (min-width: 1440px) {
        width: 800px; /* Для десктопів зі шириною більше 1440px */
        height: auto;
      }
      @media (max-width: 1024px) {
        width: 600px; /* Для планшетів */
        height: auto;
      }
      @media (max-width: 768px) {
        width: 420px; /* Для мобільних пристроїв */
        height: auto;
      }
`;
export const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px 0 60px;
  text-align: center;
`;

export const HeroBanner = styled.div`
  width: 100%;
  max-width: 800px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

export const HeroText = styled.div`
  margin-top: 24px;

  h1 {
    font-family: "Playfair Display", serif;
    font-size: 36px;
    color: #bfa76a;
    font-weight: 700;
    margin-bottom: 8px;
  }

  p {
    font-size: 18px;
    color: #444;
    font-weight: 500;
    margin-bottom: 16px;
  }

  .divider {
    display: block;
    width: 80px;
    height: 2px;
    background: linear-gradient(90deg, #d8c7a0, #bfa76a);
    margin: 0 auto 20px;
  }

  h2 {
    font-size: 28px;
    color: #bfa76a;
    font-weight: 700;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 28px;
    }
    p {
      font-size: 16px;
    }
    h2 {
      font-size: 22px;
    }
  }
`;

export const HomeTitle = styled.h1`
  font-family: "Playfair Display", serif;
  font-size: 22px;
  font-weight: 600;
  color: #bfa76a;
  margin: 30px auto 10px;
  max-width: 800px;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 26px;
  }
`;

export const HomeSeoText = styled.section`
  max-width: 800px;
  margin: 60px auto;
  font-size: 16px;
  line-height: 1.6;
  color: #555;
  text-align: center;

  p {
    margin-bottom: 16px;
  }
`;
