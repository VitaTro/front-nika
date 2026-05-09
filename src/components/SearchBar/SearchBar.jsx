import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { SearchForm, SearchInput } from "./SearchBar.styled";

const SearchBar = ({ placeholder = "Search...", onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim().length >= 3) {
      onSearch(searchTerm.trim());
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
      <FiSearch
        size={20}
        onClick={handleSearch}
        style={{
          position: "absolute",
          right: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          cursor: "pointer",
          opacity: 0.7,
        }}
      />
    </SearchForm>
  );
};

export default SearchBar;
