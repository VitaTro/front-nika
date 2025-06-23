import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import {
  fetchUserAddress,
  updateUserAddress,
} from "../../../../redux/user/userOperations";

const ProfileAddress = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [showDialog, setShowDialog] = useState(false);
  const [savedAddress, setSavedAddress] = useState("");
  const [address, setAddress] = useState({
    postalCode: "",
    city: "",
    street: "",
    houseNumber: "",
    apartmentNumber: "",
    isPrivateHouse: false,
  });

  useEffect(() => {
    dispatch(fetchUserAddress()).then((res) => {
      if (res.payload) {
        const safeAddress = {
          postalCode: res.payload?.postalCode || "",
          city: res.payload?.city || "",
          street: res.payload?.street || "",
          houseNumber: res.payload?.houseNumber || "",
          apartmentNumber: res.payload?.apartmentNumber || "",
          isPrivateHouse: res.payload?.isPrivateHouse || false,
        };
        setAddress(safeAddress);
        setSavedAddress(safeAddress);
      }
    });
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserAddress({ address }));
    setShowDialog(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        p: 2,
        backgroundColor: "#f5f5f5",
      }}
    >
      <Paper elevation={3} sx={{ p: 3, width: "100%", maxWidth: 400 }}>
        <Typography variant="h6" gutterBottom>
          🏠 {t("your_address")}
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">
            {t("shipping_address")}
          </Typography>
          <Typography>
            {savedAddress.city
              ? `${savedAddress.street} ${savedAddress.houseNumber}${
                  savedAddress.apartmentNumber
                    ? "/" + savedAddress.apartmentNumber
                    : ""
                }, ${savedAddress.postalCode} ${savedAddress.city}`
              : t("not_specified")}
          </Typography>
        </Box>

        <Button
          variant="contained"
          onClick={() => setShowDialog(true)}
          fullWidth
        >
          ✏️ {t("edit_address")}
        </Button>
      </Paper>

      <Dialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        fullWidth
        maxWidth="sm"
        disableEnforceFocus
      >
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <DialogContent dividers sx={{ maxHeight: "70vh", overflowY: "auto" }}>
            <Typography>
              {`${savedAddress.street} ${savedAddress.houseNumber}${
                savedAddress.apartmentNumber
                  ? "/" + savedAddress.apartmentNumber
                  : ""
              }, ${savedAddress.postalCode} ${savedAddress.city}`}
            </Typography>

            <Typography variant="h6" align="center" gutterBottom sx={{ mb: 3 }}>
              {t("edit_address")}
            </Typography>
            <TextField
              name="postalCode"
              label={t("postal_code")}
              fullWidth
              value={address.postalCode}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />

            <TextField
              name="city"
              label={t("city")}
              fullWidth
              value={address.city}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />

            <TextField
              name="street"
              label={t("street")}
              fullWidth
              value={address.street}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />

            <TextField
              name="houseNumber"
              label={t("house_number")}
              fullWidth
              value={address.houseNumber}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />

            <TextField
              name="apartmentNumber"
              label={t("apartment_number")}
              fullWidth
              value={address.apartmentNumber}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  name="isPrivateHouse"
                  checked={address.isPrivateHouse}
                  onChange={handleChange}
                />
              }
              label={t("private_house")}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowDialog(false)} variant="outlined">
              {t("cancel")}
            </Button>
            <Button type="submit" variant="contained">
              {t("save_changes")}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default ProfileAddress;
