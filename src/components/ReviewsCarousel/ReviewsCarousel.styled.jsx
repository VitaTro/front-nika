import styled from "styled-components";

export const ReviewsWrapper = styled.section`
  margin: 40px 0;
  position: relative;
  text-align: center;
`;

export const ReviewsHeader = styled.div`
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
  }
`;

export const ReviewsTrack = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 16px;
  padding: 10px 0;
  scroll-snap-type: x mandatory;
`;

export const ReviewCard = styled.div`
  min-width: 260px;
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  scroll-snap-align: start;
`;

export const ReviewAvatar = styled.div`
  width: 40px;
  height: 40px;
  background: #e5e5e5;
  border-radius: 50%;
  margin-bottom: 10px;
`;

export const ReviewText = styled.div`
  font-family: "Inter", sans-serif;
  color: #3a3a3a;
  line-height: 1.6;
  text-align: center;
  position: relative;

  .original {
    font-size: 15px;
    font-weight: 500;
    margin-bottom: 12px;
    padding: 0 20px;
    position: relative;

    &::before,
    &::after {
      content: '"';
      font-size: 40px;
      color: #d8c7a0;
      position: absolute;
      top: -10px;
      font-family: "Georgia", serif;
    }

    &::before {
      left: 0;
      transform: translateX(-10px);
    }

    &::after {
      right: 0;
      transform: translateX(10px);
    }
  }

  .translation {
    font-size: 13px;
    color: #6b6b6b;
    font-style: italic;
    margin-top: 8px;
    border-top: 1px solid #eee;
    padding-top: 8px;
  }
`;

export const ArrowLeft = styled.button`
  position: absolute;
  top: 50%;
  left: -5px;
`;

export const ArrowRight = styled(ArrowLeft)`
  left: auto;
  right: -5px;
`;
