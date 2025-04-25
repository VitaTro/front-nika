import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import { fetchSales } from "../../../redux/finance/sale/operationSale";
import {
  selectSales,
  selectSalesError,
  selectSalesStatus,
} from "../../../redux/finance/sale/selectorsSale";

const SalesPage = () => {
  const dispatch = useDispatch();
  const sales = useSelector(selectSales);
  const status = useSelector(selectSalesStatus);
  const error = useSelector(selectSalesError);

  useEffect(() => {
    dispatch(fetchSales());
  }, [dispatch]);

  if (status === "loading") return <Loader />;
  if (status === "failed") return <p>Error: {error}</p>;
  return (
    <div>
      <h1>Продажі</h1>
      <ul>
        {sales.map((sale) => (
          <li key={sale._id}>
            {sale.productId} - {sale.quantity} шт. - {sale.totalAmount} грн.
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SalesPage;
