import React from "react";
import { useNavigate } from "react-router-dom";

export default function StaffSidebar() {
  const navigate = useNavigate();

  return (
    <div className="fixed w-64 h-screen bg-gray-800 text-white p-6">
      <h2 className="text-xl font-bold mb-6">Staff Panel</h2>
      <nav className="flex flex-col gap-4">
        <button
          onClick={() => navigate("/staff/dashboard")}
          className="text-left px-3 py-2 rounded hover:bg-gray-700"
        >
          Dashboard
        </button>
        <button
          onClick={() => navigate("/staff/transaksi")}
          className="text-left px-3 py-2 rounded hover:bg-gray-700"
        >
          Transaksi
        </button>
        <button
          onClick={() => navigate("/staff/barang")}
          className="text-left px-3 py-2 rounded hover:bg-gray-700"
        >
          Daftar Barang
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
