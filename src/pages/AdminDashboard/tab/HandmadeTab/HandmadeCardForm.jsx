import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminMaterials } from "../../../../redux/admin/operationsAdmin";
import { addHandmadeCard } from "../../../../redux/handmade/operationsAdminHandmade";

const units = [
  { label: "Штуки", value: "pcs" },
  { label: "Метри", value: "meters" },
  { label: "Грами", value: "grams" },
];

const HandmadeCardForm = () => {
  const dispatch = useDispatch();
  const materials = useSelector((state) => state.admin.materials);

  const [form, setForm] = useState({
    name: "",
    description: "",
    photos: [],
    length: "",
    width: "",
    color: "",
    materialsUsed: [],
    videoUrl: "",
    subcategory: "",
  });

  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [selectedQty, setSelectedQty] = useState("");

  useEffect(() => {
    dispatch(fetchAdminMaterials());
  }, [dispatch]);

  const addMaterialToRecipe = () => {
    if (!selectedMaterial || !selectedUnit || !selectedQty) return;

    // ✔ Правильне порівняння _id
    const material = materials.find(
      (m) => String(m._id) === String(selectedMaterial),
    );

    if (!material) {
      console.error("❌ Material not found in form:", selectedMaterial);
      return;
    }

    setForm((prev) => ({
      ...prev,
      materialsUsed: [
        ...prev.materialsUsed,
        {
          materialId: material._id, // ✔ тепер завжди правильний
          name: material.name,
          unit: material.unit, // одиниця складу
          usedUnit: selectedUnit, // одиниця використання
          quantity: Number(selectedQty),
          photoUrl: material.photoUrl,
        },
      ],
    }));

    // ✔ очищення полів
    setSelectedMaterial("");
    setSelectedUnit("");
    setSelectedQty("");
  };

  const removeMaterial = (id) => {
    setForm((prev) => ({
      ...prev,
      materialsUsed: prev.materialsUsed.filter((m) => m.materialId !== id),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("PAYLOAD:", form);

    dispatch(addHandmadeCard(form));

    // ✔ очищення форми після відправки
    setForm({
      name: "",
      description: "",
      photos: [],
      length: "",
      width: "",
      color: "",
      materialsUsed: [],
      videoUrl: "",
      subcategory: "",
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600 }}>
      <TextField
        label="Назва виробу"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Підкатегорія"
        value={form.subcategory}
        onChange={(e) => setForm({ ...form, subcategory: e.target.value })}
        fullWidth
        margin="normal"
        select
        required
      >
        <MenuItem value="macrame">Макраме</MenuItem>
        <MenuItem value="beads">Бісер</MenuItem>
        <MenuItem value="pearls">Перлини</MenuItem>
        <MenuItem value="thread-weaving">Плетіння нитками</MenuItem>
        <MenuItem value="mixed">Мікс</MenuItem>
        <MenuItem value="wire">Дріт</MenuItem>
      </TextField>
      <TextField
        label="Фото (URL)"
        value={form.photos[0] || ""}
        onChange={(e) => setForm({ ...form, photos: [e.target.value] })}
        fullWidth
        margin="normal"
        placeholder="https://nika-gold-cdn.net/handmade/20%2000011_1.jpg"
      />

      <TextField
        label="Опис"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        fullWidth
        margin="normal"
        multiline
        rows={3}
      />

      <TextField
        label="Довжина (см)"
        value={form.length}
        onChange={(e) => setForm({ ...form, length: e.target.value })}
        fullWidth
        margin="normal"
        type="number"
      />

      <TextField
        label="Ширина (мм)"
        value={form.width}
        onChange={(e) => setForm({ ...form, width: e.target.value })}
        fullWidth
        margin="normal"
        type="number"
      />

      <TextField
        label="Колір"
        value={form.color}
        onChange={(e) => setForm({ ...form, color: e.target.value })}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Відео (URL)"
        value={form.videoUrl}
        onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
        fullWidth
        margin="normal"
        placeholder="https://yourzone.b-cdn.net/video.mp4"
      />

      {/* Додавання матеріалів */}
      <Box sx={{ mt: 3, mb: 2 }}>
        <Typography variant="h6">Матеріали</Typography>

        <TextField
          label="Матеріал"
          value={selectedMaterial}
          onChange={(e) => setSelectedMaterial(e.target.value)}
          fullWidth
          margin="normal"
          select
        >
          {materials.map((m) => (
            <MenuItem key={m._id} value={String(m._id)}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {m.photoUrl && (
                  <img
                    src={m.photoUrl}
                    alt={m.name}
                    style={{ width: 30, height: 30, borderRadius: 4 }}
                  />
                )}
                <Typography>
                  {m.name} ({m.unit})
                </Typography>
              </Box>
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Одиниця використання"
          value={selectedUnit}
          onChange={(e) => setSelectedUnit(e.target.value)}
          fullWidth
          margin="normal"
          select
        >
          {units.map((u) => (
            <MenuItem key={u.value} value={u.value}>
              {u.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Кількість"
          value={selectedQty}
          onChange={(e) => setSelectedQty(e.target.value)}
          fullWidth
          margin="normal"
          type="number"
        />

        <Button
          variant="contained"
          color="secondary"
          sx={{ mt: 1 }}
          onClick={addMaterialToRecipe}
        >
          Додати матеріал
        </Button>
      </Box>

      {/* Список доданих матеріалів */}
      <Box sx={{ mt: 2 }}>
        {form.materialsUsed.map((m) => (
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

            <IconButton
              color="error"
              onClick={() => removeMaterial(m.materialId)}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
      </Box>

      <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
        Створити картку
      </Button>
    </Box>
  );
};

export default HandmadeCardForm;
