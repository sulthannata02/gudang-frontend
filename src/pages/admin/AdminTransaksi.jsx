import React, { useEffect, useState, useMemo } from "react";
import { fetchTransaksi, createTransaksi, fetchBarang } from "../../api/api";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../layout/admin/AdminLayout";

export default function AdminTransaksi() {
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
    if (!token || role !== "admin") navigate("/login", { replace: true });
    else {
      loadTransaksi();
      loadBarang();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // membuat map id -> nama untuk lookup cepat
  const barangMap = useMemo(() => {
    const map = new Map();
    for (const b of barangList) {
      // pastikan key konsisten (string dan number)
      map.set(String(b.id), b.nama);
      map.set(Number(b.id), b.nama);
    }
    return map;
  }, [barangList]);

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

      const newId = data?.id ?? data?.ID ?? data?.Id;
      if (newId) {
        alert("Transaksi berhasil ditambahkan");
        setIdBarang("");
        setJenis("masuk");
        setJumlah("");
        setKeterangan("");
        loadTransaksi();
      } else {
        alert("Gagal menambahkan transaksi");
      }
    } catch {
      alert("Terjadi error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Transaksi admin</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-6 bg-white p-6 rounded shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            value={idBarang}
            onChange={(e) => setIdBarang(e.target.value)}
            className="w-full p-2 border rounded"
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
            className="w-full p-2 border rounded"
          >
            <option value="masuk">Masuk</option>
            <option value="keluar">Keluar</option>
          </select>

          <input
            type="number"
            placeholder="Jumlah"
            value={jumlah}
            onChange={(e) => setJumlah(e.target.value)}
            className="w-full p-2 border rounded"
            min={1}
            required
          />

          <input
            type="text"
            placeholder="Keterangan (opsional)"
            value={keterangan}
            onChange={(e) => setKeterangan(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full mt-4 py-2 rounded text-white ${
            loading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {loading ? "Memproses..." : "Tambah Transaksi"}
        </button>
      </form>

      {/* Table */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Daftar Transaksi</h2>
        <table className="w-full border-collapse border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Barang</th>
              <th className="p-2 border">Jenis</th>
              <th className="p-2 border">Jumlah</th>
              <th className="p-2 border">Keterangan</th>
            </tr>
          </thead>
          <tbody>
            {transaksi.map((t) => {
              // lookup prioritas:
              // 1) relasi object t.Barang.nama
              // 2) field langsung t.nama_barang
              // 3) lookup dari barangMap menggunakan t.id_barang
              const barangNama =
                t?.Barang?.nama ||
                t?.nama_barang ||
                barangMap.get(t.id_barang) ||
                barangMap.get(String(t.id_barang)) ||
                "Tidak ditemukan";

              return (
                <tr key={t.id} className="border-b hover:bg-gray-50">
                  <td className="p-2 border">{barangNama}</td>
                  <td className="p-2 border capitalize">{t.jenis}</td>
                  <td className="p-2 border">{t.jumlah}</td>
                  <td className="p-2 border">{t.keterangan}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
