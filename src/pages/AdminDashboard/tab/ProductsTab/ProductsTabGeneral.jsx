import { Box, Tab, Tabs, useMediaQuery } from "@mui/material";
import { useState } from "react";
import ProductsTab from "./products/ProductsTab";
import MaterialsTab from "./productsMaterials/ProductMaterialTabs";
const ProductsTabsGeneral = () => {
  const [tab, setTab] = useState(0);
  const isMobile = useMediaQuery("(max-width: 600px)");

  const handleChange = (_, newValue) => {
    setTab(newValue);
  };
  return (
    <Box sx={{ padding: isMobile ? 1 : 3 }}>
      <Tabs
        value={tab}
        onChange={handleChange}
        variant={isMobile ? "scrollable" : "standard"}
        scrollButtons={isMobile ? "auto" : false}
        sx={{ mb: 3 }}
      >
        <Tab label="Готові товари" />
        <Tab label="Матеріали" />
      </Tabs>
      {tab === 0 && <ProductsTab />}
      {tab === 1 && <MaterialsTab />}
    </Box>
  );
};
export default ProductsTabsGeneral;
