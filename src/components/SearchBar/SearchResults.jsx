import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  selectSearchError,
  selectSearchLoading,
  selectSearchResults,
} from "../../redux/search/selectorsSearch";
import Loader from "../Loader";

const SearchResults = () => {
  const location = useLocation();
  const searchResults = useSelector(selectSearchResults); // Завжди стабільний масив
  const loading = useSelector(selectSearchLoading);
  const error = useSelector(selectSearchError);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    console.log("Search Results in Component:", searchResults);

    setSearchQuery(params.get("query") || "");
  }, [location.search]);

  return (
    <div>
      <h1>Search Results for "{searchQuery}"</h1>
      {loading && <Loader />}
      {error && <p>Error: {error}</p>}
      {Array.isArray(searchResults) && searchResults.length > 0 ? ( // Перевіряємо, чи це масив
        <div>
          {searchResults.map((product) => (
            <div key={product.name}>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
            </div>
          ))}
        </div>
      ) : (
        !loading && <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;
