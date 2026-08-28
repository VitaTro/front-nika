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

import { addHandmadeCard } from "../../../../redux/handmade/operationsAdminHandmade";
import { fetchAdminStockMaterials } from "../../../../redux/materials/operationsAdminStockMaterials";

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
  });

  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [selectedQty, setSelectedQty] = useState("");

  useEffect(() => {
    dispatch(fetchAdminStockMaterials());
  }, [dispatch]);

  const addMaterialToRecipe = () => {
    if (!selectedMaterial || !selectedUnit || !selectedQty) return;

    const material = materials.find((m) => m._id === selectedMaterial);

    setForm((prev) => ({
      ...prev,
      materialsUsed: [
        ...prev.materialsUsed,
        {
          materialId: material._id,
          name: material.name,
          unit: material.unit, // одиниця складу
          usedUnit: selectedUnit, // одиниця використання
          quantity: Number(selectedQty),
          photoUrl: material.photoUrl,
        },
      ],
    }));

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
    dispatch(addHandmadeCard(form));

    setForm({
      name: "",
      description: "",
      photos: [],
      length: "",
      width: "",
      color: "",
      materialsUsed: [],
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
            <MenuItem key={m._id} value={m._id}>
              {m.name} ({m.unit})
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
