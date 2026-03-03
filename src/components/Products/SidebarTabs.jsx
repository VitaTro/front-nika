import { Box, Tab, Tabs, useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const SidebarTabs = ({ activeCategory, onChange, categories }) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery("(max-width:600px)");
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Tabs
        value={activeCategory}
        onChange={(e, newValue) => onChange(newValue)}
        orientation={isMobile ? "horizontal" : "vertical"}
        variant={isMobile ? "scrollable" : "standard"}
        scrollButtons={isMobile ? "auto" : false}
        allowScrollButtonsMobile
        sx={{
          width: "100%",
          minHeight: isMobile ? "auto" : "300px",
          "& .MuiTab-root": {
            color: isDarkMode ? "#0c0" : "#dbac01",
            fontSize: "15px",
            padding: isMobile ? "6px 10px" : "12px",
            minWidth: isMobile ? "auto" : "100%",
          },
          "& .MuiTabs-flexContainer": {
            justifyContent: isMobile ? "flex-start" : "flex-start",
          },
        }}
      >
        {categories.map((category) => (
          <Tab key={category} label={t(category)} value={category} />
        ))}
      </Tabs>
    </Box>
  );
};

export default SidebarTabs;
