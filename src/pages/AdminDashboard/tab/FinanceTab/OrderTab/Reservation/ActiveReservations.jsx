import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
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
  extendReservation,
  fetchReservations,
} from "../../../../../../redux/finance/reservation/operationReserve";

import axios from "../../../../../../redux/axiosConfig";
import ExtendReservationDialog from "./ExtendReservationDialog";

const statusColors = {
  reserved: "warning",
  completed: "success",
};

const ActiveReservations = () => {
  const dispatch = useDispatch();
  const reservations = useSelector(selectReservations) || [];
  const loading = useSelector(selectReservationsLoading);
  const error = useSelector(selectReservationsError);
  const isMobile = useMediaQuery("(max-width:768px)");
  const [extendOpen, setExtendOpen] = useState(false);
  const [extendId, setExtendId] = useState(null);

  const [selectedReservation, setSelectedReservation] = useState(null);

  useEffect(() => {
    dispatch(fetchReservations());
  }, [dispatch]);

  if (loading) return <Loader />;
  if (error) return <p>❌ Помилка: {error}</p>;

  // Сортуємо за датою
  const sorted = [...reservations].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );

  // Групуємо по датах
  const groupByDate = (items) =>
    items.reduce((acc, r) => {
      const dateKey = dayjs(r.createdAt).format("DD.MM.YYYY");
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(r);
      return acc;
    }, {});

  const grouped = groupByDate(sorted);

  const handleDelete = async (id) => {
    if (!window.confirm("Видалити резерв?")) return;
    await axios.delete(`/api/admin/finance/offline/orders/reserve/${id}`);
    dispatch(fetchReservations());
  };

  return (
    <Box sx={{ px: isMobile ? 1 : 3 }}>
      {Object.entries(grouped)
        .sort(([a], [b]) => dayjs(b) - dayjs(a))
        .map(([date, items]) => (
          <Accordion key={date}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">📅 {date}</Typography>
              <Chip
                label={`Резервів: ${items.length}`}
                sx={{ ml: 2 }}
                color="primary"
              />
            </AccordionSummary>

            <AccordionDetails>
              <Stack spacing={2}>
                {items.map((r) => (
                  <Card key={r._id}>
                    <CardContent>
                      <Stack
                        direction={isMobile ? "column" : "row"}
                        spacing={2}
                        alignItems={isMobile ? "flex-start" : "center"}
                        justifyContent="space-between"
                      >
                        <Box>
                          <Typography>ID: {r._id}</Typography>
                          <Chip
                            label={r.status}
                            color={statusColors[r.status] || "default"}
                            sx={{ mt: 1 }}
                          />
                          <Typography sx={{ mt: 1 }}>
                            До:{" "}
                            {dayjs(r.reservationExpiresAt).format("DD.MM.YYYY")}
                          </Typography>
                          <Typography>Сума: {r.finalPrice} zł</Typography>
                        </Box>

                        <Stack
                          direction={isMobile ? "column" : "row"}
                          spacing={1}
                          sx={{ mt: isMobile ? 2 : 0 }}
                        >
                          <Button
                            variant="contained"
                            color="success"
                            onClick={() =>
                              dispatch(completeReservation(r._id, "cash"))
                            }
                          >
                            ✅ Закрити
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
                            🗑 Видалити
                          </Button>
                        </Stack>
                      </Stack>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </AccordionDetails>
          </Accordion>
        ))}
      <ExtendReservationDialog
        open={extendOpen}
        onClose={() => setExtendOpen(false)}
        onSubmit={(newDate) => dispatch(extendReservation(extendId, newDate))}
      />
    </Box>
  );
};

export default ActiveReservations;
