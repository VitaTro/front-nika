import {
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  returnOnlineOrder,
  updateOnlineOrder,
} from "../../../../../../redux/finance/onlineOrder/operationOnlineOrder";
import MissingProductModal from "./MissingProductModal";

const OnlineOrderDetails = ({ order, onClose }) => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width:768px)");
  const [missingProduct, setMissingProduct] = useState(null);
  const [checkedItems, setCheckedItems] = useState(
    order?.products?.reduce((acc, item) => {
      const productId = item?.productId?._id || item?._id || `unknown`;
      acc[productId] = false;
      return acc;
    }, {}) || {}
  );

  const handleToggle = (productId) => {
    setCheckedItems((prev) => ({ ...prev, [productId]: !prev[productId] }));
  };

  const allItemsChecked = Object.values(checkedItems).every(Boolean);

  const handleConfirmAssembly = () => {
    dispatch(updateOnlineOrder(order._id, { status: "assembled" }));
    onClose();
  };

  const handleConfirmShipment = () => {
    const nextStatus =
      order.deliveryType === "pickup" ? "ready_for_pickup" : "shipped";
    dispatch(updateOnlineOrder(order._id, { status: nextStatus }));
    onClose();
  };

  const handleReturnOrder = () => {
    dispatch(returnOnlineOrder(order._id, { reason: "Клієнт відмовився" }));
    onClose();
  };

  return (
    <Dialog open={!!order} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>📦 Деталі замовлення ({order.status})</DialogTitle>

      <DialogContent>
        <TableContainer sx={{ overflowX: "auto" }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>✅</TableCell>
                <TableCell>Фото</TableCell>
                <TableCell>Назва</TableCell>
                <TableCell>Кількість</TableCell>
                <TableCell>Дія</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.products.map((item) => {
                const productId =
                  item?.productId?._id || item?._id || `unknown`;

                return (
                  <TableRow key={productId}>
                    <TableCell>
                      {item?.productId ? (
                        <Checkbox
                          checked={checkedItems[productId]}
                          onChange={() => handleToggle(productId)}
                          color="success"
                          size={isMobile ? "small" : "medium"}
                        />
                      ) : (
                        <Chip
                          label="❌ Немає в наявності"
                          color="error"
                          onClick={() => setMissingProduct(item)}
                          size="small"
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      <img
                        src={
                          item?.productId?.photoUrl ||
                          item?.photoUrl ||
                          "placeholder.jpg"
                        }
                        alt={item?.productId?.name || item?.name || "Товар"}
                        width={40}
                        style={{ borderRadius: 4 }}
                      />
                    </TableCell>
                    <TableCell>
                      {item?.productId?.name || item?.name || "—"}
                    </TableCell>
                    <TableCell>{item?.quantity || "—"}</TableCell>
                    <TableCell>
                      {!item?.productId && (
                        <Button
                          variant="outlined"
                          size="small"
                          color="error"
                          onClick={() => setMissingProduct(item)}
                        >
                          Видалити
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <Stack
          direction={isMobile ? "column" : "row"}
          spacing={1}
          sx={{ mt: 2 }}
        >
          <Button
            variant="contained"
            fullWidth={isMobile}
            onClick={handleConfirmAssembly}
            disabled={!allItemsChecked}
          >
            🛠 Підтвердити зібране
          </Button>
          <Button
            variant="contained"
            fullWidth={isMobile}
            color="success"
            onClick={handleConfirmShipment}
          >
            📤 Відправити
          </Button>
          <Button
            variant="outlined"
            fullWidth={isMobile}
            color="error"
            onClick={handleReturnOrder}
          >
            ❌ Повернення
          </Button>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Закрити
        </Button>
      </DialogActions>

      <MissingProductModal
        open={!!missingProduct}
        onClose={() => setMissingProduct(null)}
        missingProduct={missingProduct}
        onConfirm={(product, comment) => {
          setMissingProduct(null);
        }}
      />
    </Dialog>
  );
};

export default OnlineOrderDetails;
