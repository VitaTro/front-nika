import {
  Box,
  Button,
  Collapse,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlatformSales } from "../../../../../../redux/finance/platform/operationPlatform";
import { selectPlatformSales } from "../../../../../../redux/finance/platform/selectorsPlatform";
import SaleDetails from "./SaleDetails"; // адаптуй шлях, якщо потрібно

const ProfileSale = () => {
  const dispatch = useDispatch();
  const sales = useSelector(selectPlatformSales);
  const isMobile = useMediaQuery("(max-width:768px)");
  const [expandedSaleId, setExpandedSaleId] = useState(null);

  useEffect(() => {
    dispatch(fetchPlatformSales());
  }, [dispatch]);

  return (
    <Box sx={{ p: isMobile ? 1 : 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
         Список продажів
      </Typography>

      {sales.length > 0 ? (
        <Stack spacing={2}>
          {sales.map((sale) => {
            const total = sale.products?.reduce(
              (sum, p) => sum + (p.price || 0),
              0
            );

            return (
              <Paper key={sale._id} sx={{ p: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    justifyContent: "space-between",
                    alignItems: isMobile ? "flex-start" : "center",
                    gap: 1,
                  }}
                >
                  <Typography>
                    🆔 {sale.orderId} —{" "}
                    {new Date(sale.saleDate).toLocaleDateString()} — {" "}
                    {total.toFixed(2)} zł
                  </Typography>
                  <Button
                    variant="text"
                    size="small"
                    onClick={() =>
                      setExpandedSaleId(
                        expandedSaleId === sale._id ? null : sale._id
                      )
                    }
                  >
                    {expandedSaleId === sale._id ? "🔽 Сховати" : "🔍 Деталі"}
                  </Button>
                </Box>

                <Collapse in={expandedSaleId === sale._id}>
                  <SaleDetails products={sale.products} />
                </Collapse>
              </Paper>
            );
          })}
        </Stack>
      ) : (
        <Typography>⏳ Продажів ще немає</Typography>
      )}
    </Box>
  );
};

export default ProfileSale;
