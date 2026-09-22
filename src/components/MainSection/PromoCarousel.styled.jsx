import { FaPercent } from "react-icons/fa";
import styled from "styled-components";
export const Wrapper = styled.div`
  width: 100%;
  padding: 40px 0;
  text-align: center;

  .promo-swiper {
    width: 100%;
    padding-top: 50px;
    padding-bottom: 50px;
  }
`;
export const Icon = styled(FaPercent)`
  font-size: 1.8rem;
  color: #e63946; /* червоний акцент */
`;
export const Title = styled.h2`
  font-family: "Cinzel Decorative", serif;
  font-size: 2.2rem;
  margin-bottom: 20px;
`;

export const SlideCard = styled.div`
  background: #fff;
  border-radius: 20px;
  width: 260px;
  height: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
`;

export const SlideImage = styled.img`
  width: 180px;
  height: 180px;
  object-fit: cover;
  border-radius: 12px;
  margin-top: 20px;
`;

export const InfoBox = styled.div`
  margin-top: 15px;
`;

export const Name = styled.div`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 8px;
`;

export const NewPrice = styled.span`
  color: red;
  font-weight: 700;
  font-size: 1.2rem;
`;

export const OldPrice = styled.span`
  text-decoration: line-through;
  color: #888;
  margin-left: 10px;
`;
