import axios from "axios";


const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});


api.interceptors.response.use(
  (response) => response,
  async(error)=>{
    const originalRequest = error.config;
if(error.response.status === 401 && !originalRequest._retry){
  originalRequest._retry = true;
  try {
    await api.post("/auth/refresh")
    return api(originalRequest)
  } catch (refreshError) {
    window.location.href = "/signin";
    return Promise.reject(refreshError);
  }
 
}return Promise.reject(error);
  }
)

export default api;
