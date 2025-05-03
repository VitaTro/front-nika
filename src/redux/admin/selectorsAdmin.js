import { createStructuredSelector } from "reselect";

export const selectAdminUsers = (state) => state.admin.users; // Список користувачів
export const selectAdminProducts = (state) => state.admin.products; // Список продуктів
export const selectAdminFinance = (state) => state.admin.finance; // Стан фінансів
export const selectAdminDashboard = (state) => state.admin.dashboard; // Dashboard
export const selectAdminLoading = (state) => state.admin.loading; // Стан завантаження
export const selectAdminError = (state) => state.admin.error; // Помилки

export const selectAdminData = createStructuredSelector({
  users: selectAdminUsers,
  products: selectAdminProducts,
  finance: selectAdminFinance,
  dashboard: selectAdminDashboard,
  loading: selectAdminLoading,
  error: selectAdminError,
});
