import styled from "styled-components";

export const ShoppingContainer = styled.div`
  width: 90%;
  // margin: 0 auto;
  padding: 10px 30px;
  font-family: Arial, sans-serif;

  min-height: 100vh;
`;

export const ShoppingItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
`;
export const ProductImage = styled.img`
  max-width: 50px; /* Маленьке фото */
  height: auto;
  margin-right: 10px;
  cursor: pointer;
  &:focus {
    outline: none; /* Приберемо стандартний контур */
    transform: scale(2); /* Збільшення фото */
    transition: transform 0.3s ease; /* Плавне збільшення */
  }
`;

export const ProductName = styled.span`
  flex: 2;
  font-size: 16px;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export const ProductPrice = styled.span`
  flex: 1;
  font-size: 16px;
  text-align: center;
  margin-left: 20px;

  @media (max-width: 768px) {
    margin-left: 5px;
    font-size: 12px;
  }
`;

export const AllButton = styled.div`
  display: flex;
  gap: 25px;
  @media (max-width: 768px) {
    gap: 10px;
  }
`;
export const WishlistActions = styled.div`
  text-align: center;
`;

export const ItemHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  @media (max-width: 768px) {
    gap: 5px;
  }
`;
export const QuantityController = styled.div`
  align-items: center;
  display: flex;
  gap: 5px;
`;
export const ShoppingList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media (max-width: 768px) {
    gap: 10px;
  }
`;
export const ButtonHeart = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left: 10px;
  font-size: 24px;

  color: ${(props) =>
    props.$isActive ? "red" : "gray"}; /* Колір залежить від стану */

  &:hover {
    transform: scale(1.2); /* Легке збільшення при наведенні */
  }

  &:focus {
    outline: none; /* Прибираємо стандартний контур */
  }
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;
export const RemoveButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px 10px;
  font-size: 24px;
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;
export const ContainerCart = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
  @media (max-width: 768px) {
    gap: 10px;
  }
`;
export const ButtonQuantity = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px 10px;
  font-size: 16px;
  margin: 0 5px;
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.1);
  }
  @media (max-width: 768px) {
    padding: 3px 5px;
    font-size: 12px;
  }
`;
export const TotalHeader = styled.h3`
  font-family: "Noto Sans", sans-serif;
  font-size: 24px;
  font-weight: 500;
  text-align: right;
  color: gray;
  text-shadow: 0 0 5px rgb(167, 182, 208);
`;
export const TotalAmount = styled.span`
  color: black; /* Задаємо специфічний колір для суми */
  font-weight: bold; /* Наприклад, робимо суму жирною */
`;
