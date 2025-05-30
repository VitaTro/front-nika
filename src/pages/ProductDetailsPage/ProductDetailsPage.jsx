import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import {
  ButtonHeart,
  ButtonQuantity,
  ButtonShopping,
} from "../../components/ProductsCard/ProductsCard.styled";
import {
  addProductToShoppingCart,
  getShoppingCart,
} from "../../redux/shopping/operationShopping";
import { getUserProductsById } from "../../redux/user/userOperations";
import {
  selectAuthError,
  selectAuthLoading,
} from "../../redux/user/userSelectors";
import {
  addProductToWishlist,
  removeProductFromWishlist,
} from "../../redux/wishlist/operationWishlist";
import { selectWishlistProducts } from "../../redux/wishlist/selectorsWishlist";
import {
  CloseButton,
  DetailsContainer,
  DetailsHeader,
  DetailsWrapper,
  ImageContainer,
  InfoContainer,
  InfoItem,
  InfoList,
  ProductAction,
  ProductImage,
} from "./ProductDetailsPage.styled";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const product = useSelector((state) => state.user.selectedProduct);
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const wishlist = useSelector(selectWishlistProducts);

  const [productCount, setProductCount] = useState(1);
  const [activeWishlist, setActiveWishlist] = useState({});
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    dispatch(getUserProductsById(id));
  }, [dispatch, id]);

  useEffect(() => {
    setActiveWishlist((prevState) => ({
      ...prevState,
      [product?._id]: wishlist.some((item) => item.productId === product?._id),
    }));
  }, [wishlist, product]);

  const handleImageClick = () => {
    setIsZoomed(!isZoomed);
  };

  const handleToggleWishlist = async () => {
    console.log("🚀 Toggling wishlist for:", product._id);
    setActiveWishlist((prevState) => ({
      ...prevState,
      [product._id]: !prevState[product._id],
    }));

    if (wishlist.some((item) => item.productId === product._id)) {
      await dispatch(removeProductFromWishlist(product._id));
    } else {
      await dispatch(addProductToWishlist(product._id));
    }
  };

  const handleAddToCart = async () => {
    console.log("🚀 Adding to cart:", product._id, productCount);
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

  if (loading) return <Loader />;
  if (error) return <p>❌ Error: {error.message}</p>;
  if (!product) return <p>⚠️ Product is not found!</p>;

  return (
    <DetailsContainer>
      <CloseButton onClick={() => window.history.back()}>✖</CloseButton>

      <DetailsWrapper>
        <ImageContainer>
          {product.photoUrl && (
            <ProductImage
              src={product.photoUrl}
              alt={product.name}
              style={{
                transform: isZoomed ? "scale(1.5)" : "scale(1)",
                transition: "transform 0.3s ease-in-out",
                cursor: "pointer",
              }}
              onClick={handleImageClick}
            />
          )}
        </ImageContainer>
        <InfoContainer>
          <DetailsHeader>{product.name}</DetailsHeader>
          <InfoList>
            <InfoItem>🌈 Color: {product.color || "N/A"}</InfoItem>
            <InfoItem>📏 Size: {product.size || "N/A"}</InfoItem>
            <InfoItem>📏 Width: {product.width || "N/A"}</InfoItem>
            <InfoItem>📏 Height: {product.height || "N/A"}</InfoItem>
            <InfoItem>💰 Price: {product.price} zł</InfoItem>
            <InfoItem>📦 In Stock: {product.inStock ? "Yes" : "No"}</InfoItem>
          </InfoList>

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

            <ButtonShopping onClick={handleAddToCart}>🛒</ButtonShopping>
          </ProductAction>
        </InfoContainer>
      </DetailsWrapper>
    </DetailsContainer>
  );
};

export default ProductDetailsPage;
