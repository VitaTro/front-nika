import { Typography } from "@mui/material";
import { calculateDiscount } from "../../../../../../utils/calculateDiscount";
import {
  CartContainer,
  CartGrid,
  ProductCardShop,
  ProductImage,
  ProductTitle,
} from "./OfflineOrder.styled";
const Cart = ({ cart, updateQuantity, removeFromCart, lastRetailPrice }) => {
  const totalPrice = cart.reduce(
    (acc, item) => acc + (Number(item.price) || 0) * item.quantity,
    0,
  );
  const { discount, discountPercent, final } = calculateDiscount(totalPrice);
  return (
    <CartContainer>
      <Typography variant="h6">🛒 Кошик ({cart.length} товарів)</Typography>{" "}
      {/* 🔥 Додаємо кількість */}
      {cart.length > 0 ? (
        <>
          <CartGrid>
            {cart.map((item, index) => (
              <ProductCardShop key={item.productId}>
                <ProductImage src={item.photoUrl} alt={item.name} />
                <ProductTitle>{item.name}</ProductTitle>
                <Typography>Розмір: {item.size || "-"}</Typography>
                <Typography>
                  Ціна: {item.price ? `${item.price}` : "—"} zł
                </Typography>
                <Typography>Кількість: {item.quantity}</Typography>
                <div>
                  <button
                    onClick={() =>
                      updateQuantity(item.productId, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                  >
                    ➖
                  </button>
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
          <Typography sx={{ mt: 2 }}>
            💰 Сума до знижки: {totalPrice.toFixed(2)} zł
          </Typography>
          {discount > 0 && (
            <Typography sx={{ color: "red" }}>
              🔻 Знижка: −{discount.toFixed(2)} zł ({discountPercent}%)
            </Typography>
          )}
          <Typography sx={{ fontWeight: "bold", mt: 1 }}>
            ✅ До сплати: {final.toFixed(2)} zł
          </Typography>{" "}
        </>
      ) : (
        <Typography>⚠️ Кошик порожній</Typography>
      )}
    </CartContainer>
  );
};

export default Cart;
