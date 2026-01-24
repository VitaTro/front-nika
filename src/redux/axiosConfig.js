import axios from "axios";

axios.defaults.baseURL = "https://nika-gold-back-fe0ff35469d7.herokuapp.com/";

axios.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("accessToken") || localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
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

        localStorage.setItem("accessToken", data.accessToken);
        const tokenPayload = JSON.parse(atob(data.accessToken.split(".")[1]));
        if (tokenPayload?.role) {
          localStorage.setItem("userRole", tokenPayload.role);
        }
        error.config.headers.Authorization = `Bearer ${data.accessToken}`;
        return axios(error.config);
      } catch (refreshError) {
        localStorage.removeItem("accessToken");

        localStorage.removeItem("refreshToken");
        window.location.href =
          userRole === "admin" ? "/admin/auth/login" : "/user/auth/login";
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);

export default axios;
