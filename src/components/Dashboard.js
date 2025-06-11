// src/components/Dashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

function Dashboard() {
  const [showToast, setShowToast] = useState(false);
  const [produkList, setProdukList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/produk")
      .then((res) => res.json())
      .then((data) => {
        console.log("Produk dari backend:", data);
        setProdukList(data);
      })
      .catch((err) => console.error("Gagal mengambil data produk:", err));
  }, []);
  return (
    <div>
      <h1 style={{ fontSize: "28px", color: "#1e3a8a", marginBottom: "20px" }}>
        Gudang Perhiasan
      </h1>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "white",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
        }}
      >
        <thead style={{ backgroundColor: "#d0e3ff", color: "#1e3a8a" }}>
          <tr>
            <th style={{ textAlign: "left", padding: "16px" }}>Id</th>
            <th style={{ textAlign: "left", padding: "16px" }}>Nama Produk</th>
            <th style={{ textAlign: "left", padding: "16px" }}>Harga</th>
            <th style={{ textAlign: "left", padding: "16px" }}>Stok</th>
          </tr>
        </thead>
        <tbody>
          {produkList.map((prod, i) => (
            <tr
              key={i}
              style={{ backgroundColor: i % 2 === 1 ? "#f0f7ff" : "" }}
            >
              <td style={{ padding: "16px" }}>{prod.id}</td>
              <td style={{ padding: "16px" }}>{prod.nama_produk}</td>
              <td style={{ padding: "16px" }}>{prod.stock_produk}</td>
              <td style={{ padding: "16px" }}>{prod.harga_produk}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Dashboard;
