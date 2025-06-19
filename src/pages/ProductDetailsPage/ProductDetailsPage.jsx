import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import { getUserProductsById } from "../../redux/user/userOperations";
import {
  selectAuthError,
  selectAuthLoading,
} from "../../redux/user/userSelectors";
import {
  CloseButton,
  DetailsContainer,
  DetailsHeader,
  DetailsWrapper,
  ImageContainer,
  InfoContainer,
  InfoItem,
  InfoList,
  ProductImage,
} from "./ProductDetailsPage.styled";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const product = useSelector((state) => state.user.selectedProduct);
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const navigate = useNavigate();
  const location = useLocation();

  const [productCount, setProductCount] = useState(1);

  const [isZoomed, setIsZoomed] = useState(false);

  const displayValue = (val, t) =>
    val === undefined || val === null || val === "" || val === "N/A"
      ? t("not_available")
      : val;

  useEffect(() => {
    dispatch(getUserProductsById(id));
  }, [dispatch, id]);

  const handleImageClick = () => {
    setIsZoomed(!isZoomed);
  };
  const getLengthWithUnit = (product, t) => {
    if (!product?.length) return t("not_available");

    const mmCategories = ["pendants", "crosses", "incense"];
    const unit = mmCategories.includes(product.subcategory?.toLowerCase())
      ? "mm"
      : "cm";

    return `${product.length}${unit}`;
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
            <InfoItem>
              🎨 {t("color")}: {displayValue(product.color, t)}
            </InfoItem>
            <InfoItem>
              📐 {t("size")}: {displayValue(product.size, t)}
            </InfoItem>
            <InfoItem>
              ↔️ {t("width")}: {displayValue(product.width, t)}mm
            </InfoItem>
            <InfoItem>
              ↕️ {t("length")}: {getLengthWithUnit(product, t)}
            </InfoItem>
            <InfoItem>
              💰 {t("price")}: {product.price} zł
            </InfoItem>
            <InfoItem>
              📦 {t("in_stock")}: {product.inStock ? t("yes") : t("no")}
            </InfoItem>
          </InfoList>
        </InfoContainer>
      </DetailsWrapper>
    </DetailsContainer>
  );
};

export default ProductDetailsPage;
