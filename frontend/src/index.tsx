
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import Layout from "./components/Layout";
import App from "./App";
import LoginPage from "./pages/Auth/LoginPage";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/Auth/RegisterPage";


import reportWebVitals from './reportWebVitals';
import CartItem from "./components/CartItem";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <Routes>
      {/* Layout wraps all pages that share Navbar & Footer */}
      <Route path="/" element={<Layout />}>
        <Route index element={<App />} />           {/* "/" home page */}
        <Route path="login" element={<LoginPage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="register" element={<RegisterPage />} />
        {/* Add more pages here */}
      </Route>
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
