import { Box, Typography } from "@mui/material";

const SaleDetails = ({ products }) => {
  if (!products || products.length === 0) {
    return <Typography>⚠️ Немає товарів у цьому продажу</Typography>;
  }

  return (
    <Box sx={{ mt: 2 }}>
      {products.map((product, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 1,
            p: 1,
            border: "1px solid #eee",
            borderRadius: "6px",
            backgroundColor: "#fafafa",
          }}
        >
          {product.photoUrl ? (
            <img
              src={product.photoUrl}
              alt={product.name}
              style={{
                width: "50px",
                height: "50px",
                objectFit: "cover",
                borderRadius: "4px",
              }}
            />
          ) : (
            <Box
              sx={{
                width: "50px",
                height: "50px",
                backgroundColor: "#eee",
                borderRadius: "4px",
              }}
            />
          )}
          <Box>
            <Typography>
              <strong>{product.name}</strong>
            </Typography>
            <Typography>🔢 Кількість: {product.quantity}</Typography>
            <Typography>💰 Ціна: {product.price} zł</Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default SaleDetails;
