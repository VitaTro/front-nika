import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const useGlobalNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Зберігаємо поточну сторінку у `localStorage`
    localStorage.setItem("lastPage", location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const lastPage = localStorage.getItem("lastPage");
    if (lastPage && lastPage !== location.pathname) {
      navigate(lastPage);
    }
  }, [navigate, location.pathname]);
};

export default useGlobalNavigation;
