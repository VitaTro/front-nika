import { Box, Button, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addAdminProduct,
  deleteAdminProduct,
  fetchAdminProducts,
  updateAdminProduct,
} from "../../../../redux/admin/operationsAdmin";
import AddProductForm from "./products/AddProductForm";
import FilterPanel from "./products/FilterPanel";
import ProductsTable from "./products/ProductsTable";

const ProductsTab = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.admin.products);
  const isMobile = useMediaQuery("(max-width: 600px)");

  const [viewMode, setViewMode] = useState("view");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterIndex, setFilterIndex] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  const [showCriticalStock, setShowCriticalStock] = useState(false);
  const [showOutOfStock, setShowOutOfStock] = useState(false);
  const [notOrderGoods, setNotOrderGoods] = useState(false);

  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    subcategory: "",
    price: "",
    description: "",
    photoUrl: "",
    size: "",
    width: "",
    length: "",
    color: "",
    inStock: true,
    visible: true,
    quantity: "",
    index: "",
    purchasePrice: "",
  });

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  useEffect(() => {
    let results = [...products];

    if (showCriticalStock) {
      results = results.filter((p) => p.quantity <= 1);
    }
    if (showOutOfStock) {
      results = results.filter((p) => !p.inStock);
    }
    if (notOrderGoods) {
      results = results.filter((p) => p.isNotOrderable);
    }
    if (searchTerm) {
      results = results.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filterCategory) {
      results = results.filter((p) =>
        p.category.toLowerCase().includes(filterCategory.toLowerCase())
      );
    }
    if (filterIndex) {
      results = results.filter((p) =>
        p.index.toLowerCase().includes(filterIndex.toLowerCase())
      );
    }

    setFilteredProducts(results);
  }, [
    products,
    showCriticalStock,
    showOutOfStock,
    notOrderGoods,
    searchTerm,
    filterCategory,
    filterIndex,
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    dispatch(addAdminProduct(newProduct));
    setNewProduct({
      name: "",
      category: "",
      subcategory: "",
      price: "",
      description: "",
      photoUrl: "",
      size: "",
      width: "",
      length: "",
      color: "",
      inStock: true,
      visible: true,
      quantity: "",
      index: "",
      purchasePrice: "",
    });
  };

  return (
    <Box sx={{ padding: isMobile ? 1 : 3 }}>
      {/* Кнопки-перемикачі */}
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: 2,
          marginBottom: 3,
        }}
      >
        <Button
          variant={viewMode === "view" ? "contained" : "outlined"}
          color="primary"
          onClick={() => setViewMode("view")}
        >
          Переглянути товари
        </Button>
        <Button
          variant={viewMode === "add" ? "contained" : "outlined"}
          color="secondary"
          onClick={() => setViewMode("add")}
        >
          Додати товар
        </Button>

        {viewMode === "view" && (
          <>
            <Button
              variant={showCriticalStock ? "contained" : "outlined"}
              color="warning"
              onClick={() => setShowCriticalStock((prev) => !prev)}
            >
              Kритичний залишок
            </Button>
            <Button
              variant={showOutOfStock ? "contained" : "outlined"}
              color="error"
              onClick={() => setShowOutOfStock((prev) => !prev)}
            >
              Немає в наявності
            </Button>
            <Button
              variant={notOrderGoods ? "contained" : "outlined"}
              color="error"
              onClick={() => setNotOrderGoods((prev) => !prev)}
            >
              Не замовляти
            </Button>
          </>
        )}
      </Box>

      {/* Відображення режиму */}
      {viewMode === "add" && (
        <AddProductForm
          newProduct={newProduct}
          handleChange={handleChange}
          handleAddProduct={handleAddProduct}
        />
      )}

      {viewMode === "view" && (
        <>
          <FilterPanel
            searchTerm={searchTerm}
            filterCategory={filterCategory}
            filterIndex={filterIndex}
            handleSearchChange={(e) => setSearchTerm(e.target.value)}
            handleCategoryChange={(e) => setFilterCategory(e.target.value)}
            handleIndexChange={(e) => setFilterIndex(e.target.value)}
          />
          <ProductsTable
            filteredProducts={filteredProducts}
            handleUpdate={(id, data) =>
              dispatch(updateAdminProduct({ id, updatedData: data }))
            }
            handleDelete={(id) => dispatch(deleteAdminProduct(id))}
            isMobile={isMobile}
          />
        </>
      )}
    </Box>
  );
};

export default ProductsTab;
