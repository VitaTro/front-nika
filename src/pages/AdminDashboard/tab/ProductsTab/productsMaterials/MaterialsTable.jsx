import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import {
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useState } from "react";

const MaterialsTable = ({ filteredMaterials, handleUpdate, handleDelete }) => {
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  const startEdit = (material) => {
    setEditId(material._id);
    setEditData(material);
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const saveEdit = () => {
    handleUpdate(editId, editData);
    setEditId(null);
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Фото</TableCell>
          <TableCell>Назва</TableCell>
          <TableCell>Категорія</TableCell>
          <TableCell>Од. виміру</TableCell>
          <TableCell>Колір</TableCell>
          <TableCell>Розмір</TableCell>
          <TableCell>Залишок</TableCell>
          <TableCell>Закупка</TableCell>
          <TableCell>Конверсія</TableCell>
          <TableCell>Дії</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {filteredMaterials.map((m) => (
          <TableRow key={m._id}>
            {/* Фото */}
            <TableCell>
              {m.photoUrl ? (
                <img
                  src={m.photoUrl}
                  alt={m.name}
                  style={{ width: 50, height: 50, borderRadius: 4 }}
                />
              ) : (
                "-"
              )}
            </TableCell>

            {/* Назва */}
            <TableCell>
              {editId === m._id ? (
                <TextField
                  name="name"
                  value={editData.name}
                  onChange={handleChange}
                />
              ) : (
                m.name
              )}
            </TableCell>

            {/* Категорія */}
            <TableCell>
              {editId === m._id ? (
                <TextField
                  name="category"
                  value={editData.category}
                  onChange={handleChange}
                />
              ) : (
                m.category
              )}
            </TableCell>

            {/* Одиниця виміру */}
            <TableCell>
              {editId === m._id ? (
                <TextField
                  name="unit"
                  value={editData.unit}
                  onChange={handleChange}
                />
              ) : (
                m.unit
              )}
            </TableCell>

            {/* Колір */}
            <TableCell>
              {editId === m._id ? (
                <TextField
                  name="color"
                  value={editData.color}
                  onChange={handleChange}
                />
              ) : (
                m.color || "-"
              )}
            </TableCell>

            {/* Розмір */}
            <TableCell>
              {editId === m._id ? (
                <TextField
                  name="size"
                  value={editData.size}
                  onChange={handleChange}
                />
              ) : (
                m.size || "-"
              )}
            </TableCell>

            {/* Залишок */}
            <TableCell>
              {editId === m._id ? (
                <TextField
                  name="quantity"
                  value={editData.quantity}
                  onChange={handleChange}
                  type="number"
                />
              ) : (
                `${m.quantity} ${m.unit}`
              )}
            </TableCell>

            {/* Закупка */}
            <TableCell>
              {m.purchasePrice?.value
                ? `${m.purchasePrice.value} ${m.purchasePrice.currency}`
                : "-"}
            </TableCell>

            {/* Конверсія */}
            <TableCell>
              {m.piecesPerGram
                ? `${m.piecesPerGram} шт/г`
                : m.piecesPerMeter
                  ? `${m.piecesPerMeter} шт/м`
                  : "-"}
            </TableCell>

            {/* Дії */}
            <TableCell>
              {editId === m._id ? (
                <Button
                  onClick={saveEdit}
                  startIcon={<SaveIcon />}
                  color="success"
                >
                  Зберегти
                </Button>
              ) : (
                <Button onClick={() => startEdit(m)} color="primary">
                  Редагувати
                </Button>
              )}

              <IconButton onClick={() => handleDelete(m._id)} color="error">
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MaterialsTable;
