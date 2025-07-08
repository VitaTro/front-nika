import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Tab,
  Tabs,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { logoutAdmin } from "../../redux/auth/adminAuth/operationsAdminAuth";

const AdminLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width: 600px)");

  const handleLogout = () => {
    dispatch(logoutAdmin())
      .unwrap()
      .then(() => navigate("/admin/auth/login"))
      .catch((error) => console.error("Logout failed:", error));
  };

  const getTabIndex = () => {
    if (location.pathname.includes("/admin/finance")) return 0;
    if (location.pathname.includes("/admin/stock/movement")) return 1;
    if (location.pathname.includes("/admin/stock/monthly-report")) return 2;
    if (location.pathname.includes("/admin/dashboard")) return 3;
    if (location.pathname.includes("/admin/products")) return 4;
    if (location.pathname.includes("/admin/users")) return 5;
    return 0;
  };

  const [selectedTab, setSelectedTab] = useState(getTabIndex());
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    setSelectedTab(getTabIndex());
  }, [location.pathname]);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const renderTabs = (isDrawer = false) => (
    <Box
      sx={{
        display: isDrawer ? "flex" : "inline",
        flexDirection: isDrawer ? "column" : "row",
        gap: isDrawer ? 2 : 0,
        padding: isDrawer ? 2 : 0,
        width: isDrawer ? 250 : "auto",
      }}
      role={isDrawer ? "presentation" : undefined}
      onClick={isDrawer ? () => setDrawerOpen(false) : undefined}
    >
      <List>
        <ListItemButton component={Link} to="/admin/finance">
          <ListItemText primary="Фінанси" />
        </ListItemButton>
        <ListItemButton component={Link} to="/admin/stock/movement">
          <ListItemText primary="Склад" />
        </ListItemButton>
        <ListItemButton component={Link} to="/admin/dashboard">
          <ListItemText primary="Головна панель" />
        </ListItemButton>
        <ListItemButton component={Link} to="/admin/products">
          <ListItemText primary="Товари" />
        </ListItemButton>
        <ListItemButton component={Link} to="/admin/users">
          <ListItemText primary="Користувачі" />
        </ListItemButton>
        <ListItemButton onClick={handleLogout}>
          <ListItemText primary="Вихід" />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <Box sx={{ padding: 2 }}>
      {isMobile ? (
        <>
          <Box display="flex" justifyContent="flex-end" mb={2}>
            <Tooltip title="Меню">
              <IconButton onClick={() => setDrawerOpen(true)} size="large">
                <MenuIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
          </Box>
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          >
            {renderTabs(true)}
          </Drawer>
        </>
      ) : (
        <Tabs
          centered
          value={selectedTab}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        >
          <Tab label="Фінанси" component={Link} to="/admin/finance" />
          <Tab label="Склад" component={Link} to="/admin/stock/movement" />
          <Tab
            label="Звітність"
            component={Link}
            to="/admin/stock/monthly-report"
          />

          <Tab label="Головна панель" component={Link} to="/admin/dashboard" />
          <Tab label="Товари" component={Link} to="/admin/products" />
          <Tab label="Користувачі" component={Link} to="/admin/users" />
          <Tab label="Вихід" onClick={handleLogout} />
        </Tabs>
      )}
      <Outlet />
    </Box>
  );
};

export default AdminLayout;
