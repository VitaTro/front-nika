import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { searchProducts } from "../../redux/search/operationSearch";
import {
  selectSearchError,
  selectSearchLoading,
  selectSearchResults,
} from "../../redux/search/selectorsSearch";
import Loader from "../Loader";
import NoResults from "../NoResults/NoResults";
import {
  ProductsContainer,
  ProductsGrid,
  WelcomeHeader,
} from "../Products/Products.styled";
import ProductsCard from "../ProductsCard/ProductsCard";
const SearchResults = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const searchResults = useSelector(selectSearchResults);
  console.log("SearchResults:", searchResults);

  const loading = useSelector(selectSearchLoading);
  const error = useSelector(selectSearchError);

  // Отримання параметра query з URL
  const params = new URLSearchParams(location.search);
  const searchQuery = params.get("query") || "";

  useEffect(() => {
    if (searchQuery && searchQuery.trim().length >= 3) {
      dispatch(searchProducts(searchQuery)); // Запит до Redux
    }
  }, [searchQuery, dispatch]);

  return (
    <ProductsContainer>
      <Helmet>
        <title>{t("meta.search.title")}</title>
        <meta name="description" content={t("meta.search.description")} />
      </Helmet>

      <WelcomeHeader>Search Results for "{searchQuery}"</WelcomeHeader>
      {loading && <Loader />}
      {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
      {Array.isArray(searchResults) && searchResults.length > 0 ? (
        <ProductsGrid>
          {searchResults.map((product) => (
            <ProductsCard
              key={product._id}
              product={product}
              // Передаємо інші потрібні пропси (якщо є)
            />
          ))}
        </ProductsGrid>
      ) : (
        !loading && <NoResults />
      )}
    </ProductsContainer>
  );
};

export default SearchResults;
