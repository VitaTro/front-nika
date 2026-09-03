import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  createProductFromHandmade,
  fetchHandmadeCards,
} from "../../../../redux/handmade/operationsAdminHandmade";

const HandmadeList = () => {
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.adminHandmade.handmadeCards);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchHandmadeCards());
  }, [dispatch]);

  const safeFixed = (value, digits = 2) => {
    const num = Number(value);
    return isNaN(num) ? "—" : num.toFixed(digits);
  };

  return (
    <Box
      sx={{
        display: "grid",
        gap: 3,
        gridTemplateColumns: "1fr",
      }}
    >
      {cards.map((card) => (
        <Card
          key={card._id}
          sx={{
            p: 2,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            borderRadius: 3,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          {/* Фото зліва */}
          {card.photos?.[0] && (
            <CardMedia
              component="img"
              image={card.photos[0]}
              alt={card.name}
              sx={{
                width: { xs: "100%", sm: 180 },
                height: 180,
                objectFit: "cover",
                borderRadius: 3,
              }}
            />
          )}

          {/* Контент справа */}
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {card.name}
            </Typography>

            {card.description && (
              <Typography sx={{ mt: 1, color: "#555" }}>
                {card.description}
              </Typography>
            )}

            <Typography sx={{ mt: 2, fontWeight: 600 }}>Матеріали:</Typography>

            {card.materialsUsed.map((m) => (
              <Box
                key={m.materialId}
                sx={{
                  mb: 1.5,
                  p: 1.5,
                  backgroundColor: "#fafafa",
                  borderRadius: 2,
                }}
              >
                <Typography sx={{ fontWeight: 600 }}>{m.name}</Typography>

                <Typography sx={{ ml: 1 }}>
                  Використано: {m.quantity} {m.usedUnit}
                </Typography>

                <Typography sx={{ ml: 1 }}>
                  Ціна рулону: {m.purchasePrice} PLN за {m.materialTotalQty}{" "}
                  {m.unit}
                </Typography>

                <Typography sx={{ ml: 1 }}>
                  Ціна за одиницю: {safeFixed(m.pricePerUnit)} PLN / {m.unit}
                </Typography>

                <Typography sx={{ ml: 1, fontWeight: 600, color: "#b71c1c" }}>
                  Собівартість цього матеріалу:{" "}
                  {safeFixed(m.costForThisMaterial)} PLN
                </Typography>
              </Box>
            ))}

            <Typography sx={{ mt: 2, fontWeight: 700 }}>
              Собівартість: {card.totalCost} PLN
            </Typography>

            {/* Кнопки */}
            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              {!card.linkedProductId && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() =>
                    dispatch(
                      createProductFromHandmade({
                        handmadeId: card._id,
                        name: card.name,
                        price: 0,
                      }),
                    )
                  }
                >
                  Створити товар
                </Button>
              )}

              <Button
                variant="outlined"
                onClick={() => navigate(`/admin/handmade/${card._id}`)}
              >
                Переглянути
              </Button>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default HandmadeList;
