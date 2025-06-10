import { Box, Tab, Tabs, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import AboutSection from "./AboutSection";
import ContactSection from "./ContactSection";

const AboutPage = () => {
  const { t } = useTranslation();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const [selectedTab, setSelectedTab] = useState(0);

  // Перевіряємо, чи мобільний пристрій
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        gap: 3,
        padding: "20px",
     
      }}
    >
      <Tabs
        value={selectedTab}
        orientation={isMobile ? "horizontal" : "vertical"}
        variant="scrollable"
        onChange={handleChange}
        sx={{
          minWidth: isMobile ? "100%" : 200,
          alignItems: isMobile ? "center" : "start",
          fontFamily: "Arial",
          order: isMobile ? -1 : 0,
          marginBottom: "40px"
        }}
      >
        <Tab
          label={t("about")}
          style={{ color: isDarkMode ? "#0c0" : "#1f871a" }}
        />
        <Tab
          label={t("contact")}
          style={{ color: isDarkMode ? "#0c0" : "#1f871a" }}
        />
      </Tabs>
      <Box>
        {selectedTab === 0 && <AboutSection />}
        {selectedTab === 1 && <ContactSection />}
      </Box>
    </Box>
  );
};

export default AboutPage;
