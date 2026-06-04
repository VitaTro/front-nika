import { createSelector } from "reselect";

const selectOfflineReservationsState = (state) =>
  state.offlineReservations || {};

export const selectReservations = createSelector(
  [selectOfflineReservationsState],
  (reservationsState) => reservationsState.reservations || [],
);

export const selectReservationsLoading = createSelector(
  [selectOfflineReservationsState],
  (reservationsState) => reservationsState.loading || false,
);

export const selectReservationsError = createSelector(
  [selectOfflineReservationsState],
  (reservationsState) => reservationsState.error || null,
);

// 🔹 Активні резерви
export const selectActiveReservations = createSelector(
  [selectReservations],
  (reservations) => reservations.filter((r) => r.status === "reserved"),
);

// 🔹 Резерви, що скоро закінчуються
export const selectExpiringReservations = createSelector(
  [selectActiveReservations],
  (reservations) => {
    const now = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(now.getDate() + 1);

    return reservations.filter((r) => {
      const exp = new Date(r.reservationExpiresAt);
      return exp <= tomorrow;
    });
  },
);

// 🔹 Резерв за ID
export const selectReservationById = (id) =>
  createSelector([selectReservations], (reservations) =>
    reservations.find((r) => r._id === id),
  );

// 🔹 Чи є активні резерви
export const selectHasActiveReservations = createSelector(
  [selectActiveReservations],
  (reservations) => reservations.length > 0,
);
