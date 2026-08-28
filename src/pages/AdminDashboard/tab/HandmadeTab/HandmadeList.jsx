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

import {
  createProductFromHandmade,
  fetchHandmadeCards,
} from "../../../../redux/handmade/operationsAdminHandmade";

const HandmadeList = () => {
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.adminHandmade.handmadeCards);

  useEffect(() => {
    dispatch(fetchHandmadeCards());
  }, [dispatch]);

  return (
    <Box sx={{ display: "grid", gap: 3 }}>
      {cards.map((card) => (
        <Card key={card._id} sx={{ p: 2 }}>
          {card.photos?.[0] && (
            <CardMedia
              component="img"
              height="140"
              image={card.photos[0]}
              alt={card.name}
              sx={{ borderRadius: 2 }}
            />
          )}

          <CardContent>
            <Typography variant="h6">{card.name}</Typography>

            <Typography sx={{ mt: 1 }}>{card.description}</Typography>

            <Typography sx={{ mt: 2, fontWeight: 600 }}>Матеріали:</Typography>

            {card.materialsUsed.map((m) => (
              <Typography key={m.materialId}>
                • {m.name}: {m.quantity} {m.usedUnit}
              </Typography>
            ))}

            <Typography sx={{ mt: 2 }}>
              Собівартість: <b>{card.totalCost} PLN</b>
            </Typography>

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
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default HandmadeList;
