import axios from "axios";

const api = axios.create({
  baseURL: "https://notely-pzlm.onrender.com/api",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (!originalRequest._retryCount) {
      originalRequest._retryCount = 0;
    }
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retryCount += 1;
      try {
        await api.post("/auth/refresh");
        return api(originalRequest);
      } catch (refreshError) {
        if (originalRequest._retryCount >= 2) {
          window.location.href = "/signin";
        }
      
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default api;
