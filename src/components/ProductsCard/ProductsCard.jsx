import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductToWishlist,
  removeProductFromWishlist,
} from "../../redux/wishlist/operationWishlist";
import { selectWishlistProducts } from "../../redux/wishlist/selectorsWishlist";
import ProductImageWithLightbox from "../ProductImageWithLightbox";
import {
  ButtonHeart,
  ButtonQuantity,
  ButtonShopping,
  ProductAction,
  ProductCardContainer,
  ProductsHeader,
} from "./ProductsCard.styled";

const ProductsCard = ({ product }) => {
  const [productCount, setProductCount] = useState(1); // Кількість продукту

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const wishlist = useSelector(selectWishlistProducts);
  const [localIsActive, setLocalIsActive] = useState(false);

  // Перевірка, чи продукт у списку бажань
  const isProductInWishlist = wishlist.some(
    (item) => item.productId === product._id // Звертаємося напряму до `productId`
  );

  // Синхронізація локального стану з Redux
  useEffect(() => {
    setLocalIsActive(isProductInWishlist);
    console.log("Wishlist:", wishlist);
    console.log(
      "Current Product ID:",
      product._id,
      "Active:",
      isProductInWishlist
    );
  }, [wishlist, isProductInWishlist, product._id]);

  // Обробка кліку на сердечко
  const handleToggleWishlist = async () => {
    try {
      setLocalIsActive((prevState) => !prevState);
      if (isProductInWishlist) {
        console.log("Removing from wishlist:", product._id);
        await dispatch(removeProductFromWishlist(product._id)); // Передаємо `_id`
      } else {
        console.log("Adding to wishlist:", product._id);
        await dispatch(addProductToWishlist(product._id)); // Передаємо `_id`
      }
    } catch (error) {
      console.error("Error toggling wishlist:", error);
    }
  };

  return (
    <ProductCardContainer>
      {product ? (
        <>
          <ProductsHeader>{product.name}</ProductsHeader>
          {product.photoUrl ? (
            <ProductImageWithLightbox
              src={product.photoUrl}
              alt={product.name}
            />
          ) : (
            <div>{t("no_image")}</div>
          )}
          <p>{product.price} zł</p>
          <ProductAction>
            <ButtonHeart
              onClick={handleToggleWishlist}
              $isActive={localIsActive}
            >
              {localIsActive ? "❤️" : "🖤"}
            </ButtonHeart>

            <div>
              <ButtonQuantity
                onClick={() => setProductCount((c) => Math.max(c - 1, 1))}
              >
                ➖
              </ButtonQuantity>
              <span>{productCount}</span>
              <ButtonQuantity onClick={() => setProductCount((c) => c + 1)}>
                ➕
              </ButtonQuantity>
            </div>
            <ButtonShopping onClick={() => {}}>🛒</ButtonShopping>
          </ProductAction>
        </>
      ) : (
        <div>{t("Product information unavailable")}</div>
      )}
    </ProductCardContainer>
  );
};

export default ProductsCard;
