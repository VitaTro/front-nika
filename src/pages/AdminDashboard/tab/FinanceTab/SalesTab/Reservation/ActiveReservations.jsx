import {
  Box,
  Button,
  Card,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";

import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../../../../../../components/Loader";

import {
  selectReservations,
  selectReservationsError,
  selectReservationsLoading,
} from "../../../../../../redux/finance/reservation/selectorsReserve";

import {
  completeReservation,
  deleteReservation,
  extendReservation,
  fetchReservations,
} from "../../../../../../redux/finance/reservation/operationReserve";

import ExtendReservationDialog from "./ExtendReservationDialog";

const ActiveReservations = () => {
  const dispatch = useDispatch();
  const reservations = useSelector(selectReservations) || [];
  const loading = useSelector(selectReservationsLoading);
  const error = useSelector(selectReservationsError);
  const isMobile = useMediaQuery("(max-width:768px)");

  const [extendOpen, setExtendOpen] = useState(false);
  const [extendId, setExtendId] = useState(null);

  // 🔥 фото-індекси для кожного резерву
  const [photoIndex, setPhotoIndex] = useState({});

  useEffect(() => {
    dispatch(fetchReservations());
  }, [dispatch]);

  const sorted = [...reservations].sort((a, b) => {
    const now = new Date();
    const aDate = new Date(a.reservationExpiresAt);
    const bDate = new Date(b.reservationExpiresAt);

    const aExpired = aDate < now;
    const bExpired = bDate < now;

    if (aExpired && !bExpired) return -1;
    if (!aExpired && bExpired) return 1;

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const aSoon = aDate <= tomorrow;
    const bSoon = bDate <= tomorrow;

    if (aSoon && !bSoon) return -1;
    if (!aSoon && bSoon) return 1;

    return aDate - bDate;
  });

  if (loading) return <Loader />;
  if (error) return <p>❌ Помилка: {error}</p>;

  const handleDelete = (id) => {
    if (!window.confirm("Видалити резерв?")) return;
    dispatch(deleteReservation(id));
    dispatch(fetchReservations());
  };

  // 👉 правильні функції для фото
  const handleNext = (id, length) => {
    setPhotoIndex((prev) => ({
      ...prev,
      [id]: prev[id] === length - 1 ? 0 : (prev[id] || 0) + 1,
    }));
  };

  const handlePrev = (id, length) => {
    setPhotoIndex((prev) => ({
      ...prev,
      [id]: prev[id] === 0 ? length - 1 : (prev[id] || 0) - 1,
    }));
  };

  return (
    <Box sx={{ px: isMobile ? 1 : 3, py: 2 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        🔐 Активні резерви
      </Typography>

      {reservations.length === 0 ? (
        <Typography>Немає активних резервів</Typography>
      ) : (
        <Stack spacing={2}>
          {sorted.map((r) => {
            const index = photoIndex[r._id] || 0;

            const total = r.products.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0,
            );

            return (
              <Card
                key={r._id}
                sx={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 2,
                  borderRadius: "10px",
                  backgroundColor:
                    r.status === "cancelled"
                      ? "#ffe6e6"
                      : new Date(r.reservationExpiresAt) < new Date()
                        ? "#fff0cc"
                        : "#f9f9f9",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                }}
              >
                {/* 🖼 Фото + стрілки */}
                <Box sx={{ position: "relative", width: 100, height: 100 }}>
                  <img
                    src={r.products[index]?.photoUrl || "/placeholder.jpg"}
                    alt={r.products[index]?.name || "Товар"}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />

                  {r.products.length > 1 && (
                    <>
                      <Button
                        onClick={() => handlePrev(r._id, r.products.length)}
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: 0,
                          transform: "translateY(-50%)",
                          minWidth: 0,
                          color: "#333",
                        }}
                      >
                        ◀
                      </Button>

                      <Button
                        onClick={() => handleNext(r._id, r.products.length)}
                        sx={{
                          position: "absolute",
                          top: "50%",
                          right: 0,
                          transform: "translateY(-50%)",
                          minWidth: 0,
                          color: "#333",
                        }}
                      >
                        ▶
                      </Button>
                    </>
                  )}
                </Box>

                {/* 📋 Інформація */}
                <Box sx={{ flexGrow: 1, ml: 2 }}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    Резерв № {r._id.slice(-6)}
                  </Typography>

                  <Typography>
                    📅 До: {dayjs(r.reservationExpiresAt).format("DD.MM.YYYY")}
                  </Typography>

                  <Typography sx={{ fontSize: "14px", color: "#666", mt: 0.5 }}>
                    Товарів у резерві: {r.products.length}
                  </Typography>

                  <Typography>
                    💰 Загальна сума: {total.toFixed(2)} zł
                  </Typography>

                  <Typography sx={{ fontStyle: "italic", color: "#555" }}>
                    📝 Примітка: {r.notes || "—"}
                  </Typography>
                </Box>

                {/* 🔘 Кнопки */}
                <Stack
                  direction={isMobile ? "column" : "row"}
                  spacing={1}
                  sx={{ mt: isMobile ? 2 : 0 }}
                >
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => dispatch(completeReservation(r._id, "cash"))}
                  >
                    ✅ Провести
                  </Button>

                  <Button
                    variant="outlined"
                    color="warning"
                    onClick={() => {
                      setExtendId(r._id);
                      setExtendOpen(true);
                    }}
                  >
                    📅 Продовжити
                  </Button>

                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(r._id)}
                  >
                    ❌ Скасувати
                  </Button>
                </Stack>
              </Card>
            );
          })}
        </Stack>
      )}

      <ExtendReservationDialog
        open={extendOpen}
        onClose={() => setExtendOpen(false)}
        onSubmit={(newDate) => dispatch(extendReservation(extendId, newDate))}
      />
    </Box>
  );
};

export default ActiveReservations;
