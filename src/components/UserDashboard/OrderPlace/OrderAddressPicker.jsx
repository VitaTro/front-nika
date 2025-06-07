import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import pointsData1 from "../../../data/points.json";
import pointsData10 from "../../../data/points10.json";
import pointsData11 from "../../../data/points11.json";
import pointsData12 from "../../../data/points12.json";
import pointsData13 from "../../../data/points13.json";
import pointsData14 from "../../../data/points14.json";
import pointsData15 from "../../../data/points15.json";
import pointsData16 from "../../../data/points16.json";
import pointsData17 from "../../../data/points17.json";
import pointsData18 from "../../../data/points18.json";
import pointsData19 from "../../../data/points19.json";
import pointsData2 from "../../../data/points2.json";
import pointsData20 from "../../../data/points20.json";
import pointsData21 from "../../../data/points21.json";
import pointsData22 from "../../../data/points22.json";
import pointsData23 from "../../../data/points23.json";
import pointsData24 from "../../../data/points24.json";
import pointsData25 from "../../../data/points25.json";
import pointsData26 from "../../../data/points26.json";
import pointsData27 from "../../../data/points27.json";
import pointsData28 from "../../../data/points28.json";
import pointsData29 from "../../../data/points29.json";
import pointsData3 from "../../../data/points3.json";
import pointsData30 from "../../../data/points30.json";
import pointsData31 from "../../../data/points31.json";
import pointsData32 from "../../../data/points32.json";
import pointsData33 from "../../../data/points33.json";
import pointsData4 from "../../../data/points4.json";
import pointsData5 from "../../../data/points5.json";
import pointsData6 from "../../../data/points6.json";
import pointsData7 from "../../../data/points7.json";
import pointsData8 from "../../../data/points8.json";
import pointsData9 from "../../../data/points9.json";
import { useSelector } from "react-redux";
import {
  CheckboxStyled,
  FormContainerAddress,
  HeaderOrderAddress,
  InputField,
  SelectField,
} from "./OrderPlace.styled";

const regions = [
  "Dolnośląskie",
  "Kujawsko-Pomorskie",
  "Lubelskie",
  "Lubuskie",
  "Łódzkie",
  "Małopolskie",
  "Mazowieckie",
  "Opolskie",
  "Podkarpackie",
  "Podlaskie",
  "Pomorskie",
  "Śląskie",
  "Świętokrzyskie",
  "Warmińsko-Mazurskie",
  "Wielkopolskie",
  "Zachodniopomorskie",
];

const fetchPickupPointsLocally = (city) => {
  if (!city || city.length < 3) {
    return []; 
  }

  const allPoints = [
    ...pointsData1.items, ...pointsData2.items, ...pointsData3.items,
    ...pointsData4.items, ...pointsData5.items, ...pointsData6.items,
    ...pointsData7.items, ...pointsData8.items, ...pointsData9.items,
    ...pointsData10.items, ...pointsData11.items, ...pointsData12.items,
    ...pointsData13.items, ...pointsData14.items, ...pointsData15.items,
    ...pointsData16.items, ...pointsData17.items, ...pointsData18.items,
    ...pointsData19.items, ...pointsData20.items, ...pointsData21.items,
    ...pointsData22.items, ...pointsData23.items, ...pointsData24.items,
    ...pointsData25.items, ...pointsData26.items, ...pointsData27.items,
    ...pointsData28.items, ...pointsData29.items, ...pointsData30.items,
    ...pointsData31.items, ...pointsData32.items, ...pointsData33.items,
  ];

  return allPoints.filter((point) => 
    point.address_details.city?.toLowerCase().startsWith(city.toLowerCase())
    && point.type.includes("parcel_locker")
    && point.status === "Operating"
  );
};

const OrderAddressPicker = ({ formData, setFormData }) => {
    const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const { t } = useTranslation();
  const [pickupPoints, setPickupPoints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!formData.city || formData.city.length < 3) return;

    const fetchData = async () => {
      setLoading(true);

      try {
        const points = fetchPickupPointsLocally(formData.city);
        setPickupPoints(points);
        setError(points.length === 0 ? "🚫 Немає доступних поштоматів у цьому місті." : "");
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
      <div>
        <label style={{ color: isDarkMode ? "#060270" : "#1f871a" }}>{t("region")}</label>
        <SelectField
          name="region"
          value={formData.region}
          onChange={handleChange}
          required
        >
          <option value="">-- {t("select_region")} --</option>
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </SelectField>
      </div>
     <FormContainerAddress>
        <div>
           <label style={{ color: isDarkMode ? "#060270" : "#1f871a" }}>{t("city")}</label>
          <InputField
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        <div>
           <label style={{ color: isDarkMode ?" #060270" : "#1f871a" }}>{t("street")}</label>
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
          <label style={{ color: isDarkMode ? "#060270" : "#1f871a" }}>{t("postal_code")}</label>
          <InputField
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            required
          />
        </div>
        <div>
           <label style={{ color: isDarkMode ? "#060270" : "#1f871a" }}>{t("house_number")}</label>
          <InputField
            name="houseNumber"
            value={formData.houseNumber}
            onChange={handleChange}
            required
          />
        </div>
      <label style={{ display: "flex", alignItems: "center", gap: "10px", color: isDarkMode ? "#060270" : "#1f871a" }}>


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
            <label style={{ color: isDarkMode ?" #060270" : "#1f871a" }}>{t("apartment_number")}</label>
            <InputField
              name="apartmentNumber"
              value={formData.apartmentNumber}
              onChange={handleChange}
            />
          </div>
        )}
      </FormContainerAddress>
      <label style={{ color: isDarkMode ? "#060270" : "#1f871a" }}>{t("parcel_locker")}</label>
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