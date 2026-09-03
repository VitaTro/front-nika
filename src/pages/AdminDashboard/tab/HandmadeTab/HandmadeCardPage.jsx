import { Box, Button, CardMedia, Typography } from "@mui/material";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { fetchAdminMaterials } from "../../../../redux/admin/operationsAdmin";
import { fetchHandmadeCardById } from "../../../../redux/handmade/operationsAdminHandmade";

const HandmadeCardPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const card = useSelector((state) => state.adminHandmade.singleHandmadeCard);
  const materials = useSelector(
    (state) => state.adminStockMaterials.materials ?? [],
  );

  useEffect(() => {
    dispatch(fetchHandmadeCardById(id));
    dispatch(fetchAdminMaterials());
  }, [dispatch, id]);

  const enrichedMaterials = useMemo(() => {
    if (!card?.materialsUsed) return [];
    return card.materialsUsed.map((m) => {
      const fullMaterial = materials.find(
        (mat) => String(mat._id) === String(m.materialId),
      );
      return {
        ...m,
        photoUrl: fullMaterial?.photoUrl,
        color: fullMaterial?.color,
        size: fullMaterial?.size,
        purchasePrice: fullMaterial?.purchasePrice,
        piecesPerMeter: fullMaterial?.piecesPerMeter,
        piecesPerGram: fullMaterial?.piecesPerGram,
      };
    });
  }, [card, materials]);

  if (!card) {
    return <Typography sx={{ p: 3 }}>Завантаження...</Typography>;
  }

  return (
    <Box
      sx={{
        maxWidth: 1000,
        margin: "0 auto",
        p: { xs: 2, md: 4 },
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <Button
        variant="outlined"
        sx={{ width: "fit-content" }}
        onClick={() => navigate(-1)}
      >
        Назад
      </Button>

      {/* ГОЛОВНИЙ БЛОК: фото виробу + фото матеріалів */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
        }}
      >
        {/* Фото виробу */}
        <Box sx={{ flex: 1 }}>
          {card.photos?.[0] && (
            <CardMedia
              component="img"
              image={card.photos[0]}
              alt={card.name}
              sx={{
                width: "100%",
                height: 350,
                objectFit: "cover",
                borderRadius: 3,
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              }}
            />
          )}
        </Box>

        {/* Фото матеріалів */}
        <Box
          sx={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
            gap: 2,
            alignContent: "start",
          }}
        >
          {enrichedMaterials.map((m) => (
            <Box
              key={m.materialId}
              sx={{
                backgroundColor: "#fff",
                borderRadius: 2,
                p: 1,
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                textAlign: "center",
              }}
            >
              {m.photoUrl && (
                <img
                  src={m.photoUrl}
                  alt={m.name}
                  style={{
                    width: "100%",
                    height: 100,
                    objectFit: "cover",
                    borderRadius: 6,
                  }}
                />
              )}
            </Box>
          ))}
        </Box>
      </Box>

      {/* Назва + опис */}
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          {card.name}
        </Typography>

        {card.description && (
          <Typography sx={{ color: "#555", mt: 1, lineHeight: 1.6 }}>
            {card.description}
          </Typography>
        )}
      </Box>

      {/* Матеріали детально */}
      <Box
        sx={{
          backgroundColor: "#fafafa",
          borderRadius: 3,
          p: 3,
          boxShadow: "inset 0 0 6px rgba(0,0,0,0.05)",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Деталі матеріалів:
        </Typography>
        {enrichedMaterials.map((m) => (
          <Box
            key={m.materialId}
            sx={{
              mb: 2,
              p: 2,
              border: "1px solid #ddd",
              borderRadius: 2,
              backgroundColor: "#fff",
            }}
          >
            <Typography sx={{ fontWeight: 600 }}>{m.name}</Typography>

            {m.photoUrl && (
              <img
                src={m.photoUrl}
                alt={m.name}
                style={{
                  width: 100,
                  height: 100,
                  objectFit: "cover",
                  borderRadius: 6,
                  marginTop: 10,
                }}
              />
            )}

            <Typography>
              Використано: {m.quantity} {m.usedUnit}
            </Typography>

            <Typography>
              Ціна рулону: {m.purchasePrice} PLN за {m.materialTotalQty}{" "}
              {m.unit}
            </Typography>

            <Typography>
              Ціна за одиницю: {m.pricePerUnit} PLN / {m.unit}
            </Typography>

            <Typography sx={{ fontWeight: 600, color: "#b71c1c" }}>
              Собівартість цього матеріалу: {m.costForThisMaterial} PLN
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Загальна собівартість */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          textAlign: "right",
          color: "#b71c1c",
        }}
      >
        Загальна собівартість: {card.totalCost} PLN
      </Typography>

      {/* Відео */}
      {card.videoUrl && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Відео:
          </Typography>

          <video
            src={card.videoUrl}
            controls
            style={{
              width: "100%",
              borderRadius: 8,
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          />
        </Box>
      )}

      {/* Кнопки */}
      <Box sx={{ display: "flex", gap: 2, mt: 3, justifyContent: "center" }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#7b1fa2",
            "&:hover": { backgroundColor: "#6a1b9a" },
            px: 4,
            py: 1.2,
            fontWeight: 600,
          }}
          onClick={() =>
            navigate(`/admin/products/create-from-handmade/${card._id}`)
          }
        >
          Створити товар
        </Button>
      </Box>
    </Box>
  );
};

export default HandmadeCardPage;
