import styled from "styled-components";

export const WishlistGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 24px;
  padding: 20px;
  justify-items: center;
`;

export const WishlistCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 16px;
  text-align: center;
  transition: all 0.3s ease;
  width: 100%;
  max-width: 280px;

  &:hover {
    transform: translateY(-4px);
    background: rgba(255, 255, 255, 0.95);
  }
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 12px;
`;

export const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
`;

export const ProductName = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #4a4a4a;
  margin: 0;
`;

export const ProductPrice = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: ${(props) => (props.$promo ? "#e63946" : "#000")};

  .regular {
    text-decoration: line-through;
    color: #888;
    font-size: 14px;
    margin-left: 6px;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 10px;
`;

export const AddToCartButton = styled.button`
  background: none;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 6px 10px;
  cursor: pointer;
  font-size: 20px;
  transition: all 0.3s ease;

  &:hover {
    border-color: #d4af37;
    color: #d4af37;
  }
`;

export const RemoveButton = styled(AddToCartButton)`
  &:hover {
    border-color: #e63946;
    color: #e63946;
  }
`;
export const ProductSizes = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 8px;
`;

export const SizeButton = styled.button`
  background: ${(props) => (props.$selected ? "#d4af37" : "transparent")};
  color: ${(props) => (props.$selected ? "#fff" : "#333")};
  border: 1px solid #ccc;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #d4af37;
    color: #d4af37;
  }
`;
