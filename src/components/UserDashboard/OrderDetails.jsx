import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  confirmOrderReceived,
  fetchUserOrders,
  returnOrder,
} from "../../redux/user/userOrders/operationsUserOrders";
import Loader from "../Loader";
import NoResults from "../NoResults/NoResults";
const UserOrderDetails = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.userOrders.orders);
  const loading = useSelector((state) => userOrders.loading);
  const error = useSelector((state) => state.userOrders.error);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  const handleConfirmReceived = (orderId) => {
    dispatch(confirmOrderReceived(orderId));
  };

  const handleReturnOrder = (orderId) => {
    dispatch(returnOrder({ orderId, returnedProducts: [], returnAmount: 0 }));
  };

  return (
    <div>
      <h2>{t("orders")}</h2>
      {loading && <Loader />}
      {!orders.length && !loading && <NoResults />}
      {orders.length > 0 && (
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              <p>
                {t("order_id")}: {order.orderId}
              </p>
              <p>
                {t("status")}: {order.status}
              </p>
              <p>
                {t("total_price")}: {order.totalPrice} zł
              </p>
              {order.status === "shipped" && (
                <button onClick={() => handleConfirmReceived(order._id)}>
                  {t("confirm_received")}
                </button>
              )}
              {order.status === "completed" && (
                <button onClick={() => handleReturnOrder(order._id)}>
                  {t("return_order")}
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default UserOrderDetails;
