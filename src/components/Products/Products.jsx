import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { WelcomeGeneral } from "../../pages/ProductsPage/ProductsPage.styled";
import axios from "../../redux/axiosConfig";
import ErrorBoundary from "../ErrorBoundary";
import Loader from "../Loader";
import PaginationComponent from "../PaginationComponent/PaginationComponent";
import ProductsCard from "../ProductsCard/ProductsCard";
import SearchBar from "../SearchBar/SearchBar";
import {
  ProductsContainer,
  ProductsGrid,
  TabButton,
  Tabs,
} from "./Products.styled";

const Products = ({ type }) => {
  console.log("Products component mounted with type:", type);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isUserAuthenticated = useSelector((state) => state.userAuth.isLoggedIn);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState(products); // ✅ Виправлено!

  const productsPerPage = 18;

  useEffect(() => {
    if (searchQuery) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchQuery, products]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Скидаємо сторінку після пошуку
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      isUserAuthenticated;
    }

    const fetchData = async () => {
      setIsLoading(true); // Починаємо завантаження
      setError(""); // Очищуємо помилки перед запитом
      try {
        // Запит через axios
        const response = await axios.get("/api/products", {
          params: {
            type: type,
            category: activeCategory,
          },
        });

        const data = response.data;
        console.log("Fetched data:", data);

        let filteredProducts = data;

        if (type !== "all") {
          filteredProducts = filteredProducts.filter(
            (product) => product.category === type
          );
        }

        if (activeCategory !== "all") {
          filteredProducts = filteredProducts.filter(
            (product) => product.subcategory === activeCategory
          );
        }

        const sortByDate = (a, b) => {
          const dateA = new Date(a.createdAt || Date.now());
          const dateB = new Date(b.createdAt || Date.now());
          return dateB - dateA;
        };

        const sortedProducts = filteredProducts.sort(sortByDate);

        setProducts(sortedProducts);
        setFilteredProducts(sortedProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch products. Please try again.");
      } finally {
        setIsLoading(false); // Завершуємо завантаження
      }
    };

    fetchData();
  }, [type, activeCategory]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <ProductsContainer>
        <WelcomeGeneral>
          {type === "all"
            ? t("all_products")
            : t(`${type}_products`.toLowerCase())}
        </WelcomeGeneral>

        {error && (
          <p>
            {t("error")}: {error}
          </p>
        )}
        {(type === "gold" || type === "silver") && (
          <Tabs>
            {[
              "all",
              "chains",
              "earrings",
              "bracelets",
              "rings",
              "pendants",
              "crosses",
              "incense",
            ].map((category) => (
              <TabButton
                key={`tab-${category}`}
                onClick={() => handleCategoryChange(category)}
                className={activeCategory === category ? "active" : ""}
              >
                {t(category)}
              </TabButton>
            ))}
          </Tabs>
        )}

        {isLoading ? (
          <Loader />
        ) : (
          <>
            <ProductsGrid>
              {currentProducts.map((product, index) => (
                <ErrorBoundary key={`product-${product._id || index}`}>
                  <ProductsCard
                    product={product}
                    t={t}
                    isUserAuthenticated={isUserAuthenticated}
                  />
                  {console.log("💰 Product Price:", product.price)}{" "}
                  {/* ✅ Додано лог для перевірки ціни */}
                </ErrorBoundary>
              ))}
            </ProductsGrid>
            <PaginationComponent
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </ProductsContainer>
    </>
  );
};

export default Products;
