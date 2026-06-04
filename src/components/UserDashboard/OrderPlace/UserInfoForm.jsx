import { Box, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getPaymentMethods } from "../../../redux/payment/operationPayment";
import { selectPaymentMethods } from "../../../redux/payment/selectorPayment";

const UserInfoForm = ({ formData, setFormData }) => {
  const paymentMethods = useSelector(selectPaymentMethods);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    dispatch(getPaymentMethods());
  }, [dispatch]);

  return (
    <div>
      {/* First name */}
      <Box style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography
          variant="h6"
          style={{ color: isDarkMode ? "#060270" : "#1f871a" }}
        >
          {t("first_name")}
        </Typography>
        <TextField
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
          fullWidth
        />

        {/* Last name */}

        <Typography
          variant="h6"
          style={{ color: isDarkMode ? "#060270" : "#1f871a" }}
        >
          {t("last_name")}
        </Typography>
        <TextField
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          variant="outlined"
          required
          fullWidth
        />

        {/* Phone */}

        <Typography
          variant="h6"
          style={{ color: isDarkMode ? "#060270" : "#1f871a" }}
        >
          {t("phone")}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #ddd",
              borderRadius: "6px",
              px: 1.5,
              height: 56,
              backgroundColor: isDarkMode ? "#ffffff10" : "#fff",
            }}
          >
            <Typography sx={{ fontSize: 14 }}> +48</Typography>
          </Box>
          <TextField
            type="tel"
            name="phone"
            placeholder="123 456 789"
            value={formData.phone}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                phone: e.target.value.replace(/\D/g, ""),
              }))
            }
            variant="outlined"
            fullWidth
            required
          />
        </Box>
      </Box>
    </div>
  );
};

export default UserInfoForm;
