// FETCH
export const FETCH_RESERVATIONS_REQUEST = "FETCH_RESERVATIONS_REQUEST";
export const FETCH_RESERVATIONS_SUCCESS = "FETCH_RESERVATIONS_SUCCESS";
export const FETCH_RESERVATIONS_FAILURE = "FETCH_RESERVATIONS_FAILURE";

// CREATE
export const CREATE_RESERVATION_REQUEST = "CREATE_RESERVATION_REQUEST";
export const CREATE_RESERVATION_SUCCESS = "CREATE_RESERVATION_SUCCESS";
export const CREATE_RESERVATION_FAILURE = "CREATE_RESERVATION_FAILURE";

// EXTEND
export const EXTEND_RESERVATION_REQUEST = "EXTEND_RESERVATION_REQUEST";
export const EXTEND_RESERVATION_SUCCESS = "EXTEND_RESERVATION_SUCCESS";
export const EXTEND_RESERVATION_FAILURE = "EXTEND_RESERVATION_FAILURE";

// COMPLETE
export const COMPLETE_RESERVATION_REQUEST = "COMPLETE_RESERVATION_REQUEST";
export const COMPLETE_RESERVATION_SUCCESS = "COMPLETE_RESERVATION_SUCCESS";
export const COMPLETE_RESERVATION_FAILURE = "COMPLETE_RESERVATION_FAILURE";

export const DELETE_RESERVATION_REQUEST = "DELETE_RESERVATION_REQUEST";
export const DELETE_RESERVATION_SUCCESS = "DELETE_RESERVATION_SUCCESS";
export const DELETE_RESERVATION_FAILURE = "DELETE_RESERVATION_FAILURE";
// ACTION CREATORS
export const fetchReservationsRequest = () => ({
  type: FETCH_RESERVATIONS_REQUEST,
});
export const fetchReservationsSuccess = (data) => ({
  type: FETCH_RESERVATIONS_SUCCESS,
  payload: data,
});
export const fetchReservationsFailure = (error) => ({
  type: FETCH_RESERVATIONS_FAILURE,
  payload: error,
});

export const createReservationRequest = () => ({
  type: CREATE_RESERVATION_REQUEST,
});
export const createReservationSuccess = (reservation) => ({
  type: CREATE_RESERVATION_SUCCESS,
  payload: reservation,
});
export const createReservationFailure = (error) => ({
  type: CREATE_RESERVATION_FAILURE,
  payload: error,
});

export const extendReservationRequest = () => ({
  type: EXTEND_RESERVATION_REQUEST,
});
export const extendReservationSuccess = (reservation) => ({
  type: EXTEND_RESERVATION_SUCCESS,
  payload: reservation,
});
export const extendReservationFailure = (error) => ({
  type: EXTEND_RESERVATION_FAILURE,
  payload: error,
});

export const completeReservationRequest = () => ({
  type: COMPLETE_RESERVATION_REQUEST,
});
export const completeReservationSuccess = (reservation) => ({
  type: COMPLETE_RESERVATION_SUCCESS,
  payload: reservation,
});
export const completeReservationFailure = (error) => ({
  type: COMPLETE_RESERVATION_FAILURE,
  payload: error,
});
export const deleteReservationRequest = () => ({
  type: DELETE_RESERVATION_REQUEST,
});
export const deleteReservationSuccess = (id) => ({
  type: DELETE_RESERVATION_SUCCESS,
  payload: id,
});
export const deleteReservationFailure = (error) => ({
  type: DELETE_RESERVATION_FAILURE,
  payload: error,
});
