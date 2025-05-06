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
} from "@mui/material";
import React, { useState } from "react";
import ReturnOfflineSale from "./ReturnOfflineSale";

const OfflineSaleDetails = ({ sale, onClose }) => {
  const [openReturnDialog, setOpenReturnDialog] = useState(false);
  return (
    <Dialog open={!!sale} onClose={onClose}>
      <DialogTitle>🛍 Деталі продажу</DialogTitle>
      <DialogContent>
        <p>
          <strong>Сума:</strong> {sale?.totalAmount} zł
        </p>
        <p>
          <strong>Метод оплати:</strong> {sale?.paymentMethod}
        </p>

        {/* 🏪 Таблиця товарів */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Фото</strong>
                </TableCell>
                <TableCell>
                  <strong>Назва товару</strong>
                </TableCell>
                <TableCell>
                  <strong>Кількість</strong>
                </TableCell>
                <TableCell>
                  <strong>Ціна за одиницю</strong>
                </TableCell>
                <TableCell>
                  <strong>Загальна сума</strong>
                </TableCell>
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
                      style={{ borderRadius: "5px" }}
                    />
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.price} zł</TableCell>
                  <TableCell>{item.quantity * item.price} zł</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error">
          ❌ Закрити
        </Button>
        <Button onClick={() => setOpenReturnDialog(true)} variant="contained">
          🔄 Повернути товар
        </Button>
      </DialogActions>
      {/* ✅ Вбудовуємо компонент повернення */}
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
