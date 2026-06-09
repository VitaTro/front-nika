import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
import { useState } from "react";
import ReturnOnlineSale from "./ReturnOnlineSale";

const OnlineSaleDetails = ({ sale, onClose }) => {
  const [openReturnDialog, setOpenReturnDialog] = useState(false);
  const isMobile = useMediaQuery("(max-width:768px)");

  return (
    <Dialog open={!!sale} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>🛍 Деталі онлайн‑продажу</DialogTitle>

      <DialogContent>
        <Typography>
          <strong>Сума:</strong> {sale?.totalAmount} zł
        </Typography>
        <Typography>
          <strong>Доставка:</strong> {sale?.shippingCost} zł
        </Typography>
        <Typography>
          <strong>До сплати:</strong> {sale?.finalPrice.toFixed(2)} zł
        </Typography>
        <Typography>
          <strong>Метод оплати:</strong> {sale?.paymentMethod}
        </Typography>

        <TableContainer component={Paper} sx={{ mt: 2 }}>
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
              {sale?.products.map((item, index) => {
                const price =
                  item.salePrice > 0
                    ? item.salePrice
                    : item.productId?.price || 0;

                return (
                  <TableRow key={index}>
                    <TableCell>
                      <img
                        src={item.productId?.photoUrl}
                        alt={item.productId?.name}
                        width="50"
                        style={{ borderRadius: 5 }}
                      />
                    </TableCell>
                    <TableCell>{item.productId?.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{price} zł</TableCell>
                    <TableCell>
                      {(price * item.quantity).toFixed(2)} zł
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>

      <DialogActions sx={{ flexWrap: isMobile ? "wrap" : "nowrap", gap: 1 }}>
        <Button onClick={onClose} color="error" fullWidth={isMobile}>
          ❌ Закрити
        </Button>

        <Button
          onClick={() => setOpenReturnDialog(true)}
          variant="contained"
          fullWidth={isMobile}
        >
          🔄 Повернути товар
        </Button>
      </DialogActions>

      {openReturnDialog && (
        <ReturnOnlineSale
          sale={sale}
          onClose={() => setOpenReturnDialog(false)}
        />
      )}
    </Dialog>
  );
};

export default OnlineSaleDetails;
