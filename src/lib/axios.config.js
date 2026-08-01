import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 30000,
  withCredentials: true,
  
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("s_accessToken");
console.log(token,"=====")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response.data,

  (error) => {
    if (error.response?.status === 401) {
      // localStorage.removeItem("s_accessToken");
      window.location.href = "/login";
    }

    return Promise.reject(error.response?.data || error);
  }
);

export default api;