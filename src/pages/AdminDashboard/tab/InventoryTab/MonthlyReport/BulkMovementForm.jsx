import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetBulkStatus } from "../../../../../redux/inventory/bulkUpload/bulkUploadSlice";
import { uploadBulkMovements } from "../../../../../redux/inventory/bulkUpload/operationsBulkUpload";
import {
  selectBulkUploadError,
  selectBulkUploadLoading,
  selectBulkUploadSuccess,
} from "../../../../../redux/inventory/bulkUpload/selectorsBulkUpload";
const BulkMovementForm = () => {
  const dispatch = useDispatch();
  const [jsonData, setJsonData] = useState("");
  const loading = useSelector(selectBulkUploadLoading);
  const error = useSelector(selectBulkUploadError);
  const success = useSelector(selectBulkUploadSuccess);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const parsed = JSON.parse(jsonData);
      console.log("📤 Parsed JSON data:", parsed);
      dispatch(uploadBulkMovements(parsed)); // ← додай!
    } catch (err) {
      console.error("❌ Невірний JSON", err);
    }
  };

  useEffect(() => {
    console.log("🧹 cleanup — resetBulkStatus()");
    return () => {
      dispatch(resetBulkStatus());
    };
  }, [dispatch]);
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Масове додавання рухів на складі
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Встав JSON"
          multiline
          rows={10}
          fullWidth
          value={jsonData}
          onChange={(e) => setJsonData(e.target.value)}
          disabled={loading}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? "Відправка..." : "Відправити"}
        </Button>
      </form>
      {success && (
        <Alert severity="success" sx={{ mt: 2 }}>
          {success}
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default BulkMovementForm;
