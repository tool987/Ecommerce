import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: { "Content-Type": "application/json" },
});

export const registerUser = (data: { username: string; email: string; password: string }) =>
  API.post("/accounts/register/", data);

export const loginUser = (data: { email: string; password: string }) =>
  API.post("/accounts/login/", data);
