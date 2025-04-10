import React from "react";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../../redux/shopping/operationShopping";
import { addProductToWishlist } from "../../redux/wishlist/operationWishlist";
import ProductImageWithLightbox from "../ProductImageWithLightbox";
import {
  ProductAction,
  ProductCardContainer,
  ProductsHeader,
} from "./ProductsCard.styled";
const ProductsCard = ({ product, isAuthenticated, t }) => {
  const dispatch = useDispatch();

  const handleAddProductToWishlist = () => {
    dispatch(addProductToWishlist(product));
  };

  const handleAddProductToCart = () => {
    dispatch(addProductToCart(product));
  };
  return (
    <ProductCardContainer>
      <ProductsHeader>{product.name}</ProductsHeader>
      {product.photoUrl ? (
        <ProductImageWithLightbox src={product.photoUrl} alt={product.name} />
      ) : (
        <div>{t("no_image")}</div>
      )}
      <p>
        {isAuthenticated
          ? `Price: ${product.price} zł`
          : t("login_to_view_price")}
      </p>
      <ProductAction>
        <button onClick={handleAddProductToWishlist}>❤️</button>
        <button onClick={handleAddProductToCart}>🛒</button>
      </ProductAction>
    </ProductCardContainer>
  );
};
export default ProductsCard;
