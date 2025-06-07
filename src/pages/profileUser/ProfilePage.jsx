import { Box, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileAddressEdit from "../../components/UserDashboard/ProfileAddressEdit";
import ProfileMainEdit from "../../components/UserDashboard/ProfileMainEdit";
import { fetchUserInfo } from "../../redux/user/userOperations";
import { selectUser } from "../../redux/user/userSelectors";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const user = useSelector(selectUser);
  const [selectedTab, setSelectedTab] = useState(0);
  const isMobile = useMediaQuery("(max-width:600px)");
  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  if (!user) return <p>Loading profile...</p>;
  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        gap: 3,
        padding: "20px",
      }}
    >
      <Tabs
        value={selectedTab}
        orientation={isMobile ? "horizontal" : "vertical"}
        variant="scrollable"
        onChange={handleChange}
        sx={{
          minWidth: isMobile ? "100%" : 200,
          alignItems: isMobile ? "center" : "start",
          fontFamily: "Arial",
          order: isMobile ? -1 : 0,
        }}
      >
        <Tab
          label="Twoje dane"
          style={{ color: isDarkMode ? "#0c0" : "#1f871a" }}
        />
        <Tab
          label="Adresy do wysyłki"
          style={{ color: isDarkMode ? "#0c0" : "#1f871a" }}
        />
        <Tab
          label="Moje zamówienia"
          style={{ color: isDarkMode ? "#0c0" : "#1f871a" }}
        />
        <Tab
          label="Historia zamówień"
          style={{ color: isDarkMode ? "#0c0" : "#1f871a" }}
        />
        <Tab
          label="Karty płatnicze"
          style={{ color: isDarkMode ? "#0c0" : "#1f871a" }}
        />
      </Tabs>

      <Box>
        {selectedTab === 0 && <ProfileMainEdit />}
        {selectedTab === 1 && <ProfileAddressEdit />}

        {selectedTab === 2 && (
          <p>Тут буде історія покупок та поточні замовлення...</p>
        )}
      </Box>
    </Box>
  );
};

export default ProfilePage;
