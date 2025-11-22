import React, { useEffect, useState } from "react";
import { fetchBarang, createBarang } from "../../api/api";
import { useNavigate } from "react-router-dom";

export default function BarangPage() {
  const [barang, setBarang] = useState([]);
  const [nama, setNama] = useState("");
  const [stok, setStok] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  // cek token & role saat page load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || role !== "admin") {
      navigate("/login", { replace: true });
    } else {
      loadBarang();
    }
  }, [role, navigate]);

  // fetch data barang
  const loadBarang = async () => {
    try {
      const data = await fetchBarang();
      setBarang(data || []);
    } catch (err) {
      console.error(err);
      alert("Gagal load data barang");
    }
  };

  // tambah barang
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await createBarang({
        nama,
        stok: Number(stok),
        lokasi,
      });

      if (data.id) {
        alert("Barang berhasil ditambahkan");
        setNama("");
        setStok("");
        setLokasi("");
        loadBarang();
      } else if (data.error) {
        alert("Gagal: " + data.error);
      } else {
        alert("Gagal menambahkan barang");
      }
    } catch (err) {
      console.error(err);
      alert("Error saat menambahkan barang");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Manajemen Barang</h1>

      <form onSubmit={handleSubmit} className="mb-6 bg-white p-6 rounded shadow">
        <input
          type="text"
          placeholder="Nama Barang"
          className="border p-2 mb-2 w-full rounded"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Stok"
          className="border p-2 mb-2 w-full rounded"
          value={stok}
          onChange={(e) => setStok(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Lokasi"
          className="border p-2 mb-4 w-full rounded"
          value={lokasi}
          onChange={(e) => setLokasi(e.target.value)}
          required
        />
        <button
          type="submit"
          className={`w-full py-2 rounded text-white ${
            loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={loading}
        >
          {loading ? "Loading..." : "Tambah Barang"}
        </button>
      </form>

      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Daftar Barang</h2>
        <table className="w-full border-collapse border">
          <thead>
            <tr className="border-b">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Nama</th>
              <th className="p-2 border">Stok</th>
              <th className="p-2 border">Lokasi</th>
            </tr>
          </thead>
          <tbody>
            {barang.length ? (
              barang.map((b) => (
                <tr key={b.id} className="border-b">
                  <td className="p-2 border">{b.id}</td>
                  <td className="p-2 border">{b.nama}</td>
                  <td className="p-2 border">{b.stok}</td>
                  <td className="p-2 border">{b.lokasi}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-2 text-center">
                  Data kosong
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
