import styled from "styled-components";

export const WishlistContainer = styled.div`
  width: 100%;
  // margin: 0 auto;
  padding: 10px 30px 40px;
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const WishlistItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 40px;
  border-bottom: 1px solid #ddd;
  ${(props) => props.$isLastItem && "padding-bottom: 40px;"}
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
  font-size: 20px;
  text-align: center;
  @media (max-width: 768px) {
    font-size: 16px;
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
export const AddToCartButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px 10px;
  font-size: 24px;
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;
export const AllButton = styled.div`
  display: flex;
  gap: 25px;
  @media (max-width: 768px) {
    gap: 10px;
  }
`;
