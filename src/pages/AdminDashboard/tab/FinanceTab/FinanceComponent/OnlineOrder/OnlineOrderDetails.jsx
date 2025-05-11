import {
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  returnOnlineOrder,
  updateOnlineOrder,
} from "../../../../../../redux/finance/onlineOrder/operationOnlineOrder";
import MissingProductModal from "./MissingProductModal";

const OnlineOrderDetails = ({ order, onClose }) => {
  const [missingProduct, setMissingProduct] = useState(null);
  const dispatch = useDispatch();
  const [checkedItems, setCheckedItems] = useState(
    order?.products?.reduce((acc, item) => {
      const productId = item.productId?._id || item._id || `unknown_product`;

      acc[productId] = false;

      return acc;
    }, {}) || {}
  );

  // ✅ Функція зміни статусу кожного товару
  const handleToggle = (productId) => {
    setCheckedItems((prev) => ({ ...prev, [productId]: !prev[productId] }));
  };

  // ✅ Перевірка, чи всі товари зібрані
  const allItemsChecked = Object.values(checkedItems).every(Boolean);

  // ✅ Оновлення статусу замовлення на "assembled"
  const handleConfirmAssembly = () => {
    dispatch(updateOnlineOrder(order._id, { status: "assembled" }));
    onClose();
  };

  // ✅ Оновлення статусу на "shipped" або "ready_for_pickup"
  const handleConfirmShipment = () => {
    let nextStatus =
      order.deliveryType === "pickup" ? "ready_for_pickup" : "shipped";
    dispatch(updateOnlineOrder(order._id, { status: nextStatus }));
    onClose();
  };

  // ✅ Повернення замовлення
  const handleReturnOrder = () => {
    dispatch(returnOnlineOrder(order._id, { reason: "Клієнт відмовився" }));
    onClose();
  };

  return (
    <Dialog open={!!order} onClose={onClose} maxWidth="md">
      <DialogTitle>📦 Деталі замовлення ({order.status})</DialogTitle>

      <DialogContent>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>✅ Зібрано?</TableCell>
                <TableCell>Фото</TableCell>
                <TableCell>Назва товару</TableCell>
                <TableCell>Кількість</TableCell>
                <TableCell>Дія</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.products.map((item) => {
                const productId =
                  item?.productId?._id || item?._id || `unknown_product`;

                return (
                  <TableRow key={productId}>
                    <TableCell>
                      {item?.productId ? (
                        <Checkbox
                          checked={checkedItems[productId]}
                          onChange={() => handleToggle(productId)}
                          color="success"
                        />
                      ) : (
                        <Chip
                          label="❌ Немає в наявності"
                          color="error"
                          onClick={() => setMissingProduct(item)}
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
                        alt={
                          item?.productId?.name ||
                          item?.name ||
                          "Товар відсутній"
                        }
                        width="50"
                        style={{ borderRadius: "5px" }}
                      />
                    </TableCell>
                    <TableCell>
                      {item?.productId?.name || item?.name || "Невідомий товар"}
                    </TableCell>
                    <TableCell>{item?.quantity || "?"}</TableCell>
                    <TableCell>
                      {item?.productId ? null : (
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => setMissingProduct(item)}
                        >
                          ❌ Видалити
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error">
          ❌ Закрити
        </Button>
      </DialogActions>

      {/* ✅ Інтегроване модальне вікно для відсутнього товару */}
      <MissingProductModal
        open={!!missingProduct}
        onClose={() => setMissingProduct(null)}
        missingProduct={missingProduct}
        onConfirm={(product, comment) => {
          console.log(
            `✅ Внесено зміни для: ${
              product?.name || "Невідомий товар"
            } Коментар: ${comment}`
          );
          setMissingProduct(null);
        }}
      />
    </Dialog>
  );
};

export default OnlineOrderDetails;
