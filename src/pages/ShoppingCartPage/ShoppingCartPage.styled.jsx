import styled from "styled-components";

export const ShoppingContainer = styled.div`
  width: 100%;
  // margin: 0 auto;
  padding: 10px 30px 40px;
  font-family: Arial, sans-serif;
  background-color: #fffdf6;
  min-height: 100vh;
  @media (max-width: 768px) {
    padding: 8px 10px 30px;
  }
`;

export const ShoppingItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 40px;
  border-bottom: 1px solid #ddd;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition:
    box-shadow 0.2s ease,
    transform 0.2s ease;
  @media (max-width: 768px) {
    padding: 4px 10px;
    flex-wrap: wrap;
    gap: 8px;
  }
`;
export const ProductImage = styled.img`
  max-width: 50px;
  height: auto;
  margin-right: 10px;
  cursor: pointer;
  &:focus {
    outline: none;
    transform: scale(2);
    transition: transform 0.3s ease;
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
  margin-left: 20px;

  @media (max-width: 768px) {
    margin-left: 2px;
    font-size: 12px;
  }
`;

export const AllButton = styled.div`
  display: flex;
  gap: 25px;
  @media (max-width: 768px) {
    gap: 6px;
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
  gap: 4px;

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
  color: ${(props) => (props.$isActive ? "red" : "gray")};
  &:hover {
    transform: scale(1.1);
  }
  &:focus {
    outline: none;
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
    gap: 6px;
    flex-wrap: wrap;
    justify-content: flex-start;
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
  padding-right: 40px;
  text-align: right;
  color: gray;
  // text-shadow: 0 0 5px rgb(167, 182, 208);
`;
export const TotalAmount = styled.span`
  // color: black;
  font-weight: bold;
`;
export const ButtonOrder = styled.button`
  padding: 12px 20px;
  font-size: 16px;
  background-color: #ff8c00;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 40px;
`;
export const QuantityValueCart = styled.span`
  font-size: 14px;
  font-weight: 600;
  margin-left: 4px;
  color: red;
  transition: color 0.2s ease-in-out;
  @media (max-width: 480px) {
    font-size: 10px;
    font-weight: 400;
  }
`;
export const QuantityValueCartDesktop = styled.div`
  font-size: 0.85rem;
  color: red;
  text-align: left;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const QuantityValueCartMobile = styled.div`
  font-size: 0.85rem;
  color: red;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  margin-top: 6px;

  @media (min-width: 769px) {
    display: none;
  }
`;
export const CartLayout = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 60px;
  padding: 0 40px 40px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    padding: 20px;
  }
`;

export const CartLeft = styled.div`
  flex: 2;
  max-width: 800px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const CartRight = styled.div`
  flex: 1;
  max-width: 420px;
  margin-left: auto;
  padding-right: 20px;
  background-color: #f9f7f3;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  @media (max-width: 768px) {
    max-width: 100%;
    margin-left: 0;
    padding-right: 0;
  }
`;

export const ButtonOrderNeutral = styled.button`
  background-color: #fff;
  color: #333;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  padding: 10px 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f7f7f7;
  }
`;

export const TotalAmountTop = styled.div`
  font-size: 1.1rem;
  color: #333;
`;

export const PaymentLogos = styled.div`
  margin-top: 20px;
  text-align: center;

  .logos {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 12px;
  }
`;
export const CheckoutBox = styled.div`
  width: 100%;
  background: #fff;
  border: 1px solid #e6e6e6;
  border-radius: 10px;
  padding: 20px 18px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  text-align: center;

  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 768px) {
    border: none;
    box-shadow: none;
    padding: 0;
  }
`;
