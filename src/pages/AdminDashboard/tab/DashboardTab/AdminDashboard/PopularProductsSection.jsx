import { Box, Typography } from "@mui/material";
import ZoomableProductImage from "../../../../../components/ZoomableProductImage";

const PopularProductsSection = ({ popularItems }) => {
  if (!popularItems || popularItems.length === 0) {
    return <Typography>Немає популярних товарів</Typography>;
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: 2,
        mt: 2,
      }}
    >
      {popularItems.map((item) => (
        <Box
          key={item._id || item.index}
          sx={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
          }}
        >
          <ZoomableProductImage
            src={item.photoUrl}
            alt={item.name}
            style={{
              width: 120,
              height: 120,
              objectFit: "cover",
              borderRadius: "6px",
            }}
          />

          <Typography fontWeight={600}>{item.name}</Typography>

          <Typography variant="body2" color="text.secondary">
            Популярність: {item.popularity}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Індекс: {item.index}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default PopularProductsSection;
