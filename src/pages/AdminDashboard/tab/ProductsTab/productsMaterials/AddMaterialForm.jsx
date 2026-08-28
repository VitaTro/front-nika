import { Box, Button, MenuItem, TextField } from "@mui/material";

const categories = [
  { label: "Основи (нитки, льоски)", value: "thread" },
  { label: "Фурнітура (застібки, подовжувачі)", value: "hardware" },
  { label: "Бісер", value: "beads" },
  { label: "Камінці (гранули, перлинки)", value: "stones" },
  { label: "Інше", value: "other" },
];

const units = [
  { label: "Штуки", value: "pcs" },
  { label: "Метри", value: "meters" },
  { label: "Грами", value: "grams" },
];

const currencies = ["PLN", "USD", "EUR"];

const AddMaterialForm = ({ newMaterial, handleChange, handleAddMaterial }) => {
  return (
    <form onSubmit={handleAddMaterial}>
      <TextField
        name="name"
        label="Назва матеріалу"
        value={newMaterial.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />

      <TextField
        name="category"
        label="Категорія"
        value={newMaterial.category}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      >
        {categories.map((c) => (
          <MenuItem key={c.value} value={c.value}>
            {c.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        name="color"
        label="Колір"
        value={newMaterial.color}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <TextField
        name="size"
        label="Розмір / товщина"
        value={newMaterial.size}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <TextField
        name="unit"
        label="Одиниця виміру"
        value={newMaterial.unit}
        onChange={handleChange}
        fullWidth
        margin="normal"
        select
        required
      >
        {units.map((u) => (
          <MenuItem key={u.value} value={u.value}>
            {u.label}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        name="quantity"
        label="Кількість"
        value={newMaterial.quantity}
        onChange={handleChange}
        fullWidth
        margin="normal"
        type="number"
        required
      />
      {newMaterial.unit === "grams" && (
        <TextField
          name="piecesPerGram"
          label="Кількість штук у 1 грамі"
          value={newMaterial.piecesPerGram}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="number"
        />
      )}

      {/* piecesPerMeter */}
      {newMaterial.unit === "meters" && (
        <TextField
          name="piecesPerMeter"
          label="Кількість штук у 1 метрі"
          value={newMaterial.piecesPerMeter}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="number"
        />
      )}

      {/* Purchase price */}
      <TextField
        name="purchasePriceValue"
        label="Ціна закупки (за одиницю)"
        value={newMaterial.purchasePriceValue}
        onChange={handleChange}
        fullWidth
        margin="normal"
        type="number"
      />
      <TextField
        name="purchasePriceCurrency"
        label="Валюта"
        value={newMaterial.purchasePriceCurrency}
        onChange={handleChange}
        fullWidth
        margin="normal"
        select
      >
        {currencies.map((c) => (
          <MenuItem key={c} value={c}>
            {c}
          </MenuItem>
        ))}
      </TextField>

      {newMaterial.purchasePriceCurrency !== "PLN" && (
        <TextField
          name="exchangeRateToPLN"
          label="Курс до PLN"
          value={newMaterial.exchangeRateToPLN}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="number"
        />
      )}
      <TextField
        name="description"
        label="Опис"
        value={newMaterial.description}
        onChange={handleChange}
        fullWidth
        margin="normal"
        multiline
        rows={3}
      />
      <TextField
        name="photoUrl"
        label="Фото URL"
        value={newMaterial.photoUrl}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Box sx={{ mt: 2 }}>
        <Button type="submit" variant="contained" color="primary">
          Додати матеріал
        </Button>
      </Box>
    </form>
  );
};

export default AddMaterialForm;
