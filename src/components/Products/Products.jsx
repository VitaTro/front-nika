import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
  CATEGORY_MAP_BY_TYPE,
  FILTER_CONFIG,
} from "../../components/Filters/FILTER_CONFIG";
import { WelcomeGeneral } from "../../pages/ProductsPage/ProductsPage.styled";
import axios from "../../redux/axiosConfig";
import ErrorBoundary from "../ErrorBoundary";
import CategoryFilter from "../Filters/CategoryFilter/CategoryFilter";
import Loader from "../Loader";
import PaginationComponent from "../PaginationComponent/PaginationComponent";
import ProductsCard from "../ProductsCard/ProductsCard";
import SearchBar from "../SearchBar/SearchBar";
import { ProductsContainer, ProductsGrid } from "./Products.styled";
import SidebarTabs from "./SidebarTabs";
const productsPerPage = 18;

const cleanPrice = (p) =>
  Number(String(p?.price ?? 0).replace(/[^\d.-]/g, "")) || 0;

const Products = ({ type }) => {
  const { t } = useTranslation();
  const isUserAuthenticated = useSelector((state) => state.userAuth.isLoggedIn);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState("all");
  const [availableColors, setAvailableColors] = useState([]);
  const [availableLengths, setAvailableLengths] = useState([]);
  const [availableWidths, setAvailableWidths] = useState([]);
  const [availableEarringClasps, setAvailableEarringClasps] = useState([]);
  const [availableLetters, setAvailableLetters] = useState([]);
  const [availableChainClasps, setAvailableChainClasps] = useState([]);
  const [availableRingSizes, setAvailableRingSizes] = useState([]);
  const [availableBraceletClasps, setAvailableBraceletClasps] = useState([]);
  const [filters, setFilters] = useState({
    clasp: "",
    stoneColor: "",
    length: "",
    withStones: "",
    letters: [],
    priceSort: "",
  });
  const defaultFilters = {
    clasp: "",
    stoneColor: "",
    length: "",
    width: "",
    withStones: "",
    letters: [],
    ringSize: "",
    priceSort: "",
  };

  // SEARCH
  useEffect(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();

      const filtered = products.filter((product) => {
        const name = product.name?.toLowerCase() || "";
        const description = product.description?.toLowerCase() || "";
        return name.includes(query) || description.includes(query);
      });

      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchQuery, products]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const applyFilters = (products, filters, category) => {
    const config = FILTER_CONFIG[category] ?? [];

    return products.filter((p) =>
      config.every((f) => {
        const value = filters[f.key];
        if (!value) return true;

        const desc = p.description?.toLowerCase() || "";

        if (f.key === "stoneColor") {
          return p.color?.toLowerCase().includes(value.toLowerCase());
        }

        if (f.key === "length") {
          return Number(p.length) === Number(value);
        }
        if (f.key === "width") {
          return Number(p.width) === Number(value);
        }

        if (f.key === "clasp") {
          return p.clasp?.toLowerCase() === value.toLowerCase();
        }
        if (f.key === "ringSize") {
          return Number(p.size) === Number(value);
        }

        if (f.key === "withStones") {
          const has = desc.includes("stone");
          return value === "yes" ? has : !has;
        }

        if (f.key === "hasLetter") {
          return /[A-Za-z]/.test(desc);
        }

        return true;
      }),
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await axios.get("/api/products", {
          params: { type, category: activeCategory },
        });

        let filtered = response.data;

        if (type !== "all") {
          filtered = filtered.filter((p) => p.category === type);
        }

        if (activeCategory !== "all") {
          filtered = filtered.filter((p) => p.subcategory === activeCategory);
        }

        filtered = applyFilters(filtered, filters, activeCategory);

        const sortedByDate = [...filtered].sort((a, b) => {
          const stockA = a.currentStock ?? a.quantity ?? 0;
          const stockB = b.currentStock ?? b.quantity ?? 0;

          if (stockA > 0 && stockB === 0) return -1;
          if (stockA === 0 && stockB > 0) return 1;

          return new Date(b.createdAt) - new Date(a.createdAt);
        });

        setProducts(sortedByDate);
        setFilteredProducts(sortedByDate);

        setAvailableColors(
          [
            ...new Set(
              sortedByDate
                .flatMap((p) => (p.color ? p.color.split(" ") : []))
                .filter(Boolean),
            ),
          ].sort(),
        );
        setAvailableRingSizes(
          [
            ...new Set(
              sortedByDate
                .filter((p) => p.subcategory === "rings")
                .map((p) => p.size)
                .filter((v) => v !== null && v !== undefined),
            ),
          ].sort((a, b) => a - b),
        );

        setProducts(sortedByDate);
        setFilteredProducts(sortedByDate);
        setAvailableLengths(
          [
            ...new Set(
              sortedByDate
                .map((p) => p.length)
                .filter((v) => v !== null && v !== undefined),
            ),
          ].sort((a, b) => a - b),
        );

        // 🎧 Сережки
        setAvailableEarringClasps([
          ...new Set(
            sortedByDate
              .filter((p) => p.subcategory === "earrings")
              .map((p) => p.clasp)
              .filter(Boolean),
          ),
        ]);

        // 🔗 Ланцюжки
        setAvailableChainClasps([
          ...new Set(
            sortedByDate
              .filter((p) => p.subcategory === "chains")
              .map((p) => p.clasp)
              .filter(Boolean),
          ),
        ]);

        // 📿 Браслети
        setAvailableBraceletClasps([
          ...new Set(
            sortedByDate
              .filter((p) => p.subcategory === "bracelets")
              .map((p) => p.clasp)
              .filter(Boolean),
          ),
        ]);
        setAvailableWidths(
          [
            ...new Set(
              sortedByDate
                .map((p) => p.width)
                .filter((v) => v !== null && v !== undefined),
            ),
          ].sort((a, b) => a - b),
        );

        setAvailableLetters([
          ...new Set(
            sortedByDate.flatMap(
              (p) => p.description?.match(/[A-Za-z]/g) || [],
            ),
          ),
        ]);
      } catch (error) {
        setError("Failed to fetch products. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [type, activeCategory, filters]);

  let listForView = [...filteredProducts];

  // ⭐ СОРТУВАННЯ ПО ЦІНІ (lastRetailPrice)
  if (filters.priceSort === "asc") {
    listForView = [...listForView].sort(
      (a, b) => (a.lastRetailPrice ?? a.price) - (b.lastRetailPrice ?? b.price),
    );
  }

  if (filters.priceSort === "desc") {
    listForView = [...listForView].sort(
      (a, b) => (b.lastRetailPrice ?? b.price) - (a.lastRetailPrice ?? a.price),
    );
  }

  // PAGINATION
  const availableProducts = listForView.filter(
    (p) => p.inStock !== false && (p.currentStock ?? p.quantity ?? 0) > 0,
  );

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = availableProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(availableProducts.length / productsPerPage);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);

    setFilters(defaultFilters);
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />

      <ProductsContainer>
        <WelcomeGeneral>
          {type === "all" ? t("all_products") : t(`${type}_products`)}
        </WelcomeGeneral>

        {error && (
          <p>
            {t("error")}: {error}
          </p>
        )}

        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: 3,
            alignItems: "flex-start",
          }}
        >
          <Box
            sx={{
              width: isMobile ? "100%" : "220px",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <SidebarTabs
              activeCategory={activeCategory}
              onChange={handleCategoryChange}
              categories={["all", ...(CATEGORY_MAP_BY_TYPE[type] ?? [])]}
            />

            <CategoryFilter
              category={activeCategory}
              filters={filters}
              setFilters={setFilters}
              availableColors={availableColors}
              availableLengths={availableLengths}
              availableWidths={availableWidths}
              availableClasps={availableEarringClasps}
              availableBraceletClasps={availableBraceletClasps}
              availableChainClasps={availableChainClasps}
              availableLetters={availableLetters}
              availableRingSizes={availableRingSizes}
            />
          </Box>

          <Box sx={{ flexGrow: 1 }}>
            {isLoading ? (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "40px 0",
                }}
              >
                <Loader />
              </Box>
            ) : (
              <>
                <ProductsGrid>
                  {currentProducts.map((product, index) => (
                    <ErrorBoundary key={product._id || index}>
                      <ProductsCard
                        product={product}
                        t={t}
                        isUserAuthenticated={isUserAuthenticated}
                      />
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
          </Box>
        </Box>
      </ProductsContainer>
    </>
  );
};

export default Products;
