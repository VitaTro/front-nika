import {
  COMPLETE_RESERVATION_FAILURE,
  COMPLETE_RESERVATION_REQUEST,
  COMPLETE_RESERVATION_SUCCESS,
  CREATE_RESERVATION_FAILURE,
  CREATE_RESERVATION_REQUEST,
  CREATE_RESERVATION_SUCCESS,
  EXTEND_RESERVATION_FAILURE,
  EXTEND_RESERVATION_REQUEST,
  EXTEND_RESERVATION_SUCCESS,
  FETCH_RESERVATIONS_FAILURE,
  FETCH_RESERVATIONS_REQUEST,
  FETCH_RESERVATIONS_SUCCESS,
} from "./actionsReserve";

const initialState = {
  reservations: [],
  loading: false,
  error: null,
};

const offlineReservationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RESERVATIONS_REQUEST:
    case CREATE_RESERVATION_REQUEST:
    case EXTEND_RESERVATION_REQUEST:
    case COMPLETE_RESERVATION_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_RESERVATIONS_SUCCESS:
      return { ...state, reservations: action.payload, loading: false };

    case CREATE_RESERVATION_SUCCESS:
      return {
        ...state,
        reservations: [action.payload, ...state.reservations],
        loading: false,
      };

    case EXTEND_RESERVATION_SUCCESS:
    case COMPLETE_RESERVATION_SUCCESS:
      return {
        ...state,
        reservations: state.reservations.map((r) =>
          r._id === action.payload._id ? action.payload : r,
        ),
        loading: false,
      };

    case FETCH_RESERVATIONS_FAILURE:
    case CREATE_RESERVATION_FAILURE:
    case EXTEND_RESERVATION_FAILURE:
    case COMPLETE_RESERVATION_FAILURE:
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
};
export default offlineReservationsReducer;
