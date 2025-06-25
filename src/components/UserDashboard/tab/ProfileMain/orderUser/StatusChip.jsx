import { Chip } from "@mui/material";
import { useTranslation } from "react-i18next";

const statusColors = {
  unpaid: "warning",
  processing: "info",
  shipped: "primary",
  completed: "success",
  returned: "default",
  assembled: "success",
  received: "primary",
  cancelled: "error",
};

const StatusChip = ({ status }) => {
  const { t } = useTranslation();

  return (
    <Chip
      label={t(`status.${status}`)}
      color={statusColors[status] || "default"}
      variant="outlined"
      size="big"
    />
  );
};
export default StatusChip;
