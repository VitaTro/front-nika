import styled from "styled-components";

export const GeneralOfflineOrder = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const LeftColumn = styled.div`
  width: 25%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const SearchBox = styled.input`
  width: 90%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const CategoryButton = styled.button`
  width: 100%;
  padding: 8px;
  margin-bottom: 5px;
  background-color: ${({ $selected }) => ($selected ? "#1976d2" : "#fff")};
  color: ${({ $selected }) => ($selected ? "#fff" : "#000")};
  border: 1px solid ${({ $selected }) => ($selected ? "#145a99" : "#1976d2")};
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
  font-weight: ${({ $selected }) => ($selected ? "bold" : "normal")};
  transition: 0.3s;
  &:hover {
    background-color: ${({ $selected }) => ($selected ? "#145a99" : "#f0f0f0")};
  }
`;

export const CartBox = styled.div`
  margin-top: 10px;
`;
export const CartGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  padding: 10px;
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const CartButton = styled.button`
  width: 100%;
  padding: 8px;
  margin-top: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #45a049;
  }
`;
export const RightColumn = styled.div`
  width: 75%;
  padding: 15px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 15px;
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const ProductCard = styled.div`
  width: 100%;
  max-width: 220px;
  min-height: 260px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  text-align: center;
  box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #fff;
  margin: 0 auto;
`;

export const ProductImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  margin: 0 auto;
  border-radius: 6px;
`;

export const ProductTitle = styled.p`
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const ProductCardShop = styled.div`
  width: 200px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  text-align: center;
  box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;
