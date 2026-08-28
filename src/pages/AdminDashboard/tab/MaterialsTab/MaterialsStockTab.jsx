import { Alert, Box, Button, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminMaterials } from "../../../../redux/admin/operationsAdmin";
import {
  selectStockMaterials,
  selectStockMaterialsError,
  selectStockMaterialsLoading,
} from "../../../../redux/materials/selectorsAdminStockMaterials";
const MaterialsStockTab = () => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width: 600px)");

  const loading = useSelector(selectStockMaterialsLoading);
  const error = useSelector(selectStockMaterialsError);
  const movements = useSelector(selectStockMaterials);

  const [viewMode, setViewMode] = useState("view");
  const uniqueIndexes = [...new Set(movements.map((m) => m.materialId))];

  useEffect(() => {
    dispatch(fetchAdminMaterials());
  }, [dispatch]);
  const movementTabs = [
    { label: "Переглянути", value: "view", color: "primary" },
    { label: "Додати рух", value: "add", color: "primary" },
    { label: "Масовий імпорт", value: "bulk", color: "secondary" },
    { label: "Аналітика", value: "analytics", color: "secondary" },
  ];

  return (
    <Box sx={{ p: isMobile ? 1 : 3 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: 2,
          mb: 3,
        }}
      >
        {movementTabs.map((tab, index) => (
          <Button
            key={`${tab.value}-${index}`}
            variant={viewMode === tab.value ? "contained" : "outlined"}
            color={tab.color}
            onClick={() => setViewMode(tab.value)}
          >
            {tab.label}
          </Button>
        ))}
      </Box>

      {loading && <Loader />}
      {error && <Alert severity="error">{error}</Alert>}

      {viewMode === "add" && <AddMaterialMovementForm />}
      {viewMode === "bulk" && <MaterialImport />}
      {viewMode === "view" && !loading && <MaterialMovementTable />}
      {viewMode === "analytics" && (
        <MaterialGridWithSummary materialIds={uniqueIndexes} />
      )}
    </Box>
  );
};

export default MaterialsStockTab;
