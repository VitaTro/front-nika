import React, { useState } from "react";
import styled from "styled-components";

export const ProductImageContainer = styled.div`
  display: inline-block;
  width: ${({ $isZoomed }) =>
    $isZoomed ? "300px" : "50px"}; /* Зміна розміру */
  height: auto;
  cursor: pointer;
  margin-right: 15px;
  transition: width 0.3s ease; /* Плавне збільшення */
  overflow: hidden; /* Забезпечує обмеження контенту */
`;

export const ProductImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover; /* Для пропорцій */
`;

const ZoomableProductImage = ({ src, alt }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  const handleZoomToggle = () => setIsZoomed(!isZoomed);

  return (
    <ProductImageContainer
      $isZoomed={isZoomed}
      onClick={handleZoomToggle} // Тогл збільшення
    >
      <ProductImage src={src} alt={alt} />
    </ProductImageContainer>
  );
};

export default ZoomableProductImage;
