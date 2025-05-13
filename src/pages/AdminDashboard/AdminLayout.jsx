import { Box, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { logoutAdmin } from "../../redux/auth/adminAuth/operationsAdminAuth";

const AdminLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logoutAdmin())
      .unwrap()
      .then(() => {
        navigate("/admin/auth/login"); // 🔀 Редирект після виходу
      })
      .catch((error) => console.error("Logout failed:", error));
  };

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
        <Tab label="Вихід" onClick={handleLogout} />
      </Tabs>
      {/* <button onClick={handleLogout}>Logout</button> 🔴 Кнопка виходу */}
      {/* Відображення дочірніх маршрутів */}
      <Outlet />
    </Box>
  );
};

export default AdminLayout;
