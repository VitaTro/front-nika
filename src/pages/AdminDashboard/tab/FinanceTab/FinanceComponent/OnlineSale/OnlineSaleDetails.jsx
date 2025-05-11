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
import ReturnOnlineSale from "./ReturnOnlineSale";

const OnlineSaleDetails = ({ sale, onClose }) => {
  const [openReturnDialog, setOpenReturnDialog] = useState(false);
  console.log("📊 Дані про продаж:", sale.products);
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
              {sale?.products.map((item, index) => {
                console.log(
                  "🔍 Перевіряємо ціну продукту:",
                  item.productId.price
                ); // ✅ Дивимося, чи є ціна

                const itemPrice =
                  item.salePrice > 0
                    ? item.salePrice
                    : item.productId?.price || 0; // 🔎 Перевіряємо fallback
                const totalItemPrice = item.quantity * itemPrice;

                return (
                  <TableRow key={item.productId._id || index}>
                    <TableCell>
                      <img
                        src={item.productId?.photoUrl}
                        alt={item.productId?.name}
                        width="50"
                        style={{ borderRadius: "5px" }}
                      />
                    </TableCell>
                    <TableCell>{item.productId?.name || "Без назви"}</TableCell>
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
        <ReturnOnlineSale
          sale={sale}
          onClose={() => setOpenReturnDialog(false)}
        />
      )}
    </Dialog>
  );
};

export default OnlineSaleDetails;
