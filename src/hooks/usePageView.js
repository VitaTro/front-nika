import { useEffect } from "react";
import axios from "../redux/axiosConfig";
export const usePageView = (page) => {
  useEffect(() => {
    axios.post("/api/analytics/visit", { page }).catch(() => {});
  }, [page]);
};
