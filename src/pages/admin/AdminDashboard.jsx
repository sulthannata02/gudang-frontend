import { useEffect, useState } from "react";
import { fetchBarang, fetchTransaksi } from "../../api/api";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../layout/admin/AdminLayout";

export default function AdminDashboard() {
  const [barang, setBarang] = useState([]);
  const [transaksi, setTransaksi] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (!token || role !== "admin") navigate("/login");
    else loadData();
  }, [token, role, navigate]);

  const loadData = async () => {
    try {
      setBarang(await fetchBarang(token));
      setTransaksi(await fetchTransaksi(token));
    } catch {
      alert("Gagal load data");
      navigate("/login");
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
          <h4 className="font-semibold text-gray-700">Total Barang</h4>
          <p className="text-4xl font-bold text-blue-500 mt-2">{barang.length}</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
          <h4 className="font-semibold text-gray-700">Total Transaksi</h4>
          <p className="text-4xl font-bold text-green-500 mt-2">{transaksi.length}</p>
        </div>
      </div>
    </AdminLayout>
  );
}
