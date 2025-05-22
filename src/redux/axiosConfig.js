import axios from "axios";

axios.defaults.baseURL = "https://nika-gold-back-fe0ff35469d7.herokuapp.com/";
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) throw new Error("No refresh token available");

        const userRole = localStorage.getItem("userRole"); // Додай роль
        const refreshUrl =
          userRole === "admin"
            ? "/api/admin/auth/refresh"
            : "/api/user/auth/refresh"; // Вибір залежно від ролі

        const { data } = await axios.post(refreshUrl, { refreshToken });

        localStorage.setItem("token", data.accessToken);
        error.config.headers.Authorization = `Bearer ${data.accessToken}`;
        return axios(error.config);
      } catch (refreshError) {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        window.location.href =
          userRole === "admin" ? "/admin/auth/login" : "/user/auth/login"; // Залежно від ролі
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default axios;
