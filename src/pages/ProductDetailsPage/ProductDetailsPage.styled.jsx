import styled from "styled-components";

export const DetailsContainer = styled.div`
  background-color: ${(props) => (props.theme.isDarkMode ? "#212121" : "#fff")};
  color: ${(props) => (props.theme.isDarkMode ? "#fff" : "#000")};
  padding: 20px;
  border-radius: 10px;
  max-width: 800px;
  margin: auto;
  text-align: center;
  position: relative;
`;
export const DetailsHeader = styled.h3`
  padding: 0;
  margin: 0 5px 20px;
  justify-content: center;
  display: flex;
  align-items: center;
  font-family: "Noto Sans", sans-serif;
  font-size: 30px;
  font-weight: 400;
  color: ${(props) => (props.theme.$isDarkMode ? "lightgray" : "gray")};
  background: ${(props) =>
    props.$isActive
      ? props.theme.$isDarkMode
        ? "linear-gradient(90deg, #8BC34A, #1B5E20)"
        : "linear-gradient(90deg, #91A1B8, #ECEFF1)"
      : "none"};
  background-clip: text;
  -webkit-background-clip: text;
  color: ${(props) => (props.$isActive ? "transparent" : "")};
  text-shadow: ${(props) =>
    props.$isActive
      ? props.theme.$isDarkMode
        ? "0 5px 15px rgba(123, 228, 10, 0.5), 0 0 10px rgba(255, 255, 255, 0.2)"
        : "0 0 12px rgba(167, 182, 208, 0.9)"
      : "0 0 6px rgba(0, 0, 0, 0.1)"};
  transition: all 0.5s ease-in-out;

  &:hover {
    transform: scale(1.01);
    text-shadow: ${(props) =>
      props.theme.$isDarkMode
        ? "0 10px 20px rgba(123, 228, 10, 0.7), 0 0 15px rgba(255, 255, 255, 0.4)"
        : "0 0 15px rgba(167, 182, 208, 1)"};
  }
`;

export const QuantityValue = styled.span`
  font-size: 18px;
  font-weight: 600;
  margin-left: 4px;
  color: red;
  transition: color 0.2s ease-in-out;
  @media (max-width: 480px) {
    font-size: 14px;
    font-weight: 400;
  }
`;
export const NumberValue = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: #302934;
  @media (max-width: 480px) {
    font-size: 14px;
  }
`;
export const PriceValue = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: #d4a017;
  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const CloseButton = styled.button`
  position: fixed;
  top: 100px;
  right: 280px;
  z-index: 999999;
  background: none;
  color: ${(props) => (props.theme.isDarkMode ? "#ff5555" : "#333")};
  border: none;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  &:hover {
    color: #ff5555;
  }
  @media (max-width: 768px) {
    top: 70px;
    right: 30px;
    width: 34px;
    height: 34px;
    font-size: 18px;
  }
`;

export const ProductImage = styled.img`
  max-width: ${({ $isZoomed }) => ($isZoomed ? "800px" : "300px")};
  height: auto;
  cursor: pointer;
  transition: max-width 0.3s ease-in-out;
  border-radius: 5px;
`;

export const InfoList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const InfoItem = styled.li`
  font-size: 14px;
  margin-bottom: 5px;
  color: ${(props) => (props.theme.isDarkMode ? "#bbb" : "#555")};
`;
export const DetailsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    align-items: center;
    text-align: center;
  }
`;
export const ImageContainer = styled.div`
  flex: 1;
  max-width: 400px;
`;

export const InfoContainer = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
