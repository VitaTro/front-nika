import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import NoResults from "../../components/NoResults/NoResults";
import PaginationComponent from "../../components/PaginationComponent/PaginationComponent";
import ZoomableProductImage from "../../components/ZoomableProductImage";
import { selectIsUserAuthenticated } from "../../redux/auth/userAuth/selectorsAuth";
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
  AddToCartButton,
  AllButton,
  ProductName,
  ProductPrice,
  RemoveButton,
  WishlistItem,
} from "./WishlistPage.styled";

const WishlistPage = () => {
  const isUserAuthenticated = useSelector(selectIsUserAuthenticated);
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
      dispatch(toggleGuestWishlist({ id }));
      toast.success(t("removed_from_wishlist"));
    }
  };
  const handleMoveToCart = async (id) => {
    if (!isUserAuthenticated) {
      const product = wishlist.find((item) => item.id === id);

      if (!product) return;

      dispatch(
        addGuestCartItem({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          photoUrl: product.photoUrl,
        }),
      );

      dispatch(toggleGuestWishlist({ id }));

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
  const displayProducts = currentWishlist.map((product, index) => {
    const productId = isUserAuthenticated ? product.productId : product.id;

    return (
      <WishlistItem
        key={productId}
        $isLastItem={
          wishlist.length <= productsPerPage &&
          index === currentWishlist.length - 1
        }
      >
        <ZoomableProductImage
          src={product.photoUrl}
          alt={product.name}
          tabIndex="0"
        />

        <ProductName>{product.name}</ProductName>
        <ProductPrice>{product.price} zł</ProductPrice>

        <AllButton>
          {isUserAuthenticated ? (
            <AddToCartButton onClick={() => handleMoveToCart(productId)}>
              {" "}
              🛒{" "}
            </AddToCartButton>
          ) : (
            <AddToCartButton
              onClick={() => {
                const product = wishlist.find((item) => item.id === productId);
                if (!product) return;
                dispatch(
                  addGuestCartItem({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: 1,
                    photoUrl: product.photoUrl,
                  }),
                );
                toast.success(t("productAdded"));
              }}
            >
              {" "}
              🛒{" "}
            </AddToCartButton>
          )}
          <RemoveButton onClick={() => handleRemove(productId)}>
            {" "}
            🗑️{" "}
          </RemoveButton>
        </AllButton>
      </WishlistItem>
    );
  });

  return (
    <>
      <WelcomeGeneral>{t("wishlist_page")}</WelcomeGeneral>

      {isLoading && <Loader />}
      {error && (
        <p>
          {t("error")}: {error}
        </p>
      )}

      {!wishlist.length && !isLoading && <NoResults />}

      {wishlist.length > 0 && <>{displayProducts}</>}

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
