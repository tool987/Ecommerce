import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/accounts/";

// Login function
export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}login/`, { email, password });
  if (response.data.access) {
    localStorage.setItem("access", response.data.access);
    localStorage.setItem("refresh", response.data.refresh);
  }
  return response.data;
};

// Register function
export const register = async (data: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}) => {
  const response = await axios.post(`${API_URL}register/`, data);
  return response.data;
};

// Logout function
export const logout = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
};
