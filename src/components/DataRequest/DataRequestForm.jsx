import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "../../redux/axiosConfig";

const DataRequestForm = () => {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    name: "",
    email: "",
    reason: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [open, setOpen] = useState(false);
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/public/data-request-email", form);
      setStatus(t("sent_message"));
      setForm({ name: "", email: "", reason: "", message: "" });
      setTimeout(() => handleClose(), 1000);
    } catch (err) {
      setStatus("❌ Nie udało się wysłać. Spróbuj ponownie.");
    }
  };
  const handleClose = () => {
    setOpen(false);
    setStatus("");
  };
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
    >
      <Typography variant="h6">{t("form_title")}</Typography>

      <TextField
        name="name"
        label={t("name")}
        value={form.name}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        name="email"
        label={t("email")}
        value={form.email}
        onChange={handleChange}
        required
        fullWidth
        type="email"
      />
      <TextField
        name="reason"
        label={t("reason")}
        select
        value={form.reason}
        onChange={handleChange}
        required
        fullWidth
      >
        <MenuItem value={t("reason_access")}>{t("reason_access")}</MenuItem>
        <MenuItem value={t("reason_update")}>{t("reason_update")}</MenuItem>
        <MenuItem value={t("reason_delete")}>{t("reason_delete")}</MenuItem>
        <MenuItem value={t("reason_other")}>{t("reason_other")}</MenuItem>
      </TextField>
      <TextField
        name="message"
        label={t("details")}
        multiline
        rows={5}
        value={form.message}
        onChange={handleChange}
        required
        fullWidth
      />

      <Box display="flex" justifyContent="flex-end" gap={2}>
        <Button type="submit" variant="contained" color="success">
          {t("send")}
        </Button>
      </Box>

      {status && <Typography>{status}</Typography>}
    </Box>
  );
};

export default DataRequestForm;
