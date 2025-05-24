import styled from "styled-components";
export const ProductAction = styled.div`
  display: flex;
  gap: 20px;
  justify-content: space-between;
  flex-wrap: wrap;

  @media (max-width: 1110px) and (min-width: 677px) {
    gap: 15px;
    justify-content: center;
  }

  @media (max-width: 676px) {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
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
  @media (max-width: 676px) {
    padding: 15px;
  }

  @media (max-width: 1110px) and (min-width: 677px) {
    padding: 18px;
  }
`;
export const ProductsHeader = styled.h3`
  font-size: 18px;
  text-shadow: ${(props) =>
    props.theme.$isDarkMode
      ? "0 0 5px rgba(255, 255, 255, 0.8)"
      : "0 0 5px rgb(167, 182, 208)"};
  color: ${(props) => (props.theme.$isDarkMode ? "#fff" : "#4a5a77")};
  display: flex;
  justify-content: center;
`;

export const ButtonHeart = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left: 10px;
  font-size: 24px;

  color: ${(props) => (props.$isActive ? "red" : "gray")};

  &:hover {
    transform: scale(1.1);
  }

  &:focus {
    outline: none;
  }
`;

export const ButtonShopping = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-size: 24px;
  &:hover {
    transform: scale(1.1);
  }

  &:focus {
    outline: none;
  }
`;
export const ButtonQuantity = styled.button`
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 16px;
  margin: 0 5px;
  cursor: pointer;

  &:hover {
    background-color: #e0e0e0;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
export const ButtonDetails = styled.button`
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px 20px;
  font-size: 14px;
  margin: 0 5px;
  margin-top: 10px;
  cursor: pointer;

  &:hover {
    background-color: #e0e0e0;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
