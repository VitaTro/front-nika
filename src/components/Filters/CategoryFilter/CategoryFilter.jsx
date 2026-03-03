import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
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
      {/* Earrings */}
      {category === "earrings" && (
        <>
          <Label sx={{ fontFamily: "inherit" }}>{t("type_clasp")}</Label>
          <Select
            value={filters.clasp}
            onChange={(e) => setFilters({ ...filters, clasp: e.target.value })}
          >
            <option value="">{t("all")}</option>
            {(availableClasps ?? []).map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>

          <Label>{t("color")}</Label>
          <Select
            value={filters.stoneColor}
            onChange={(e) =>
              setFilters({ ...filters, stoneColor: e.target.value })
            }
          >
            <option value="">{t("all")}</option>
            {(availableColors ?? []).map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </>
      )}

      {/* Chains */}
      {category === "chains" && (
        <>
          <Label>{t("length")} (cm)</Label>
          <Select
            value={filters.length}
            onChange={(e) => setFilters({ ...filters, length: e.target.value })}
          >
            <option value="">{t("all")}</option>
            {(availableLengths ?? []).map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </Select>
        </>
      )}

      {/* Bracelets */}
      {category === "bracelets" && (
        <>
          <Label>{t("length")} (cm)</Label>
          <Select
            value={filters.length}
            onChange={(e) => setFilters({ ...filters, length: e.target.value })}
          >
            <option value="">{t("all")}</option>
            {(availableLengths ?? []).map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </Select>

          <Label>{t("color")}</Label>
          <Select
            value={filters.stoneColor}
            onChange={(e) =>
              setFilters({ ...filters, stoneColor: e.target.value })
            }
          >
            <option value="">{t("all")}</option>
            {(availableColors ?? []).map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </>
      )}

      {/* Crosses */}
      {category === "crosses" && (
        <>
          <Label>{t("stone")}</Label>
          <Select
            value={filters.withStones}
            onChange={(e) =>
              setFilters({ ...filters, withStones: e.target.value })
            }
          >
            <option value="">{t("all")}</option>
            <option value="yes">{t("yes")}</option>
            <option value="no">{t("no")}</option>
          </Select>
        </>
      )}

      {/* Pendants */}
      {category === "pendants" && (
        <>
          <Label>{t("letters")}</Label>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            {(availableLetters ?? []).map((l) => (
              <label
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <input
                  type="checkbox"
                  checked={filters.hasLetter === true}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      hasLetter: e.target.checked ? true : "",
                    })
                  }
                />
              </label>
            ))}
          </Box>

          <Label style={{ marginTop: "15px" }}>{t("stone")}</Label>
          <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input
              type="checkbox"
              checked={filters.withStones === "yes"}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  withStones: e.target.checked ? "yes" : "",
                })
              }
            />
            Так
          </label>

          <Label style={{ marginTop: "15px" }}>{t("color")}</Label>
          <Select
            value={filters.stoneColor}
            onChange={(e) =>
              setFilters({ ...filters, stoneColor: e.target.value })
            }
          >
            <option value="">{t("all")}</option>
            {(availableColors ?? []).map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </>
      )}
    </Box>
  );
};

export default CategoryFilter;
