import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOfflineSales,
  updateOfflineSale,
} from "../../../../../../redux/finance/offlineSale/operationOfflineSale";
import {
  selectOfflineSales,
  selectOfflineSalesError,
  selectOfflineSalesLoading,
} from "../../../../../../redux/finance/offlineSale/selectorsOfflineSale";
import OfflineSaleDetails from "./OfflineSaleDetails";

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
          <p>
            Статус:{" "}
            <strong>
              {sale.status === "returned" ? "🔄 Повернуто" : sale.status}
            </strong>
          </p>
          <Button variant="outlined" onClick={() => setSelectedSale(sale)}>
            👀 Переглянути деталі
          </Button>
        </div>
      ))}
      {selectedSale && (
        <OfflineSaleDetails
          sale={selectedSale}
          onClose={() => setSelectedSale(null)}
        />
      )}
    </div>
  );
};

export default OfflineSale;
