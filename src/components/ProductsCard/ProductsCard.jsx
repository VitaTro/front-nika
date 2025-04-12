import React from "react";
import { useDispatch } from "react-redux";
// import {
//   addProductToWishlist,
//   removeProductFromWishlist,
// } from "../../redux/wishlist/operationWishlist";
// import { selectWishlistProducts } from "../../redux/wishlist/selectorsWishlist";
import ProductImageWithLightbox from "../ProductImageWithLightbox";
import {
  ButtonHeart,
  ProductAction,
  ProductCardContainer,
  ProductsHeader,
} from "./ProductsCard.styled";

const ProductsCard = ({ product, isAuthenticated, t }) => {
  const dispatch = useDispatch();
  // const wishlist = useSelector(selectWishlistProducts);

  // const isProductInWishlist =
  //   Array.isArray(wishlist) &&
  //   wishlist.some((wishlistProduct) => wishlistProduct.id === product.id);

  // const handleToggleWishlist = async () => {
  //   try {
  //     if (isProductInWishlist) {
  //       await dispatch(removeProductFromWishlist(product.id));
  //     } else {
  //       await dispatch(addProductToWishlist(product));
  //     }
  //   } catch (error) {
  //     console.error("Error toggling wishlist:", error);
  //   }
  // };

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
      <p>Price: {product.price} zł</p>
      <ProductAction>
        <ButtonHeart
        // onClick={handleToggleWishlist}
        // $isActive={isProductInWishlist}
        >
          ❤️
        </ButtonHeart>
        <button onClick={handleAddProductToCart}>🛒</button>
      </ProductAction>
    </ProductCardContainer>
  );
};
export default ProductsCard;
