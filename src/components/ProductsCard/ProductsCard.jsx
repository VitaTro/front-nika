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
  const [isActive, setIsActive] = useState(false); // Статус "В бажаному"
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const wishlist = useSelector(selectWishlistProducts);

  // Перевірка, чи продукт у списку бажань
  const isProductInWishlist =
    Array.isArray(wishlist) &&
    wishlist.some((wishlistProduct) => wishlistProduct._id === product._id);

  // Синхронізація локального стану з Redux
  useEffect(() => {
    setIsActive(isProductInWishlist); // Оновлення стану "сердечка"
  }, [isProductInWishlist]);

  // Обробка кліку на сердечко
  const handleToggleWishlist = async () => {
    try {
      if (isActive) {
        await dispatch(removeProductFromWishlist(product._id));
      } else {
        await dispatch(addProductToWishlist(product));
      }
    } catch (error) {
      console.error("Error toggling wishlist:", error);
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
      <p>{product.price} zł</p>
      <ProductAction>
        <ButtonHeart
          onClick={handleToggleWishlist}
          $isActive={isActive} // Відображення кольору на основі статусу
        >
          {isActive ? "❤️" : "🖤"}
        </ButtonHeart>
        <div>
          <ButtonQuantity
            onClick={
              () => setProductCount((c) => Math.max(c - 1, 1)) // Мінімальне значення — 1
            }
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
    </ProductCardContainer>
  );
};

export default ProductsCard;
