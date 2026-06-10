import {
  Button,
  FormControlLabel,
  MenuItem,
  Switch,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../../../../redux/products/operationProducts";

const claspOptions = [
  "stud",
  "english",
  "round",
  "hoop",
  "hook",
  "spring",
  "carabiner",
  "box",
];

const AddProductForm = () => {
  const dispatch = useDispatch();
  const handleAddProduct = (e, newProduct) => {
    e.preventDefault();

    const rate = newProduct.purchasePrice.exchangeRateToPLN;
    const payload = {
      ...newProduct,
      price: Number(newProduct.price),
      purchasePrice: {
        value: Number(
          newProduct.purchasePrice.value.toString().replace(",", "."),
        ),
        currency: newProduct.purchasePrice.currency,
        exchangeRateToPLN:
          newProduct.purchasePrice.currency !== "PLN"
            ? Number(rate.toString().replace(",", "."))
            : null,
      },
    };

    dispatch(addProduct(payload));
  };
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    subcategory: "",
    price: "",
    purchasePrice: {
      value: "",
      currency: "USD",
      exchangeRateToPLN: "",
    },
    description: "",
    photoUrl: "",
    additionalPhotos: [],
    size: "",
    width: "",
    length: "",
    color: "",
    quantity: 0,
    index: "",
    clasp: "",
    material: "",
    materials: "",
    hasExtension: false,
    extension: "",
    discount: 0,
    popularity: 0,
    visible: true,
  });

  const handleChangeLocal = (e) => {
    const { name, value } = e.target;

    // purchasePrice.*
    if (name.startsWith("purchasePrice.")) {
      const key = name.split(".")[1];
      setNewProduct((prev) => ({
        ...prev,
        purchasePrice: {
          ...prev.purchasePrice,
          [key]: value,
        },
      }));
      return;
    }

    // additionalPhotos
    if (name === "additionalPhotos") {
      setNewProduct((prev) => ({
        ...prev,
        additionalPhotos: value
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s.length > 0),
      }));
      return;
    }

    // hasExtension
    if (name === "hasExtension") {
      setNewProduct((prev) => ({
        ...prev,
        hasExtension: value,
        extension: value ? prev.extension : "",
      }));
      return;
    }

    // default
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form
      onSubmit={(e) => handleAddProduct(e, newProduct)}
      style={{ marginBottom: "20px" }}
    >
      <TextField
        name="name"
        label="Назва"
        value={newProduct.name}
        onChange={handleChangeLocal}
        fullWidth
        margin="normal"
        required
      />

      <TextField
        name="category"
        label="Категорія"
        value={newProduct.category}
        onChange={handleChangeLocal}
        fullWidth
        margin="normal"
        required
      />

      <TextField
        name="subcategory"
        label="Підкатегорія"
        value={newProduct.subcategory}
        onChange={handleChangeLocal}
        fullWidth
        margin="normal"
        required
      />

      <TextField
        name="price"
        label="Ціна (роздріб)"
        value={newProduct.price}
        onChange={handleChangeLocal}
        fullWidth
        margin="normal"
        type="number"
      />

      {/* PURCHASE PRICE */}
      <TextField
        name="purchasePrice.value"
        label="Ціна закупки"
        value={newProduct.purchasePrice.value}
        onChange={handleChangeLocal}
        fullWidth
        margin="normal"
        type="number"
      />

      <TextField
        name="purchasePrice.currency"
        label="Валюта"
        value={newProduct.purchasePrice.currency}
        onChange={handleChangeLocal}
        fullWidth
        margin="normal"
        select
      >
        <MenuItem value="PLN">PLN</MenuItem>
        <MenuItem value="USD">USD</MenuItem>
        <MenuItem value="EUR">EUR</MenuItem>
      </TextField>

      {newProduct.purchasePrice.currency !== "PLN" && (
        <TextField
          name="purchasePrice.exchangeRateToPLN"
          label="Курс до PLN"
          value={newProduct.purchasePrice.exchangeRateToPLN}
          onChange={handleChangeLocal}
          fullWidth
          margin="normal"
          type="number"
        />
      )}

      <TextField
        name="description"
        label="Опис"
        value={newProduct.description}
        onChange={handleChangeLocal}
        fullWidth
        margin="normal"
        required
      />

      <TextField
        name="photoUrl"
        label="Головне фото"
        value={newProduct.photoUrl}
        onChange={handleChangeLocal}
        fullWidth
        margin="normal"
        required
      />

      <TextField
        name="additionalPhotos"
        label="Додаткові фото (через кому)"
        value={newProduct.additionalPhotos.join(", ")}
        onChange={handleChangeLocal}
        fullWidth
        margin="normal"
      />

      <TextField
        name="size"
        label="Розмір"
        value={newProduct.size}
        onChange={handleChangeLocal}
        fullWidth
        margin="normal"
        required
      />

      <TextField
        name="width"
        label="Ширина (мм)"
        value={newProduct.width}
        onChange={handleChangeLocal}
        fullWidth
        margin="normal"
        type="number"
      />

      <TextField
        name="length"
        label="Довжина (см)"
        value={newProduct.length}
        onChange={handleChangeLocal}
        fullWidth
        margin="normal"
        type="number"
      />

      <TextField
        name="color"
        label="Колір"
        value={newProduct.color}
        onChange={handleChangeLocal}
        fullWidth
        margin="normal"
      />

      <TextField
        name="quantity"
        label="Кількість"
        value={newProduct.quantity}
        onChange={handleChangeLocal}
        fullWidth
        margin="normal"
        type="number"
      />

      <TextField
        name="index"
        label="Індекс"
        value={newProduct.index}
        onChange={handleChangeLocal}
        fullWidth
        margin="normal"
        required
      />

      <TextField
        name="clasp"
        label="Застібка"
        value={newProduct.clasp}
        onChange={handleChangeLocal}
        fullWidth
        margin="normal"
        select
      >
        {claspOptions.map((c) => (
          <MenuItem key={c} value={c}>
            {c}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        name="material"
        label="Матеріал"
        value={newProduct.material}
        onChange={handleChangeLocal}
        fullWidth
        margin="normal"
      />

      <TextField
        name="materials"
        label="Склад виробу"
        value={newProduct.materials}
        onChange={handleChangeLocal}
        fullWidth
        margin="normal"
      />

      <FormControlLabel
        control={
          <Switch
            checked={newProduct.hasExtension}
            onChange={(e) =>
              handleChangeLocal({
                target: { name: "hasExtension", value: e.target.checked },
              })
            }
          />
        }
        label="Є подовжувач"
      />

      {newProduct.hasExtension && (
        <TextField
          name="extension"
          label="Довжина подовжувача"
          value={newProduct.extension}
          onChange={handleChangeLocal}
          fullWidth
          margin="normal"
        />
      )}

      <TextField
        name="discount"
        label="Знижка (%)"
        value={newProduct.discount}
        onChange={handleChangeLocal}
        fullWidth
        margin="normal"
        type="number"
      />

      <TextField
        name="popularity"
        label="Популярність"
        value={newProduct.popularity}
        onChange={handleChangeLocal}
        fullWidth
        margin="normal"
        type="number"
      />

      <Button type="submit" variant="contained" color="primary">
        Додати товар
      </Button>
    </form>
  );
};

export default AddProductForm;
