import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";

import dayjs from "dayjs";
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
  const onlineSales = useSelector(selectOnlineSales) || [];
  const loading = useSelector(selectOnlineSalesLoading);
  const error = useSelector(selectOnlineSalesError);
  const isMobile = useMediaQuery("(max-width:768px)");
  const [selectedSale, setSelectedSale] = useState(null);

  useEffect(() => {
    dispatch(fetchOnlineSales());
  }, [dispatch]);

  if (loading) return <Loader />;
  if (error) return <p>❌ Помилка: {error}</p>;

  // Сортуємо за датою
  const sortedSales = [...onlineSales].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );

  // Групуємо по датах
  const groupSalesByDate = (sales) => {
    return sales.reduce((acc, sale) => {
      const dateKey = dayjs(sale.createdAt).format("DD.MM.YYYY");
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(sale);
      return acc;
    }, {});
  };

  const groupedSales = groupSalesByDate(sortedSales);

  return (
    <Box sx={{ px: isMobile ? 1 : 3 }}>
      {Object.entries(groupedSales)
        .sort(([dateA], [dateB]) => dayjs(dateB) - dayjs(dateA))
        .map(([date, sales]) => (
          <Accordion key={date}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">📅 {date}</Typography>
              <Chip
                label={`Продажів: ${sales.length}`}
                sx={{ ml: 2 }}
                color="primary"
              />
            </AccordionSummary>

            <AccordionDetails>
              <Stack spacing={2}>
                {sales.map((sale) => (
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
                          <Typography sx={{ mt: 1 }}>
                            💰 {sale.finalPrice.toFixed(2)} zł
                          </Typography>
                          <Typography>💳 {sale.paymentMethod}</Typography>

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
                          🔍 Деталі
                        </Button>
                      </Stack>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </AccordionDetails>
          </Accordion>
        ))}

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
