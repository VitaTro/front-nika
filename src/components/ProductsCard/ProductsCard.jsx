import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const [activeWishlist, setActiveWishlist] = useState({});
  const navigate = useNavigate();
  const productIndex = product.index;
  const isProductInWishlist = wishlist.some(
    (item) => item.productId === product._id
  );

  useEffect(() => {
    setActiveWishlist((prev) => ({
      ...prev,
      [product._id]: isProductInWishlist,
    }));
  }, [wishlist, isProductInWishlist, product._id]);

  const currentStock = product.currentStock ?? product.quantity ?? 0;
  console.log("🧪 Product in card:", product);

  const retailPrice = product.lastRetailPrice ?? product.price ?? null;

  const handleToggleWishlist = async () => {
    if (!isUserAuthenticated) {
      toast.info(t("please_login_to_use_wishlist"));
      return;
    }

    setActiveWishlist((prev) => ({
      ...prev,
      [product._id]: !prev[product._id],
    }));

    if (isProductInWishlist) {
      await dispatch(removeProductFromWishlist(product._id));
    } else {
      await dispatch(addProductToWishlist(product._id));
    }
  };
  const handleAddToCart = async () => {
    if (!isUserAuthenticated) {
      toast.info(t("please_login_to_add_to_cart"));
      return;
    }

    if (!product.inStock) {
      toast.warn(t("product_not_available"));
      return;
    }

    try {
      await dispatch(
        addProductToShoppingCart({
          productId: product._id,
          name: product.name,
          price: retailPrice,
          quantity: productCount,
        })
      );

      toast.success(t("productAdded"), { autoClose: 3000 });
      dispatch(getShoppingCart());
    } catch (error) {
      console.error("❌ Error in handleAddToCart:", error);
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
              : t("price_unavailable")}{" "}
          </ItemPrice>

          <ProductAction>
            <ButtonHeart
              onClick={handleToggleWishlist}
              $isActive={activeWishlist[product._id]}
            >
              {activeWishlist[product._id] ? "❤️" : "🖤"}
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

            <ButtonShopping
              onClick={handleAddToCart}
              disabled={currentStock < 1}
              style={{
                cursor: currentStock ? "pointer" : "not-allowed",
              }}
            >
              {currentStock > 0 ? "🛒" : "🚫"}
            </ButtonShopping>
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
      <ToastContainer />
    </ProductCardContainer>
  );
};

export default ProductsCard;
