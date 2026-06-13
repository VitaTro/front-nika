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
import { calculateDiscount } from "../../../../../../utils/calculateDiscount";
import ReturnOfflineSale from "./ReturnOfflineSale";
const OfflineSaleDetails = ({ sale, onClose }) => {
  const [openReturnDialog, setOpenReturnDialog] = useState(false);
  const isMobile = useMediaQuery("(max-width:768px)");
  const { discountPercent, discount, final } = calculateDiscount(
    sale.totalAmount,
  );

  return (
    <Dialog open={!!sale} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>🛍 Деталі продажу</DialogTitle>
      <DialogContent>
        <Typography>
          <strong>Сума:</strong> {sale?.totalAmount} zł
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
                <TableCell>Розмір</TableCell>
                <TableCell>К-сть</TableCell>
                <TableCell>Ціна</TableCell>
                <Typography>
                  <strong>Сума без знижки:</strong> {sale.totalAmount} zł
                </Typography>
                <Typography>
                  <strong>Знижка:</strong> {discount} zł ({discountPercent}%)
                </Typography>
                <Typography>
                  <strong>До сплати:</strong> {final} zł
                </Typography>
                <Typography>
                  <strong>Метод оплати:</strong> {sale?.paymentMethod}
                </Typography>
              </TableRow>
            </TableHead>
            <TableBody>
              {sale?.products.map((item, index) => (
                <TableRow key={item.productId || index}>
                  <TableCell>
                    <img
                      src={item.photoUrl}
                      alt={item.name}
                      width="50"
                      style={{ borderRadius: 5 }}
                    />
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.size || "-"}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.price} zł</TableCell>
                  <TableCell>{item.quantity * item.price} zł</TableCell>
                </TableRow>
              ))}
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
        <ReturnOfflineSale
          sale={sale}
          onClose={() => setOpenReturnDialog(false)}
        />
      )}
    </Dialog>
  );
};

export default OfflineSaleDetails;
