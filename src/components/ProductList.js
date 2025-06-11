import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProductList() {
  const [produk, setProduk] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [formTambah, setFormTambah] = useState({ id: "", jumlah: "" });
  const [formKurang, setFormKurang] = useState({ id: "", jumlah: "" });
  const [viewMode, setViewMode] = useState("tabel"); // tabel atau gambar
  const [notif, setNotif] = useState({ message: "", type: "" });

  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  const fetchProduk = async (page) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/produk?page=${page}`
      );
      console.log("ISI RESPON BACKEND:", res.data);
      const dataProduk = res.data.data;
      if (Array.isArray(dataProduk)) {
        setProduk(dataProduk);
      } else {
        setProduk([]);
        console.warn("Data produk bukan array:", dataProduk);
      }
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error("Gagal memuat data produk", err);
      setProduk([]); 
    }
  };

  useEffect(() => {
    fetchProduk(page);
  }, [page]);

  const handleTambahProduk = async (e) => {
    e.preventDefault();
    setNotif({ message: "", type: "" });

    try {
      const res = await axios.post("http://localhost:5000/api/produk/tambah", {
        id: parseInt(formTambah.id),
        jumlah: parseInt(formTambah.jumlah),
      });

      setNotif({ message: res.data.message, type: "success" });
      setFormTambah({ id: "", jumlah: "" });
      fetchProduk(page);
    } catch (err) {
      const msg = err.response?.data?.message || "Terjadi kesalahan";
      setNotif({ message: msg, type: "danger" });
    }
  };
const handleKurangProduk = async (e) => {
  e.preventDefault();
  setNotif({ message: "", type: "" });

  try {
    const res = await axios.post("http://localhost:5000/api/produk/kurang", {
      id: parseInt(formKurang.id),
      jumlah: parseInt(formKurang.jumlah),
    });

    setNotif({ message: res.data.message, type: "success" });
    setFormKurang({ id: "", jumlah: "" });
    fetchProduk(page);
  } catch (err) {
    const msg = err.response?.data?.message || "Terjadi kesalahan";
    setNotif({ message: msg, type: "danger" });
  }
};
return (
  <div className="container py-4">
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4 shadow-sm rounded">
      <div className="container-fluid">
        <a className="navbar-brand fw-bold text-primary" href="#">
          GisyaGlow
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Produk
              </a>
            </li>
                <li className="nav-item"><a className="nav-link" href="/finance">Finance</a></li>
             <li className="nav-item">
              <button className="btn btn-outline-danger ms-2" onClick={handleLogout}>
                Log Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>


    <div className="d-flex justify-content-between align-items-center mb-3">
  <h3>Daftar Produk</h3>
  <select
    className="form-select w-auto"
    value={viewMode}
    onChange={(e) => setViewMode(e.target.value)}
  >
    <option value="tabel">Tabel</option>
    <option value="gambar">Gambar</option>
  </select>
</div>

    {notif.message && (
      <div className={`alert alert-${notif.type} alert-dismissible fade show`} role="alert">
        {notif.message}
        <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
      </div>
    )}

    {viewMode === "tabel" ? (
  <div className="table-responsive">
    <table className="table table-striped table-hover table-bordered">
      <thead className="table-primary text-center">
        <tr>
          <th>ID</th>
          <th>Nama</th>
          <th>Stok</th>
          <th>Harga</th>
        </tr>
      </thead>
      <tbody>
        {produk.length > 0 ? (
          produk.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nama_produk}</td>
              <td>{p.stock_produk}</td>
              <td>Rp {p.harga_produk}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className="text-center text-muted">
              Tidak ada data produk
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
) : (
  <div className="row">
    {produk.length > 0 ? (
      produk.map((p) => (
        <div className="col-md-4 mb-5" key={p.id}>
          <div className="card h-100 shadow-sm">
            <img
              src={`http://localhost:5000/images/produk/${p.gambar_produk}`}
              className="card-img-top"
              alt={p.nama_produk}
              style={{ height: "200px", objectFit: "cover" }}
            />
            <div className="card-body text-center">
              <h5 className="card-title">{p.nama_produk}</h5>
              <p className="card-text">ID: {p.id}</p>
              <p className="card-text">Harga: Rp {p.harga_produk}</p>
              <p className="card-text">Stok: {p.stock_produk}</p>
            </div>
          </div>
        </div>
      ))
    ) : (
      <div className="text-center text-muted">Tidak ada data produk</div>
    )}
  </div>
)}

    <div className="d-flex justify-content-between align-items-center mt-4">
      <button
        className="btn btn-outline-secondary"
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        disabled={page === 1}
      >
        &laquo; Prev
      </button>
      <span>Halaman <strong>{page}</strong> dari <strong>{totalPages}</strong></span>
      <button
        className="btn btn-outline-secondary"
        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={page === totalPages}
      >
        Next &raquo;
      </button>
    </div>

    <div className="card shadow-sm mt-5">
      <div className="card-header bg-primary text-white">
        Tambah Stok Produk
      </div>
      <div className="card-body">
        <form onSubmit={handleTambahProduk}>
          <div className="mb-3">
            <label className="form-label">ID Produk</label>
            <input
              type="number"
              className="form-control"
              value={formTambah.id}
              onChange={(e) => setFormTambah({ ...formTambah, id: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Jumlah</label>
            <input
              type="number"
              className="form-control"
              value={formTambah.jumlah}
              onChange={(e) => setFormTambah({ ...formTambah, jumlah: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn btn-success">Tambah</button>
        </form>
      </div>
<div className="card shadow-sm mt-4">
  <div className="card-header bg-danger text-white">
    Kurangi Stok Produk
  </div>
  <div className="card-body">
    <form onSubmit={handleKurangProduk}>
      <div className="mb-3">
        <label className="form-label">ID Produk</label>
        <input
          type="number"
          className="form-control"
          value={formKurang.id}
          onChange={(e) => setFormKurang({ ...formKurang, id: e.target.value })}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Jumlah</label>
        <input
          type="number"
          className="form-control"
          value={formKurang.jumlah}
          onChange={(e) => setFormKurang({ ...formKurang, jumlah: e.target.value })}
          required
        />
      </div>
      <button type="submit" className="btn btn-danger">Kurangi</button>
    </form>
  </div>
</div>

    </div>
  </div>
);

};

export default ProductList;
