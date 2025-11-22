import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import BarangPage from "./pages/admin/BarangPage";
import AdminTransaksiPage from "./pages/admin/TransaksiPage";

// Staff Pages
import StaffDashboard from "./pages/staff/Dashboard";
import StaffTransaksiPage from "./pages/staff/TransaksiPage";

function App() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // admin atau staff

  const RequireAuth = ({ children, allowedRole }) => {
    if (!token) return <Navigate to="/login" />;
    if (allowedRole && role !== allowedRole) return <Navigate to="/login" />;
    return children;
  };

  return (
    <Router>
      <Routes>
        {/* Auth */}
        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <RequireAuth allowedRole="admin">
              <AdminDashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/admin/barang"
          element={
            <RequireAuth allowedRole="admin">
              <BarangPage />
            </RequireAuth>
          }
        />
        <Route
          path="/admin/transaksi"
          element={
            <RequireAuth allowedRole="admin">
              <AdminTransaksiPage />
            </RequireAuth>
          }
        />

        {/* Staff Routes */}
        <Route
          path="/staff/dashboard"
          element={
            <RequireAuth allowedRole="staff">
              <StaffDashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/staff/transaksi"
          element={
            <RequireAuth allowedRole="staff">
              <StaffTransaksiPage />
            </RequireAuth>
          }
        />

        {/* Default route */}
        <Route
          path="/"
          element={
            token ? (
              role === "admin" ? (
                <Navigate to="/admin/Dashboard" />
              ) : (
                <Navigate to="/staff/Dashboard" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
