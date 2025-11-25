import React, { useEffect, useState } from "react";
import { fetchBarang, createBarang } from "../../api/api";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../layout/admin/AdminLayout";

export default function AdminBarang() {
  const [barang, setBarang] = useState([]);
  const [nama, setNama] = useState("");
  const [stok, setStok] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (!token || role !== "admin") navigate("/login");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await createBarang(
        { nama, stok: Number(stok), lokasi },
        token
      );
      if (data && data.id) {
        alert("Barang berhasil ditambahkan");
        setNama(""); setStok(""); setLokasi("");
        loadBarang();
      }
    } catch {
      alert("Gagal menambah barang");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Manajemen Barang</h1>
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Tambah Barang</h2>
        <input type="text" placeholder="Nama Barang" value={nama} onChange={e=>setNama(e.target.value)} className="w-full p-3 border rounded mb-3" required />
        <input type="number" placeholder="Stok" value={stok} onChange={e=>setStok(e.target.value)} className="w-full p-3 border rounded mb-3" required />
        <input type="text" placeholder="Lokasi" value={lokasi} onChange={e=>setLokasi(e.target.value)} className="w-full p-3 border rounded mb-3" required />
        <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          {loading ? "Menyimpan..." : "Simpan"}
        </button>
      </form>

      <div className="bg-white rounded shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Daftar Barang</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border">Nama</th>
              <th className="p-3 border">Stok</th>
              <th className="p-3 border">Lokasi</th>
            </tr>
          </thead>
          <tbody>
            {barang.length > 0 ? barang.map(b=>(
              <tr key={b.id}>
                <td className="p-3 border">{b.nama}</td>
                <td className="p-3 border">{b.stok}</td>
                <td className="p-3 border">{b.lokasi}</td>
              </tr>
            )) : (
              <tr>
                <td className="p-3 border text-center" colSpan={3}>Tidak ada data barang</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
