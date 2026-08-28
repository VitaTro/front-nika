import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  createProductFromHandmade,
  deleteHandmadeCard,
  fetchHandmadeCardById,
} from "../../../../redux/handmade/operationsAdminHandmade";

const HandmadeCardPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const card = useSelector((state) => state.admin.singleHandmadeCard);

  useEffect(() => {
    dispatch(fetchHandmadeCardById(id));
  }, [dispatch, id]);

  if (!card) {
    return <Typography sx={{ p: 3 }}>Завантаження...</Typography>;
  }

  return (
    <Box sx={{ p: 3, maxWidth: 800, margin: "0 auto" }}>
      {/* Назад */}
      <Button variant="outlined" sx={{ mb: 2 }} onClick={() => navigate(-1)}>
        Назад
      </Button>

      <Card sx={{ p: 2 }}>
        {/* Фото */}
        {card.photos?.[0] && (
          <CardMedia
            component="img"
            height="240"
            image={card.photos[0]}
            alt={card.name}
            sx={{ borderRadius: 2 }}
          />
        )}

        <CardContent>
          {/* Назва */}
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            {card.name}
          </Typography>

          {/* Опис */}
          {card.description && (
            <Typography sx={{ mt: 1 }}>{card.description}</Typography>
          )}

          {/* Розміри */}
          <Box sx={{ mt: 2 }}>
            {card.length && <Typography>Довжина: {card.length} см</Typography>}
            {card.width && <Typography>Ширина: {card.width} мм</Typography>}
            {card.color && <Typography>Колір: {card.color}</Typography>}
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Матеріали */}
          <Typography variant="h6" sx={{ mb: 1 }}>
            Використані матеріали:
          </Typography>

          {card.materialsUsed.map((m) => (
            <Box
              key={m.materialId}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                mb: 1,
                p: 1,
                border: "1px solid #ddd",
                borderRadius: 2,
              }}
            >
              {m.photoUrl && (
                <img
                  src={m.photoUrl}
                  alt={m.name}
                  style={{ width: 40, height: 40, borderRadius: 4 }}
                />
              )}

              <Typography sx={{ flexGrow: 1 }}>
                {m.name} — {m.quantity} {m.usedUnit} (склад: {m.unit})
              </Typography>
            </Box>
          ))}

          <Divider sx={{ my: 2 }} />

          {/* Собівартість */}
          <Typography sx={{ fontSize: 18 }}>
            Собівартість: <b>{card.totalCost} PLN</b>
          </Typography>

          {/* Статус */}
          <Typography sx={{ mt: 1 }}>
            Статус:{" "}
            {card.linkedProductId ? (
              <b style={{ color: "green" }}>Товар створено</b>
            ) : (
              <b style={{ color: "red" }}>Товар не створено</b>
            )}
          </Typography>

          {/* Кнопка створення товару */}
          {!card.linkedProductId && (
            <Button
              variant="contained"
              color="secondary"
              sx={{ mt: 2 }}
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

          {/* Видалити картку */}
          <Button
            variant="outlined"
            color="error"
            sx={{ mt: 2 }}
            onClick={() => {
              dispatch(deleteHandmadeCard(card._id));
              navigate(-1);
            }}
          >
            Видалити картку
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default HandmadeCardPage;
