import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import { Link, Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <Box>
      <Tabs centered>
        {/* Навігація між вкладеними маршрутами */}
        <Tab label="Користувачі" component={Link} to="/admin/users" />
        <Tab label="Товари" component={Link} to="/admin/products" />
        <Tab label="Дані" component={Link} to="/admin/dashboard" />
      </Tabs>
      {/* Outlet для відображення дочірніх маршрутів */}
      <Outlet />
    </Box>
  );
};
export default AdminLayout;
