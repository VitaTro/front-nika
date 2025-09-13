import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import { selectIsUserAuthenticated } from "../../redux/auth/userAuth/selectorsAuth";
import { getProductById } from "../../redux/products/operationProducts";
import {
  selectCurrentProduct,
  selectProductsError,
  selectProductsLoading,
} from "../../redux/products/selectorsProducts";
import { getUserProductsById } from "../../redux/user/userOperations";
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
  const publicProduct = useSelector(selectCurrentProduct);
  const { t } = useTranslation();
  const userProduct = useSelector((state) => state.user.selectedProduct);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);
  const navigate = useNavigate();
  const location = useLocation();
  const isUserAuthenticated = useSelector(selectIsUserAuthenticated);
  const [productCount, setProductCount] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);

  const displayValue = (val, t) =>
    val === undefined || val === null || val === "" || val === "N/A"
      ? t("not_available")
      : val;

  const product =
    isUserAuthenticated && location.pathname.includes("/user/")
      ? userProduct
      : publicProduct;
  useEffect(() => {
    if (!id) return;
    if (isUserAuthenticated && location.pathname.includes("/user")) {
      dispatch(getUserProductsById(id));
    } else {
      dispatch(getProductById(id));
    }
  }, [dispatch, id, isUserAuthenticated, location.pathname]);

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
  if (!product || !product.name) return <Loader />;

  if (loading) return <Loader />;
  if (error) return <p>❌ Error: {error.message}</p>;

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
            {product.materials && (
              <InfoItem>
                🧵 {t("materials")}: {displayValue(product.materials, t)}
              </InfoItem>
            )}

            <InfoItem>
              💰 {t("price")}: {product.lastRetailPrice} zł
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
