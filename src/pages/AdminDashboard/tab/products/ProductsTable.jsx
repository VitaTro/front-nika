// Components/ProductsTable.js
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import ZoomableProductImage from "../../../../components/ZoomableProductImage";

const ProductsTable = ({ filteredProducts, handleUpdate, handleDelete }) => (
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
                onClick={() => handleUpdate(product.id, { name: product.name })}
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
);

export default ProductsTable;
