import {
  Box,
  Button,
  Collapse,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../../../components/Loader";
import { fetchProductSummary } from "../../../../../redux/inventory/stockMovement/operationsStockMovement";
import {
  selectAllProductIndexes,
  selectStockSummary,
} from "../../../../../redux/inventory/stockMovement/selectorsStockMovement";
import ProductSummaryPanel from "./ProductSummaryPanel";
const ProductGridWithSummary = () => {
  const dispatch = useDispatch();

  const [filterValue, setFilterValue] = useState(""); // 🟢 пошук
  const [selected, setSelected] = useState(null); // 🟢 обраний SKU
  const [expanded, setExpanded] = useState(null); // 🟢 відкритий акордеон
  //   const [summary, setSummary] = useState(null); // 🟢 завантажений summary
  const productIndexes = useSelector(selectAllProductIndexes);
  const filteredIndexes = productIndexes.filter((index) =>
    index.toLowerCase().includes(filterValue.toLowerCase())
  );
  const summary = useSelector((state) => selectStockSummary(state, expanded));

  useEffect(() => {
    if (!expanded || summary) return;
    dispatch(fetchProductSummary(expanded));
  }, [dispatch, expanded, summary]);

  return (
    <Box sx={{ display: "grid", gap: 2 }}>
      <TextField
        label="🔍 Пошук по індексу"
        variant="outlined"
        size="small"
        value={filterValue}
        onChange={(e) => setFilterValue(e.target.value)}
        sx={{ maxWidth: 300 }}
      />

      <Typography variant="h5">
        📦 Товари на складі ({filteredIndexes.length})
      </Typography>

      {filteredIndexes.map((index) => (
        <Paper key={index} sx={{ p: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <Typography>{index}</Typography>
            <Button
              variant="text"
              size="small"
              onClick={() => {
                setSelected(index);
                setExpanded(expanded === index ? null : index);
              }}
            >
              {expanded === index ? "🔽 Сховати" : "🔍 Деталі"}
            </Button>
          </Box>

          <Collapse in={expanded === index}>
            <Box sx={{ mt: 2 }}>
              {summary ? <ProductSummaryPanel summary={summary} /> : <Loader />}
            </Box>
          </Collapse>
        </Paper>
      ))}
    </Box>
  );
};

export default ProductGridWithSummary;
