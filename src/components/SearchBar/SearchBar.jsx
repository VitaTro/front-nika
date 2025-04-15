import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchProducts } from "../../redux/search/operationSearch";
import { SearchButton, SearchForm, SearchInput } from "./SearchBar.styled";

const SearchBar = ({ placeholder = "Search..." }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim().length >= 3) {
      dispatch(searchProducts(searchTerm)); // Запит у Redux

      // Перенаправлення з параметрами
      const params = new URLSearchParams();
      params.set("query", searchTerm.trim());

      navigate(`/products/search?query=${searchTerm.trim()}`);
    } else {
      alert("Please enter a search query with at least 3 letters.");
    }
  };

  return (
    <SearchForm onSubmit={handleSearch}>
      <SearchInput
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <SearchButton type="submit">Search</SearchButton>
    </SearchForm>
  );
};

export default SearchBar;
