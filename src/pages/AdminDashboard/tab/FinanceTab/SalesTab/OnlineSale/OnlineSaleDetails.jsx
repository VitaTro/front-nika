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
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import ReturnOnlineSale from "./ReturnOnlineSale";

const OnlineSaleDetails = ({ sale, onClose }) => {
  const [openReturnDialog, setOpenReturnDialog] = useState(false);
  const isMobile = useMediaQuery("(max-width:768px)");
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

        {/* 🏪 Таблиця товарів */}
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
                const itemPrice =
                  item.salePrice > 0
                    ? item.salePrice
                    : item.productId?.price || 0;
                const totalItemPrice = item.quantity * itemPrice;

                return (
                  <TableRow key={item.productId._id || index}>
                    <TableCell>
                      <img
                        src={item.productId?.photoUrl}
                        alt={item.productId?.name}
                        width="50"
                        style={{ borderRadius: 4 }}
                      />
                    </TableCell>
                    <TableCell>{item.productId?.name || "—"}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{itemPrice.toFixed(2)} zł</TableCell>
                    <TableCell>{totalItemPrice.toFixed(2)} zł</TableCell>
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
