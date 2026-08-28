import { Box, MenuItem, TextField } from "@mui/material";
const categories = [
  { label: "Основи (нитки, льоски)", value: "thread" },
  { label: "Фурнітура", value: "hardware" },
  { label: "Бісер", value: "beads" },
  { label: "Камінці", value: "stones" },
  { label: "Інше", value: "other" },
];
const FilterPanelMaterials = ({
  searchTerm,
  filterCategory,
  filterColor,
  handleSearchChange,
  handleCategoryChange,
  handleColorChange,
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
      label="Категорія"
      value={filterCategory}
      onChange={handleCategoryChange}
      fullWidth
      margin="normal"
    >
      <MenuItem value="">Всі категорії</MenuItem>
      {categories.map((c) => (
        <MenuItem key={c.value} value={c.value}>
          {c.label}
        </MenuItem>
      ))}
    </TextField>
    <TextField
      label="Колір"
      value={filterColor}
      onChange={handleColorChange}
      fullWidth
      margin="normal"
    />
  </Box>
);

export default FilterPanelMaterials;
