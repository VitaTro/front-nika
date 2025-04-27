// Components/FilterPanel.js
import { TextField } from "@mui/material";
import React from "react";

const FilterPanel = ({
  searchTerm,
  handleSearchChange,
  filterCategory,
  handleFilterChange,
}) => (
  <div style={{ marginBottom: "20px" }}>
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
      onChange={handleFilterChange}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Індекс товару"
      value={filterCategory}
      onChange={handleFilterChange}
      fullWidth
      margin="normal"
    />
  </div>
);

export default FilterPanel;
