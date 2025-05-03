import {
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
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

  const sales = useSelector(selectOfflineSales);
  const isLoading = useSelector(selectOfflineSalesLoading);
  const error = useSelector(selectOfflineSalesError);

  useEffect(() => {
    dispatch(fetchOfflineSales()); // Завантаження офлайн-продажів
  }, [dispatch]);

  const handleUpdateSale = (id, updatedData) => {
    dispatch(updateOfflineSale({ saleId: id, updatedData }));
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Помилка: {error}</Typography>;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom style={{ textAlign: "center" }}>
        Офлайн-Продажі
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID Продажу</TableCell>
            <TableCell>Сума</TableCell>
            <TableCell>Метод оплати</TableCell>
            <TableCell>Оновити</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sales.map((sale) => (
            <TableRow key={sale.id}>
              <TableCell>{sale.id}</TableCell>
              <TableCell>{sale.totalAmount}</TableCell>
              <TableCell>{sale.paymentMethod}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    handleUpdateSale(sale.id, {
                      totalAmount: sale.totalAmount + 10,
                    })
                  }
                >
                  Оновити Суму
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OfflineSale;
