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
import { fetchOnlineSales } from "../../../../../../redux/finance/onlineSale/operationOnlineSale";
import {
  selectOnlineSales,
  selectOnlineSalesError,
  selectOnlineSalesLoading,
} from "../../../../../../redux/finance/onlineSale/selectorsOnlineSale";
import OnlineSaleDetails from "./OnlineSaleDetails";

const statusColors = {
  new: "info",
  completed: "success",
  returned: "warning",
  cancelled: "error",
};

const OnlineSale = () => {
  const dispatch = useDispatch();
  const onlineSales = useSelector(selectOnlineSales);
  const loading = useSelector(selectOnlineSalesLoading);
  const error = useSelector(selectOnlineSalesError);

  const [selectedSale, setSelectedSale] = useState(null);

  useEffect(() => {
    dispatch(fetchOnlineSales());
  }, [dispatch]);

  if (loading) return <Loader />;
  if (error) return <p>❌ Помилка: {error}</p>;

  return (
    <div>
      <h2>💰 Онлайн-продажі</h2>

      {onlineSales.map((sale) => (
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
        <OnlineSaleDetails
          sale={selectedSale}
          onClose={() => setSelectedSale(null)}
        />
      )}
    </div>
  );
};

export default OnlineSale;
