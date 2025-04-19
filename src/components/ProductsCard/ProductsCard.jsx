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
  const [localIsActive, setLocalIsActive] = useState(null);

  // Перевірка, чи продукт у списку бажань
  const isProductInWishlist =
    Array.isArray(wishlist) &&
    wishlist.some((wishlistProduct) => wishlistProduct._id === product._id);

  // Синхронізація локального стану з Redux
  useEffect(() => {
    setLocalIsActive(isProductInWishlist); // Оновлення стану "сердечка"
  }, [isProductInWishlist]);

  // Обробка кліку на сердечко
  const handleToggleWishlist = async () => {
    try {
      setLocalIsActive((prevState) => !prevState);
      console.log("Before toggle:", isActive); // Лог стану до натискання
      if (isProductInWishlist) {
        await dispatch(removeProductFromWishlist(product._id));
      } else {
        await dispatch(addProductToWishlist(product));
      }
      // setIsActive(!isActive);
      console.log("After toggle:", !isActive); // Лог стану після натискання
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
          $isActive={localIsActive} // Відображення кольору на основі статусу
        >
          {localIsActive ? "❤️" : "🖤"}
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
