import { Box, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [selectedTab, setSelectedTab] = useState(0); // Встановіть початкове значення

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue); // Оновлення значення вкладки
  };
  return (
    <Box style={{ padding: "20px" }}>
      <Tabs
        centered
        value={selectedTab}
        onChange={handleChange}
        style={{ marginBottom: "20px" }}
      >
        {/* Навігація між вкладеними маршрутами */}
        <Tab label="Користувачі" component={Link} to="/admin/users" />
        <Tab label="Товари" component={Link} to="/admin/products" />
        <Tab label="Головна панель" component={Link} to="/admin/dashboard" />
        {/* <Tab label="Фінанси" component={Link} to="/admin/finance" /> */}
      </Tabs>
      {/* Outlet для відображення дочірніх маршрутів */}
      <Outlet />
    </Box>
  );
};
export default AdminLayout;
