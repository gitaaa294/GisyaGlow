import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Finance = () => {
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


  const uangMasuk = 5000000;
  const uangKeluar = 2500000;
  const danaPerusahaan = uangMasuk - uangKeluar;

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
                <a className="nav-link" href="/dashboard">Produk</a>
              </li>
              <li className="nav-item"><a className="nav-link" href="#">Finance</a></li>
              <li className="nav-item">
                <button className="btn btn-outline-danger ms-2" onClick={handleLogout}>
                  Log Out
                </button>
              </li>
            </ul>
           
          </div>
        </div>
      </nav>

    
      <h3 className="mb-4">Halaman Keuangan (Finance)</h3>

      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm border-success">
            <div className="card-body">
              <h5 className="card-title text-success">Uang Masuk</h5>
              <p className="card-text fs-4 fw-bold">Rp {uangMasuk.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm border-danger">
            <div className="card-body">
              <h5 className="card-title text-danger">Uang Keluar</h5>
              <p className="card-text fs-4 fw-bold">Rp {uangKeluar.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm border-primary">
            <div className="card-body">
              <h5 className="card-title text-primary">Dana Perusahaan</h5>
              <p className="card-text fs-4 fw-bold">Rp {danaPerusahaan.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finance;
