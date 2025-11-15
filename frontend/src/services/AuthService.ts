import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/accounts/";

// Login function
export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}login/`, {
    email,
    password,
  });

  const { access, refresh } = response.data;

  // ⭐ Save tokens
  localStorage.setItem("access", access);
  localStorage.setItem("refresh", refresh);

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

// ⭐ NEW: Fetch user profile (with Authorization header)
export const getProfile = async () => {
  const token = localStorage.getItem("access");

  if (!token) {
    throw new Error("No access token found");
  }

  const response = await axios.get(`${API_URL}profile/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
