import {
  Box,
  Button,
  Collapse,
  Paper,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../../../components/Loader";
import { fetchProductSummaryAlt } from "../../../../../redux/inventory/stockMovement/operationsStockMovement";
import {
  selectAllProductIndexes,
  selectNewProductSummary,
} from "../../../../../redux/inventory/stockMovement/selectorsStockMovement";
import ProductSummaryPanel from "./ProductSummaryPanel";

const ProductGridWithSummary = () => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width:768px)");
  const [filterValue, setFilterValue] = useState("");
  const [expanded, setExpanded] = useState(null);
  const productIndexes = useSelector(selectAllProductIndexes);
  const filteredIndexes = productIndexes.filter((index) =>
    index.toLowerCase().includes(filterValue.toLowerCase()),
  );
  const summary = useSelector((state) =>
    selectNewProductSummary(state, expanded),
  );

  useEffect(() => {
    if (!expanded || summary) return;
    dispatch(fetchProductSummaryAlt(expanded));
  }, [dispatch, expanded, summary]);

  return (
    <Stack spacing={3} sx={{ px: isMobile ? 1 : 4 }}>
      <TextField
        label="🔍 Пошук по індексу"
        variant="outlined"
        size="small"
        value={filterValue}
        onChange={(e) => setFilterValue(e.target.value)}
        fullWidth
      />

      <Typography variant="h5">
        📦 Товари на складі ({filteredIndexes.length})
      </Typography>

      {filteredIndexes.map((idx, i) => (
        <Paper key={`${idx}-${i}`} sx={{ p: 2 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "space-between",
              alignItems: isMobile ? "flex-start" : "center",
              gap: 1,
              cursor: "pointer",
            }}
          >
            <Typography>{idx}</Typography>

            <Button
              variant="text"
              size="small"
              onClick={() => setExpanded(expanded === idx ? null : idx)}
            >
              {expanded === idx ? "🔽 Сховати" : "🔍 Деталі"}
            </Button>
          </Box>

          <Collapse in={expanded === idx}>
            <Box sx={{ mt: 2 }}>
              {summary ? <ProductSummaryPanel summary={summary} /> : <Loader />}
            </Box>
          </Collapse>
        </Paper>
      ))}
    </Stack>
  );
};

export default ProductGridWithSummary;
