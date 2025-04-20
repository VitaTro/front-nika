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
`;

export const ProductPrice = styled.span`
  flex: 1;
  font-size: 16px;
  text-align: center;
`;

export const RemoveButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px 10px;
  font-size: 24px;
`;

export const AllButton = styled.div`
  display: flex;
  gap: 25px;
`;
export const ShoppingActions = styled.div``;
