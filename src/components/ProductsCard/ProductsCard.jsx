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
// import ProductDetailsModal from "../ProductDetailsModal/ProductDetailsModal";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProductImageWithLightbox from "../ProductImageWithLightbox";
import {
  ButtonDetails,
  ButtonDetailsWrapper,
  ButtonHeart,
  ButtonQuantity,
  ButtonShopping,
  ItemPrice,
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
  const [activeWishlist, setActiveWishlist] = useState({});

  // ✅ Перевірка, чи продукт у списку бажань
  const isProductInWishlist = wishlist.some(
    (item) => item.productId === product._id
  );

  useEffect(() => {
    setLocalIsActive(isProductInWishlist);
  }, [wishlist, isProductInWishlist]);

  const handleToggleWishlist = async () => {
    if (!isUserAuthenticated) {
      alert(t("please_login_to_use_wishlist"));
      return;
    }

    setActiveWishlist((prevState) => ({
      ...prevState,
      [product._id]: !prevState[product._id],
    }));

    if (isProductInWishlist) {
      await dispatch(removeProductFromWishlist(product._id));
    } else {
      await dispatch(addProductToWishlist(product._id));
    }
  };

  // ✅ Додавання в кошик
  const handleAddToCart = async () => {
    try {
      console.log("🚀 Trying to add to cart:", {
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: productCount,
      });

      await dispatch(
        addProductToShoppingCart({
          productId: product._id,
          name: product.name,
          price: product.price,
          quantity: productCount,
        })
      );

      console.log("⚡ Calling toast.success()!");
      toast.success(t("productAdded"), {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      dispatch(getShoppingCart());
    } catch (error) {
      console.error("❌ Error in handleAddToCart:", error);
    }
  };

  useEffect(() => {}, [product, wishlist, isUserAuthenticated]);
  const token = localStorage.getItem("accessToken");
  console.log("🧐 Checking product in ProductsCard:", product);

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

          <ItemPrice className="price">
            {isUserAuthenticated
              ? `${product.price} zł`
              : t("login_to_see_price")}
          </ItemPrice>

          {/* 🔹 Кнопки доступні тільки для авторизованих */}
          {isUserAuthenticated && (
            <ProductAction>
              <ButtonHeart
                onClick={handleToggleWishlist}
                $isActive={activeWishlist[product._id] || isProductInWishlist} // 🔥 Перевіряємо стан для кожного товару
              >
                {activeWishlist[product._id] || isProductInWishlist
                  ? "❤️"
                  : "🖤"}
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
              <ButtonDetailsWrapper>
                <Link to={`/user/products/${product._id}`}>
                  <ButtonDetails>Details</ButtonDetails>
                </Link>
              </ButtonDetailsWrapper>
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
      <ToastContainer />
    </ProductCardContainer>
  );
};

export default ProductsCard;
