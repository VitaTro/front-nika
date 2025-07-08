import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";

const SalesExpandableRow = ({ sale }) => {
  const [open, setOpen] = useState(false);

  const calculateNetProfit = (product) => {
    const quantity = Number(product.quantity) || 0;
    const salePrice = Number(product.price) || 0;

    const purchase = product.productId?.purchasePrice;
    if (!purchase || purchase.value === undefined) return 0;

    const rate =
      purchase.currency === "PLN" ? 1 : Number(purchase.exchangeRateToPLN) || 1;
    const purchasePLN = Number(purchase.value) * rate;

    return quantity * (salePrice - purchasePLN);
  };

  const productsArray = Array.isArray(sale.products) ? sale.products : [];
  const totalProfit = productsArray.reduce(
    (acc, p) => acc + calculateNetProfit(p),
    0
  );

  return (
    <>
      <TableRow hover>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>
          {new Date(sale.saleDate || sale.createdAt).toLocaleDateString()}
        </TableCell>
        <TableCell>{sale._id?.slice(-6) || "—"}</TableCell>
        <TableCell>{sale.totalAmount?.toFixed(2)} zł</TableCell>
        <TableCell>{sale.paymentMethod || "—"}</TableCell>
        <TableCell>{sale.status || "—"}</TableCell>
      </TableRow>

      <TableRow>
        <TableCell colSpan={6} sx={{ p: 0, backgroundColor: "#f9f9f9" }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                📦 Деталі замовлення
              </Typography>
              {productsArray.length === 0 ? (
                <Typography color="text.secondary">
                  — Продаж не має товарів
                </Typography>
              ) : (
                <Table size="small">
                  <TableBody>
                    {productsArray.map((product, idx) => {
                      const quantity = Number(product.quantity) || 0;
                      const price = Number(product.price) || 0;

                      const purchase = product.productId?.purchasePrice;
                      const rate =
                        purchase?.currency === "PLN"
                          ? 1
                          : purchase?.exchangeRateToPLN || 1;
                      const purchaseValue = Number(purchase?.value || 0) * rate;

                      const profit = quantity * (price - purchaseValue);

                      return (
                        <TableRow key={idx}>
                          <TableCell>
                            {product.productId?.name || "—"}
                          </TableCell>
                          <TableCell>{quantity}</TableCell>
                          <TableCell>{price.toFixed(2)} zł</TableCell>
                          <TableCell>
                            {purchase
                              ? `${purchase.value} ${
                                  purchase.currency
                                } (${purchaseValue.toFixed(2)} zł)`
                              : "—"}
                          </TableCell>
                          <TableCell
                            sx={{ color: profit >= 0 ? "green" : "red" }}
                          >
                            {profit.toFixed(2)} zł
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}

              <Typography
                sx={{ mt: 2, fontWeight: "bold", textAlign: "right" }}
              >
                🧮 Чистий прибуток із продажу: {totalProfit.toFixed(2)} zł
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default SalesExpandableRow;
