import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
// BACKEND cart
import {
  addProductToShoppingCart,
  getShoppingCart,
} from "../../redux/shopping/operationShopping";

// BACKEND wishlist
import {
  addProductToWishlist,
  removeProductFromWishlist,
} from "../../redux/wishlist/operationWishlist";
import { selectWishlistProducts } from "../../redux/wishlist/selectorsWishlist";

// GUEST wishlist
import { selectGuestWishlist } from "../../redux/guest/wishlist/guestWishlistSelectors";
import { toggleGuestWishlist } from "../../redux/guest/wishlist/guestWishlistSlice";
// GUEST cart
import { addGuestCartItem } from "../../redux/guest/shopping/guestShoppingSlice";

import ProductImageWithLightbox from "../ProductImageWithLightbox";
import {
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
  const navigate = useNavigate();
  // const willBeAdded = !activeWishlist[product._id];

  // BACKEND wishlist
  const backendWishlist = useSelector(selectWishlistProducts);

  // GUEST wishlist
  const guestWishlist = useSelector(selectGuestWishlist);

  // Determine if product is in wishlist
  const isInWishlist = isUserAuthenticated
    ? backendWishlist.some((item) => item.productId === product._id)
    : guestWishlist.some((item) => item.id === product._id);

  const [activeWishlist, setActiveWishlist] = useState({});

  useEffect(() => {
    setActiveWishlist((prev) => ({
      ...prev,
      [product._id]: isInWishlist,
    }));
  }, [isInWishlist, product._id]);

  const currentStock = product.currentStock ?? product.quantity ?? 0;
  const retailPrice = product.lastRetailPrice ?? product.price ?? null;

  // ⭐ UNIVERSAL WISHLIST HANDLER
  const handleToggleWishlist = async () => {
    const willBeAdded = !activeWishlist[product._id];

    if (isUserAuthenticated) {
      // BACKEND
      setActiveWishlist((prev) => ({
        ...prev,
        [product._id]: !prev[product._id],
      }));

      if (isInWishlist) {
        await dispatch(removeProductFromWishlist(product._id));
      } else {
        await dispatch(addProductToWishlist(product._id));
      }
    } else {
      // GUEST
      dispatch(
        toggleGuestWishlist({
          id: product._id,
          name: product.name,
          price: retailPrice,
          photoUrl: product.photoUrl,
        }),
      );

      setActiveWishlist((prev) => ({
        ...prev,
        [product._id]: !prev[product._id],
      }));

      toast.success(
        willBeAdded ? t("productAddedWishlist") : t("removed_from_wishlist"),
      );
    }
  };

  // ⭐ UNIVERSAL CART HANDLER
  const handleAddToCart = async () => {
    if (!product.inStock) {
      toast.warn(t("product_not_available"));
      return;
    }

    if (isUserAuthenticated) {
      // BACKEND
      try {
        await dispatch(
          addProductToShoppingCart({
            productId: product._id,
            name: product.name,
            price: retailPrice,
            quantity: productCount,
          }),
        );

        toast.success(t("productAdded"), { autoClose: 3000 });
        dispatch(getShoppingCart());
      } catch (error) {
        console.error("❌ Error in handleAddToCart:", error);
      }
    } else {
      dispatch(
        addGuestCartItem({
          id: product._id,
          name: product.name,
          price: retailPrice,
          quantity: productCount,
          photoUrl: product.photoUrl,
        }),
      );

      toast.success(t("productAdded"));
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

          <ItemPrice className="price">
            {retailPrice !== null
              ? `${retailPrice} zł`
              : t("price_unavailable")}
          </ItemPrice>

          <ProductAction>
            {/* ❤️ WISHLIST */}
            <ButtonHeart
              onClick={handleToggleWishlist}
              $isActive={activeWishlist[product._id]}
            >
              {activeWishlist[product._id] ? "❤️" : "🖤"}
            </ButtonHeart>

            {/* ➕➖ QUANTITY */}
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

            {/* 🛒 ADD TO CART */}
            <ButtonShopping
              onClick={handleAddToCart}
              disabled={currentStock < 1}
              style={{
                cursor: currentStock ? "pointer" : "not-allowed",
              }}
            >
              {currentStock > 0 ? "🛒" : "🚫"}
            </ButtonShopping>

            {/* 🔍 DETAILS */}
            <ButtonDetailsWrapper>
              <button
                onClick={() => {
                  const basePath = isUserAuthenticated
                    ? "/user/products"
                    : "/products";
                  navigate(`${basePath}/${product._id}`);
                }}
              >
                {t("details")}
              </button>
            </ButtonDetailsWrapper>
          </ProductAction>
        </>
      ) : (
        <div>{t("Product information unavailable")}</div>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </ProductCardContainer>
  );
};

export default ProductsCard;
