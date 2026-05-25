import axios from "../../axiosConfig";
import {
  completeReservationFailure,
  completeReservationRequest,
  completeReservationSuccess,
  createReservationFailure,
  createReservationRequest,
  createReservationSuccess,
  extendReservationFailure,
  extendReservationRequest,
  extendReservationSuccess,
  fetchReservationsFailure,
  fetchReservationsRequest,
  fetchReservationsSuccess,
} from "./actionsReserve";

// GET all reservations
export const fetchReservations = () => async (dispatch) => {
  dispatch(fetchReservationsRequest());
  try {
    const response = await axios.get(
      "/api/admin/finance/offline/orders/reserve",
    );
    dispatch(fetchReservationsSuccess(response.data));
  } catch (error) {
    dispatch(
      fetchReservationsFailure(error.response?.data?.error || error.message),
    );
  }
};

// CREATE reservation
export const createReservation = (data) => async (dispatch) => {
  dispatch(createReservationRequest());
  try {
    const response = await axios.post(
      "/api/admin/finance/offline/orders/reserve",
      data,
    );
    dispatch(createReservationSuccess(response.data.reservation));
    return response.data.reservation;
  } catch (error) {
    dispatch(
      createReservationFailure(error.response?.data?.error || error.message),
    );
    throw error;
  }
};

// EXTEND reservation
export const extendReservation = (id, newDate) => async (dispatch) => {
  dispatch(extendReservationRequest());
  try {
    const response = await axios.patch(
      `/api/admin/finance/offline/orders/reserve/${id}/extend`,
      { newDate },
    );
    dispatch(extendReservationSuccess(response.data.reservation));
  } catch (error) {
    dispatch(
      extendReservationFailure(error.response?.data?.error || error.message),
    );
  }
};

// COMPLETE reservation
export const completeReservation = (id, paymentMethod) => async (dispatch) => {
  dispatch(completeReservationRequest());
  try {
    const response = await axios.patch(
      `/api/admin/finance/offline/orders/reserve/${id}/complete`,
      { paymentMethod },
    );
    dispatch(completeReservationSuccess(response.data.reservation));
  } catch (error) {
    dispatch(
      completeReservationFailure(error.response?.data?.error || error.message),
    );
  }
};
