import { Divider, Paper, Typography } from "@mui/material";

const ProductSummaryPanel = ({ summary }) => {
  if (!summary) {
    return <Typography>⚠️ Дані по товару ще не завантажені</Typography>;
  }

  //   const [summary, setSummary] = useState(null);

  //   useEffect(() => {
  //     const fetchSummary = async () => {
  //       try {
  //         const res = await axios.get(
  //           `/api/admin/stock/movement/index/${productIndex}/summary`,
  //           { headers: { "Cache-Control": "no-cache" } }
  //         );
  //         console.log("🧪 Direct summary:", res.data);
  //         setSummary(res.data);
  //       } catch (err) {
  //         console.error("❌ Axios summary error:", err);
  //       }
  //     };
  //     if (productIndex) fetchSummary();
  //   }, [productIndex]);

  //   if (!summary) return <Loader />;
  //   const uniqueIndexes = [...new Set(allMovements.map((m) => m.productIndex))];

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
      <Typography>🔢 Залишок: {currentStock}</Typography>
      <Typography>📈 Прихід: {totalIn}</Typography>
      <Typography>📉 Витрата: {totalOut}</Typography>

      <Divider sx={{ my: 2 }} />

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
    </Paper>
  );
};

export default ProductSummaryPanel;
