import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchButton, SearchForm, SearchInput } from "./SearchBar.styled";

const SearchBar = ({ placeholder = "Search..." }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim().length >= 3) {
      navigate(`/search?query=${searchTerm.trim()}`);
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
