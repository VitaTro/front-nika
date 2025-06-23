import {
  Box,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTranslation } from "react-i18next";

const OrderDetailsCard = ({ order }) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery("(max-width:600px)");

  const formatDate = (date) =>
    new Date(date).toLocaleString("pl-PL", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  const getLengthWithUnit = (product) => {
    if (!product?.length) return t("not_available");
    const mmCategories = ["pendants", "crosses", "incense"];
    const unit = mmCategories.includes(product.subcategory?.toLowerCase())
      ? "мм"
      : "см";
    return `${product.length} ${unit}`;
  };

  return (
    <Box>
      {isMobile ? (
        <Box>
          {order.products.map((item, index) => {
            const p = item.productId;
            return (
              <Box
                key={index}
                sx={{
                  p: 2,
                  mb: 2,
                  border: "1px solid #ddd",
                  borderRadius: 2,
                  backgroundColor: "#fff",
                }}
              >
                <Typography fontWeight="bold">
                  {index + 1}. {p?.sku || p?.name}
                </Typography>
                <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
                  {p?.photoUrl && (
                    <img
                      src={p.photoUrl}
                      alt={p.name}
                      style={{
                        width: 60,
                        height: "auto",
                        borderRadius: 4,
                        maxWidth: "100%",
                        objectFit: "contain",
                      }}
                    />
                  )}
                  <Box>
                    <Typography>
                      {t("color")}: {p?.color || "-"}
                    </Typography>
                    <Typography>
                      {t("size")}: {p?.size || "-"}
                    </Typography>
                    <Typography>
                      {t("width")}: {p?.width ? `${p.width} мм` : "-"}
                    </Typography>
                    <Typography>
                      {t("length")}: {getLengthWithUnit(p)}
                    </Typography>
                    <Typography>
                      {t("quantity")}: {item.quantity}
                    </Typography>
                    <Typography>
                      {t("price")}: {p?.price?.toFixed(2)} zł
                    </Typography>
                    <Typography fontWeight="bold">
                      {t("item_total")}: {(p?.price * item.quantity).toFixed(2)}{" "}
                      zł
                    </Typography>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      ) : (
        <Box sx={{ p: 3, backgroundColor: "#f9f9f9", borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            🧾 {t("my_orders")}: {order.orderId}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Data: {formatDate(order.createdAt)}
          </Typography>
          <Typography variant="body2">
            {t("total")}: {order.totalPrice} zł
          </Typography>
          <Chip
            label={order.status}
            color="primary"
            size="small"
            sx={{ mt: 1, mb: 2 }}
          />

          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>№</TableCell>
                <TableCell>{t("product_name")}</TableCell>
                <TableCell>{t("photo")}</TableCell>
                <TableCell>{t("color")}</TableCell>
                <TableCell>{t("size")}</TableCell>
                <TableCell>{t("width")}</TableCell>
                <TableCell>{t("length")}</TableCell>
                <TableCell>{t("quantity")}</TableCell>
                <TableCell>{t("price")}</TableCell>
                <TableCell>{t("item_total")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.products.map((item, index) => {
                const p = item.productId;
                return (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{p?.sku || p?.name}</TableCell>
                    <TableCell>
                      <img
                        src={p?.photoUrl}
                        alt={p?.name}
                        style={{ width: 50, height: "auto" }}
                      />
                    </TableCell>
                    <TableCell>{p?.color || "-"}</TableCell>
                    <TableCell>{p?.size || "-"}</TableCell>
                    <TableCell>{p?.width ? `${p.width} мм` : "-"}</TableCell>
                    <TableCell>{getLengthWithUnit(p)}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{p?.price?.toFixed(2)} zł</TableCell>
                    <TableCell>
                      {p?.price && item.quantity
                        ? (p.price * item.quantity).toFixed(2) + " zł"
                        : "-"}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      )}
    </Box>
  );
};

export default OrderDetailsCard;
