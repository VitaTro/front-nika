// Components/FilterPanel.js
import { Box, TextField } from "@mui/material";

const FilterPanel = ({
  searchTerm,
  filterCategory,
  filterIndex,
  handleSearchChange,
  handleCategoryChange,
  handleIndexChange,
}) => (
  <Box sx={{ mb: 3 }}>
    <TextField
      label="Пошук за назвою"
      value={searchTerm}
      onChange={handleSearchChange}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Фільтр за категорією"
      value={filterCategory}
      onChange={handleCategoryChange}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Індекс товару"
      value={filterIndex}
      onChange={handleIndexChange}
      fullWidth
      margin="normal"
    />
  </Box>
);

export default FilterPanel;
