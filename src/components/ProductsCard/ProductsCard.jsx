import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductToShoppingCart,
  getShoppingCart,
} from "../../redux/shopping/operationShopping";
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

const ProductsCard = ({ product, isUserAuthenticated }) => {
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
    if (!isUserAuthenticated) {
      alert(t("please_login_to_use_wishlist"));
      return;
    }
    try {
      setLocalIsActive((prevState) => !prevState);
      if (isProductInWishlist) {
        await dispatch(removeProductFromWishlist(product._id));
      } else {
        await dispatch(addProductToWishlist(product._id));
      }
    } catch (error) {
      console.error("Error toggling wishlist:", error);
    }
  };

  const handleAddToCart = async () => {
    if (!isUserAuthenticated) {
      alert(t("please_login_to_add_to_cart"));
      return;
    }
    try {
      const productToAdd = {
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: productCount,
      };
      await dispatch(addProductToShoppingCart(productToAdd));
      dispatch(getShoppingCart());
    } catch (error) {
      console.error("Error adding to cart", error);
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
          {isUserAuthenticated ? (
            <p className="price">{product.price} zł</p>
          ) : (
            <p className="price-placeholder">{t("login_to_see_price")}</p>
          )}
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
            <ButtonShopping onClick={handleAddToCart}>🛒</ButtonShopping>
          </ProductAction>
        </>
      ) : (
        <div>{t("Product information unavailable")}</div>
      )}
    </ProductCardContainer>
  );
};

export default ProductsCard;
