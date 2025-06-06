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

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  if (!user) return <p>Loading profile...</p>;
  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  return (
    <Box style={{ display: "flex", gap: 3, padding: "20px" }}>
      <Tabs
        value={selectedTab}
        orientation="vertical"
        variant="scrollable"
        onChange={handleChange}
        sx={{ minWidth: 200, alignItems: "start", fontFamily: "Arial" }}
      >
        <Tab label="Twoje dane" style={{ color: isDarkMode ? "#0c0" : "#1f871a" }}/>
        <Tab label="Adresy do wysyłki" style={{ color: isDarkMode ? "#0c0" : "#1f871a" }}/>
        <Tab label="Moje zamówienia" style={{ color: isDarkMode ? "#0c0" : "#1f871a" }}/>
        <Tab label="Historia zamówień" style={{ color: isDarkMode ? "#0c0" : "#1f871a" }}/>
        <Tab label="Karty płatnicze" style={{ color: isDarkMode ? "#0c0" : "#1f871a" }}/>
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
