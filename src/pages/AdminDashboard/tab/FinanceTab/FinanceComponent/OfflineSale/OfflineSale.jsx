import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../../../../components/Loader";
import { fetchOfflineSales } from "../../../../../../redux/finance/offlineSale/operationOfflineSale";
import {
  selectOfflineSales,
  selectOfflineSalesError,
  selectOfflineSalesLoading,
} from "../../../../../../redux/finance/offlineSale/selectorsOfflineSale";
import OfflineSaleDetails from "./OfflineSaleDetails";

const statusColors = {
  new: "info",
  completed: "success",
  returned: "warning",
  cancelled: "error",
};

const OfflineSale = () => {
  const dispatch = useDispatch();
  const offlineSales = useSelector(selectOfflineSales);
  const loading = useSelector(selectOfflineSalesLoading);
  const error = useSelector(selectOfflineSalesError);

  const [selectedSale, setSelectedSale] = useState(null);

  useEffect(() => {
    dispatch(fetchOfflineSales());
  }, [dispatch]);

  if (loading) return <Loader />;
  if (error) return <p>❌ Помилка: {error}</p>;

  return (
    <div>
      <h2>🏪 Офлайн-продажі</h2>

      {offlineSales.map((sale) => (
        <Card key={sale._id} sx={{ marginBottom: 2, padding: 2 }}>
          <CardContent
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography variant="h6">ID: {sale._id}</Typography>
              <Chip
                label={sale.status}
                color={statusColors[sale.status] || "default"}
                sx={{ marginBottom: 1 }}
              />
            </Box>
            <Button
              variant="contained"
              onClick={() => setSelectedSale(sale)}
              sx={{ marginLeft: "auto" }}
            >
              👀 Переглянути деталі
            </Button>
          </CardContent>
        </Card>
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
