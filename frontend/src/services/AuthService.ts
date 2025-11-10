// src/services/AuthService.ts
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/accounts/";

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}login/`, { email, password });
  if (response.data.access) {
    localStorage.setItem("access", response.data.access);
    localStorage.setItem("refresh", response.data.refresh);
  }
  return response.data;
};

export const register = async (username: string, email: string, password: string) => {
  const response = await axios.post(`${API_URL}register/`, {
    username,
    email,
    password,
  });
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
};
