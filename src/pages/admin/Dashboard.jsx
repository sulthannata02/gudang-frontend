import React, { useEffect, useState } from "react";
import { fetchBarang, fetchTransaksi } from "../../api/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [barang, setBarang] = useState([]);
  const [transaksi, setTransaksi] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (!token || role !== "admin") {
      navigate("/login");
    } else {
      loadData();
    }
  }, [token, role, navigate]);

  const loadData = async () => {
    try {
      const barangData = await fetchBarang(token);
      setBarang(barangData);

      const transaksiData = await fetchTransaksi(token);
      setTransaksi(transaksiData);
    } catch (err) {
      console.error(err);
      alert("Gagal load data.");
      navigate("/login");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-2">Manajemen Barang</h3>
        <button
          onClick={() => navigate("/admin/barang")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Lihat & Tambah Barang
        </button>
      </div>

      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-2">Transaksi</h3>
        <button
          onClick={() => navigate("/admin/transaksi")}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Lihat & Tambah Transaksi
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="p-4 bg-white rounded shadow">
          <h4 className="font-semibold">Total Barang</h4>
          <p className="text-2xl">{barang.length}</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h4 className="font-semibold">Total Transaksi</h4>
          <p className="text-2xl">{transaksi.length}</p>
        </div>
      </div>
    </div>
  );
}
