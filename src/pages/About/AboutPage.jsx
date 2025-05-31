import { useTranslation } from "react-i18next";

import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import AboutSection from "./AboutSection";
import ContactSection from "./ContactSection";

const AboutPage = () => {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  return (
    <Box style={{ display: "flex", gap: 3, padding: "20px" }}>
      <Tabs
        value={selectedTab}
        orientation="vertical"
        variant="scrollable"
        onChange={handleChange}
        sx={{ minWidth: 200, alignItems: "start", fontFamily: "Arial" }}
      >
        <Tab label="O nas" />
        <Tab label="Kontakty" />
      </Tabs>
      <Box>
        {selectedTab === 0 && <AboutSection />}
        {selectedTab === 1 && <ContactSection />}
      </Box>
    </Box>
  );
};
export default AboutPage;
