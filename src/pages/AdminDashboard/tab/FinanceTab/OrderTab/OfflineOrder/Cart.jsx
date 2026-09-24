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
  // const totalPrice = cart.reduce(
  //   (acc, item) => acc + (Number(item.price) || 0) * item.quantity,
  //   0,
  // );
  // const { discount, discountPercent, final } = calculateDiscount(regularTotal);
  const promoItems = cart.filter((item) => Number(item.promoPrice) > 0);
  const regularItems = cart.filter(
    (item) => !item.promoPrice || Number(item.promoPrice) === 0,
  );

  const promoTotal = promoItems.reduce(
    (sum, item) => sum + (item.promoPrice ?? 0) * item.quantity,
    0,
  );

  const regularTotal = regularItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const { discount, discountPercent, final } = calculateDiscount(regularTotal);

  const finalPrice = final + promoTotal;
  const handleSizeChange = (item, newSize) => {
    if (!item.variants || item.variants.length === 0) return; // ⬅️ важливо
    if (!newSize) return;

    const variant = item.variants.find((v) => v.size === newSize);
    if (!variant) return;

    removeFromCart(item._id);

    addToCart({
      productId: item.productId,
      size: newSize,
      sku: variant.variantIndex,
      quantity: item.quantity,
      promoPrice: item.promoPrice ?? null,
      price: item.price,
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

                {item.variants?.length > 0 ? (
                  <Typography>
                    Розмір:
                    <select
                      value={item.size || ""}
                      onChange={(e) => handleSizeChange(item, e.target.value)}
                      style={{ marginLeft: "10px" }}
                    >
                      {item.variants.map((v) => (
                        <option key={v.size} value={v.size}>
                          {v.size}
                        </option>
                      ))}
                    </select>
                  </Typography>
                ) : (
                  <Typography>Розмір: —</Typography>
                )}

                <Typography>
                  {/* Ціна: {item.price ? `${item.price} zł` : "—"} */}
                  {item.promoPrice && item.promoPrice < item.price ? (
                    <Typography sx={{ color: "red", fontWeight: "bold" }}>
                      {item.promoPrice} zł
                    </Typography>
                  ) : (
                    <Typography sx={{ color: "inherit", fontWeight: "bold" }}>
                      {item.price} zł
                    </Typography>
                  )}
                </Typography>

                <Typography>Кількість: {item.quantity}</Typography>

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

                <button
                  onClick={() => removeFromCart(item._id)}
                  style={{ color: "red" }}
                >
                  ❌ Видалити
                </button>
              </ProductCardShop>
            ))}
          </CartGrid>

          {/* <Typography sx={{ mt: 2 }}>
            💰 Сума до знижки: {totalPrice.toFixed(2)} zł
          </Typography>

          {discount > 0 && (
            <Typography sx={{ color: "red" }}>
              🔻 Знижка: −{discount.toFixed(2)} zł ({discountPercent}%)
            </Typography>
          )}

          <Typography sx={{ fontWeight: "bold", mt: 1 }}>
            ✅ До сплати: {final.toFixed(2)} zł
          </Typography> */}
          <Typography sx={{ mt: 2 }}>
            🛒 Звичайні товари: {regularTotal.toFixed(2)} zł
          </Typography>

          <Typography sx={{ mt: 1 }}>
            🔥 Акційні товари: {promoTotal.toFixed(2)} zł
          </Typography>

          {discount > 0 && (
            <Typography sx={{ color: "red" }}>
              🔻 Знижка: −{discount.toFixed(2)} zł ({discountPercent}%)
            </Typography>
          )}

          <Typography sx={{ fontWeight: "bold", mt: 1 }}>
            ✅ До сплати: {finalPrice.toFixed(2)} zł
          </Typography>
        </>
      ) : (
        <Typography>⚠️ Кошик порожній</Typography>
      )}
    </CartContainer>
  );
};

export default Cart;
