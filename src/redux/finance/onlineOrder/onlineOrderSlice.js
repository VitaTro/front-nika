// src/redux/finance/onlineOrder/reducerOnlineOrder.js
import {
  FETCH_ONLINE_ORDERS_FAILURE,
  FETCH_ONLINE_ORDERS_REQUEST,
  FETCH_ONLINE_ORDERS_SUCCESS,
  UPDATE_ONLINE_ORDER_FAILURE,
  UPDATE_ONLINE_ORDER_REQUEST,
  UPDATE_ONLINE_ORDER_SUCCESS,
} from "./actionsOnlineOrder";

const initialState = {
  onlineOrders: [],
  loading: false,
  error: null,
};

const onlineOrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ONLINE_ORDERS_REQUEST:
    case UPDATE_ONLINE_ORDER_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_ONLINE_ORDERS_SUCCESS:
      return { ...state, onlineOrders: action.payload, loading: false };

    case UPDATE_ONLINE_ORDER_SUCCESS:
      return {
        ...state,
        onlineOrders: state.onlineOrders.map((order) =>
          order._id === action.payload._id ? action.payload : order
        ),
        loading: false,
      };

    case FETCH_ONLINE_ORDERS_FAILURE:
    case UPDATE_ONLINE_ORDER_FAILURE:
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
};

export default onlineOrdersReducer;
