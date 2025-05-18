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

        const { data } = await axios.post("/api/admin/auth/refresh", {
          refreshToken,
        });

        localStorage.setItem("token", data.accessToken);
        error.config.headers.Authorization = `Bearer ${data.accessToken}`;
        return axios(error.config);
      } catch (refreshError) {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        window.location.href = "/admin/login"; // Перенаправлення на логін
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default axios;
