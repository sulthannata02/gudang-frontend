import React, { useEffect, useState } from "react";
import { fetchTransaksi, createTransaksi, fetchBarang } from "../../api/api";
import { useNavigate } from "react-router-dom";

export default function TransaksiPage() {
  const [transaksi, setTransaksi] = useState([]);
  const [barangList, setBarangList] = useState([]);
  const [idBarang, setIdBarang] = useState("");
  const [jenis, setJenis] = useState("masuk");
  const [jumlah, setJumlah] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || role !== "admin") navigate("/login");
    else {
      loadTransaksi();
      loadBarang();
    }
  }, [token, role, navigate]);

  const loadTransaksi = async () => {
    try {
      const data = await fetchTransaksi(); // TOKEN HILANGKAN
      setTransaksi(data);
    } catch (err) {
      console.error(err);
      alert("Gagal load transaksi");
    }
  };

  const loadBarang = async () => {
    try {
      const data = await fetchBarang(); // TOKEN HILANGKAN
      setBarangList(data);
    } catch (err) {
      console.error(err);
      alert("Gagal load barang");
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const data = await createTransaksi({
      id_barang: Number(idBarang),
      jenis,
      jumlah: Number(jumlah),
      keterangan,
    });

    // === FIX BAGIAN INI ===
    const newId = data.id || data.ID || data.Id;

    if (newId) {
      alert("Transaksi berhasil ditambahkan");
      setIdBarang("");
      setJenis("");
      setJumlah("");
      setKeterangan("");
      loadTransaksi();
    } else {
      console.log("DEBUG RESP:", data);
      alert("Gagal menambahkan transaksi");
    }
  } catch (err) {
    console.error(err);
    alert("Error saat menambahkan transaksi");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Manajemen Transaksi</h1>

      <form onSubmit={handleSubmit} className="mb-6 bg-white p-6 rounded shadow">
        <select
          value={idBarang}
          onChange={(e) => setIdBarang(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
          required
        >
          <option value="">Pilih Barang</option>
          {barangList.map((b) => (
            <option key={b.id} value={b.id}>
              {b.nama}
            </option>
          ))}
        </select>

        <select
          value={jenis}
          onChange={(e) => setJenis(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        >
          <option value="masuk">Masuk</option>
          <option value="keluar">Keluar</option>
        </select>

        <input
          type="number"
          placeholder="Jumlah"
          className="w-full p-2 mb-2 border rounded"
          value={jumlah}
          onChange={(e) => setJumlah(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Keterangan"
          className="w-full p-2 mb-4 border rounded"
          value={keterangan}
          onChange={(e) => setKeterangan(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white ${
            loading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {loading ? "Loading..." : "Tambah Transaksi"}
        </button>
      </form>

      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Daftar Transaksi</h2>
        <table className="w-full border-collapse border">
          <thead>
            <tr className="border-b">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Barang</th>
              <th className="p-2 border">Jenis</th>
              <th className="p-2 border">Jumlah</th>
              <th className="p-2 border">Keterangan</th>
            </tr>
          </thead>
          <tbody>
            {transaksi.map((t) => (
              <tr key={t.id} className="border-b">
                <td className="p-2 border">{t.id}</td>
                <td className="p-2 border">
                  {t.barang?.nama || t.id_barang}
                </td>
                <td className="p-2 border">{t.jenis}</td>
                <td className="p-2 border">{t.jumlah}</td>
                <td className="p-2 border">{t.keterangan}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
