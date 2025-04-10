import React, { useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LightboxImage = styled.img`
  max-width: 90%;
  max-height: 90%;
`;

const Lightbox = ({ src, alt, onClose }) => {
  return createPortal(
    <Overlay onClick={onClose}>
      <LightboxImage src={src} alt={alt} />
    </Overlay>,
    document.body
  );
};

const ProductImageWithLightbox = ({ src, alt }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <img
        src={src}
        alt={alt}
        onClick={() => setIsOpen(true)}
        style={{
          cursor: "pointer",
          width: "100%",
          height: "350px", // Фіксована висота
          objectFit: "cover",
        }}
      />
      {isOpen && (
        <Lightbox src={src} alt={alt} onClose={() => setIsOpen(false)} />
      )}
    </>
  );
};

export default ProductImageWithLightbox;
