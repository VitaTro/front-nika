import styled from "styled-components";
export const ProductAction = styled.div`
  display: flex;
  gap: 30px;
`;
export const ProductCardContainer = styled.div`
  border: 1px solid ${(props) => (props.theme.$isDarkMode ? "#555" : "#ccc")};
  padding: 20px;
  border-radius: 10px;
  background-color: ${(props) => (props.theme.$isDarkMode ? "#222" : "#fff")};
  color: ${(props) => (props.theme.$isDarkMode ? "#fff" : "#000")};
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 8px
      ${(props) =>
        props.theme.$isDarkMode
          ? "rgba(255, 255, 255, 0.2)"
          : "rgba(0, 0, 0, 0.1)"};
  }
`;
export const ProductsHeader = styled.h3`
  font-size: 18px;
  text-shadow: ${(props) =>
    props.theme.$isDarkMode
      ? "0 0 5px rgba(255, 255, 255, 0.8)"
      : "0 0 5px rgb(167, 182, 208)"};
  color: ${(props) => (props.theme.$isDarkMode ? "#fff" : "#4a5a77")};
`;
export const ButtonHeart = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  font-size: 24px; /* Розмір сердечка */
  color: ${(props) =>
    props.$isActive ? "red" : "gray"}; /* Червоне активне, сіре неактивне */
  outline: none;

  &:hover {
    color: ${(props) =>
      props.$isActive ? "darkred" : "black"}; /* Темніший колір при наведенні */
  }
`;
