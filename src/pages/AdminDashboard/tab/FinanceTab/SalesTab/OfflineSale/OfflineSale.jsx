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
  const offlineSales = useSelector(selectOfflineSales) || [];
  const loading = useSelector(selectOfflineSalesLoading);
  const error = useSelector(selectOfflineSalesError);
  const isMobile = useMediaQuery("(max-width:768px)");
  const [selectedSale, setSelectedSale] = useState(null);

  useEffect(() => {
    dispatch(fetchOfflineSales());
  }, [dispatch]);

  if (loading) return <Loader />;
  if (error) return <p>❌ Помилка: {error}</p>;

  const sortedSales = [...offlineSales].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
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
        .sort(([dateA], [dateB]) => dayjs(dateB) - dayjs(dateA)) // останні дати першими
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
        <OfflineSaleDetails
          sale={selectedSale}
          onClose={() => setSelectedSale(null)}
        />
      )}
    </Box>
  );
};

export default OfflineSale;
