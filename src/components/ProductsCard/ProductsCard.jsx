import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import {
//   addProductToWishlist,
//   removeProductFromWishlist,
// } from "../../redux/wishlist/operationWishlist";
// import { selectWishlistProducts } from "../../redux/wishlist/selectorsWishlist";
import ProductImageWithLightbox from "../ProductImageWithLightbox";
import {
  ButtonHeart,
  ButtonQuantity,
  ButtonShopping,
  ProductAction,
  ProductCardContainer,
  ProductsHeader,
} from "./ProductsCard.styled";

const ProductsCard = ({ product, isAuthenticated, t }) => {
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(false);
  const [productCount, setProductCount] = useState(1);
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
  const handleToggleWishlist = () => {
    setIsActive((prevState) => !prevState);
  };

  // Якщо використовуєте Redux:
  // try {
  //   if (isActive) {
  //     dispatch(removeProductFromWishlist(product.id));
  //   } else {
  //     dispatch(addProductToWishlist(product));
  //   }
  // } catch (error) {
  //   console.error("Error toggling wishlist:", error);
  // }

  const handleAddProductToCart = () => {
    dispatch(addProductToCart({ ...product, quantity: productCount }));
  };

  const handleIncreaseQuantity = () => {
    setProductCount((prevCount) => prevCount + 1);
  };

  const handleDecreaseQuantity = () => {
    if (productCount > 1) {
      setProductCount((prevCount) => prevCount - 1);
    }
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
          onClick={handleToggleWishlist}

          // $isActive={isProductInWishlist}
        >
          {isActive ? "❤️" : "🖤"}
        </ButtonHeart>
        <div>
          <ButtonQuantity onClick={handleDecreaseQuantity}>➖</ButtonQuantity>
          <span>{productCount}</span>
          <ButtonQuantity onClick={handleIncreaseQuantity}>➕</ButtonQuantity>
        </div>

        <ButtonShopping onClick={handleAddProductToCart}>🛒</ButtonShopping>
      </ProductAction>
    </ProductCardContainer>
  );
};
export default ProductsCard;
