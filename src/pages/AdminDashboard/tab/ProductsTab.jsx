import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ZoomableProductImage from "../../../components/ZoomableProductImage";
import {
  addAdminProduct,
  deleteAdminProduct,
  fetchAdminProducts,
  updateAdminProduct,
} from "../../../redux/admin/operationsAdmin";

const ProductsTab = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.admin.products); // Отримання продуктів із Redux
  const [viewMode, setViewMode] = useState("view"); // 'view' або 'add'
  const [searchTerm, setSearchTerm] = useState(""); // Строка для пошуку
  const [filterCategory, setFilterCategory] = useState(""); // Фільтр за категорією
  const [filteredProducts, setFilteredProducts] = useState(products); // Відфільтровані продукти
  const [showCriticalStock, setShowCriticalStock] = useState(false);
  const [showOutOfStock, setShowOutOfStock] = useState(false);

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
      </div>

      {/* Вміст залежно від вибраного режиму */}
      {viewMode === "add" && (
        <form onSubmit={handleAddProduct} style={{ marginBottom: "20px" }}>
          <TextField
            name="name"
            label="Назва"
            value={newProduct.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="category"
            label="Категорія"
            value={newProduct.category}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="subcategory"
            label="Підкатегорія"
            value={newProduct.subcategory}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="price"
            label="Ціна"
            value={newProduct.price}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="description"
            label="Опис"
            value={newProduct.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="photoUrl"
            label="URL Фото"
            value={newProduct.photoUrl}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="size"
            label="Розмір"
            value={newProduct.size}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="width"
            label="Ширина"
            value={newProduct.width}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="length"
            label="Довжина"
            value={newProduct.length}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="color"
            label="Колір"
            value={newProduct.color}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="quantity"
            label="Кількість"
            value={newProduct.quantity}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="index"
            label="Індекс"
            value={newProduct.index}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="purchasePrice"
            label="Ціна закупки"
            value={newProduct.purchasePrice}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">
            Додати товар
          </Button>
        </form>
      )}

      {viewMode === "view" && (
        <>
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
          </div>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Фото</TableCell>
                  <TableCell>Назва</TableCell>
                  <TableCell>Категорія</TableCell>
                  <TableCell>Підкатегорія</TableCell>
                  <TableCell>Ціна</TableCell>
                  <TableCell>Індекс</TableCell>
                  <TableCell>Кількість</TableCell>
                  <TableCell>Закупка</TableCell>
                  <TableCell>Наявність</TableCell>
                  <TableCell>Дії</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id || product.index}>
                    <TableCell>
                      <ZoomableProductImage
                        src={product.photoUrl}
                        alt={product.name}
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                        }}
                      />
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.subcategory}</TableCell>
                    <TableCell>{product.price} zł</TableCell>
                    <TableCell>{product.index}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>{product.purchasePrice} zł</TableCell>
                    <TableCell>
                      {product.inStock ? "Є в наявності" : "Немає в наявності"}
                    </TableCell>

                    <TableCell>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() =>
                          handleUpdate(product.id, { name: product.name })
                        }
                      >
                        Редагувати
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        onClick={() => handleDelete(product.id)}
                      >
                        Видалити
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </div>
  );
};

export default ProductsTab;
