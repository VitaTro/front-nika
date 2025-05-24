import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Loader from "../../components/Loader";
import NoResults from "../../components/NoResults/NoResults";
import ZoomableProductImage from "../../components/ZoomableProductImage";
import axios from "../../redux/axiosConfig";
import { WelcomeGeneral } from "../ProductsPage/ProductsPage.styled";
import {
  ButtonHeart,
  ButtonOrder,
  ButtonQuantity,
  ContainerCart,
  ItemHeader,
  ProductName,
  ProductPrice,
  QuantityController,
  RemoveButton,
  ShoppingItem,
  ShoppingList,
  TotalAmount,
  TotalHeader,
} from "./ShoppingCartPage.styled";

const ShoppingCartPage = () => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 18;
  const [shoppingCart, setShoppingCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    fetchShoppingCart();
    fetchWishlist();
  }, []);

  const fetchShoppingCart = async () => {
    try {
      const { data } = await axios.get("/api/user/shopping-cart");
      setShoppingCart(data.cart || []);
      calculateTotalAmount(data.cart || []);
      setIsLoading(false);
    } catch (err) {
      setError("Failed to load shopping cart");
    }
  };

  const fetchWishlist = async () => {
    try {
      const { data } = await axios.get("/api/user/wishlist");
      setWishlist(data.wishlist || []);
    } catch (err) {
      setError("Failed to load wishlist");
    }
  };

  const calculateTotalAmount = (cart) => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.quantity;
    });
    setTotalAmount(total);
  };

  const handleToggleWishlist = async (product) => {
    if (!product) {
      console.error("❌ Invalid product:", product);
      return;
    }

    const productId = product.productId || product._id;
    if (!productId) {
      console.error("❌ Product ID is missing:", product);
      return;
    }

    if (wishlist.some((w) => w.productId === productId)) {
      console.log("🗑 Removing from wishlist:", productId);
      try {
        await axios.post(`/api/user/wishlist/remove`, { productId });
        fetchWishlist();
      } catch (error) {
        console.error("❌ Error removing from wishlist:", error.message);
      }
    } else if (shoppingCart.some((sc) => sc.productId === productId)) {
      console.log("🔄 Moving from cart to wishlist:", productId);
      try {
        await axios.post(
          `/api/user/shopping-cart/move-to-wishlist/${product._id}`
        );
        fetchShoppingCart();
        fetchWishlist();
      } catch (error) {
        console.error("❌ Error moving to wishlist:", error.message);
      }
    } else {
      console.log("❤️ Adding to wishlist:", productId);
      try {
        await axios.post(`/api/user/wishlist/add`, { productId });
        fetchWishlist();
      } catch (error) {
        console.error("❌ Error adding to wishlist:", error.message);
      }
    }
  };

  const handleQuantityChange = async (id, quantity) => {
    if (quantity < 1) return;
    console.log("🔄 Updating quantity:", id, "New quantity:", quantity);
    try {
      await axios.patch(`/api/user/shopping-cart/update/${id}`, { quantity });
      fetchShoppingCart();
    } catch (error) {
      console.error("❌ Error updating quantity:", error.message);
    }
  };

  const handleRemove = async (id) => {
    console.log("❌ Removing product:", id);
    try {
      await axios.delete(`/api/user/shopping-cart/remove/${id}`);
      fetchShoppingCart();
    } catch (error) {
      console.error("❌ Error removing product:", error.message);
    }
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentCart = shoppingCart.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(shoppingCart.length / productsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const displayProducts = currentCart.map((item) => (
    <ShoppingItem key={item._id}>
      <ItemHeader>
        <ZoomableProductImage
          src={item.photoUrl}
          alt={item.name}
          tabIndex="0"
        />
        <ProductName>{item.name}</ProductName>
      </ItemHeader>
      <ContainerCart>
        <QuantityController>
          <ButtonQuantity
            onClick={() =>
              handleQuantityChange(item._id, Math.max(item.quantity - 1, 1))
            }
          >
            ➖
          </ButtonQuantity>
          <span>{item.quantity}</span>
          <ButtonQuantity
            onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
          >
            ➕
          </ButtonQuantity>
        </QuantityController>
        <ProductPrice>
          <span>{item.quantity * item.price} zł</span>
        </ProductPrice>
        <ButtonHeart
          onClick={() => handleToggleWishlist(item)}
          $isActive={wishlist.some((w) => w.productId === item.productId)}
        >
          {wishlist.some((w) => w.productId === item.productId) ? "❤️" : "🖤"}
        </ButtonHeart>
        <RemoveButton onClick={() => handleRemove(item._id)}>🗑️</RemoveButton>
      </ContainerCart>
    </ShoppingItem>
  ));

  return (
    <>
      <WelcomeGeneral>{t("basket")}</WelcomeGeneral>
      {isLoading && <Loader />}
      {error && (
        <p>
          {t("error")}: {error}
        </p>
      )}
      {!shoppingCart.length && !isLoading && <NoResults />}
      {shoppingCart.length > 0 && (
        <ShoppingList>{displayProducts}</ShoppingList>
      )}
      <TotalHeader>
        {t("total")}: <TotalAmount>{totalAmount} zł</TotalAmount>
      </TotalHeader>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <ButtonOrder onClick={() => navigate("/user/orders")}>
          {t("place_order")}
        </ButtonOrder>
      </div>
    </>
  );
};

export default ShoppingCartPage;
