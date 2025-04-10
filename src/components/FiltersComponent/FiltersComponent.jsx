import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPriceFilter } from "../../redux/filters/filterSlice";
import { applyFilters } from "../../redux/filters/operationFilter";
import Loader from "../Loader/Loader";

const FiltersComponent = () => {
  const dispatch = useDispatch();
  const { filters, filteredComponent, isLoading, error } = useSelector(
    (state) => state.filters
  );
};

useEffect(() => {
  dispatch(applyFilters(filters));
}, [filters, dispatch]);

const handlePriceChange = (min, max) => {
  dispatch(setPriceFilter({ min, max }));
};

return (
  <div>
    <h1>Filter Products</h1>
    <button onClick={() => handlePriceChange(100, 500)}>Filter by Price</button>

    {isLoading && <Loader />}
    {error && <p>Error: {error}</p>}
    <ul>
      {filteredProducts.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  </div>
);
export default FiltersComponent;
