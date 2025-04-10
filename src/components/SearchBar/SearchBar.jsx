import { SearchButton, SearchContainer, SearchInput } from "./SearchBar.styled";

const SearchBar = ({ placeholder = "Search...", onSearch }) => {
  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder={placeholder}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSearch?.(e.target.value); // Виклик функції пошуку, якщо передано
          }
        }}
      />
      <SearchButton type="submit">Search</SearchButton>
    </SearchContainer>
  );
};
export default SearchBar;
