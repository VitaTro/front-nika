import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/auth/login/user" />;
  }

  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // Декодуємо payload із токена
    console.log("Decoded Payload:", payload);

    if (requiredRole && payload.role !== requiredRole) {
      console.warn(`Access denied: User is not a ${requiredRole}.`);
      return <Navigate to="/" />;
    }
  } catch (error) {
    console.error("Invalid token format:", error);
    return <Navigate to="/auth/login/user" />;
  }

  return children; // Рендеримо дочірні компоненти
};

export default ProtectedRoute;
