import { Divider, Paper, Stack, Typography } from "@mui/material";

const ProductSummaryPanel = ({ summary }) => {
  if (!summary) {
    return <Typography>⚠️ Дані по товару ще не завантажені</Typography>;
  }

  const {
    productName,
    currentStock,
    totalIn,
    totalOut,
    lastPurchase,
    lastSale,
  } = summary;

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6">📊 Аналітика: {productName}</Typography>
      <Divider sx={{ my: 2 }} />

      <Stack spacing={1}>
        <Typography>🔢 Залишок: {currentStock}</Typography>
        <Typography>📈 Прихід: {totalIn}</Typography>
        <Typography>📉 Витрата: {totalOut}</Typography>
      </Stack>

      <Divider sx={{ my: 2 }} />

      <Stack spacing={1}>
        <Typography>
          🛒 Останній продаж:{" "}
          {lastSale
            ? `${lastSale.quantity} шт. по ${
                lastSale.unitSalePrice ?? lastSale.price
              } zł — ${new Date(lastSale.date).toLocaleDateString("uk-UA")}`
            : "—"}
        </Typography>

        <Typography>
          🚚 Останній прихід:{" "}
          {lastPurchase
            ? `${lastPurchase.quantity} шт. по ${
                lastPurchase.unitPurchasePrice ?? lastPurchase.price
              } zł — ${new Date(lastPurchase.date).toLocaleDateString("uk-UA")}`
            : "—"}
        </Typography>
      </Stack>
    </Paper>
  );
};

export default ProductSummaryPanel;
