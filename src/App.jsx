import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Pages Admin
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminBarang from "./pages/admin/AdminBarang";
import AdminTransaksi from "./pages/admin/AdminTransaksi";

// Pages Staff
import StaffDashboard from "./pages/staff/StaffDashboard";
import StaffTransaksi from "./pages/staff/StaffTransaksi";
import StaffBarang from "./pages/staff/StaffBarang";

// Auth
import Login from "./pages/auth/Login";

// Role Protected Route
function ProtectedRoute({ children, roleRequired }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" replace />;
  if (roleRequired && role !== roleRequired) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute roleRequired="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/barang"
          element={
            <ProtectedRoute roleRequired="admin">
              <AdminBarang />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/transaksi"
          element={
            <ProtectedRoute roleRequired="admin">
              <AdminTransaksi />
            </ProtectedRoute>
          }
        />

        {/* Staff Routes */}
        <Route
          path="/staff/dashboard"
          element={
            <ProtectedRoute roleRequired="staff">
              <StaffDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/staff/transaksi"
          element={
            <ProtectedRoute roleRequired="staff">
              <StaffTransaksi />
            </ProtectedRoute>
          }
        />

        <Route
          path="/staff/barang"
          element={
            <ProtectedRoute roleRequired="staff">
              <StaffBarang />
            </ProtectedRoute>
          }
        />

        {/* Default */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}
