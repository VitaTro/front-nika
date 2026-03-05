import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { FILTER_CONFIG } from "../../components/Filters/FILTER_CONFIG";
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
const Products = ({ type }) => {
  const dispatch = useDispatch();
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
  const [availableClasps, setAvailableClasps] = useState([]);
  const [availableLetters, setAvailableLetters] = useState([]);

  const productsPerPage = 18;

  const [filters, setFilters] = useState({
    clasp: "",
    stoneColor: "",
    length: "",
    withStones: "",
    letters: [],
  });

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

    return products.filter((p) => {
      return config.every((f) => {
        const value = filters[f.key];
        if (!value) return true;

        const desc = p.description?.toLowerCase() || "";

        if (f.key === "stoneColor") {
          return p.color?.toLowerCase() === value.toLowerCase();
        }

        if (f.key === "length") {
          return desc.includes(String(value));
        }

        if (f.key === "clasp") {
          return desc.includes(value.toLowerCase());
        }

        if (f.key === "withStones") {
          const has = desc.includes("stone");
          return value === "yes" ? has : !has;
        }

        if (f.key === "hasLetter") {
          return /[A-Za-z]/.test(desc);
        }

        return true;
      });
    });
  };

  // FETCH DATA + FILTERS
  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsLoading(true);
  //     setError("");

  //     try { filtered.filter((p) => p.category === type);
  //       }

  //       if (activeCategory !== "all") {
  //         filtered = filtered.filter((p) => p.subcategory === activeCategory);
  //       }

  // Earrings
  // if (activeCategory === "earrings") {
  //   if (filters.clasp) {
  //     filtered = filtered.filter((p) =>
  //       p.description
  //         ?.toLowerCase()
  //         .includes(filters.clasp.toLowerCase()),
  //     );
  //   }
  //   if (filters.stoneColor) {
  //     filtered = filtered.filter(
  //       (p) =>
  //         p.color?.toLowerCase() === filters.stoneColor.toLowerCase(),
  //     );
  //   }
  // }

  // Chains
  // if (activeCategory === "chains" && filters.length) {
  // const lengthStr = String(filters.length).toLowerCase();
  // filtered = filtered.filter((p) =>
  //   p.description?.toLowerCase().includes(lengthStr),
  // );
  // }

  // Bracelets
  // if (activeCategory === "bracelets") {
  // if (filters.length) {
  //   const lengthStr = String(filters.length).toLowerCase();
  //   filtered = filtered.filter((p) =>
  //       p.description?.toLowerCase().includes(lengthStr),
  //     );
  //   }
  //   if (filters.stoneColor) {
  //     filtered = filtered.filter(
  //       (p) =>
  //         p.color?.toLowerCase() === filters.stoneColor.toLowerCase(),
  // );
  //   }
  // }

  // Crosses
  // if (activeCategory === "crosses") {
  //   if (filters.withStones === "yes") {
  //     filtered = filtered.filter((p) =>
  //       p.description?.toLowerCase().includes("stone"),
  //     );
  //   }
  //   if (filters.withStones === "no") {
  //     filtered = filtered.filter(
  //       (p) => !p.description?.toLowerCase().includes("stone"),
  //     );
  //   }
  // }

  // Pendants
  // if (activeCategory === "pendants") {
  //   if (filters.letters?.length > 0) {
  //     filtered = filtered.filter((p) =>
  //       filters.letters.some((l) =>
  //         p.description?.toLowerCase().includes(l.toLowerCase()),
  //       ),
  //     );
  //   }
  //   if (filters.withStones === "yes") {
  //     filtered = filtered.filter((p) =>
  //       p.description?.toLowerCase().includes("stone"),
  //   );
  // }
  // if (filters.withStones === "no") {
  //   filtered = filtered.filter(
  //     (p) => !p.description?.toLowerCase().includes("stone"),
  //   );
  // }
  // if (filters.stoneColor) {
  //   filtered = filtered.filter(
  //       (p) =>
  //         p.color?.toLowerCase() === filters.stoneColor.toLowerCase(),
  //     );
  //   }
  // }

  // AVAILABLE OPTIONS
  // setAvailableC
  // const response = await axios.get("/api/products", {
  //   params: { type, category: activeCategory },
  // });

  // let filtered = response.data;

  // // CATEGORY FILTERS
  // if (type !== "all") {
  //   filtered =olors([
  //   ...new Set(filtered.map((p) => p.color).filter(Boolean)),
  // ]);
  //
  // setAvailableLengths([
  //   ...new Set(
  //     filtered
  //       .map((p) => p.description?.match(/\d+/)?.[0])
  //       .filter(Boolean),
  //   ),
  // ]);
  //
  // setAvailableClasps([
  //   ...new Set(
  //     filtered
  //       .map((p) => p.description?.toLowerCase())
  //       .filter(Boolean)
  //       .flatMap((d) =>
  //         ["english", "stud", "hoop", "round", "hook"].filter((c) =>
  //           d.includes(c),
  //         ),
  //       ),
  //   ),
  // ]);

  // setAvailableLetters([
  //   ...new Set(
  //     filtered
  //       .map((p) => p.description?.match(/[A-Za-z]/)?.[0])
  //       .filter(Boolean),
  //   ),
  // ]);

  // SORT
  //     const sorted = filtered.sort((a, b) => {
  //       if (a.quantity > 0 && b.quantity === 0) return -1;
  //       if (a.quantity === 0 && b.quantity > 0) return 1;
  //       return new Date(b.createdAt) - new Date(a.createdAt);
  //     });

  //     setProducts(sorted);
  //     setFilteredProducts(sorted);
  //   } catch (error) {
  //     setError("Failed to fetch products. Please try again.");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // fetchData();
  // }, [
  // type,
  // activeCategory,
  // filters.clasp,
  // filters.stoneColor,
  // filters.length,
  // filters.withStones,
  // filters.letters,
  // ]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await axios.get("/api/products", {
          params: { type, category: activeCategory },
        });

        let filtered = response.data;

        // CATEGORY FILTERS
        if (type !== "all") {
          filtered = filtered.filter((p) => p.category === type);
        }

        if (activeCategory !== "all") {
          filtered = filtered.filter((p) => p.subcategory === activeCategory);
        }

        // APPLY UNIVERSAL FILTERS
        filtered = applyFilters(filtered, filters, activeCategory);

        // AVAILABLE OPTIONS
        setAvailableColors([
          ...new Set(filtered.map((p) => p.color).filter(Boolean)),
        ]);

        setAvailableLengths([
          ...new Set(
            filtered
              .map((p) => p.description?.match(/\d+/)?.[0])
              .filter(Boolean),
          ),
        ]);

        setAvailableClasps([
          ...new Set(
            filtered.flatMap((p) => {
              const d = p.description?.toLowerCase() || "";
              return ["english", "stud", "hoop", "round", "hook"].filter((c) =>
                d.includes(c),
              );
            }),
          ),
        ]);

        setAvailableLetters([
          ...new Set(
            filtered.flatMap((p) => p.description?.match(/[A-Za-z]/g) || []),
          ),
        ]);

        // SORT
        const sorted = filtered.sort((a, b) => {
          if (a.quantity > 0 && b.quantity === 0) return -1;
          if (a.quantity === 0 && b.quantity > 0) return 1;
          return new Date(b.createdAt) - new Date(a.createdAt);
        });

        setProducts(sorted);
        setFilteredProducts(sorted);
      } catch (error) {
        setError("Failed to fetch products. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [type, activeCategory, filters]);

  // PAGINATION
  const availableProducts = filteredProducts.filter(
    (p) => p.inStock !== false && (p.currentStock ?? p.quantity ?? 0) > 0,
  );

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = availableProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(availableProducts.length / productsPerPage);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
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
          {/* LEFT SIDEBAR */}
          <Box
            sx={{
              width: isMobile ? "100%" : "220px",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {/* {(type === "gold" || type === "silver" || type === "goldLight") && ( */}
            <>
              <SidebarTabs
                activeCategory={activeCategory}
                onChange={handleCategoryChange}
                categories={[
                  "all",
                  "chains",
                  "earrings",
                  "bracelets",
                  "rings",
                  "pendants",
                  "crosses",
                  "incense",
                ]}
              />

              <CategoryFilter
                category={activeCategory}
                filters={filters}
                setFilters={setFilters}
                availableColors={availableColors}
                availableLengths={availableLengths}
                availableClasps={availableClasps}
                availableLetters={availableLetters}
              />
            </>
            {/* )} */}

            {type === "handmade" && (
              <SidebarTabs
                activeCategory={activeCategory}
                onChange={handleCategoryChange}
                categories={["all", "beaded", "thread", "beads"]}
              />
            )}
          </Box>

          {/* RIGHT SIDE */}
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
