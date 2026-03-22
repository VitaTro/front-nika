import { useState } from "react";
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
const Wrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  &:hover .arrow {
    opacity: 1;
  }
`;
const SmallImage = styled.img`
  width: 100%;
  height: 350px;
  object-fit: cover;
  cursor: pointer;
  display: none;

  &.active {
    display: block;
  }
`;
const Arrow = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.4);
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  opacity: 0;
  transition: 0.3s;
  z-index: 10;
  &.left {
    left: 5px;
  }
  &.right {
    right: 5px;
  }
`;
const LightboxArrow = styled.button`
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  padding: 12px 16px;
  cursor: pointer;
  font-size: 24px;
  z-index: 1000;

  &.left {
    left: 20px;
  }
  &.right {
    right: 20px;
  }
`;

const Lightbox = ({ images, index, setIndex, alt, onClose }) => {
  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  return createPortal(
    <Overlay onClick={onClose}>
      <LightboxImage src={images[index]} alt={alt} />
      {images.length > 1 && (
        <>
          <LightboxArrow
            className="left"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
          >
            ‹
          </LightboxArrow>
          <LightboxArrow
            className="right"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
          >
            ›
          </LightboxArrow>
        </>
      )}
    </Overlay>,
    document.body,
  );
};

const ProductImageWithLightbox = ({ src, alt, gallery = [] }) => {
  const images = gallery.length ? gallery : [src];
  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  let startX = 0;
  const handleTouchStart = (e) => {
    startX = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;

    if (startX - endX > 50) next();
    if (endX - startX > 50) prev();
  };
  return (
    <>
      <Wrapper onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        {images.map((img, i) => (
          <SmallImage
            key={i}
            src={img}
            alt={alt}
            className={i === index ? "active" : ""}
            onClick={() => setIsOpen(true)}
          />
        ))}

        {images.length > 1 && (
          <>
            <Arrow className="arrow left" onClick={prev}>
              ‹
            </Arrow>
            <Arrow className="arrow right" onClick={next}>
              ›
            </Arrow>
          </>
        )}
      </Wrapper>

      {isOpen && (
        <Lightbox
          images={images}
          index={index}
          setIndex={setIndex}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default ProductImageWithLightbox;
