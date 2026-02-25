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
  CarouselItem,
  CloseButton,
  DetailsContainer,
  DetailsHeader,
  DetailsWrapper,
  ImageContainer,
  InfoContainer,
  InfoItem,
  InfoList,
  MobileCarousel,
  NumberValue,
  PriceValue,
  ProductImage,
  QuantityValue,
  ThumbnailImage,
  Thumbnails,
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
  const [activePhoto, setActivePhoto] = useState(null);

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
  useEffect(() => {
    if (product?.photoUrl) {
      setActivePhoto(product.photoUrl);
    }
  }, [product]);

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
              id="main-product-image"
              src={activePhoto}
              alt={product.name}
              style={{
                transform: isZoomed ? "scale(1.5)" : "scale(1)",
                transition: "transform 0.3s ease-in-out",
                cursor: "pointer",
              }}
              onClick={handleImageClick}
            />
          )}
          {product.additionalPhotos.length > 0 && (
            <Thumbnails>
              {product.additionalPhotos.map((photo, index) => (
                <ThumbnailImage
                  key={index}
                  src={photo}
                  alt={`additional-${index}`}
                  style={{
                    width: "70px",
                    height: "70px",
                    objectFit: "cover",
                    borderRadius: "6px",
                    cursor: "pointer",
                    border: "1px solid #ccc",
                  }}
                  onClick={() => {
                    setActivePhoto(photo);
                    const img = document.querySelector("#main-product-image");
                    if (img) img.src = photo;
                  }}
                />
              ))}
            </Thumbnails>
          )}
          {product.additionalPhotos.length > 0 && (
            <MobileCarousel>
              {" "}
              {product.additionalPhotos.map((photo, index) => (
                <CarouselItem
                  key={index}
                  src={photo}
                  alt={`carousel-${index}`}
                  onClick={() => setActivePhoto(photo)}
                />
              ))}{" "}
            </MobileCarousel>
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
