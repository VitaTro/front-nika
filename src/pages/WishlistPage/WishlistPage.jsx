import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Loader from "../../components/Loader";
import NoResults from "../../components/NoResults/NoResults";
import PaginationComponent from "../../components/PaginationComponent/PaginationComponent";

import { selectIsLoggedIn } from "../../redux/auth/userAuth/selectorsAuth";
import { addGuestCartItem } from "../../redux/guest/shopping/guestShoppingSlice";
import { selectGuestWishlist } from "../../redux/guest/wishlist/guestWishlistSelectors";
import { toggleGuestWishlist } from "../../redux/guest/wishlist/guestWishlistSlice";

import { getShoppingCart } from "../../redux/shopping/operationShopping";
import {
  getWishlist,
  moveProductToShoppingCart,
  removeProductFromWishlist,
} from "../../redux/wishlist/operationWishlist";

import {
  selectWishlistError,
  selectWishlistLoading,
  selectWishlistProducts,
} from "../../redux/wishlist/selectorsWishlist";

import { WelcomeGeneral } from "../ProductsPage/ProductsPage.styled";

import {
  ActionButtons,
  AddToCartButton,
  ProductDetails,
  ProductImage,
  ProductName,
  ProductPrice,
  RemoveButton,
  WishlistCard,
  WishlistGrid,
} from "./WishlistPage.styled";

const WishlistPage = () => {
  const isUserAuthenticated = useSelector(selectIsLoggedIn);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 18;

  const isLoading = isUserAuthenticated
    ? useSelector(selectWishlistLoading)
    : false;

  const error = isUserAuthenticated ? useSelector(selectWishlistError) : null;

  const wishlist = isUserAuthenticated
    ? useSelector(selectWishlistProducts)
    : useSelector(selectGuestWishlist);

  // Load backend wishlist
  useEffect(() => {
    if (isUserAuthenticated) {
      dispatch(getWishlist());
    }
  }, [dispatch, isUserAuthenticated]);

  // Remove item
  const handleRemove = (id) => {
    if (isUserAuthenticated) {
      dispatch(removeProductFromWishlist(id)).then(() => {
        dispatch(getWishlist());
      });
    } else {
      const productToRemove = wishlist.find((item) => item.id === id);
      dispatch(toggleGuestWishlist(productToRemove));
      toast.success(t("removed_from_wishlist"));
    }
  };

  // Move to cart
  const handleMoveToCart = async (id) => {
    if (!isUserAuthenticated) {
      const product = wishlist.find((item) => item.id === id);
      if (!product) return;

      dispatch(
        addGuestCartItem({
          ...product,
          quantity: 1,
        }),
      );

      dispatch(toggleGuestWishlist(product));
      toast.success(t("productAdded"));
      return;
    }

    try {
      await dispatch(moveProductToShoppingCart(id)).unwrap();
      toast.success(t("productAdded"));
      dispatch(getShoppingCart());
      dispatch(getWishlist());
    } catch (error) {
      console.error("❌ Error moving product to cart:", error);
      toast.error(t("errorMessage"));
    }
  };

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentWishlist = wishlist.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  const totalPages = Math.ceil(wishlist.length / productsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  // Автоматичне сортування каблучок за розміром
  const getRingSize = (product) => {
    if (!product.variants || product.variants.length === 0) return Infinity;

    // беремо всі розміри, які є числами
    const numericSizes = product.variants
      .map((v) => Number(v.size))
      .filter((n) => !isNaN(n));

    if (numericSizes.length === 0) return Infinity;

    return Math.min(...numericSizes);
  };
  const sortedWishlist = [...currentWishlist].sort((a, b) => {
    const aIsRing = a.subcategory === "rings";
    const bIsRing = b.subcategory === "rings";

    if (aIsRing && bIsRing) {
      return getRingSize(a) - getRingSize(b);
    }

    if (aIsRing && !bIsRing) return -1;
    if (!aIsRing && bIsRing) return 1;

    return 0;
  });

  // Render cards
  const displayProducts = sortedWishlist.map((product) => {
    const productId = isUserAuthenticated ? product.productId : product.id;

    return (
      <WishlistCard key={productId}>
        <ProductImage src={product.photoUrl} alt={product.name} />

        <ProductDetails>
          <ProductName>{product.name}</ProductName>

          <ProductPrice $promo={!!product.promoPrice}>
            {product.promoPrice ? (
              <>
                <span className="promo">{product.promoPrice} zł</span>
                <span className="regular">{product.price} zł</span>
              </>
            ) : (
              <span>{product.price} zł</span>
            )}
          </ProductPrice>
        </ProductDetails>

        <ActionButtons>
          <AddToCartButton onClick={() => handleMoveToCart(productId)}>
            🛒
          </AddToCartButton>

          <RemoveButton onClick={() => handleRemove(productId)}>
            🗑️
          </RemoveButton>
        </ActionButtons>
      </WishlistCard>
    );
  });

  return (
    <>
      <Helmet>
        <title>{t("meta.guestWishlist.title")}</title>
        <meta
          name="description"
          content={t("meta.guestWishlist.description")}
        />
      </Helmet>

      <WelcomeGeneral>{t("wishlist_page")}</WelcomeGeneral>

      {isLoading && <Loader />}
      {error && (
        <p>
          {t("error")}: {error}
        </p>
      )}

      {!wishlist.length && !isLoading && <NoResults />}

      {wishlist.length > 0 && <WishlistGrid>{displayProducts}</WishlistGrid>}

      {wishlist.length > productsPerPage && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <PaginationComponent
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={paginate}
          />
        </div>
      )}
    </>
  );
};

export default WishlistPage;
