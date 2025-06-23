import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { updateUserInfo } from "../../../../redux/user/userOperations";
import { selectUser } from "../../../../redux/user/userSelectors";

const ProfileMain = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [showDialog, setShowDialog] = useState(false);
  const user = useSelector(selectUser);
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (user) {
      const filled = {
        username: user.username || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
      };
      const isEqual = Object.entries(filled).every(
        ([key, value]) => formData[key] === value
      );
      if (!isEqual) {
        setFormData(filled);
        const savedOrderForm = JSON.parse(
          localStorage.getItem("orderForm") || "{}"
        );
        const merged = { ...savedOrderForm, ...filled };
        localStorage.setItem("orderForm", JSON.stringify(merged));
      }
    }
  }, [user, formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserInfo(formData));
    alert("✅ Дані оновлено успішно!");
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
          👤 {t("basic_information")}
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Username
          </Typography>
          <Typography>{user.username}</Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">
            {t("first_name")}
          </Typography>
          <Typography>{user.firstName}</Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">
            {t("last_name")}
          </Typography>
          <Typography>{user.lastName}</Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Email
          </Typography>
          <Typography>{user.email}</Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">
            {t("phone")}
          </Typography>
          <Typography>{user.phone}</Typography>
        </Box>

        <Button
          variant="contained"
          onClick={() => setShowDialog(true)}
          sx={{ mt: 2 }}
          fullWidth
        >
          ✏️ {t("edit_data")}
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
          {/* <DialogTitle>{t("edit_profile")}</DialogTitle> */}
          <DialogContent
            dividers
            sx={{
              maxHeight: "70vh",
              overflowY: "auto",
            }}
          >
            <Typography variant="h6" align="center" gutterBottom sx={{ mb: 3 }}>
              {t("edit_profile")}
            </Typography>
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label={t("first_name")}
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label={t("last_name")}
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label={t("phone")}
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              sx={{ mb: 2 }}
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

export default ProfileMain;
