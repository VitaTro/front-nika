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
