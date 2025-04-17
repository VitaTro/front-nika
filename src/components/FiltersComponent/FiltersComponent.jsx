import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../redux/axiosConfig";
import { applyFilters } from "../../redux/filters/operationFilter";
import Loader from "../Loader";
import { FilterContainer, FilterHeader } from "./FiltersComponent.ctyled";

const FiltersComponent = () => {
  const dispatch = useDispatch();
  const filteredProducts = useSelector((state) => state.filters.filteredItems);
  const isLoading = useSelector((state) => state.filters.loading);
  const error = useSelector((state) => state.filters.error);

  // Локальний стан для доступних фільтрів
  const [availableLengths, setAvailableLengths] = useState([]);
  const [availableColors, setAvailableColors] = useState([]);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [availableSubcategories, setAvailableSubcategories] = useState([]);
  const [filters, setFilters] = useState({
    price: { min: "", max: "" },
    category: "",
    subcategory: "",
    width: { min: "", max: "" },
    length: { min: "", max: "" },
    color: "",
    size: "",
  });

  // Отримання даних про доступні фільтри
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const response = await axios.get("/api/products"); // Отримуємо всі продукти
        const products = response.data;

        // Генеруємо опції на основі даних продуктів
        const lengths = [...new Set(products.map((product) => product.length))];
        const colors = [...new Set(products.map((product) => product.color))];
        const sizes = [...new Set(products.map((product) => product.size))];
        const categories = [
          ...new Set(products.map((product) => product.category)),
        ];
        const subcategories = [
          ...new Set(products.map((product) => product.subcategory)),
        ];

        setAvailableLengths(lengths.filter(Boolean));
        setAvailableColors(colors.filter(Boolean));
        setAvailableSizes(sizes.filter(Boolean));
        setAvailableCategories(categories.filter(Boolean));
        setAvailableSubcategories(subcategories.filter(Boolean));
      } catch (error) {
        console.error("Error fetching filter options:", error);
      }
    };

    fetchFilterOptions();
  }, []);

  // Застосування фільтрів через Redux
  useEffect(() => {
    dispatch(applyFilters(filters));
  }, [filters, dispatch]);

  // Оновлення фільтрів
  const handleFilterChange = (type, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [type]: value,
    }));
  };

  const handlePriceSort = (sortOrder) => {
    const sortedProducts = [...filteredProducts]; // Копіюємо масив продуктів
    if (sortOrder === "lowToHigh") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "highToLow") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    dispatch(applyFilters({ ...filters, sortedProducts })); // Сортування через Redux
  };

  return (
    <FilterContainer>
      <div>
        <FilterHeader>Price</FilterHeader>
        <select onChange={(e) => handlePriceSort(e.target.value)}>
          <option value="">No filter</option>
          <option value="lowToHigh">Low to High</option>
          <option value="highToLow">High to Low</option>
        </select>
      </div>
      <div>
        <FilterHeader>Category</FilterHeader>
        <select
          onChange={(e) => handleFilterChange("category", e.target.value)}
        >
          <option value="">No filter</option>
          {availableCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div>
        <FilterHeader>Subcategory</FilterHeader>
        <select
          onChange={(e) => handleFilterChange("subcategory", e.target.value)}
        >
          <option value="">No filter</option>
          {availableSubcategories.map((subcategory) => (
            <option key={subcategory} value={subcategory}>
              {subcategory}
            </option>
          ))}
        </select>
      </div>
      <div>
        <FilterHeader>Width</FilterHeader>
        <select onChange={(e) => handleFilterChange("width", e.target.value)}>
          <option value="">No filter</option>
          {availableLengths.map((length) => (
            <option key={length} value={length}>
              {length} mm
            </option>
          ))}
        </select>
      </div>
      <div>
        <FilterHeader>Length</FilterHeader>
        <select onChange={(e) => handleFilterChange("length", e.target.value)}>
          <option value="">No filter</option>
          {availableLengths.map((length) => (
            <option key={length} value={length}>
              {length} cm
            </option>
          ))}
        </select>
      </div>
      <div>
        <FilterHeader>Color</FilterHeader>
        <select onChange={(e) => handleFilterChange("color", e.target.value)}>
          <option value="">No filter</option>
          {availableColors.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
      </div>
      <div>
        <FilterHeader>Size</FilterHeader>
        <select onChange={(e) => handleFilterChange("size", e.target.value)}>
          <option value="">No filter</option>
          {availableSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
      {isLoading && <Loader />}
      {error && <p>Error: {error}</p>}
    </FilterContainer>
  );
};

export default FiltersComponent;
