import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { FILTER_CONFIG } from "../FILTER_CONFIG";
import { Label, Select } from "./CategoryFilter.styled";

const CategoryFilter = ({
  category,
  filters,
  setFilters,
  availableColors,
  availableLengths,
  availableClasps,
  availableLetters,
}) => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const { t } = useTranslation();

  if (!category || category === "all") return null;

  const config = FILTER_CONFIG[category] ?? [];

  const sources = {
    availableColors,
    availableLengths,
    availableClasps,
    availableLetters,
  };

  return (
    <Box
      sx={{
        padding: "15px",
        marginTop: "10px",
        marginBottom: "20px",
        fontFamily: "'Roboto', sans-serif",
        color: isDarkMode ? "#0c0" : "#dbac01",
      }}
    >
      {config.map((f) => {
        const value = filters[f.key];

        // SELECT FILTER
        if (f.type === "select") {
          const options = sources[f.source] ?? [];

          return (
            <Box key={f.key}>
              <Label>{t(f.label)}</Label>
              <Select
                value={value}
                onChange={(e) =>
                  setFilters({ ...filters, [f.key]: e.target.value })
                }
              >
                <option value="">{t("all")}</option>

                {options.map((o) => (
                  <option key={o} value={o}>
                    {t(`value.${o}`, o)}
                  </option>
                ))}
              </Select>
            </Box>
          );
        }

        // BOOLEAN FILTER
        if (f.type === "boolean") {
          return (
            <Box key={f.key} sx={{ marginTop: "10px" }}>
              <Label>{t(f.label)}</Label>
              <label
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <input
                  type="checkbox"
                  checked={value === "yes" || value === true}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      [f.key]: e.target.checked ? "yes" : "",
                    })
                  }
                />
                {t("yes")}
              </label>
            </Box>
          );
        }

        return null;
      })}
    </Box>
  );
};

export default CategoryFilter;
