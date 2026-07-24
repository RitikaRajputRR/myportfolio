import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./ProtectedRoute";
import AdminRegister from "./AdminRegister";
import AdminLogin from"./Adminlogin";
import "./App.css";
import Portfolio from "./Portfolio";
import Admin from "./Admin";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/adminregister" element={<AdminRegister />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute> <Admin /> </ProtectedRoute>} />
      </Routes>
       <Toaster
    position="top-right"
    toastOptions={{
      duration: 3000,
      style: {
        background: "#1f2937",
        color: "#fff",
        border: "1px solid #22c55e",
      },
    }}
  />
    </BrowserRouter>
  </StrictMode>
);