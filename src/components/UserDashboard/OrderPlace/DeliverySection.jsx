import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const DeliverySection = ({ formData, setFormData }) => {
  const { t } = useTranslation();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const parcelOptions = [
    { size: "small", price: 16.49 },
    { size: "medium", price: 18.49 },
    { size: "large", price: 20.49 },
  ];

  return (
    <div style={{ marginTop: "25px" }}>
      {/* DELIVERY TYPE */}
      <label style={{ color: isDarkMode ? "#060270" : "#1f871a" }}>
        {t("delivery_method")}
      </label>

      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        <button
          type="button"
          onClick={() =>
            setFormData((prev) => ({
              ...prev,
              deliveryType: "pickup",
              deliveryAddress: null,
            }))
          }
          style={{
            padding: "10px 15px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            background:
              formData.deliveryType === "pickup" ? "#1f871a" : "#f5f5f5",
            color: formData.deliveryType === "pickup" ? "#fff" : "#333",
          }}
        >
          Paczkomat
        </button>

        <button
          type="button"
          onClick={() =>
            setFormData((prev) => ({
              ...prev,
              deliveryType: "courier",
              pickupPointId: "",
            }))
          }
          style={{
            padding: "10px 15px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            background:
              formData.deliveryType === "courier" ? "#1f871a" : "#f5f5f5",
            color: formData.deliveryType === "courier" ? "#fff" : "#333",
          }}
        >
          Kurier InPost
        </button>
      </div>

      {/* PARCEL SIZE */}
      <label
        style={{
          marginTop: "20px",
          display: "block",
          color: isDarkMode ? "#060270" : "#1f871a",
        }}
      >
        {t("parcel_size")}
      </label>

      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        {parcelOptions.map((opt) => (
          <div
            key={opt.size}
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                parcelSize: opt.size,
                deliveryPrice: opt.price,
              }))
            }
            style={{
              padding: "10px 15px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              cursor: "pointer",
              background:
                formData.parcelSize === opt.size ? "#1f871a" : "#f5f5f5",
              color: formData.parcelSize === opt.size ? "#fff" : "#333",
            }}
          >
            {opt.size} — {opt.price} zł
          </div>
        ))}
      </div>

      {/* PICKUP POINT */}
      {formData.deliveryType === "pickup" && (
        <div style={{ marginTop: "20px" }}>
          <label style={{ color: isDarkMode ? "#060270" : "#1f871a" }}>
            {t("parcel_locker")} (np WRO15N)
          </label>

          <InputField
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
        </div>
      )}

      {/* COURIER ADDRESS */}
      {formData.deliveryType === "courier" && (
        <div style={{ marginTop: "20px" }}>
          <label style={{ color: isDarkMode ? "#060270" : "#1f871a" }}>
            {t("your_address")}
          </label>

          <InputField
            placeholder={t("full_name")}
            value={formData.deliveryAddress?.fullName || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                deliveryAddress: {
                  ...prev.deliveryAddress,
                  fullName: e.target.value,
                },
              }))
            }
            required
          />

          <InputField
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

          <InputField
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

          <InputField
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

          <InputField
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
        </div>
      )}
    </div>
  );
};
export default DeliverySection;
