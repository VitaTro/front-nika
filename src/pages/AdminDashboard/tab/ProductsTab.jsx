import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminProducts } from "../../../redux/admin/operationsAdmin";
import AddProductForm from "./products/AddProductForm";
import FilterPanel from "./products/FilterPanel";
import ProductsTable from "./products/ProductsTable";

const ProductsTab = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.admin.products); // Отримання продуктів із Redux
  const [viewMode, setViewMode] = useState("view"); // 'view' або 'add'
  const [searchTerm, setSearchTerm] = useState(""); // Строка для пошуку
  const [filterCategory, setFilterCategory] = useState(""); // Фільтр за категорією
  const [filteredProducts, setFilteredProducts] = useState(products); // Відфільтровані продукти
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
    dispatch(fetchAdminProducts()); // Отримання продуктів після першого рендеру
  }, [dispatch]);

  useEffect(() => {
    // Фільтрація критичного залишку
    let results = products;

    if (showCriticalStock) {
      results = results.filter((product) => product.quantity <= 1);
    }

    setFilteredProducts(results);
  }, [products, showCriticalStock]);

  useEffect(() => {
    // немає в наявності
    let results = products;

    if (showCriticalStock) {
      results = results.filter((product) => product.quantity <= 1);
    }

    if (showOutOfStock) {
      results = results.filter((product) => !product.inStock);
    }

    setFilteredProducts(results);
  }, [products, showCriticalStock, showOutOfStock]);

  useEffect(() => {
    let results = products;

    if (notOrderGoods) {
      results = results.filter((product) => product.isNotOrderable); // Фільтруємо по стану
    }

    if (filterCategory) {
      results = results.filter((product) =>
        product.index.toLowerCase().includes(filterCategory.toLowerCase())
      );
    }

    setFilteredProducts(results);
  }, [products, notOrderGoods, filterCategory]);
  useEffect(() => {
    // Фільтруємо продукти на основі пошуку та категорії
    let results = products;
    if (searchTerm) {
      results = results.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filterCategory) {
      results = results.filter(
        (product) => product.category === filterCategory
      );
    }
    setFilteredProducts(results);
  }, [products, searchTerm, filterCategory]);

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

  const handleUpdate = (id, updatedData) => {
    dispatch(updateAdminProduct({ id, updatedData }));
  };

  const handleDelete = (id) => {
    dispatch(deleteAdminProduct(id));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterCategory(e.target.value);
  };

  const toggleCriticalStockFilter = () => {
    setShowCriticalStock(!showCriticalStock);
  };
  return (
    <div>
      {/* Кнопки для переключення між підзакладками */}
      <div style={{ marginBottom: "20px" }}>
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
          style={{ marginLeft: "10px" }}
        >
          Додати товар
        </Button>
        {viewMode === "view" && (
          <Button
            variant={showCriticalStock ? "contained" : "outlined"}
            color="warning"
            onClick={toggleCriticalStockFilter}
            style={{ marginLeft: "10px" }}
          >
            Kритичний залишок
          </Button>
        )}
        {viewMode === "view" && (
          <Button
            variant={showOutOfStock ? "contained" : "outlined"}
            color="error"
            onClick={() => setShowOutOfStock(!showOutOfStock)}
            style={{ marginLeft: "10px" }}
          >
            Hемає в наявності
          </Button>
        )}
        {viewMode === "view" && (
          <Button
            variant={notOrderGoods ? "contained" : "outlined"}
            color="error"
            onClick={() => setNotOrderGoods(!notOrderGoods)}
            style={{ marginLeft: "10px" }}
          >
            Не замовляти
          </Button>
        )}
      </div>

      {/* Вміст залежно від вибраного режиму */}
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
            handleSearchChange={handleSearchChange}
            filterCategory={filterCategory}
            handleFilterChange={handleFilterChange}
          />
          <ProductsTable
            filteredProducts={filteredProducts}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
          />
        </>
      )}
    </div>
  );
};

export default ProductsTab;
