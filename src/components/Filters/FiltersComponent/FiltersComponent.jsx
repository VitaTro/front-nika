import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../redux/axiosConfig";
import { applyFilters } from "../../redux/filters/operationFilter";
import Loader from "../Loader";
import {
  FilterContainer,
  FilterHeader,
  FilterSection,
} from "./FiltersComponent.styled";

const FiltersComponent = () => {
  const dispatch = useDispatch();
  const filteredProducts = useSelector((state) => state.filters.filteredItems);
  const isLoading = useSelector((state) => state.filters.loading);
  const error = useSelector((state) => state.filters.error);

  const [availableLengths, setAvailableLengths] = useState([]);
  const [availableColors, setAvailableColors] = useState([]);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [availableSubcategories, setAvailableSubcategories] = useState([]);
  const [filters, setFilters] = useState({
    price: { min: "", max: "" },
    category: [],
    subcategory: [],
    width: [],
    length: [],
    color: [],
    size: [],
  });

  const [expandedSections, setExpandedSections] = useState({
    price: false,
    category: false,
    subcategory: false,
    width: false,
    length: false,
    color: false,
    size: false,
  });

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const response = await axios.get("/api/products");
        const products = response.data;

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

  useEffect(() => {
    dispatch(applyFilters(filters));
  }, [filters, dispatch]);

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCheckboxChange = (type, value) => {
    setFilters((prevFilters) => {
      const updatedList = prevFilters[type].includes(value)
        ? prevFilters[type].filter((item) => item !== value)
        : [...prevFilters[type], value];
      return { ...prevFilters, [type]: updatedList };
    });
  };

  return (
    <FilterContainer>
      {Object.entries(expandedSections).map(([section, isExpanded]) => (
        <FilterSection key={section}>
          <FilterHeader onClick={() => toggleSection(section)}>
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </FilterHeader>
          {isExpanded && (
            <div>
              {section === "category" &&
                availableCategories.map((item) => (
                  <label key={item}>
                    <input
                      type="checkbox"
                      checked={filters.category.includes(item)}
                      onChange={() => handleCheckboxChange("category", item)}
                    />
                    {item}
                  </label>
                ))}
              {section === "subcategory" &&
                availableSubcategories.map((item) => (
                  <label key={item}>
                    <input
                      type="checkbox"
                      checked={filters.subcategory.includes(item)}
                      onChange={() => handleCheckboxChange("subcategory", item)}
                    />
                    {item}
                  </label>
                ))}
              {/* Додайте подібну логіку для інших фільтрів */}
            </div>
          )}
        </FilterSection>
      ))}
      {isLoading && <Loader />}
      {error && <p>Error: {error}</p>}
    </FilterContainer>
  );
};

export default FiltersComponent;
