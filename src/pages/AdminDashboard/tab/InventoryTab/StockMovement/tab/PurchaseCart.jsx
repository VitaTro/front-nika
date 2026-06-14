import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const PurchaseCart = ({ cart, updateItem, removeFromCart }) => {
  const totalPurchaseCost = cart.reduce(
    (acc, item) => acc + item.unitPrice * item.quantity,
    0,
  );

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        📦 Кошик приходу ({cart.length})
      </Typography>

      {cart.length === 0 ? (
        <Typography sx={{ mt: 2 }}>⚠️ Товари не додані</Typography>
      ) : (
        <>
          <Grid container spacing={2}>
            {cart.map((item) => (
              <Grid
                key={item.productId}
                sx={{
                  gridColumn: {
                    xs: "span 12",
                    sm: "span 6",
                    md: "span 4",
                  },
                  display: "flex",
                  mb: 5.5,
                }}
              >
                <Card
                  sx={{
                    height: "100%",
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    borderRadius: 3,
                    boxShadow: 2,

                    p: 2,
                  }}
                >
                  <CardMedia
                    component="img"
                    image={item.photoUrl}
                    alt={item.productName}
                    sx={{
                      height: 140,
                      objectFit: "cover",
                      borderRadius: "8px",
                      mb: 2,
                    }}
                  />
                  <CardContent sx={{ p: 0 }}>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {item.productName}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      📦 Індекс: {item.productIndex}
                    </Typography>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">
                        <TextField
                          label="📏 Розмір"
                          size="small"
                          fullWidth
                          value={item.size || ""}
                          onChange={(e) =>
                            updateItem(item.productId, {
                              size: e.target.value,
                            })
                          }
                        />
                      </Typography>

                      <TextField
                        label="🔢 Кількість"
                        type="number"
                        size="small"
                        fullWidth
                        value={item.quantity}
                        onChange={(e) =>
                          updateItem(item.productId, {
                            quantity: Number(e.target.value),
                          })
                        }
                      />
                      <TextField
                        label="💰 Ціна закупки"
                        type="number"
                        size="small"
                        fullWidth
                        value={item.unitPurchasePrice}
                        onChange={(e) =>
                          updateItem(item.productId, {
                            unitPurchasePrice: Number(e.target.value),
                          })
                        }
                      />
                      <TextField
                        label="🏷️ Ціна продажу"
                        type="number"
                        size="small"
                        fullWidth
                        value={item.price}
                        onChange={(e) =>
                          updateItem(item.productId, {
                            price: Number(e.target.value),
                          })
                        }
                      />
                    </Stack>
                  </CardContent>
                  <CardActions sx={{ mt: "auto", px: 2, pb: 2 }}>
                    <Button
                      fullWidth
                      variant="outlined"
                      color="error"
                      onClick={() => removeFromCart(item.productId)}
                    >
                      🗑️ Прибрати
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Typography variant="h6" sx={{ mt: 3 }}>
            💸 Загальна вартість закупки: {totalPurchaseCost.toFixed(2)} zł
          </Typography>
        </>
      )}
    </Box>
  );
};

export default PurchaseCart;
