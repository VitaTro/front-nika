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
import {
  CloseButton,
  DetailsContainer,
  DetailsHeader,
  DetailsWrapper,
  ImageContainer,
  InfoContainer,
  InfoItem,
  InfoList,
  NumberValue,
  PriceValue,
  ProductImage,
  QuantityValue,
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
  const [isZoomed, setIsZoomed] = useState(false);

  const product =
    isUserAuthenticated && location.pathname.includes("/user/")
      ? userProduct
      : publicProduct;

  useEffect(() => {
    if (!id) return;
    dispatch(getProductById(id));
  }, [dispatch, id]);

  const handleImageClick = () => {
    setIsZoomed(!isZoomed);
  };

  // UNIVERSAL PARSER
  const parseValueWithUnit = (raw, defaultUnit = "mm") => {
    if (!raw) return { value: null, unit: "" };

    // number or "4"
    if (typeof raw === "number" || /^\d+(\.\d+)?$/.test(raw)) {
      return { value: raw, unit: defaultUnit };
    }

    // "4mm", "4 mm", "2.5cm"
    const match = raw.match(/^(\d+(?:\.\d+)?)[\s]*([a-zA-Z]+)$/);
    if (match) {
      return { value: match[1], unit: match[2] };
    }

    return { value: null, unit: "" };
  };

  // LENGTH LOGIC (mm for pendants/crosses/incense, else cm)
  const lengthUnit = ["pendants", "crosses", "incense"].includes(
    product?.subcategory?.toLowerCase(),
  )
    ? "mm"
    : "cm";

  const sizeParts = parseValueWithUnit(product?.size, "mm");
  const widthParts = parseValueWithUnit(product?.width, "mm");
  const lengthParts = parseValueWithUnit(product?.length, lengthUnit);

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
            {/* COLOR */}
            <InfoItem>
              🎨 {t("color")}:{" "}
              {product.color ? (
                <NumberValue>{product.color}</NumberValue>
              ) : (
                t("not_available")
              )}
            </InfoItem>

            {/* SIZE */}
            <InfoItem>
              📐 {t("size")}:{" "}
              {!sizeParts.value ? (
                t("not_available")
              ) : (
                <>
                  <NumberValue>{sizeParts.value}</NumberValue> {sizeParts.unit}
                </>
              )}
            </InfoItem>

            {/* WIDTH */}
            <InfoItem>
              ↔️ {t("width")}:{" "}
              {!widthParts.value ? (
                t("not_available")
              ) : (
                <>
                  <NumberValue>{widthParts.value}</NumberValue>{" "}
                  {widthParts.unit}
                </>
              )}
            </InfoItem>

            {/* LENGTH */}
            <InfoItem>
              ↕️ {t("length")}:{" "}
              {!lengthParts.value ? (
                t("not_available")
              ) : (
                <>
                  <NumberValue>{lengthParts.value}</NumberValue>{" "}
                  {lengthParts.unit}
                </>
              )}
            </InfoItem>

            {/* STOCK */}
            <InfoItem>
              📦 {t("available_quantity")}:{" "}
              {product.currentStock === null ||
              product.currentStock === undefined ? (
                t("not_available")
              ) : (
                <QuantityValue>{product.currentStock}</QuantityValue>
              )}{" "}
              szt
            </InfoItem>

            {/* PRICE */}
            <InfoItem>
              💰 {t("price")}:{" "}
              <PriceValue>{product.lastRetailPrice}</PriceValue> zł
            </InfoItem>
          </InfoList>
        </InfoContainer>
      </DetailsWrapper>
    </DetailsContainer>
  );
};

export default ProductDetailsPage;
