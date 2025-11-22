const BASE_URL = "http://localhost:8080/api";

const getTokenHeader = () => {
  const token = localStorage.getItem("token");
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
};

export const login = async (username, password) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
};

export const fetchBarang = async () => {
  const res = await fetch(`${BASE_URL}/barang`, {
    headers: {
      ...getTokenHeader(),
    },
  });
  return res.json();
};

export const createBarang = async (payload) => {
  const res = await fetch(`${BASE_URL}/barang`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getTokenHeader(),
    },
    body: JSON.stringify(payload),
  });
  return res.json();
};

// update, delete, transaksi similarly if needed
export const updateBarang = async (id, payload) => {
  const res = await fetch(`${BASE_URL}/barang/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getTokenHeader(),
    },
    body: JSON.stringify(payload),
  });
  return res.json();
};

export const deleteBarang = async (id) => {
  const res = await fetch(`${BASE_URL}/barang/${id}`, {
    method: "DELETE",
    headers: {
      ...getTokenHeader(),
    },
  });
  return res.json();
};

export const fetchTransaksi = async () => {
  const res = await fetch(`${BASE_URL}/transaksi`, {
    headers: {
      ...getTokenHeader(),
    },
  });
  return res.json();
};

export const createTransaksi = async (payload) => {
  const res = await fetch(`${BASE_URL}/transaksi`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getTokenHeader(),
    },
    body: JSON.stringify(payload),
  });
  return res.json();
};
