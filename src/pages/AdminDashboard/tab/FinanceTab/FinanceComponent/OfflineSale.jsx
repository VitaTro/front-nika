import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOfflineSales,
  updateOfflineSale,
} from "../../../../../redux/finance/offlineSale/operationOfflineSale";
import {
  selectOfflineSales,
  selectOfflineSalesError,
  selectOfflineSalesLoading,
} from "../../../../../redux/finance/offlineSale/selectorsOfflineSale";

const OfflineSale = () => {
  const dispatch = useDispatch();
  const offlineSales = useSelector(selectOfflineSales);
  const loading = useSelector(selectOfflineSalesLoading);
  const error = useSelector(selectOfflineSalesError);

  const [selectedSale, setSelectedSale] = useState(null);
  const [updatedSaleData, setUpdatedSaleData] = useState({});

  useEffect(() => {
    dispatch(fetchOfflineSales());
  }, [dispatch]);

  const handleUpdateSale = () => {
    if (!selectedSale) return;

    const updatedData = {
      totalAmount: updatedSaleData.totalAmount || selectedSale.totalAmount,
      paymentMethod:
        updatedSaleData.paymentMethod || selectedSale.paymentMethod,
      status: updatedSaleData.status || selectedSale.status,
    };

    console.log("🔍 Відправляємо оновлення:", updatedData);
    dispatch(updateOfflineSale(selectedSale._id, updatedData));
    setSelectedSale(null);
  };

  if (loading) return <p>🔄 Завантаження продажів...</p>;
  if (error) return <p>❌ Помилка: {error}</p>;

  return (
    <div>
      <h2>🏪 Офлайн-продажі</h2>

      {offlineSales.map((sale) => (
        <div
          key={sale._id}
          style={{
            border: "1px solid black",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>Продаж ID: {sale._id}</h3>
          <p>Статус: {sale.status}</p>
          <p>Сума: {sale.totalAmount} zł</p>
          <p>Метод оплати: {sale.paymentMethod}</p>
          <p>Кількість товарів: {sale.products.length}</p>
          <Button variant="contained" onClick={() => setSelectedSale(sale)}>
            🔄 Редагувати
          </Button>
        </div>
      ))}

      {/* 🔥 Модальне вікно для редагування продажу */}
      {selectedSale && (
        <Dialog open={true} onClose={() => setSelectedSale(null)}>
          <DialogTitle>📝 Редагувати продаж</DialogTitle>
          <DialogContent>
            <TextField
              label="Сума (zł)"
              type="number"
              fullWidth
              margin="normal"
              value={updatedSaleData.totalAmount || selectedSale.totalAmount}
              onChange={(e) =>
                setUpdatedSaleData({
                  ...updatedSaleData,
                  totalAmount: e.target.value,
                })
              }
            />
            <Select
              fullWidth
              margin="normal"
              value={
                updatedSaleData.paymentMethod || selectedSale.paymentMethod
              }
              onChange={(e) =>
                setUpdatedSaleData({
                  ...updatedSaleData,
                  paymentMethod: e.target.value,
                })
              }
            >
              <MenuItem value="cash">Готівка</MenuItem>
              <MenuItem value="bank_transfer">Банківський переказ</MenuItem>
              <MenuItem value="card">Карта</MenuItem>
            </Select>
            <Select
              fullWidth
              margin="normal"
              value={updatedSaleData.status || selectedSale.status}
              onChange={(e) =>
                setUpdatedSaleData({
                  ...updatedSaleData,
                  status: e.target.value,
                })
              }
            >
              <MenuItem value="pending">⏳ Очікується</MenuItem>
              <MenuItem value="completed">✅ Завершено</MenuItem>
              <MenuItem value="cancelled">❌ Скасовано</MenuItem>
            </Select>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSelectedSale(null)} color="error">
              ❌ Закрити
            </Button>
            <Button onClick={handleUpdateSale} variant="contained">
              ✅ Зберегти зміни
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default OfflineSale;
