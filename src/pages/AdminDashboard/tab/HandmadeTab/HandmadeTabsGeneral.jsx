import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import HandmadeCardForm from "./HandmadeCardForm";
import HandmadeList from "./HandmadeList";

const HandmadeTabsGeneral = () => {
  const [tab, setTab] = useState(0);

  return (
    <Box sx={{ p: 3 }}>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3 }}>
        <Tab label="Список карток" />
        <Tab label="Створити картку" />
      </Tabs>
      {tab === 0 && <HandmadeList />}
      {tab === 1 && <HandmadeCardForm />}
      <Outlet />
    </Box>
  );
};
export default HandmadeTabsGeneral;
