import { useEffect } from "react";
import axios from "../redux/axiosConfig";
export const usePageView = (page) => {
  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const key = `visited_${page}_${today}`;

    // Якщо вже відправляли сьогодні — не шлемо
    if (localStorage.getItem(key)) return;
    axios
      .post("/api/analytics/visit", { page })
      .then(() => {
        localStorage.setItem(key, "1");
      })
      .catch(() => {});
  }, [page]);
};
