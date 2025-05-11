import {
  CREATE_ONLINE_ORDER_FAILURE,
  CREATE_ONLINE_ORDER_REQUEST,
  CREATE_ONLINE_ORDER_SUCCESS,
  FETCH_ONLINE_ORDER_BY_ID_FAILURE,
  FETCH_ONLINE_ORDER_BY_ID_REQUEST,
  FETCH_ONLINE_ORDER_BY_ID_SUCCESS,
  FETCH_ONLINE_ORDERS_FAILURE,
  FETCH_ONLINE_ORDERS_REQUEST,
  FETCH_ONLINE_ORDERS_SUCCESS,
  RETURN_ONLINE_ORDER_FAILURE,
  RETURN_ONLINE_ORDER_REQUEST,
  RETURN_ONLINE_ORDER_SUCCESS,
  UPDATE_ONLINE_ORDER_DETAILS_FAILURE,
  UPDATE_ONLINE_ORDER_DETAILS_REQUEST,
  UPDATE_ONLINE_ORDER_DETAILS_SUCCESS,
  UPDATE_ONLINE_ORDER_FAILURE,
  UPDATE_ONLINE_ORDER_REQUEST,
  UPDATE_ONLINE_ORDER_STATUS_FAILURE,
  UPDATE_ONLINE_ORDER_STATUS_REQUEST, // ✅ Додаємо екшни статусу
  UPDATE_ONLINE_ORDER_STATUS_SUCCESS,
  UPDATE_ONLINE_ORDER_SUCCESS,
} from "./actionsOnlineOrder";

const initialState = {
  onlineOrders: [],
  currentOrder: null,
  loading: false,
  error: null,
};

const onlineOrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ONLINE_ORDERS_REQUEST:
    case FETCH_ONLINE_ORDER_BY_ID_REQUEST:
    case UPDATE_ONLINE_ORDER_REQUEST:
    case UPDATE_ONLINE_ORDER_DETAILS_REQUEST:
    case CREATE_ONLINE_ORDER_REQUEST:
    case RETURN_ONLINE_ORDER_REQUEST:
    case UPDATE_ONLINE_ORDER_STATUS_REQUEST: // ✅ Обробка оновлення статусу
      return { ...state, loading: true, error: null };

    case FETCH_ONLINE_ORDERS_SUCCESS:
      return { ...state, onlineOrders: action.payload, loading: false };

    case FETCH_ONLINE_ORDER_BY_ID_SUCCESS:
      return { ...state, currentOrder: action.payload, loading: false };

    case CREATE_ONLINE_ORDER_SUCCESS:
      return {
        ...state,
        onlineOrders: [...state.onlineOrders, action.payload],
        loading: false,
      };

    case UPDATE_ONLINE_ORDER_SUCCESS:
    case UPDATE_ONLINE_ORDER_DETAILS_SUCCESS:
    case RETURN_ONLINE_ORDER_SUCCESS:
      return {
        ...state,
        onlineOrders: state.onlineOrders.map((order) =>
          order._id === action.payload._id ? action.payload : order
        ),
        loading: false,
      };

    case UPDATE_ONLINE_ORDER_STATUS_SUCCESS: // ✅ Оновлюємо статус замовлення
      return {
        ...state,
        onlineOrders: state.onlineOrders.map((order) =>
          order._id === action.payload._id
            ? { ...order, status: action.payload.status }
            : order
        ),
        currentOrder:
          state.currentOrder?._id === action.payload._id
            ? { ...state.currentOrder, status: action.payload.status }
            : state.currentOrder,
        loading: false,
      };

    case FETCH_ONLINE_ORDERS_FAILURE:
    case FETCH_ONLINE_ORDER_BY_ID_FAILURE:
    case UPDATE_ONLINE_ORDER_FAILURE:
    case UPDATE_ONLINE_ORDER_DETAILS_FAILURE:
    case CREATE_ONLINE_ORDER_FAILURE:
    case RETURN_ONLINE_ORDER_FAILURE:
    case UPDATE_ONLINE_ORDER_STATUS_FAILURE: // ✅ Ловимо помилки
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
};

export default onlineOrdersReducer;
