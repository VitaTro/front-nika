import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { selectIsLoggedIn } from "../../redux/auth/userAuth/selectorsAuth";
import { addGuestCartItem } from "../../redux/guest/shopping/guestShoppingSlice";
import { selectGuestWishlist } from "../../redux/guest/wishlist/guestWishlistSelectors";
import { toggleGuestWishlist } from "../../redux/guest/wishlist/guestWishlistSlice";
import { getProductById } from "../../redux/products/operationProducts";
import {
  selectCurrentProduct,
  selectProductsError,
  selectProductsLoading,
} from "../../redux/products/selectorsProducts";
import { selectWishlistProducts } from "../../redux/wishlist/selectorsWishlist";
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
  const isUserAuthenticated = useSelector(selectIsLoggedIn);
  const [isZoomed, setIsZoomed] = useState(false);
  const [activePhoto, setActivePhoto] = useState(null);

  const guestWishlist = useSelector(selectGuestWishlist);
  const userWishlist = useSelector(selectWishlistProducts);

  const wishlistItems = isUserAuthenticated ? userWishlist : guestWishlist;

  const product =
    isUserAuthenticated && location.pathname.includes("/user/")
      ? userProduct
      : publicProduct;
  const isInWishlist =
    product &&
    wishlistItems.some(
      (item) =>
        item.id === product.id ||
        item.productId === product.id ||
        item.productId === product._id ||
        item.id === product._id,
    );

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
  const toggleWishlist = () => {
    if (isUserAuthenticated) {
      // USER
      if (isInWishlist) {
        dispatch(removeProductFromWishlist(product.id));
        toast.info(t("removed_from_wishlist"));
      } else {
        dispatch(addProductToWishlist(product.id));
        toast.success(t("added_to_wishlist"));
      }
      dispatch(getWishlist());
    } else {
      // GUEST
      if (isInWishlist) {
        dispatch(toggleGuestWishlist(product));
        toast.info(t("removed_from_wishlist"));
      } else {
        dispatch(toggleGuestWishlist(product));
        toast.success(t("added_to_wishlist"));
      }
    }
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

  const addToCart = () => {
    if (!isUserAuthenticated) {
      dispatch(addGuestCartItem({ ...product, quantity: 1 }));
      toast.success(t("productAdded"));
      return;
    }

    dispatch(moveProductToShoppingCart(product.id))
      .unwrap()
      .then(() => {
        toast.success(t("productAdded"));
        dispatch(getShoppingCart());
      })
      .catch(() => toast.error(t("errorMessage")));
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
                <NumberValue>
                  {product.color
                    .split(" ")
                    .map((c) => t(`value.${c}`, { defaultValue: c }))
                    .join(" ")}
                </NumberValue>
              ) : (
                t("not_available")
              )}
            </InfoItem>
            {/* MATERIAL */}
            <InfoItem>
              🧵 {t("material")}:{" "}
              {product.materials ? (
                <NumberValue>{product.materials}</NumberValue>
              ) : (
                t("not_available")
              )}
            </InfoItem>

            {/* SIZE */}
            <InfoItem>
              📐 {t("size")}: {/* Якщо це каблучка → показуємо всі варіанти */}
              {product.subcategory?.toLowerCase() === "rings" ? (
                Array.isArray(product.variants) &&
                product.variants.length > 0 ? (
                  <NumberValue>
                    {product.variants.map((v) => v.size).join(", ")}
                  </NumberValue>
                ) : (
                  t("not_available")
                )
              ) : /* Якщо НЕ каблучка → показуємо старе поле size */
              !sizeParts.value ? (
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
            {product?.subcategory?.toLowerCase() === "bracelets" && (
              <InfoItem>
                🔗 {t("extension")}:{" "}
                {product.hasExtension ? (
                  <>
                    <NumberValue>{product.extension}</NumberValue> cm
                  </>
                ) : (
                  t("not_available")
                )}
              </InfoItem>
            )}

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
            {/* PRICE */}
            <InfoItem>
              💰 {t("price")}:{" "}
              {product.promoPrice ? (
                <>
                  <PriceValue style={{ color: "#e63946", fontWeight: 700 }}>
                    {product.promoPrice}
                  </PriceValue>{" "}
                  zł{" "}
                  <span
                    style={{
                      textDecoration: "line-through",
                      color: "#888",
                      fontSize: "14px",
                      marginLeft: "6px",
                    }}
                  >
                    {product.lastRetailPrice} zł
                  </span>
                </>
              ) : (
                <>
                  <PriceValue>{product.lastRetailPrice}</PriceValue> zł
                </>
              )}
            </InfoItem>

            {/* ❤️ + 🛒 BUTTONS */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "20px",
                marginTop: "12px",
              }}
            >
              <button
                onClick={toggleWishlist}
                style={{
                  background: "none",
                  border: "1px solid #d4af37",
                  borderRadius: "50%",
                  width: "45px",
                  height: "45px",
                  fontSize: "22px",
                  cursor: "pointer",
                  transition: "0.3s",
                }}
              >
                ❤️
              </button>

              <button
                onClick={addToCart}
                style={{
                  background: "none",
                  border: "1px solid #d4af37",
                  borderRadius: "50%",
                  width: "45px",
                  height: "45px",
                  fontSize: "22px",
                  cursor: "pointer",
                  transition: "0.3s",
                }}
              >
                🛒
              </button>
            </div>
          </InfoList>
        </InfoContainer>
      </DetailsWrapper>
    </DetailsContainer>
  );
};

export default ProductDetailsPage;
