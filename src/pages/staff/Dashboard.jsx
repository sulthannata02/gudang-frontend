import React, { useEffect, useState } from "react";
import { fetchTransaksi } from "../../api/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [transaksi, setTransaksi] = useState([]);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || role !== "staff") navigate("/login");
    else loadTransaksi();
  }, [token, role, navigate]);

  const loadTransaksi = async () => {
    try {
      const data = await fetchTransaksi(token);
      setTransaksi(data);
    } catch (err) {
      console.error(err);
      alert("Gagal load transaksi");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Staff Dashboard</h1>

      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-2">Transaksi</h3>
        <button onClick={() => navigate("/staff/transaksi")} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Lihat & Tambah Transaksi
        </button>
      </div>

      <div className="p-4 bg-white rounded shadow mt-6">
        <h4 className="font-semibold">Total Transaksi</h4>
        <p className="text-2xl">{transaksi.length}</p>
      </div>
    </div>
  );
}
