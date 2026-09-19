import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

const AddToPromo = ({ product, handleUpdate }) => {
  const [value, setValue] = useState("");

  const applyPromo = () => {
    if (!value || Number(value) <= 0) return;
    handleUpdate(product._id, { promoPrice: Number(value) });
    setValue("");
  };

  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      <TextField
        size="small"
        label="Акційна ціна"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        sx={{ width: 120 }}
      />

      <Button variant="contained" color="success" onClick={applyPromo}>
        Додати в акцію
      </Button>
    </Box>
  );
};

export default AddToPromo;
