import styled from "styled-components";

export const WishlistContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  min-height: 100vh;
`;

export const WishlistItem = styled.div`
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
export const AddToCartButton = styled.button`
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
