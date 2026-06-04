import { Box, TextField, Typography, useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import Large from "../../../components/icons/large_package.png";
import Medium from "../../../components/icons/medium_package.png";
import Small from "../../../components/icons/small_package.png";

import Home from "../../../components/icons/pickup_home.png";
import Pickup from "../../../components/icons/pickup_pickup.png";

const DeliverySection = ({ formData, setFormData }) => {
  const { t } = useTranslation();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const isMobile = useMediaQuery("(max-width:768px)");

  // Base parcel data with translation keys
  const parcelBase = [
    {
      sizeKey: "parcel_small",
      dimsKey: "parcel_small_dims",
      weightKey: "parcel_weight",
      icon: Small,
      pickupPrice: 16.49,
      courierPrice: 19.49,
    },
    {
      sizeKey: "parcel_medium",
      dimsKey: "parcel_medium_dims",
      weightKey: "parcel_weight",
      icon: Medium,
      pickupPrice: 18.49,
      courierPrice: 20.49,
    },
    {
      sizeKey: "parcel_large",
      dimsKey: "parcel_large_dims",
      weightKey: "parcel_weight",
      icon: Large,
      pickupPrice: 20.49,
      courierPrice: 25.49,
    },
  ];

  // Select correct prices based on delivery type
  const currentParcelOptions = parcelBase.map((p) => ({
    ...p,
    price: formData.deliveryType === "pickup" ? p.pickupPrice : p.courierPrice,
  }));

  return (
    <div style={{ marginTop: "25px" }}>
      {/* DELIVERY TYPE */}
      <Box sx={{ mt: 3 }}>
        <Typography
          variant="h6"
          style={{ color: isDarkMode ? "#060270" : "#1f871a" }}
        >
          {t("delivery_type")}
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          {/* Paczkomat → Paczkomat */}
          <Box
            onClick={() => setFormData({ ...formData, deliveryType: "pickup" })}
            sx={{
              flex: 1,
              border:
                formData.deliveryType === "pickup"
                  ? "2px solid #FFD700"
                  : "1px solid #ddd",
              borderRadius: "8px",
              p: 2,
              cursor: "pointer",
              backgroundColor:
                formData.deliveryType === "pickup" ? "#fffbe6" : "#fff",
              boxShadow:
                formData.deliveryType === "pickup"
                  ? "0 0 6px rgba(255,215,0,0.4)"
                  : "none",
              transition: "0.2s",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                sx={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  border: "2px solid #333",
                  backgroundColor:
                    formData.deliveryType === "pickup" ? "#333" : "transparent",
                }}
              />
              <img src={Pickup} alt={t("delivery_pickup_title")} width={130} />
            </Box>

            <hr style={{ margin: "10px 0", borderColor: "#ddd" }} />

            <Typography fontSize="14px" color="#555">
              {t("delivery_pickup_from")}
            </Typography>
            <Typography fontSize="14px" color="#555">
              {t("delivery_pickup_to")}
            </Typography>
          </Box>

          {/* Paczkomat → Dom lub firma */}
          <Box
            onClick={() =>
              setFormData({ ...formData, deliveryType: "courier" })
            }
            sx={{
              flex: 1,
              border:
                formData.deliveryType === "courier"
                  ? "2px solid #FFD700"
                  : "1px solid #ddd",
              borderRadius: "8px",
              p: 2,
              cursor: "pointer",
              backgroundColor:
                formData.deliveryType === "courier" ? "#fffbe6" : "#fff",
              boxShadow:
                formData.deliveryType === "courier"
                  ? "0 0 6px rgba(255,215,0,0.4)"
                  : "none",
              transition: "0.2s",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                sx={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  border: "2px solid #333",
                  backgroundColor:
                    formData.deliveryType === "courier"
                      ? "#333"
                      : "transparent",
                }}
              />
              <img src={Home} alt={t("delivery_courier_title")} width={130} />
            </Box>

            <hr style={{ margin: "10px 0", borderColor: "#ddd" }} />

            <Typography fontSize="14px" color="#555">
              {t("delivery_courier_from")}
            </Typography>
            <Typography fontSize="14px" color="#555">
              {t("delivery_courier_to")}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* PARCEL SIZE */}
      <Typography
        style={{ color: isDarkMode ? "#060270" : "#1f871a", marginTop: "20px" }}
        variant="h6"
      >
        {t("parcel_size")}
      </Typography>

      <Box sx={{ mt: 2 }}>
        {currentParcelOptions.map((opt) => (
          <Box
            key={opt.sizeKey}
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                parcelSize: opt.sizeKey,
                deliveryPrice: opt.price,
              }))
            }
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              border:
                formData.parcelSize === opt.sizeKey
                  ? "2px solid #FFD700"
                  : "1px solid #ddd",
              borderRadius: "8px",
              p: 2,
              mb: 1.5,
              cursor: "pointer",
              backgroundColor:
                formData.parcelSize === opt.sizeKey ? "#fffbe6" : "#fff",
              boxShadow:
                formData.parcelSize === opt.sizeKey
                  ? "0 0 6px rgba(255,215,0,0.4)"
                  : "none",
              transition: "0.2s",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                sx={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  border: "2px solid #333",
                  backgroundColor:
                    formData.parcelSize === opt.sizeKey
                      ? "#333"
                      : "transparent",
                }}
              />
              <img src={opt.icon} alt={t(opt.sizeKey)} width={50} />
              <Box>
                <Typography fontWeight={600}>{t(opt.sizeKey)}</Typography>
                <Typography fontSize="13px" color="#555">
                  {t(opt.dimsKey)} • {t(opt.weightKey)}
                </Typography>
              </Box>
            </Box>

            <Typography fontWeight={700}>{opt.price} zł</Typography>
          </Box>
        ))}
      </Box>
      <Box sx={{ mt: 1 }}>
        <Typography fontSize="12px" color="#888">
          {t("delivery_cost_info")}
        </Typography>
      </Box>
      {/* PICKUP POINT */}
      {formData.deliveryType === "pickup" && (
        <Box
          sx={{
            mt: 3,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            marginBottom: "30px",
          }}
        >
          <Typography
            variant="h6"
            style={{ color: isDarkMode ? "#060270" : "#1f871a" }}
          >
            {t("parcel_locker")} (np WRO15N)
          </Typography>

          <TextField
            name="pickupPointId"
            value={formData.pickupPointId || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                pickupPointId: e.target.value.toUpperCase(),
              }))
            }
            required
            style={{ marginTop: "5px" }}
          />
        </Box>
      )}

      {/* COURIER ADDRESS */}
      {formData.deliveryType === "courier" && (
        <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography style={{ color: isDarkMode ? "#060270" : "#1f871a" }}>
            {t("your_address")}
          </Typography>

          <TextField
            placeholder={t("street")}
            value={formData.deliveryAddress?.street || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                deliveryAddress: {
                  ...prev.deliveryAddress,
                  street: e.target.value,
                },
              }))
            }
            required
          />

          <TextField
            placeholder={t("house_number")}
            value={formData.deliveryAddress?.houseNumber || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                deliveryAddress: {
                  ...prev.deliveryAddress,
                  houseNumber: e.target.value,
                },
              }))
            }
            required
          />

          <TextField
            placeholder={t("city")}
            value={formData.deliveryAddress?.city || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                deliveryAddress: {
                  ...prev.deliveryAddress,
                  city: e.target.value,
                },
              }))
            }
            required
          />

          <TextField
            placeholder={t("postal_code")}
            value={formData.deliveryAddress?.postalCode || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                deliveryAddress: {
                  ...prev.deliveryAddress,
                  postalCode: e.target.value,
                },
              }))
            }
            required
          />
        </Box>
      )}
    </div>
  );
};

export default DeliverySection;
