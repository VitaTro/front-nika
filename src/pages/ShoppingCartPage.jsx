import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShoppingCart } from "../redux/shopping/operationShopping";

const ShoppingCartPage = () => {
  const dispatch = useDispatch();
  const { cart, isLoading, error } = useSelector((state) => state.shoppingCart);

  useEffect(() => {
    dispatch(getShoppingCart()); // Завантаження корзини
  }, [dispatch]);

  const handleQuantityChange = (id, quantity) => {
    dispatch(updateQuantity({ _id: id, quantity }));
  };

  return (
    <div>
      <h1>{t("basket")}</h1>
      <ul>
        {basket.map((product) => (
          <li key={product._id}>
            <span>
              {product.name} - {product.price} zł
            </span>
            <input
              type="number"
              min="1"
              value={product.quantity}
              onChange={(e) =>
                handleQuantityChange(product._id, parseInt(e.target.value, 10))
              }
            />
            <button onClick={() => dispatch(removeFromBasket(product))}>
              ❌ {t("remove")}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingCartPage;
