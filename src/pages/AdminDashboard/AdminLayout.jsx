import { Box, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const AdminLayout = () => {
  const location = useLocation();

  // ✅ Встановлення початкового значення вкладки на основі маршруту
  const getTabIndex = () => {
    if (location.pathname.includes("/admin/finance")) return 0;
    if (location.pathname.includes("/admin/dashboard")) return 1;
    if (location.pathname.includes("/admin/products")) return 2;
    if (location.pathname.includes("/admin/users")) return 3;
    return 0; // За замовчуванням — "Фінанси"
  };

  const [selectedTab, setSelectedTab] = useState(getTabIndex());

  useEffect(() => {
    // ✅ Оновлюємо вкладку, якщо змінюється маршрут
    setSelectedTab(getTabIndex());
  }, [location.pathname]);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box style={{ padding: "20px" }}>
      <Tabs
        centered
        value={selectedTab}
        onChange={handleChange}
        style={{ marginBottom: "20px" }}
      >
        <Tab label="Фінанси" component={Link} to="/admin/finance" />
        <Tab label="Головна панель" component={Link} to="/admin/dashboard" />
        <Tab label="Товари" component={Link} to="/admin/products" />
        <Tab label="Користувачі" component={Link} to="/admin/users" />
      </Tabs>

      {/* Відображення дочірніх маршрутів */}
      <Outlet />
    </Box>
  );
};

export default AdminLayout;
