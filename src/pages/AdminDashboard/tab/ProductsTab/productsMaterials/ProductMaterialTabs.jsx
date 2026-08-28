import { Box, Button, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addAdminMaterial,
  deleteAdminMaterial,
  fetchAdminMaterials,
  updateAdminMaterial,
} from "../../../../../redux/admin/operationsAdmin";

import AddMaterialForm from "./AddMaterialForm";
import FilterPanelMaterials from "./FilterPanelMaterials";
import MaterialsTable from "./MaterialsTable";

const MaterialsTab = () => {
  const dispatch = useDispatch();
  const materials = useSelector((state) => state.admin.materials);
  const isMobile = useMediaQuery("(max-width:600px)");

  const [viewMode, setViewMode] = useState("view");

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterColor, setFilterColor] = useState("");

  const [filteredMaterials, setFilteredMaterials] = useState(materials);

  // New material form state
  const [newMaterial, setNewMaterial] = useState({
    name: "",
    category: "",
    color: "",
    size: "",
    unit: "",
    quantity: "",
    piecesPerGram: "",
    piecesPerMeter: "",
    purchasePriceValue: "",
    purchasePriceCurrency: "PLN",
    exchangeRateToPLN: "",
    description: "",
    photoUrl: "",
  });

  useEffect(() => {
    dispatch(fetchAdminMaterials());
  }, [dispatch]);

  useEffect(() => {
    let results = [...materials];

    if (searchTerm) {
      results = results.filter((m) =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (filterCategory) {
      results = results.filter((m) => m.category === filterCategory);
    }

    if (filterColor) {
      results = results.filter((m) =>
        m.color?.toLowerCase().includes(filterColor.toLowerCase()),
      );
    }

    setFilteredMaterials(results);
  }, [materials, searchTerm, filterCategory, filterColor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMaterial((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddMaterial = (e) => {
    e.preventDefault();

    const payload = {
      name: newMaterial.name,
      category: newMaterial.category,
      color: newMaterial.color,
      size: newMaterial.size,
      unit: newMaterial.unit,
      quantity: Number(newMaterial.quantity),
      piecesPerGram:
        newMaterial.unit === "grams" ? Number(newMaterial.piecesPerGram) : null,
      piecesPerMeter:
        newMaterial.unit === "meters"
          ? Number(newMaterial.piecesPerMeter)
          : null,
      purchasePrice: {
        value: Number(newMaterial.purchasePriceValue),
        currency: newMaterial.purchasePriceCurrency,
        exchangeRateToPLN:
          newMaterial.purchasePriceCurrency !== "PLN"
            ? Number(newMaterial.exchangeRateToPLN)
            : null,
      },
      description: newMaterial.description,
      photoUrl: newMaterial.photoUrl,
    };

    dispatch(addAdminMaterial(payload));

    setNewMaterial({
      name: "",
      category: "",
      color: "",
      size: "",
      unit: "",
      quantity: "",
      piecesPerGram: "",
      piecesPerMeter: "",
      purchasePriceValue: "",
      purchasePriceCurrency: "PLN",
      exchangeRateToPLN: "",
      description: "",
      photoUrl: "",
    });
  };

  return (
    <Box sx={{ padding: isMobile ? 1 : 3 }}>
      {/* Buttons */}
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: 2,
          marginBottom: 3,
        }}
      >
        <Button
          variant={viewMode === "view" ? "contained" : "outlined"}
          color="primary"
          onClick={() => setViewMode("view")}
        >
          Переглянути матеріали
        </Button>

        <Button
          variant={viewMode === "add" ? "contained" : "outlined"}
          color="secondary"
          onClick={() => setViewMode("add")}
        >
          Додати матеріал
        </Button>
      </Box>

      {/* Add form */}
      {viewMode === "add" && (
        <AddMaterialForm
          newMaterial={newMaterial}
          handleChange={handleChange}
          handleAddMaterial={handleAddMaterial}
        />
      )}

      {/* View mode */}
      {viewMode === "view" && (
        <>
          <FilterPanelMaterials
            searchTerm={searchTerm}
            filterCategory={filterCategory}
            filterColor={filterColor}
            handleSearchChange={(e) => setSearchTerm(e.target.value)}
            handleCategoryChange={(e) => setFilterCategory(e.target.value)}
            handleColorChange={(e) => setFilterColor(e.target.value)}
          />

          <MaterialsTable
            filteredMaterials={filteredMaterials}
            handleUpdate={(id, data) =>
              dispatch(updateAdminMaterial({ id, updatedData: data }))
            }
            handleDelete={(id) => dispatch(deleteAdminMaterial(id))}
            isMobile={isMobile}
          />
        </>
      )}
    </Box>
  );
};

export default MaterialsTab;
