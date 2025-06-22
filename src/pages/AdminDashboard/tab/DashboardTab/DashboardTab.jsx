import { Box, Button, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PopularProductsSection from "../../../../components/AdminDashboard/PopularProductsSection";
import StatisticsSection from "../../../../components/AdminDashboard/StatisticsSection";
import WishlistSection from "../../../../components/AdminDashboard/WishlistSection";
import Loader from "../../../../components/Loader";
import { fetchAdminDashboard } from "../../../../redux/admin/operationsAdmin";
import { selectAdminData } from "../../../../redux/admin/selectorsAdmin";

const DashboardTab = () => {
  const dispatch = useDispatch();
  const { loading, error, dashboard } = useSelector(selectAdminData);
  const [viewMode, setViewMode] = useState("stats");
  const isMobile = useMediaQuery("(max-width: 600px)");

  useEffect(() => {
    dispatch(fetchAdminDashboard());
  }, [dispatch]);

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;

  return (
    <Box sx={{ padding: isMobile ? 1 : 2 }}>
      {/* Кнопки навігації */}
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: 2,
          marginBottom: 2,
          alignItems: isMobile ? "stretch" : "center",
        }}
      >
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
        >
          Популярні товари
        </Button>
        <Button
          variant={viewMode === "wishlist" ? "contained" : "outlined"}
          color="success"
          onClick={() => setViewMode("wishlist")}
        >
          Список бажань
        </Button>
        <Button
          variant={viewMode === "invoices" ? "contained" : "outlined"}
          color="info"
          onClick={() => setViewMode("invoices")}
        >
          📂 Інвойси
        </Button>
      </Box>

      {/* Відображення вибраного контенту */}
      {viewMode === "stats" && <StatisticsSection stats={dashboard.stats} />}
      {viewMode === "popular" && (
        <PopularProductsSection
          popularItems={dashboard.productsOverview?.popularItems}
        />
      )}
      {viewMode === "wishlist" && (
        <WishlistSection wishlist={dashboard.wishlistOverview} />
      )}
      {viewMode === "invoices" && (
        <iframe
          title="Google Drive Invoice Folder"
          src="https://drive.google.com/embeddedfolderview?id=1TkHWa-aTjUWVRn8BxkpFZD8rAekKO7Kx#grid"
          style={{ width: "100%", height: "80vh", border: "none" }}
        />
      )}
    </Box>
  );
};

export default DashboardTab;
