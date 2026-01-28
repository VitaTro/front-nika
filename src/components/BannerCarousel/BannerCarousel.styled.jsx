import styled from "styled-components";
export const BannerWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 12px;

  display: flex;
  justify-content: center;
  align-items: center;

  /* Мобільна адаптація */
  @media (max-width: 600px) {
    padding: 0 8px;
  }
`;
export const BannerImage = styled.img`
width: 100%; height: auto; max-height: 320px; object-fit: contain; border-radius: 12px;
@media (max-width: 600px) { .banner-image { max-height: 170px; object-fit: contain; border-radius: 8px; }`;
