export const selectAuthUser = (state) => state.auth.user; // Дані користувача
export const selectAuthToken = (state) => state.auth.token; // Токен
export const selectAuthLoading = (state) => state.auth.loading; // Завантаження
export const selectAuthError = (state) => state.auth.error; // Помилки
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn; // Стан авторизації
