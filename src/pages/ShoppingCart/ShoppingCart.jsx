import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import {
  getShoppingCart,
  removeProductFromShoppingCart,
  updateProductToShoppingCart,
} from "../../redux/shopping/operationShopping";

const ShoppingCartPage = () => {
  const dispatch = useDispatch();
  const { items, totalAmount, loading, error } = useSelector(
    (state) => state.shoppingCart
  );

  const handleQuantityChange = (productId, quantity) => {
    dispatch(updateProductToShoppingCart({ productId, quantity }));
  };

  useEffect(() => {
    dispatch(getShoppingCart());
  }, [dispatch]);

  const handleRemove = (id) => {
    dispatch(removeProductFromShoppingCart(id));
  };

  return (
    <div>
      <h1>Basket</h1>
      {loading && <Loader />}
      {error && <p>Error: {error}</p>}
      {items.length === 0 && <p>Your cart is empty</p>}
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            <img src={item.photoUrl} alt={item.name} />
            <p>{item.name}</p>
            <div>
              <button
                onClick={() =>
                  handleQuantityChange(item._id, Math.max(item.quantity - 1, 1))
                }
              >
                ➖
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() =>
                  handleQuantityChange(item._id, item.quantity + 1)
                }
              >
                ➕
              </button>
            </div>
            <p>{item.price} zł</p>
            <p>Quantity: {item.quantity}</p>
            <button onClick={() => handleRemove(item._id)}>Remove</button>
          </li>
        ))}
      </ul>
      <h2>Total: {totalAmount} zł</h2>
    </div>
  );
};

export default ShoppingCartPage;
