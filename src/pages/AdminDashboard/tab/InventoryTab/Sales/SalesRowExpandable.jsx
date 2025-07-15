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

  const productsArray = Array.isArray(sale.products) ? sale.products : [];

  const calculateProfit = (product) => {
    const quantity = Number(product.quantity) || 0;
    const price = Number(product.price) || 0;
    const purchase =
      typeof product.productId === "object"
        ? product.productId.purchasePrice
        : null;

    const rate =
      purchase?.currency === "PLN"
        ? 1
        : Number(purchase?.exchangeRateToPLN) || 1;
    const purchasePLN = Number(purchase?.value || 0) * rate;

    return quantity * (price - purchasePLN);
  };

  const totalProfit = productsArray.reduce(
    (acc, p) => acc + calculateProfit(p),
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
          {sale.saleDate
            ? new Date(sale.saleDate).toLocaleDateString("pl-PL")
            : "—"}
        </TableCell>
        <TableCell>{sale._id?.slice(-6) || "—"}</TableCell>
        <TableCell>{sale.totalAmount?.toFixed(2) ?? "0.00"} zł</TableCell>
        <TableCell>{sale.paymentMethod ?? "—"}</TableCell>
        <TableCell>{sale.status ?? "Oczekuje"}</TableCell>
      </TableRow>

      <TableRow>
        <TableCell colSpan={6} sx={{ p: 0, backgroundColor: "#f9f9f9" }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                📦 Detale zamówienia
              </Typography>
              {productsArray.length === 0 ? (
                <Typography color="text.secondary">
                  — Brak produktów w sprzedaży
                </Typography>
              ) : (
                <Table size="small">
                  <TableBody>
                    {productsArray.map((product, idx) => {
                      const name =
                        typeof product.productId === "object"
                          ? product.productId.name
                          : `Produkt #${idx + 1}`;
                      const quantity = Number(product.quantity) || 0;
                      const price = Number(product.price) || 0;
                      const purchase =
                        typeof product.productId === "object"
                          ? product.productId.purchasePrice
                          : null;

                      const rate =
                        purchase?.currency === "PLN"
                          ? 1
                          : Number(purchase?.exchangeRateToPLN) || 1;
                      const purchaseValue = Number(purchase?.value || 0) * rate;
                      const profit = quantity * (price - purchaseValue);

                      return (
                        <TableRow key={idx}>
                          <TableCell>{name}</TableCell>
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
                🧮 Zysk netto: {totalProfit.toFixed(2)} zł
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default SalesExpandableRow;
