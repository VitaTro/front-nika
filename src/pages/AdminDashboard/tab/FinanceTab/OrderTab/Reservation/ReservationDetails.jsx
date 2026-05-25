import {
  Button,
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
  Typography,
  useMediaQuery,
} from "@mui/material";

import dayjs from "dayjs";
import { useState } from "react";
import { useDispatch } from "react-redux";

import {
  completeReservation,
  extendReservation,
} from "../../../../../../redux/finance/reservation/operationReserve";

import axios from "../../../../../../redux/axiosConfig";
import ExtendReservationDialog from "./ExtendReservationDialog";

const ReservationDetails = ({ reservation, onClose }) => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width:768px)");
  const [extendOpen, setExtendOpen] = useState(false);

  if (!reservation) return null;

  const handleExtend = () => {
    setExtendOpen(true);
    if (!newDate) return;
    dispatch(extendReservation(reservation._id, newDate));
    onClose();
  };

  const handleComplete = () => {
    dispatch(completeReservation(reservation._id, "cash"));
    onClose();
  };

  const handleDelete = async () => {
    if (!window.confirm("Видалити резерв?")) return;
    await axios.delete(
      `/api/admin/finance/offline/orders/reserve/${reservation._id}`,
    );
    onClose();
  };

  return (
    <Dialog open={!!reservation} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>🔐 Деталі резерву</DialogTitle>

      <DialogContent>
        <Typography>
          <strong>Сума:</strong> {reservation.finalPrice} zł
        </Typography>

        <Typography>
          <strong>Діє до:</strong>{" "}
          {dayjs(reservation.reservationExpiresAt).format("DD.MM.YYYY")}
        </Typography>

        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table size={isMobile ? "small" : "medium"}>
            <TableHead>
              <TableRow>
                <TableCell>Фото</TableCell>
                <TableCell>Назва</TableCell>
                <TableCell>К-сть</TableCell>
                <TableCell>Ціна</TableCell>
                <TableCell>Сума</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {reservation.products.map((item, index) => (
                <TableRow key={item.productId || index}>
                  <TableCell>
                    <img
                      src={item.photoUrl}
                      alt={item.name}
                      width="50"
                      style={{ borderRadius: 5 }}
                    />
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.price} zł</TableCell>
                  <TableCell>{item.quantity * item.price} zł</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>

      <DialogActions sx={{ flexWrap: isMobile ? "wrap" : "nowrap", gap: 1 }}>
        <Button onClick={onClose} color="error" fullWidth={isMobile}>
          ❌ Закрити
        </Button>

        <Button
          variant="outlined"
          color="warning"
          onClick={handleExtend}
          fullWidth={isMobile}
        >
          📅 Продовжити
        </Button>

        <Button
          variant="contained"
          color="success"
          onClick={handleComplete}
          fullWidth={isMobile}
        >
          ✅ Закрити резерв
        </Button>

        <Button
          variant="outlined"
          color="error"
          onClick={handleDelete}
          fullWidth={isMobile}
        >
          🗑 Видалити
        </Button>
      </DialogActions>
      <ExtendReservationDialog
        open={extendOpen}
        onClose={() => setExtendOpen(false)}
        onSubmit={(newDate) => {
          dispatch(extendReservation(reservation._id, newDate));
          setExtendOpen(false);
          onClose();
        }}
      />
    </Dialog>
  );
};

export default ReservationDetails;
