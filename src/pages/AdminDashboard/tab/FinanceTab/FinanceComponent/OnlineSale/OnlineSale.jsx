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
  const isMobile = useMediaQuery("(max-width:768px)");
  const [selectedSale, setSelectedSale] = useState(null);

  useEffect(() => {
    dispatch(fetchOnlineSales());
  }, [dispatch]);

  if (loading) return <Loader />;
  if (error) return <p>❌ Помилка: {error}</p>;

  return (
    <Box sx={{ px: isMobile ? 1 : 3 }}>
      <Typography variant="h5" gutterBottom>
        💰 Онлайн-продажі
      </Typography>

      <Stack spacing={2}>
        {onlineSales.map((sale) => (
          <Card key={sale._id}>
            <CardContent>
              <Stack
                direction={isMobile ? "column" : "row"}
                alignItems={isMobile ? "flex-start" : "center"}
                justifyContent="space-between"
                spacing={2}
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
        <OnlineSaleDetails
          sale={selectedSale}
          onClose={() => setSelectedSale(null)}
        />
      )}
    </Box>
  );
};

export default OnlineSale;
