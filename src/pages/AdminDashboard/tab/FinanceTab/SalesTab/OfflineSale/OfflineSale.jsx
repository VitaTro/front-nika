import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
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
  const isMobile = useMediaQuery("(max-width:768px)");
  const [selectedSale, setSelectedSale] = useState(null);

  useEffect(() => {
    dispatch(fetchOfflineSales());
  }, [dispatch]);

  if (loading) return <Loader />;
  if (error) return <p>❌ Помилка: {error}</p>;

  return (
    <Box sx={{ px: isMobile ? 1 : 3 }}>
      <Typography variant="h5" gutterBottom>
        🏪 Офлайн-продажі
      </Typography>

      <Stack spacing={2}>
        {offlineSales.map((sale) => (
          <Card key={sale._id}>
            <CardContent>
              <Stack
                direction={isMobile ? "column" : "row"}
                spacing={2}
                alignItems={isMobile ? "flex-start" : "center"}
                justifyContent="space-between"
              >
                <Box>
                  <Typography>ID: {sale._id}</Typography>
                  <Chip
                    label={sale.status}
                    color={statusColors[sale.status] || "default"}
                    sx={{ mt: 1 }}
                  />
                </Box>
                <Button
                  variant="contained"
                  onClick={() => setSelectedSale(sale)}
                  fullWidth={isMobile}
                >
                  👀 Переглянути
                </Button>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>

      {selectedSale && (
        <OfflineSaleDetails
          sale={selectedSale}
          onClose={() => setSelectedSale(null)}
        />
      )}
    </Box>
  );
};

export default OfflineSale;
