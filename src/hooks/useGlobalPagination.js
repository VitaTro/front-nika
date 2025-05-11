import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const useGlobalPagination = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState("1");

  // ✅ Отримуємо збережену сторінку з `localStorage`
  useEffect(() => {
    const savedPage = localStorage.getItem("currentPage") || "1";
    setCurrentPage(savedPage);
  }, []);

  // ✅ Оновлюємо `localStorage`, якщо змінюється сторінка
  useEffect(() => {
    localStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

  // ✅ Оновлюємо URL при зміні сторінки
  const handlePageChange = (page) => {
    setCurrentPage(page);
    navigate(`?page=${page}`);
  };

  return { currentPage, handlePageChange };
};

export default useGlobalPagination;
