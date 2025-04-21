import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";

const AddProductForm = ({ onAddProduct }) => {
  const [formData, setFormData] = useState({
    name: "",
    photoUrl: "",
    purchasePrice: "",
    markup: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const salePrice = Number(formData.purchasePrice) + Number(formData.markup);
    onAddProduct({ ...formData, salePrice });
    setFormData({ name: "", photoUrl: "", purchasePrice: "", markup: "" });
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        label="Назва"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Посилання на фото"
        name="photoUrl"
        value={formData.photoUrl}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Ціна закупки"
        name="purchasePrice"
        value={formData.purchasePrice}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Націнка"
        name="markup"
        value={formData.markup}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Додати товар
      </Button>
    </Box>
  );
};

export default AddProductForm;
