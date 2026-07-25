import styled from "styled-components";

export const CarouselWrapper = styled.section`
  margin: 40px 0;
  padding: 0 10px;
  position: relative;
`;

export const CarouselTitle = styled.h2`
  justify-content: center;
  display: flex;
  align-items: center;
  font-family: "Noto Sans", sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: ${(props) => (props.theme.$isDarkMode ? "#bfa76f" : "#b09456")};
  background: ${(props) =>
    props.$isActive
      ? props.theme.$isDarkMode
        ? "linear-gradient(90deg, #8BC34A, #1B5E20)"
        : "linear-gradient(90deg, #91A1B8, #ECEFF1)"
      : "none"};
  background-clip: text;
  -webkit-background-clip: text;
  color: ${(props) =>
    props.$isActive ? "transparent" : ""}; /* Завжди чіткий текст */
  text-shadow: ${(props) =>
    props.$isActive
      ? props.theme.$isDarkMode
        ? "0 5px 15px rgba(123, 228, 10, 0.5), 0 0 10px rgba(255, 255, 255, 0.2)"
        : "0 0 12px rgba(167, 182, 208, 0.9)"
      : "0 0 6px rgba(0, 0, 0, 0.1)"};
  transition: all 0.5s ease-in-out;
  &:hover {
    transform: scale(1.1); /* Невелике збільшення */
    text-shadow: ${(props) =>
      props.theme.$isDarkMode
        ? "0 10px 20px rgba(123, 228, 10, 0.7), 0 0 15px rgba(255, 255, 255, 0.4)"
        : "0 0 15px rgba(167, 182, 208, 1)"};
  }

  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 16px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
    margin-bottom: 12px;
  }
`;
export const PopularHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
    margin-bottom: 18px;
  }

  img {
    width: 60px;
    height: 60px;
    opacity: 0.9;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));

    @media (max-width: 1024px) {
      width: 50px;
      height: 50px;
    }

    @media (max-width: 768px) {
      width: 42px;
      height: 42px;
    }

    @media (max-width: 480px) {
      width: 34px;
      height: 34px;
    }
  }
`;

export const CarouselTrack = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 16px;
  padding-bottom: 10px;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #d0d0d0;
    border-radius: 10px;
  }
`;

export const CarouselItem = styled.div`
  min-width: 160px;
  scroll-snap-align: start;
  background: #fff;
  border-radius: 12px;
  padding: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  text-align: center;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-3px);
  }

  @media (max-width: 1024px) {
    min-width: 140px;
  }

  @media (max-width: 768px) {
    min-width: 130px;
    padding: 8px;
  }

  @media (max-width: 480px) {
    min-width: 120px;
    padding: 6px;
  }
`;

export const ItemImage = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 10px;

  @media (max-width: 1024px) {
    height: 140px;
  }

  @media (max-width: 768px) {
    height: 130px;
  }

  @media (max-width: 480px) {
    height: 110px;
  }
`;

export const ItemName = styled.h3`
  font-size: 14px;
  margin: 10px 0 4px;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 13px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export const ItemPrice = styled.p`
  font-size: 14px;
  color: #444;

  @media (max-width: 768px) {
    font-size: 13px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export const ArrowLeft = styled.button`
  position: absolute;
  top: 50%;
  left: -5px;
  transform: translateY(-50%);
  background: linear-gradient(135deg, #e8d9b5, #c9b48a);
  border: none;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  font-size: 22px;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  color: #fff;
  transition: all 0.25s ease;

  &:hover {
    background: linear-gradient(135deg, #f2e6c9, #d6c39a);
    transform: translateY(-50%) scale(1.08);
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(-50%) scale(0.95);
  }

  @media (max-width: 480px) {
    width: 30px;
    height: 30px;
    font-size: 18px;
  }
`;

export const ArrowRight = styled(ArrowLeft)`
  left: auto;
  right: -5px;
`;

// export const ArrowRight = styled(ArrowLeft)`
//   left: auto;
//   right: -5px;

//   @media (max-width: 768px) {
//     right: -2px;
//   }

//   @media (max-width: 480px) {
//     right: 0;
//   }
// `;
