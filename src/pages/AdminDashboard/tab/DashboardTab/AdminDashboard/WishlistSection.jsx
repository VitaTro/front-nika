import { Box, Typography } from "@mui/material";
import ZoomableProductImage from "../../../../../components/ZoomableProductImage";

const WishlistSection = ({ wishlist }) => {
  if (!wishlist || wishlist.length === 0) {
    return <Typography>Немає даних по списку бажань</Typography>;
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
      {wishlist.map((item) => (
        <Box
          key={item.productId || item.name}
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
            Додавань у wishlist: {item.count}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Популярність: {item.popularity}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default WishlistSection;
