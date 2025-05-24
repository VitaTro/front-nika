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
import ProductDetailsModal from "../ProductDetailsModal/ProductDetailsModal";
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
  const [productCount, setProductCount] = useState(1);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const wishlist = useSelector(selectWishlistProducts);
  const [localIsActive, setLocalIsActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // ✅ ЛОГИ: Перевіряємо, чи `product` взагалі передається
  console.log("🛒 Rendering ProductCard for:", product);

  // ✅ ЛОГИ: Перевіряємо авторизацію користувача
  console.log("🔑 User authenticated:", isUserAuthenticated);

  // ✅ Перевірка, чи продукт у списку бажань
  const isProductInWishlist = wishlist.some(
    (item) => item.productId === product._id
  );

  useEffect(() => {
    setLocalIsActive(isProductInWishlist);
    console.log("💖 Wishlist updated:", wishlist);
  }, [wishlist, isProductInWishlist]);

  // ✅ ЛОГИ: Відображення деталей продукту
  console.log("📦 Product details:", {
    name: product.name,
    category: product.category,
    price: product.price,
  });

  // ✅ Додавання/видалення з вішліста
  const handleToggleWishlist = async () => {
    if (!isUserAuthenticated) {
      alert(t("please_login_to_use_wishlist"));
      return;
    }
    // setLocalIsActive((prevState) => !prevState);
    if (isProductInWishlist) {
      console.log("🗑 Removing from wishlist:", product._id);
      await dispatch(removeProductFromWishlist(product._id));
      setLocalIsActive(false);
    } else {
      console.log("➕ Adding to wishlist:", product._id);
      await dispatch(addProductToWishlist(product._id));
      setLocalIsActive(true);
    }
  };

  // ✅ Додавання в кошик
  const handleAddToCart = async () => {
    if (!isUserAuthenticated) {
      alert(t("please_login_to_add_to_cart"));
      return;
    }
    if (!product.price) {
      alert(t("product_price_not_available"));
      return;
    }
    console.log("🛒 Adding to cart:", product);
    await dispatch(
      addProductToShoppingCart({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: productCount,
      })
    );
    dispatch(getShoppingCart());
  };
  useEffect(() => {
    console.log("🛒 Rendering ProductCard for:", product);
    console.log("🔑 User authenticated:", isUserAuthenticated);

    console.log("📦 Full product object:", product);
    console.log("💰 Product price:", product.price);
    console.log("📢 FINAL CHECK - Product object:", product);
    console.log("💰 FINAL CHECK - Product price:", product.price);

    console.log("📦 Product details:", {
      name: product.name,
      category: product.category,
      price: product.price,
    });
  }, [product, wishlist, isUserAuthenticated]);
  const token = localStorage.getItem("accessToken");
  console.log("🔑 Token exists in localStorage:", token);

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

          <p className="price">
            {isUserAuthenticated
              ? `${product.price} zł`
              : t("login_to_see_price")}
          </p>

          {/* 🔹 Кнопки доступні тільки для авторизованих */}
          {isUserAuthenticated && (
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
              <button onClick={() => setIsModalOpen(true)}>Details</button>
            </ProductAction>
          )}
          {isModalOpen && (
            <ProductDetailsModal
              product={product}
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          )}
        </>
      ) : (
        <div>{t("Product information unavailable")}</div>
      )}
    </ProductCardContainer>
  );
};

export default ProductsCard;
