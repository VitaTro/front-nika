import {
  CREATE_OFFLINE_ORDER_FAILURE,
  CREATE_OFFLINE_ORDER_REQUEST,
  CREATE_OFFLINE_ORDER_SUCCESS,
  FETCH_OFFLINE_ORDERS_FAILURE,
  FETCH_OFFLINE_ORDERS_REQUEST,
  FETCH_OFFLINE_ORDERS_SUCCESS,
  UPDATE_OFFLINE_ORDER_FAILURE,
  UPDATE_OFFLINE_ORDER_REQUEST,
  UPDATE_OFFLINE_ORDER_SUCCESS,
} from "./actionsOfflineOrder";

const initialState = {
  offlineOrders: [],
  loading: false,
  error: null,
};

const offlineOrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_OFFLINE_ORDERS_REQUEST:
    case CREATE_OFFLINE_ORDER_REQUEST:
    case UPDATE_OFFLINE_ORDER_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_OFFLINE_ORDERS_SUCCESS:
      return { ...state, offlineOrders: action.payload, loading: false };
    case CREATE_OFFLINE_ORDER_SUCCESS:
      return {
        ...state,
        offlineOrders: [...state.offlineOrders, action.payload],
        loading: false,
      };
    case UPDATE_OFFLINE_ORDER_SUCCESS:
      return {
        ...state,
        offlineOrders: state.offlineOrders.map((order) =>
          order._id === action.payload._id ? action.payload : order
        ),
        loading: false,
      };

    case FETCH_OFFLINE_ORDERS_FAILURE:
    case CREATE_OFFLINE_ORDER_FAILURE:
    case UPDATE_OFFLINE_ORDER_FAILURE:
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
};

export default offlineOrdersReducer;
