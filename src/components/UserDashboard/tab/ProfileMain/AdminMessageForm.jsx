import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "styled-components";
import { sendAdminMessage } from "../../../../redux/user/userOperations";
import { selectUser } from "../../../../redux/user/userSelectors";

const AdminMessageForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const user = useSelector(selectUser);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(sendAdminMessage({ subject, message }));
    if (sendAdminMessage.fulfilled.match(result)) {
      setStatus(t("sent_message"));

      setSubject("");
      setMessage("");
      setTimeout(() => handleClose(), 1000);
    } else {
      setStatus(`❌ ${result.payload}`);
    }
  };

  const handleOPen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setStatus("");
  };
  return (
    <>
      <Button variant="outlined" color="success" onClick={handleOPen}>
        {t("email_admin")}
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: theme?.palette?.background?.paper || "#fff",

            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            width: { xs: "90%", sm: 500 },
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h6" color="text.primary">
            {t("letter_admin")}
          </Typography>
          <TextField
            label={t("subject")}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label={t("message_content")}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            multiline
            rows={5}
            required
            fullWidth
          />

          {status && <Typography>{status}</Typography>}

          <Box display="flex" justifyContent="flex-end" gap={1}>
            <Button onClick={handleClose}>{t("cancel")}</Button>
            <Button type="submit" variant="contained" color="success">
              {t("send")}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default AdminMessageForm;
