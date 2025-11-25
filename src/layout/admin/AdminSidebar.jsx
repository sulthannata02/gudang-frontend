import React from "react";
import { useNavigate } from "react-router-dom";

export default function AdminSidebar() {
  const navigate = useNavigate();

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-6 fixed">
      <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
      <nav className="flex flex-col space-y-3">
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="text-left px-3 py-2 rounded hover:bg-gray-700"
        >
          Dashboard
        </button>
        <button
          onClick={() => navigate("/admin/barang")}
          className="text-left px-3 py-2 rounded hover:bg-gray-700"
        >
          Manajemen Barang
        </button>
        <button
          onClick={() => navigate("/admin/transaksi")}
          className="text-left px-3 py-2 rounded hover:bg-gray-700"
        >
          Transaksi
        </button>
        <button
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
          className="text-left px-3 py-2 rounded bg-red-600 hover:bg-red-700 mt-6"
        >
          Logout
        </button>
      </nav>
    </div>
  );
}
