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
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
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
const PolicyPaymentTabs = () => {
  const { t } = useTranslation();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [searchParams] = useSearchParams();
  const initialTab = Number(searchParams.get("tab")) || 0;
  const [tab, setTab] = useState(initialTab);
  const navigate = useNavigate();

  const sections = [
    { label: t("regulations.sections.section1"), component: <Section1 /> },
    { label: t("regulations.sections.section2"), component: <Section2 /> },
    { label: t("regulations.sections.section3"), component: <Section3 /> },
    { label: t("regulations.sections.section4"), component: <Section4 /> },
    { label: t("regulations.sections.section5"), component: <Section5 /> },
    { label: t("regulations.sections.section13"), component: <Section13 /> },
    { label: t("regulations.sections.section6"), component: <Section6 /> },
    { label: t("regulations.sections.section7"), component: <Section7 /> },
    { label: t("regulations.sections.section8"), component: <Section8 /> },
    { label: t("regulations.sections.section9"), component: <Section9 /> },
    { label: t("regulations.sections.section10"), component: <Section10 /> },
    { label: t("regulations.sections.section11"), component: <Section11 /> },
    { label: t("regulations.sections.section12"), component: <Section12 /> },
  ];
  const safeTab = tab >= 0 && tab < sections.length ? tab : 0;

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
        {sections[safeTab].component}
      </Box>
    </Box>
  );
};
export default PolicyPaymentTabs;
