import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { calculateDiscount } from "../../../../../../utils/calculateDiscount";

const OnlineOrderCart = ({ products, deliveryPrice }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Форматування PLN
  const formatPLN = (value) =>
    new Intl.NumberFormat("pl-PL", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Number(value) || 0) + " zł";

  // Сума товарів
  const totalProducts = products.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0,
  );

  // Доставка
  const deliveryCost = Number(deliveryPrice || 0);

  // Загальна сума
  const totalWithDelivery = totalProducts + deliveryCost;

  // Знижка
  const { discount, discountPercent, final } =
    calculateDiscount(totalWithDelivery);

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        🛒 Товари
      </Typography>

      <Table size={isMobile ? "small" : "medium"}>
        <TableHead>
          <TableRow>
            <TableCell>Фото</TableCell>
            <TableCell>Назва</TableCell>
            <TableCell>К-сть</TableCell>
            <TableCell>Ціна</TableCell>
            <TableCell>Сума</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {products.map((item) => (
            <TableRow key={item.productId._id || item.index}>
              <TableCell>
                <img
                  src={item.photoUrl}
                  alt={item.name}
                  width={50}
                  style={{ borderRadius: 4 }}
                />
              </TableCell>

              <TableCell>{item.name}</TableCell>
              <TableCell>{item.quantity}</TableCell>

              <TableCell>{formatPLN(item.price)}</TableCell>

              <TableCell>{formatPLN(item.quantity * item.price)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Box sx={{ mt: 2 }}>
        <Typography>💰 Сума товарів: {formatPLN(totalProducts)}</Typography>
        <Typography>🚚 Доставка: {formatPLN(deliveryCost)}</Typography>

        {discount > 0 && (
          <Typography sx={{ color: "red" }}>
            🔻 Знижка: −{formatPLN(discount)} ({discountPercent}%)
          </Typography>
        )}

        <Typography sx={{ fontWeight: "bold", mt: 1 }}>
          ✅ До сплати: {formatPLN(final)}
        </Typography>
      </Box>
    </Box>
  );
};

export default OnlineOrderCart;
