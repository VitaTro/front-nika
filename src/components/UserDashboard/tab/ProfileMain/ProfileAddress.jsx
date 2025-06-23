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
        const safe = res.payload;
        setAddress({
          postalCode: safe?.postalCode || "",
          city: safe?.city || "",
          street: safe?.street || "",
          houseNumber: safe?.houseNumber || "",
          apartmentNumber: safe?.apartmentNumber || "",
          isPrivateHouse: safe?.isPrivateHouse || false,
        });
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

  const formatAddress = (addr) => {
    if (!addr?.city) return t("not_specified");
    return `${addr.street} ${addr.houseNumber}${
      addr.apartmentNumber ? "/" + addr.apartmentNumber : ""
    }, ${addr.postalCode} ${addr.city}`;
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
          <Typography>{formatAddress(address)}</Typography>
        </Box>

        <Button
          variant="contained"
          onClick={() => setShowDialog(true)}
          sx={{ mt: 2 }}
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
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <DialogContent
            dividers
            sx={{
              maxHeight: "70vh",
              overflowY: "auto",
            }}
          >
            <Typography variant="h6" align="center" gutterBottom sx={{ mb: 3 }}>
              {t("edit_address")}
            </Typography>

            <TextField
              fullWidth
              label={t("postal_code")}
              name="postalCode"
              value={address.postalCode}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label={t("city")}
              name="city"
              value={address.city}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label={t("street")}
              name="street"
              value={address.street}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label={t("house_number")}
              name="houseNumber"
              value={address.houseNumber}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label={t("apartment_number")}
              name="apartmentNumber"
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
