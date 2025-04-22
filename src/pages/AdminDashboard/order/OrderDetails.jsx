import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import React from "react";

const OrderDetails = ({ open, onClose, order }) => {
  if (!order) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Деталі замовлення</DialogTitle>
      <DialogContent>
        <Table>
          <TableBody>
            {order.products.map((product) => (
              <TableRow key={product.productId}>
                <TableCell>
                  <img
                    src={product.photoUrl}
                    alt={product.name}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                    }}
                  />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.color || "N/A"}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{product.price} zł</TableCell>
                <TableCell>
                  <Checkbox
                    color="primary"
                    checked={product.isPacked || false}
                    onChange={(e) =>
                      console.log(
                        `Checked product ${product.name}: ${e.target.checked}`
                      )
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Закрити
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderDetails;
