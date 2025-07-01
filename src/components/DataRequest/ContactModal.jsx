import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "../../redux/axiosConfig";

const ContactModal = ({ open, handleClose }) => {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/public/contact-email", form);
      setStatus(t("sent_message"));
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => {
        setStatus("");
        handleClose();
      }, 1500);
    } catch (err) {
      setStatus("❌ " + t("send_fail"));
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          p: 4,
          bgcolor: "white",
          maxWidth: 500,
          m: "auto",
          mt: "10%",
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" mb={2}>
          ✉️ {t("contact_admin")}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="name"
            label={t("name")}
            fullWidth
            required
            sx={{ mb: 2 }}
            value={form.name}
            onChange={handleChange}
          />
          <TextField
            name="email"
            label={t("email")}
            fullWidth
            required
            type="email"
            sx={{ mb: 2 }}
            value={form.email}
            onChange={handleChange}
          />
          <TextField
            name="message"
            label={t("message")}
            fullWidth
            multiline
            rows={4}
            required
            sx={{ mb: 2 }}
            value={form.message}
            onChange={handleChange}
          />
          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button variant="contained" type="submit">
              {t("send")}
            </Button>
          </Box>
          {status && (
            <Typography mt={2} color="primary">
              {status}
            </Typography>
          )}
        </form>
      </Box>
    </Modal>
  );
};

export default ContactModal;
