import styled from "styled-components";
export const ProductAction = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: 1110px) and (min-width: 480px) {
    gap: 15px;
    justify-content: center;
  }

  @media (max-width: 479px) {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
`;
export const ProductCardContainer = styled.div`
  flex: 1 1 300px;
  max-width: 1200px;
  overflow: hidden;
  border: 1px solid ${(props) => (props.theme.$isDarkMode ? "#555" : "#ccc")};
  padding: 20px;
  border-radius: 10px;
  background-color: ${(props) => (props.theme.$isDarkMode ? "#222" : "#fff")};
  color: ${(props) => (props.theme.$isDarkMode ? "#fff" : "#000")};
  transition: all 0.3s ease;
  position: relative;
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
  padding: 5px 30px;
  font-size: 14px;
  margin: 0 2px;
  // margin-top: -30px;
  cursor: pointer;
  font-family: "Noto Sans", sans-serif;
  &:hover {
    background-color: #e0e0e0;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
export const ItemPrice = styled.p`
  font-size: 18px;
  font-family: "Cinzel Decorative", serif;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 10px 0;
  text-align: center;
`;

export const ButtonDetailsWrapper = styled.div`
  margin-top: 0;
  display: flex;
  justify-content: center;
  width: 100%;
`;
export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const LogoOverlay = styled.img`
  position: absolute;
  top: 8px;
  left: 8px;
  width: 50px;
  opacity: 0.9;
  z-index: 10;
  pointer-events: none;
`;
export const PromoStar = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background: radial-gradient(circle at center, #ff3b3b 0%, #b30000 90%);
  color: white;
  font-weight: 900;
  font-size: 22px;
  padding: 12px 18px;
  border-radius: 50%;
  box-shadow: 0 0 15px rgba(255, 0, 0, 0.4);
  transform: rotate(-45deg);
  text-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
  letter-spacing: 1px;
  z-index: 20;
  animation: sparkle 2s infinite;

  @keyframes sparkle {
    0%,
    100% {
      filter: brightness(1);
    }
    50% {
      filter: brightness(1.4);
    }
  }
`;
