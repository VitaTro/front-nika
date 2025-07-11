import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import {
  CartContainer,
  CartGrid,
  ProductCardShop,
  ProductImage,
  ProductTitle,
} from "../../../FinanceTab/FinanceComponent/OfflineOrder/OfflineOrder.styled";

const PurchaseCart = ({ cart, updateItem, removeFromCart }) => {
  const totalPurchaseCost = cart.reduce(
    (acc, item) => acc + item.unitPrice * item.quantity,
    0
  );

  return (
    <CartContainer>
      <Typography variant="h6">📦 Кошик приходу ({cart.length})</Typography>

      {cart.length === 0 ? (
        <Typography sx={{ mt: 2 }}>⚠️ Товари не додані</Typography>
      ) : (
        <>
          <CartGrid>
            {cart.map((item, index) => (
              <ProductCardShop key={item.productId || index}>
                <ProductImage src={item.photoUrl} alt={item.name} />
                <ProductTitle>{item.name}</ProductTitle>

                <Box sx={{ display: "grid", gap: 1, mt: 1 }}>
                  <TextField
                    label="Кількість"
                    type="number"
                    size="small"
                    value={item.quantity}
                    onChange={(e) =>
                      updateItem(item.productId, {
                        quantity: Number(e.target.value),
                      })
                    }
                    inputProps={{ min: 1 }}
                  />

                  <TextField
                    label="Закупочна ціна"
                    type="number"
                    size="small"
                    value={item.unitPurchasePrice}
                    onChange={(e) =>
                      updateItem(item.productId, {
                        unitPurchasePrice: Number(e.target.value),
                      })
                    }
                    inputProps={{ step: 0.01 }}
                  />

                  <TextField
                    label="Роздрібна ціна"
                    type="number"
                    size="small"
                    value={item.price}
                    onChange={(e) =>
                      updateItem(item.productId, {
                        price: Number(e.target.value),
                      })
                    }
                    inputProps={{ step: 0.01 }}
                  />
                </Box>

                <IconButton
                  color="error"
                  sx={{ mt: 1 }}
                  onClick={() => removeFromCart(item.productId)}
                >
                  <DeleteIcon />
                </IconButton>
              </ProductCardShop>
            ))}
          </CartGrid>

          <Typography variant="h6" sx={{ mt: 2 }}>
            💸 Загальна вартість закупки: {totalPurchaseCost.toFixed(2)} zł
          </Typography>
        </>
      )}
    </CartContainer>
  );
};

export default PurchaseCart;
