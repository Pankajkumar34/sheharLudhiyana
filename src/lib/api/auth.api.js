import api from "../axios.config";
import { useQuery } from "@tanstack/react-query";

export const signup = (data) => api.post("/auth/signup", data);

export const login = (data) => api.post("/auth/login", data);

export const googleLogin = () => {
  window.location.href =
    `${import.meta.env.VITE_API_URL}/auth/google`;
};

export const logout = () => api.post("/auth/logout");

export const getProfile = async () => {
  try {
    const res = await api.get("/auth/profile");
    return res.data;
  } catch (error) {
   throw error
  }
};

export const completeProfileApi = async()=>{
  
}

