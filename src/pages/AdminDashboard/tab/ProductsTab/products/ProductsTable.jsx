import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
} from "@mui/material";
import ZoomableProductImage from "../../../../../components/ZoomableProductImage";

const ProductsTable = ({
  filteredProducts,
  handleUpdate,
  handleDelete,
  isMobile,
}) => {
  const isSmall = useMediaQuery("(max-width: 768px)");

  if (isMobile || isSmall) {
    return (
      <Box display="flex" flexDirection="column" gap={2}>
        {filteredProducts.map((product) => (
          <Paper key={`${product.name}-${product.index}`} sx={{ p: 2 }}>
            <Box display="flex" gap={2} alignItems="center" mb={1}>
              <ZoomableProductImage
                src={product.photoUrl}
                alt={product.name}
                style={{
                  width: 70,
                  height: 70,
                  objectFit: "cover",
                  borderRadius: "4px",
                }}
              />
              <Box>
                <Typography variant="h6">{product.name}</Typography>
                <Typography color="text.secondary">{product.index}</Typography>
              </Box>
            </Box>
            <Typography>
              <strong>Категорія:</strong> {product.category}
            </Typography>
            <Typography>
              <strong>Підкатегорія:</strong> {product.subcategory}
            </Typography>
            <Typography>
              <strong>Ціна:</strong> {product.price} zł
            </Typography>
            <Typography>
              <strong>Кількість:</strong> {product.quantity}
            </Typography>
            <Typography>
              <strong>Закупка:</strong> {product.purchasePrice} zł
            </Typography>
            <Typography>
              <strong>Наявність:</strong>{" "}
              {product.inStock ? "Є в наявності" : "Немає в наявності"}
            </Typography>
            <Box mt={2}>
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
                sx={{ ml: 1 }}
              >
                Видалити
              </Button>
            </Box>
          </Paper>
        ))}
      </Box>
    );
  }

  return (
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
            <TableRow key={`${product.name}-${product.index}`}>
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
  );
};

export default ProductsTable;
