import Modal from "react-modal";
import {
  CloseButton,
  Description,
  DetailsContainer,
  InfoItem,
  InfoList,
  ProductImage,
} from "./ProductDetailsModal.styled";

const ProductDetailsModal = ({ product, isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <DetailsContainer>
        <CloseButton onClick={onClose}>✖</CloseButton>
        <h2>{product.name}</h2>
        {product.photos.map((photoUrl, index) => (
          <ProductImage key={index} src={photoUrl} alt={product.name} />
        ))}
        <Description>{product.description}</Description>
        <InfoList>
          <InfoItem>🌈Color: {product.color}</InfoItem>
          <InfoItem>📏 Size: {product.size}</InfoItem>
          <InfoItem>📏 Width: {product.width}</InfoItem>
          <InfoItem>📏Height: {product.height}</InfoItem>
          <InfoItem>💰 Price: {product.price} zł</InfoItem>
        </InfoList>
      </DetailsContainer>
    </Modal>
  );
};

export default ProductDetailsModal;
