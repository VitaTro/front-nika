import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FinancialOverviewSection from "../../../components/AdminDashboard/FinancialOverviewSection";
import PopularProductsSection from "../../../components/AdminDashboard/PopularProductsSection";
import StatisticsSection from "../../../components/AdminDashboard/StatisticsSection";
import WishlistSection from "../../../components/AdminDashboard/WishlistSection";
import Loader from "../../../components/Loader";
import { fetchAdminDashboard } from "../../../redux/admin/operationsAdmin";
import {
  selectAdminDashboard,
  selectAdminError,
  selectAdminLoading,
} from "../../../redux/admin/selectorsAdmin";

const DashboardTab = () => {
  const dispatch = useDispatch();
  const dashboard = useSelector(selectAdminDashboard);
  const loading = useSelector(selectAdminLoading);
  const error = useSelector(selectAdminError);

  const [viewMode, setViewMode] = useState("stats"); // Управління підзакладками

  useEffect(() => {
    dispatch(fetchAdminDashboard());
  }, [dispatch]);

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ marginLeft: "10px" }}>
      {/* Кнопки для переключення між секціями */}
      <div style={{ marginBottom: "20px", marginLeft: "10px" }}>
        <Button
          variant={viewMode === "stats" ? "contained" : "outlined"}
          color="primary"
          onClick={() => setViewMode("stats")}
        >
          Статистика
        </Button>
        <Button
          variant={viewMode === "popular" ? "contained" : "outlined"}
          color="secondary"
          onClick={() => setViewMode("popular")}
          style={{ marginLeft: "10px" }}
        >
          Популярні товари
        </Button>
        <Button
          variant={viewMode === "wishlist" ? "contained" : "outlined"}
          color="success"
          onClick={() => setViewMode("wishlist")}
          style={{ marginLeft: "10px" }}
        >
          Список бажань
        </Button>
      </div>

      {/* Відображення вибраного режиму */}
      {viewMode === "stats" && <StatisticsSection stats={dashboard.stats} />}
      {viewMode === "popular" && (
        <PopularProductsSection
          popularItems={dashboard.productsOverview?.popularItems}
        />
      )}
      {viewMode === "wishlist" && (
        <WishlistSection wishlist={dashboard.wishlistOverview} />
      )}
      {viewMode === "finance" && (
        <FinancialOverviewSection
          financialOverview={dashboard.financialOverview}
        />
      )}
    </div>
  );
};

export default DashboardTab;
