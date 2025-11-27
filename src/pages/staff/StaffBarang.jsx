import React, { useEffect, useState } from "react";
import { fetchBarang } from "../../api/api";
import { useNavigate } from "react-router-dom";
import StaffLayout from "../../layout/staff/StaffLayout";

export default function StaffBarang() {
  const [barang, setBarang] = useState([]);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (!token || role !== "staff") navigate("/login");
    else loadBarang();
  }, [token, role, navigate]);

  const loadBarang = async () => {
    try {
      const data = await fetchBarang(token);
      setBarang(data || []);
    } catch {
      alert("Gagal load data barang");
    }
  };

  return (
    <StaffLayout>
      <h1 className="text-3xl font-bold mb-6">Daftar Barang</h1>

      <div className="bg-white rounded shadow p-6">
        <h2 className="text-xl font-semibold mb-4">List Barang</h2>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border">Nama</th>
              <th className="p-3 border">Stok</th>
              <th className="p-3 border">Lokasi</th>
            </tr>
          </thead>

          <tbody>
            {barang.length > 0 ? (
              barang.map((b) => (
                <tr key={b.id}>
                  <td className="p-3 border">{b.nama}</td>
                  <td className="p-3 border">{b.stok}</td>
                  <td className="p-3 border">{b.lokasi}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-3 border text-center" colSpan={3}>
                  Tidak ada data barang
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </StaffLayout>
  );
}
