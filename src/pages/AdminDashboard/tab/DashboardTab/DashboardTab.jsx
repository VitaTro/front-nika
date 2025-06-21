import { Button } from "@mui/material";
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
      <div>
        <Button
          variant={viewMode === "invoices" ? "contained" : "outlined"}
          color="info"
          onClick={() =>
            window.open(
              "https://drive.google.com/drive/u/1/folders/1TkHWa-aTjUWVRn8BxkpFZD8rAekKO7Kx",
              "_blank"
            )
          }
          style={{ marginLeft: "10px" }}
        >
          📂 Інвойси (Google Drive)
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
      {viewMode === "invoices" && (
        <iframe
          title="Google Drive Invoice Folder"
          src="https://drive.google.com/embeddedfolderview?id=1TkHWa-aTjUWVRn8BxkpFZD8rAekKO7Kx#grid"
          style={{ width: "100%", height: "80vh", border: "none" }}
        />
      )}
    </div>
  );
};

export default DashboardTab;
