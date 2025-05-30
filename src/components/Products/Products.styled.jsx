import styled from "styled-components";

export const ProductsContainer = styled.div`
  text-align: center;
  padding: 20px 40px;
`;

export const ProductsHeader = styled.h3`
  font-size: 18px;
  text-shadow: ${(props) =>
    props.theme.$isDarkMode
      ? "0 0 5px rgba(255, 255, 255, 0.8)"
      : "0 0 5px rgb(167, 182, 208)"};
  color: ${(props) => (props.theme.$isDarkMode ? "#fff" : "#4a5a77")};
`;

export const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 1110px) and (min-width: 677px) {
    grid-template-columns: repeat(2, 1fr); /* Адаптивність для планшетів */
  }

  @media (max-width: 676px) {
    grid-template-columns: 1fr; /* Адаптивність для мобільних пристроїв */
  }
`;

export const ProductCard = styled.div`
  border: 1px solid ${(props) => (props.theme.$isDarkMode ? "#555" : "#ccc")};
  padding: 20px;
  border-radius: 10px;
  background-color: ${(props) => (props.theme.$isDarkMode ? "#222" : "#fff")};
  color: ${(props) => (props.theme.$isDarkMode ? "#fff" : "#000")};
  transition: all 0.3s ease;
  // max-width: 350px; /* 🔹 Обмежуємо ширину картки */
  // max-height: 450px; /* 🔹 Обмежуємо висоту картки */
  // display: flex;
  // flex-direction: column;
  // align-items: center; /* 🔹 Вирівнюємо елементи по центру */

  &:hover {
    box-shadow: 0 4px 8px
      ${(props) =>
        props.theme.$isDarkMode
          ? "rgba(255, 255, 255, 0.2)"
          : "rgba(0, 0, 0, 0.1)"};
  }
`;

export const ProductImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  aspect-ratio: 1 / 1;
  border-radius: 5px;
`;

export const WelcomeHeader = styled.h2`
  justify-content: center;
  display: flex;
  align-items: center;
  font-family: "Noto Sans", sans-serif;
  font-size: 42px;
  font-weight: 700;
  color: ${(props) => (props.theme.$isDarkMode ? "#fff" : "gray")};
  text-shadow: ${(props) =>
    props.theme.$isDarkMode
      ? "0 0 5px rgba(255, 255, 255, 0.8)"
      : "0 0 5px rgb(167, 182, 208)"};
`;

export const Tabs = styled.div`
  margin-bottom: 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  @media (max-width: 1110px) and (min-width: 677px) {
    display: grid;
    gap: 25px;
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 676px) {
    display: grid;
    gap: 25px;
    grid-template-columns: 1fr;
  }
`;

export const TabButton = styled.button`
  margin: 0 5px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background: ${(props) =>
    props.theme.$isDarkMode
      ? "linear-gradient(135deg, #555, #222)"
      : "linear-gradient(135deg, #add8e6, #4682b4)"};
  color: ${(props) => (props.theme.$isDarkMode ? "#fff" : "#000")};
  font-size: 18px;
  transition: background 0.3s ease;

  &:hover {
    background: ${(props) =>
      props.theme.$isDarkMode
        ? "linear-gradient(135deg, #666, #333)"
        : "linear-gradient(135deg, #4682b4, #add8e6)"};
  }

  &.active {
    background: ${(props) =>
      props.theme.$isDarkMode
        ? "linear-gradient(135deg, #666, #333)"
        : "linear-gradient(135deg, #4682b4, #add8e6)"};
  }
`;
export const ProductImageWithLightbox = styled.img`
  width: 100%;
  max-width: 300px; /* Запобігаємо розтягуванню фото */
  height: auto;
  max-height: 250px; /* Обмежуємо висоту */
  object-fit: contain; /* Запобігаємо обтинанню */
  border-radius: 5px;
`;
