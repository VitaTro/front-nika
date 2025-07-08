import { Navigate, Outlet, useLocation } from "react-router-dom";

const InventoryLayout = () => {
  const location = useLocation();

  if (location.pathname === "/admin/stock") {
    return <Navigate to="movement" replace />;
  }
  return <Outlet />;
};
export default InventoryLayout;
