import { Box, Button, CardMedia, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";
import { fetchHandmadeCardById } from "../../../../redux/handmade/operationsAdminHandmade";

const CreateProductFromHandmadePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const card = useSelector((state) => state.adminHandmade.singleHandmadeCard);

  const [productData, setProductData] = useState({
    name: "",
    price: "",
    description: "",
    photoUrl: "",
    additionalPhotos: [],
    width: "",
    length: "",
    color: "",
    index: "",
  });

  useEffect(() => {
    dispatch(fetchHandmadeCardById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (card) {
      setProductData({
        name: card.name,
        price: Number(card.totalCost) * 2,
        description: card.description || "",
        photoUrl: card.photos?.[0] || "",
        additionalPhotos: card.photos?.slice(1) || [],
        width: card.width || "",
        length: card.length || "",
        color: card.color || "",
        index: card.name.replace(/\s+/g, "").toLowerCase(),
      });
    }
  }, [card]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateProduct = async () => {
    try {
      const payload = {
        ...productData,

        // 🔥 materials → STRING, не ARRAY
        materials: card.materialsUsed
          .map((m) => `${m.quantity} ${m.usedUnit} ${m.name}`)
          .join(", "),

        // 🔥 purchasePrice → повністю валідний
        purchasePrice: {
          value: card.totalCost,
          currency: "PLN",
          exchangeRateToPLN: null,
        },
      };

      const response = await axios.post(
        `/api/admin/handmade/${id}/create-product`,
        payload,
      );

      const createdProduct = response.data.product;
      navigate("/admin/products");
    } catch (error) {
      console.error("❌ Error creating product:", error);
      alert("Помилка створення товару");
    }
  };

  if (!card) {
    return <Typography sx={{ p: 3 }}>Завантаження...</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 1000, margin: "0 auto", p: 4 }}>
      <Button variant="outlined" onClick={() => navigate(-1)}>
        Назад
      </Button>

      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Створення товару з Handmade: {card.name}
      </Typography>

      <CardMedia
        component="img"
        image={card.photos?.[0]}
        alt={card.name}
        sx={{
          width: "100%",
          height: 350,
          objectFit: "cover",
          borderRadius: 3,
          mb: 3,
        }}
      />

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Використані матеріали:
        </Typography>

        {card.materialsUsed.map((m) => (
          <Box
            key={m.materialId}
            sx={{
              p: 2,
              border: "1px solid #ddd",
              borderRadius: 2,
              mt: 2,
              backgroundColor: "#fff",
            }}
          >
            <Typography sx={{ fontWeight: 600 }}>{m.name}</Typography>
            <Typography>
              Використано: {m.quantity} {m.usedUnit}
            </Typography>
            <Typography>
              Собівартість: {m.costForThisMaterial.toFixed(2)} PLN
            </Typography>
          </Box>
        ))}

        <Typography
          variant="h6"
          sx={{ fontWeight: 700, color: "#b71c1c", mt: 2 }}
        >
          Загальна собівартість: {card.totalCost.toFixed(2)} PLN
        </Typography>
      </Box>

      <Box sx={{ backgroundColor: "#fff", p: 3, borderRadius: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          Дані товару
        </Typography>

        <TextField
          name="name"
          label="Назва"
          value={productData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          name="price"
          label="Ціна (роздріб)"
          value={productData.price}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="number"
        />

        <TextField
          name="description"
          label="Опис"
          value={productData.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
        />

        <TextField
          name="photoUrl"
          label="Головне фото"
          value={productData.photoUrl}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          name="index"
          label="Індекс"
          value={productData.index}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          name="color"
          label="Колір"
          value={productData.color}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          name="width"
          label="Ширина (мм)"
          value={productData.width}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="number"
        />

        <TextField
          name="length"
          label="Довжина (см)"
          value={productData.length}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="number"
        />

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#7b1fa2",
            "&:hover": { backgroundColor: "#6a1b9a" },
            px: 4,
            py: 1.2,
            fontWeight: 600,
            mt: 3,
          }}
          onClick={handleCreateProduct}
        >
          Створити товар
        </Button>
      </Box>
    </Box>
  );
};

export default CreateProductFromHandmadePage;
