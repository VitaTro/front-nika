import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { WelcomeGeneral } from "../../pages/ProductsPage/ProductsPage.styled";
import axios from "../../redux/axiosConfig";
import ErrorBoundary from "../ErrorBoundary";
import Header from "../Header/Header";
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

  // const = useParams(); // ✅ Виправлено: коректно витягуємо `type`
  console.log("Products type:", type);
  const dispatch = useDispatch();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState("all");
  const [errorMessage, setErrorMessage] = useState("");
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
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/api/products", {
          params: {
            type: type, // ✅ Виправлено: передаємо `type`
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

        const sortedProducts = filteredProducts.sort((a, b) => {
          const dateA = new Date(a.createdAt || Date.now());
          const dateB = new Date(b.createdAt || Date.now());
          return dateB - dateA;
        });

        setProducts(sortedProducts);
        setFilteredProducts(sortedProducts);
        setErrorMessage("");
      } catch (error) {
        console.error("Error fetching data from API:", error);
        setErrorMessage("Failed to fetch products. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [type, activeCategory]); // ✅ Виправлено: використовується `type`

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
      <Header />
      <SearchBar onSearch={handleSearch} />
      <ProductsContainer>
        <WelcomeGeneral>
          {type === "all"
            ? t("all_products")
            : t(`${type}_products`.toLowerCase())}
        </WelcomeGeneral>

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
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

        {isLoading ? (
          <Loader />
        ) : (
          <>
            <ProductsGrid>
              {currentProducts.map((product, index) => (
                <ErrorBoundary key={`product-${product.id || index}`}>
                  <ProductsCard product={product} t={t} />
                </ErrorBoundary>
              ))}
            </ProductsGrid>
            <PaginationComponent
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={paginate}
            />
          </>
        )}
      </ProductsContainer>
    </>
  );
};

export default Products;
