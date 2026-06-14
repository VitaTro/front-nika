import { Typography } from "@mui/material";
import { calculateDiscount } from "../../../../../../utils/calculateDiscount";
import {
  CartContainer,
  CartGrid,
  ProductCardShop,
  ProductImage,
  ProductTitle,
} from "./OfflineOrder.styled";

const Cart = ({ cart, updateQuantity, removeFromCart, addToCart }) => {
  const totalPrice = cart.reduce(
    (acc, item) => acc + (Number(item.price) || 0) * item.quantity,
    0,
  );

  const { discount, discountPercent, final } = calculateDiscount(totalPrice);

  // 🔥 Зміна розміру
  const handleSizeChange = (item, newSize) => {
    if (!newSize) return;

    const variant = item.variants?.find((v) => v.size === newSize);
    if (!variant) return;

    // 1️⃣ Видаляємо старий товар по _id
    removeFromCart(item._id);

    // 2️⃣ Додаємо новий товар з новим SKU
    addToCart({
      productId: item.productId,
      size: newSize,
      sku: variant.variantIndex,
      quantity: item.quantity,
    });
  };

  return (
    <CartContainer>
      <Typography variant="h6">🛒 Кошик ({cart.length} товарів)</Typography>

      {cart.length > 0 ? (
        <>
          <CartGrid>
            {cart.map((item) => (
              <ProductCardShop key={item._id}>
                <ProductImage src={item.photoUrl} alt={item.name} />
                <ProductTitle>{item.name}</ProductTitle>

                {/* 🔥 Розмір + селектор */}
                <Typography>
                  Розмір:
                  <select
                    value={item.size || ""}
                    onChange={(e) => handleSizeChange(item, e.target.value)}
                    style={{ marginLeft: "10px" }}
                  >
                    {item.variants?.map((v) => (
                      <option key={v.size} value={v.size}>
                        {v.size}
                      </option>
                    ))}
                  </select>
                </Typography>

                <Typography>
                  Ціна: {item.price ? `${item.price} zł` : "—"}
                </Typography>

                <Typography>Кількість: {item.quantity}</Typography>

                {/* 🔥 Кнопки кількості */}
                <div>
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    ➖
                  </button>
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  >
                    ➕
                  </button>
                </div>

                {/* 🔥 Видалення */}
                <button
                  onClick={() => removeFromCart(item._id)}
                  style={{ color: "red" }}
                >
                  ❌ Видалити
                </button>
              </ProductCardShop>
            ))}
          </CartGrid>

          {/* 🔥 Підсумки */}
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
          </Typography>
        </>
      ) : (
        <Typography>⚠️ Кошик порожній</Typography>
      )}
    </CartContainer>
  );
};

export default Cart;
