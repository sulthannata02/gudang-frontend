import React, { useEffect, useState } from "react";
import { fetchTransaksi, fetchBarang } from "../../api/api";
import { useNavigate } from "react-router-dom";
import StaffLayout from "../../layout/staff/StaffLayout";

export default function StaffDashboard() {
  const [transaksi, setTransaksi] = useState([]);
  const [barangList, setBarangList] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (!token || role !== "staff") navigate("/login", { replace: true });
    else {
      loadTransaksi();
      loadBarang();
    }
  }, [token, role, navigate]);

  const loadTransaksi = async () => {
    try {
      const data = await fetchTransaksi(token);
      setTransaksi(data || []);
    } catch {
      alert("Gagal load transaksi");
    }
  };

  const loadBarang = async () => {
    try {
      const data = await fetchBarang(token);
      setBarangList(data || []);
    } catch {
      alert("Gagal load barang");
    }
  };

  return (
    <StaffLayout>
      <h1 className="text-3xl font-bold mb-6">Dashboard Staff</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
          <h4 className="font-semibold text-gray-700">Total Barang</h4>
          <p className="text-4xl font-bold text-blue-500 mt-2">{barangList.length}</p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
          <h4 className="font-semibold text-gray-700">Total Transaksi</h4>
          <p className="text-4xl font-bold text-green-500 mt-2">{transaksi.length}</p>
        </div>
      </div>
    </StaffLayout>
  );
}
