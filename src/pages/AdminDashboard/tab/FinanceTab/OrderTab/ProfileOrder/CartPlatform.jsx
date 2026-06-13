import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { calculateDiscount } from "../../../../../../utils/calculateDiscount";
import {
  CartContainer,
  CartGrid,
  ProductCardShop,
  ProductImage,
  ProductTitle,
} from "../OfflineOrder/OfflineOrder.styled";
const CartPlatform = ({ updateQuantity, removeFromCart }) => {
  const [platformCart, setPlatformCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("platformCart")) || [];
    setPlatformCart(storedCart);
  }, []);

  const availableItems = platformCart.filter(
    (item) =>
      item.inStock !== false && (item.currentStock ?? item.quantity ?? 0) > 0,
  );

  const handlePriceChange = (productId, value) => {
    const updated = platformCart.map((item) =>
      item.productId === productId
        ? { ...item, price: value, manualPrice: true } // 💡 додаємо прапорець
        : item,
    );
    setPlatformCart(updated);
    localStorage.setItem("platformCart", JSON.stringify(updated));
    updateQuantity(productId, null, value);
  };

  const totalPrice = availableItems.reduce(
    (acc, item) => acc + (Number(item.price) || 0) * item.quantity,
    0,
  );
  const { discount, discountPercent, final } = calculateDiscount(totalPrice);
  const hasMissingPrices = availableItems.some((item) => !item.price);

  return (
    <CartContainer>
      <Typography variant="h6">
        🛒 Кошик платформи ({platformCart.length} товарів)
      </Typography>
      {hasMissingPrices && (
        <Typography color="error">
          ⚠️ Увага: деякі товари не мають ціни!
        </Typography>
      )}
      {availableItems.length > 0 ? (
        <>
          <CartGrid>
            {availableItems.map((item) => (
              <ProductCardShop key={item.productId}>
                <ProductImage src={item.photoUrl} alt={item.name} />
                <ProductTitle>{item.name}</ProductTitle>
                <Typography>Розмір: {item.size || "-"}</Typography>
                <div style={{ marginTop: "8px" }}>
                  <label
                    style={{
                      fontSize: "14px",
                      display: "block",
                      marginBottom: "4px",
                    }}
                  ></label>
                  <input
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={item.price || ""}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value);
                      if (!isNaN(value) && value >= 0.01) {
                        handlePriceChange(item.productId, value.toFixed(2));
                      }
                    }}
                    placeholder="Введіть ціну"
                    style={{
                      width: "100px",
                      padding: "6px",
                      fontSize: "14px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                  />
                </div>
                <div>
                  <button
                    onClick={() =>
                      updateQuantity(item.productId, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                  >
                    ➖
                  </button>{" "}
                  {item.quantity}{" "}
                  <button
                    onClick={() =>
                      updateQuantity(item.productId, item.quantity + 1)
                    }
                  >
                    ➕
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.productId)}
                  style={{ color: "red" }}
                >
                  ❌ Видалити
                </button>
              </ProductCardShop>
            ))}
          </CartGrid>
          <Typography variant="h6">
            💰 Сума до знижки: {totalPrice.toFixed(2)} zł
          </Typography>
          {discount > 0 && (
            <Typography sx={{ color: "red" }}>
              🔻 Знижка: −{discount.toFixed(2)} zł ({discountPercent}%)
            </Typography>
          )}
          <Typography variant="h6" sx={{ fontWeight: "bold", mt: 1 }}>
            ✅ До сплати: {final.toFixed(2)} zł
          </Typography>
        </>
      ) : (
        <Typography>🚫 Немає товарів у кошику</Typography>
      )}
    </CartContainer>
  );
};

export default CartPlatform;
