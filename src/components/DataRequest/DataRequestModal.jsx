import { Box, Button, Modal, useTheme } from "@mui/material";
import { useState } from "react";
import DataRequestForm from "./DataRequestForm"; // твоя форма

const DataRequestModal = ({ buttonLabel }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button variant="outlined" color="success" onClick={handleOpen}>
        {buttonLabel || "Złóż wniosek o dane"}
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box
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
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          {/* <Typography variant="h6" mb={2}>
            Wniosek o dostęp / aktualizację / usunięcie danych
          </Typography> */}
          <DataRequestForm />
        </Box>
      </Modal>
    </>
  );
};

export default DataRequestModal;
