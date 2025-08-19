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

  const renderPrice = (product) =>
    product.lastRetailPrice !== null && product.lastRetailPrice !== undefined
      ? `${product.lastRetailPrice} zł`
      : product.price !== undefined
      ? `${product.price} zł`
      : "—";

  const renderStock = (product) =>
    product.currentStock !== undefined
      ? `${product.currentStock} шт`
      : product.quantity !== undefined
      ? `${product.quantity} шт`
      : "—";

  const renderPurchase = (product) => {
    const purchase = product.purchasePrice;
    if (!purchase || purchase.value === undefined) return "—";

    if (purchase.currency !== "PLN" && purchase.exchangeRateToPLN) {
      return `${(purchase.value * purchase.exchangeRateToPLN).toFixed(2)} zł`;
    }
    return `${purchase.value} ${purchase.currency || ""}`.trim();
  };

  const renderAvailability = (product) =>
    product.inStock ? "Є в наявності" : "Немає в наявності";

  const totalQuantity = filteredProducts.reduce((sum, product) => {
    const stock = product.currentStock ?? product.quantity ?? 0;
    return stock > 0 ? sum + stock : sum;
  }, 0);
  const totalValue = filteredProducts.reduce((sum, product) => {
    const stock = product.currentStock ?? product.quantity ?? 0;
    const purchase = product.purchasePrice;
    let unitPricePLN = 0;

    if (purchase && purchase.value !== undefined) {
      unitPricePLN =
        purchase.currency === "PLN"
          ? purchase.value
          : purchase.exchangeRateToPLN
          ? purchase.value * purchase.exchangeRateToPLN
          : 0;
    }

    return stock > 0 ? sum + unitPricePLN * stock : sum;
  }, 0);
  const totalRetailValue = filteredProducts.reduce((sum, product) => {
    const stock = product.currentStock ?? product.quantity ?? 0;
    const retailPrice = product.lastRetailPrice ?? product.price ?? 0;

    return stock > 0 ? sum + retailPrice * stock : sum;
  }, 0);

  if (isMobile || isSmall) {
    return (
      <>
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
                  <Typography color="text.secondary">
                    {product.index}
                  </Typography>
                </Box>
              </Box>
              <Typography>
                <strong>Категорія:</strong> {product.category}
              </Typography>
              <Typography>
                <strong>Підкатегорія:</strong> {product.subcategory}
              </Typography>
              <Typography>
                <strong>Ціна:</strong> {renderPrice(product)}
              </Typography>
              <Typography>
                <strong>Залишок:</strong> {renderStock(product)}
              </Typography>
              <Typography>
                <strong>Закупка:</strong> {renderPurchase(product)}
              </Typography>
              <Typography>
                <strong>Наявність:</strong> {renderAvailability(product)}
              </Typography>
              <Box mt={2}>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => handleUpdate(product._id)}
                >
                  Редагувати
                </Button>
                <Button
                  size="small"
                  color="error"
                  sx={{ ml: 1 }}
                  onClick={() => handleDelete(product._id)}
                >
                  Видалити
                </Button>
              </Box>
            </Paper>
          ))}
        </Box>
        <Box mt={3} p={2} bgcolor="#f5f5f5" borderRadius={2}>
          <Typography variant="subtitle1">
            <strong>Загальний залишок:</strong> {totalQuantity} шт
          </Typography>
          <Typography variant="subtitle1">
            <strong>Загальна закупівельна вартість:</strong>{" "}
            {totalValue.toFixed(2)} zł
          </Typography>
          <Typography variant="subtitle1">
            <strong>Роздрібна вартість:</strong> {totalRetailValue.toFixed(2)}{" "}
            zł
          </Typography>
        </Box>
      </>
    );
  }

  return (
    <>
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
              <TableCell>Залишок</TableCell>
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
                <TableCell>{renderPrice(product)}</TableCell>
                <TableCell>{product.index}</TableCell>
                <TableCell>{renderStock(product)}</TableCell>
                <TableCell>{renderPurchase(product)}</TableCell>
                <TableCell>{renderAvailability(product)}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => handleUpdate(product._id)}
                  >
                    Редагувати
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleDelete(product._id)}
                  >
                    Видалити
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <tfoot>
        <TableRow>
          <TableCell colSpan={6} />
          <TableCell>
            <strong>{totalQuantity} шт</strong>
          </TableCell>
          <TableCell>
            <strong>{totalValue.toFixed(2)} zł</strong>
          </TableCell>
          <TableCell>
            <strong>{totalRetailValue.toFixed(2)} zł</strong>
          </TableCell>
          <TableCell colSpan={2} />
        </TableRow>
      </tfoot>
    </>
  );
};

export default ProductsTable;
