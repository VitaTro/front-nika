import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../../../../../redux/axiosConfig";

import {
  completeReservation,
  extendReservation,
  fetchReservations,
} from "../../../../../../redux/finance/reservation/operationReserve";

import {
  selectReservations,
  selectReservationsLoading,
} from "../../../../../../redux/finance/reservation/selectorsReserve";

import ExtendReservationDialog from "./ExtendReservationDialog";
import ReservationDetails from "./ReservationDetails";

const ActiveReservationsPanel = () => {
  const dispatch = useDispatch();
  const reservations = useSelector(selectReservations);
  const loading = useSelector(selectReservationsLoading);

  const [selectedReservation, setSelectedReservation] = useState(null);

  // 🔥 нові стейти для діалогу продовження
  const [extendOpen, setExtendOpen] = useState(false);
  const [extendId, setExtendId] = useState(null);

  useEffect(() => {
    dispatch(fetchReservations());
  }, [dispatch]);

  const handleComplete = (id) => {
    dispatch(completeReservation(id, "cash"));
  };

  const handleExtend = (id) => {
    setExtendId(id);
    setExtendOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Видалити резерв?")) return;
    await axios.delete(`/api/admin/finance/offline/orders/reserve/${id}`);
    dispatch(fetchReservations());
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        🔐 Активні резерви
      </Typography>

      {loading ? (
        <Typography>⏳ Завантаження...</Typography>
      ) : reservations.length === 0 ? (
        <Typography>Немає активних резервів</Typography>
      ) : (
        reservations.map((r) => (
          <Box
            key={r._id}
            sx={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              p: 2,
              mb: 2,
              backgroundColor: "#fff7e6",
            }}
          >
            <Typography sx={{ fontWeight: "bold" }}>
              Резерв № {r._id.slice(-6)}
            </Typography>

            <Typography>
              До: {new Date(r.reservationExpiresAt).toLocaleDateString("uk-UA")}
            </Typography>

            <Typography>Сума: {r.finalPrice} zł</Typography>

            <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
              <Button
                variant="contained"
                onClick={() => setSelectedReservation(r)}
              >
                🔍 Деталі
              </Button>

              <Button
                color="success"
                variant="contained"
                onClick={() => handleComplete(r._id)}
              >
                ✅ Закрити
              </Button>

              <Button
                color="warning"
                variant="outlined"
                onClick={() => handleExtend(r._id)}
              >
                📅 Продовжити
              </Button>

              <Button
                color="error"
                variant="outlined"
                onClick={() => handleDelete(r._id)}
              >
                🗑 Видалити
              </Button>
            </Box>
          </Box>
        ))
      )}

      {/* 🔥 Діалог продовження резерву */}
      <ExtendReservationDialog
        open={extendOpen}
        onClose={() => setExtendOpen(false)}
        onSubmit={(newDate) => dispatch(extendReservation(extendId, newDate))}
      />

      {/* 🔍 Деталі резерву */}
      {selectedReservation && (
        <ReservationDetails
          reservation={selectedReservation}
          onClose={() => setSelectedReservation(null)}
        />
      )}
    </Box>
  );
};

export default ActiveReservationsPanel;
