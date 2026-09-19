import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";

const PromoTable = ({ products, handleUpdate }) => {
  const handlePromoChange = (id, value) => {
    handleUpdate(id, { promoPrice: value === "" ? null : Number(value) });
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Назва</TableCell>
            <TableCell>Ціна</TableCell>
            <TableCell>Акційна ціна</TableCell>
            <TableCell>Знижка %</TableCell>
            <TableCell>Дії</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {products.map((p) => {
            const discountPercent =
              p.promoPrice != null
                ? Math.round(((p.price - p.promoPrice) / p.price) * 100)
                : 0;

            return (
              <TableRow key={p._id}>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.price} PLN</TableCell>

                <TableCell>
                  <TextField
                    size="small"
                    value={p.promoPrice ?? ""}
                    onChange={(e) => handlePromoChange(p._id, e.target.value)}
                    placeholder="promoPrice"
                  />
                </TableCell>

                <TableCell>
                  {p.promoPrice ? `${discountPercent}%` : "-"}
                </TableCell>

                <TableCell>
                  <Button
                    color="error"
                    variant="outlined"
                    onClick={() => handlePromoChange(p._id, "")}
                  >
                    Скинути
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Box>
  );
};

export default PromoTable;
