import {
  Box,
  FormControl,
  MenuItem,
  Select,
  Tab,
  Tabs,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import GeneralPolicy from "./Tabs/GeneralPolicy";
import Section1 from "./Tabs/Section1";
import Section10 from "./Tabs/Section10";
import Section11 from "./Tabs/Section11";
import Section12 from "./Tabs/Section12";
import Section13 from "./Tabs/Section13";
import Section2 from "./Tabs/Section2";
import Section3 from "./Tabs/Section3";
import Section4 from "./Tabs/Section4";
import Section5 from "./Tabs/Section5";
import Section6 from "./Tabs/Section6";
import Section7 from "./Tabs/Section7";
import Section8 from "./Tabs/Section8";
import Section9 from "./Tabs/Section9";

const PrivacyPolicyTabs = () => {
  const { t } = useTranslation();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [searchParams] = useSearchParams();
  const initialTab = Number(searchParams.get("tab")) || 0;
  const [tab, setTab] = useState(initialTab);
  const navigate = useNavigate();

  const sections = [
    { label: t("privacy_policy.short.general"), component: <GeneralPolicy /> },
    { label: t("privacy_policy.short.section1"), component: <Section1 /> },
    { label: t("privacy_policy.short.section2"), component: <Section2 /> },
    { label: t("privacy_policy.short.section3"), component: <Section3 /> },
    { label: t("privacy_policy.short.section4"), component: <Section4 /> },
    { label: t("privacy_policy.short.section5"), component: <Section5 /> },
    { label: t("privacy_policy.short.section6"), component: <Section6 /> },
    { label: t("privacy_policy.short.section7"), component: <Section7 /> },
    { label: t("privacy_policy.short.section8"), component: <Section8 /> },
    { label: t("privacy_policy.short.section9"), component: <Section9 /> },
    { label: t("privacy_policy.short.section10"), component: <Section10 /> },
    { label: t("privacy_policy.short.section11"), component: <Section11 /> },
    { label: t("privacy_policy.short.section12"), component: <Section12 /> },
    { label: t("privacy_policy.short.section13"), component: <Section13 /> },
  ];
  const handleChange = (event, newValue) => {
    setTab(newValue);
    navigate(`?tab=${newValue}`);
  };
  return (
    <Box display="flex" flexDirection={isMobile ? "column" : "row"} padding={2}>
      {isMobile ? (
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <Select
            labelId="policy-section-select"
            value={tab}
            onChange={(e) => setTab(e.target.value)}
            fullWidth
          >
            {sections.map((section, index) => (
              <MenuItem key={index} value={index}>
                {section.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        <Tabs
          value={tab}
          onChange={handleChange}
          orientation="vertical"
          variant="scrollable"
          sx={{
            minWidth: 220,
            maxWidth: 300,
            maxHeight: "calc(100vh - 100px)",
            overflowY: "auto",
            borderRight: "1px solid #ccc",
            marginBottom: 0,
            flexShrink: 0,
          }}
        >
          {sections.map((s, i) => (
            <Tab
              key={i}
              label={s.label}
              style={{ color: isDarkMode ? "#0c0" : "#1f871a" }}
            />
          ))}
        </Tabs>
      )}

      <Box flex={1} paddingLeft={isMobile ? 0 : 3}>
        {sections[tab].component}
      </Box>
    </Box>
  );
};

export default PrivacyPolicyTabs;
