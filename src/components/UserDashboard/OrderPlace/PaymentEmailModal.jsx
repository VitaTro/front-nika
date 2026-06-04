import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { Button, Dialog, DialogContent, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const PaymentEmailModal = ({ open, onClose }) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent
        sx={{
          textAlign: "center",
          p: 4,
          maxWidth: 420,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <MailOutlineIcon sx={{ fontSize: 70, color: "#1f871a", mb: 2 }} />

        <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
          {t("payment_email_title")}
        </Typography>

        <Typography sx={{ mb: 3, color: "#555", fontSize: "0.95rem" }}>
          {t("payment_email_text")}
        </Typography>

        <Button
          variant="contained"
          onClick={onClose}
          sx={{
            backgroundColor: "#1f871a",
            "&:hover": { backgroundColor: "#166c14" },
            px: 4,
          }}
        >
          OK
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentEmailModal;
