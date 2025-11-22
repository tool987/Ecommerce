
import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: { "Content-Type": "application/json" },
});

// ---------------- AUTH ----------------
export const registerUser = (data: { first_name: string; last_name: string; email: string; password: string }) =>
  API.post("/accounts/register/", data);

export const loginUser = (data: { email: string; password: string }) =>
  API.post("/accounts/login/", data);

// ---------------- PRODUCTS ----------------
export const getProducts = () => API.get("/products/products");

export const getProductDetail = (slug: string) =>
  API.get(`/products/products/${slug}/`);

export default API;
