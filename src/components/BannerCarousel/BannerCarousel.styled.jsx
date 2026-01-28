import styled from "styled-components";
export const BannerWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 12px;

  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;

  @media (max-width: 480px) {
    padding: 0 4px;
    overflow-x: hidden;
  }
`;
export const BannerImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 320px;
  object-fit: contain;
  border-radius: 12px;
  display: block;
  @media (max-width: 600px) {
    max-height: 210px;
    object-fit: contain;
    border-radius: 8px;
  }
`;
