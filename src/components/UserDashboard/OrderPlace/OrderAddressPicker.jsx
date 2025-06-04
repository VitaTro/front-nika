import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import pointsData1 from "../../../data/points.json";
import pointsData10 from "../../../data/points10.json";
import pointsData2 from "../../../data/points2.json";
import pointsData3 from "../../../data/points3.json";
import pointsData4 from "../../../data/points4.json";
import pointsData5 from "../../../data/points5.json";
import pointsData6 from "../../../data/points6.json";
import pointsData7 from "../../../data/points7.json";
import pointsData8 from "../../../data/points8.json";
import pointsData9 from "../../../data/points9.json";
import {
  CheckboxStyled,
  FormContainerAddress,
  HeaderOrderAddress,
  InputField,
  SelectField,
} from "./OrderPlace.styled";

const fetchPickupPointsLocally = (city) => {
  const allPoints = [
    ...pointsData1.items,
    ...pointsData2.items,
    ...pointsData3.items,
    ...pointsData4.items,
    ...pointsData5.items,
    ...pointsData6.items,
    ...pointsData7.items,
    ...pointsData8.items,
    ...pointsData9.items,
    ...pointsData10.items,
  ];
  return allPoints.filter(
    (point) =>
      point.address_details.city?.toLowerCase() === city.toLowerCase() &&
      point.type.includes("parcel_locker") &&
      point.status === "Operating"
  );
};

const OrderAddressPicker = ({ formData, setFormData }) => {
  const { t } = useTranslation();
  const [pickupPoints, setPickupPoints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const points = fetchPickupPointsLocally(formData.city); // Використовуємо локальний JSON
        setPickupPoints(points);
      } catch (err) {
        setError("❌ Помилка завантаження поштоматів.");
        console.error("❌ Помилка:", err);
      }

      setLoading(false);
    };

    fetchData();
  }, [formData.city]);

  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      isPrivateHouse: e.target.checked,
      apartmentNumber: "",
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <HeaderOrderAddress>{t("your_address")} </HeaderOrderAddress>
      <FormContainerAddress>
        <div>
          <label>{t("city")}</label>
          <InputField
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>{t("street")}</label>
          <InputField
            name="street"
            value={formData.street}
            onChange={handleChange}
            required
          />
        </div>
      </FormContainerAddress>
      <FormContainerAddress>
        <div>
          <label>{t("postal_code")}</label>
          <InputField
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>{t("house_number")}</label>
          <InputField
            name="houseNumber"
            value={formData.houseNumber}
            onChange={handleChange}
            required
          />
        </div>
        <label style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <CheckboxStyled
            type="checkbox"
            name="isPrivateHouse"
            checked={formData.isPrivateHouse}
            onChange={handleCheckboxChange}
          />
          {t("private_house")}
        </label>
        {!formData.isPrivateHouse && (
          <div>
            <label>{t("apartment_number")}</label>
            <InputField
              name="apartmentNumber"
              value={formData.apartmentNumber}
              onChange={handleChange}
            />
          </div>
        )}
      </FormContainerAddress>
      <label>{t("parcel_locker")}</label>
      {loading ? (
        <p>🔄 Завантаження поштоматів...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <SelectField
          name="pickupPointId"
          value={formData.pickupPointId}
          onChange={handleChange}
          required
        >
          {pickupPoints.map((point) => (
            <option key={point.name} value={point.name}>
              {point.name} - {point.address.line1} {point.address.line2}
            </option>
          ))}
        </SelectField>
      )}
    </div>
  );
};

export default OrderAddressPicker;
