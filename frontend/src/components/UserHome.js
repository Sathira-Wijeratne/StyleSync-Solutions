import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default function UserHome() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    function getProductDetails() {
      axios
        .get("http://localhost:8070/product/")
        .then((res) => {
          console.log(res.data);
          setProducts(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }

    getProductDetails();
  }, []);

  return (
    <div className="container">
      <div id="product-page-buttons" style={{ float: "right" }}>
        <a
          href="/"
          onClick={() => {
            sessionStorage.removeItem("sSyncSolRemotsuc");
            sessionStorage.removeItem("customerEmail");
          }}
        >
          {/*Buttons*/}
          <Button variant="danger">Signout</Button>
        </a>
      </div>
      <div id="product-page-heading" style={{ textAlign: "center" }}>
        <h1>All Products</h1>
      </div>
      <div id="product-page-body" style={{ marginTop: "40px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
          }}
        >
          {products.map((product) => (
            <div
              id="product-page-product"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "1rem",
                border: "2px solid #32a852",
                borderRadius: "20px"
              }}
              key={product[40]}
            >
              <img src={product[39]} style={{ maxWidth: "100%" }} />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: "1rem",
                }}
              >
                <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>
                  {product[1]}
                </h3>
                <span style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
                  {product[2]} €
                </span>
                <button className="btn btn-secondary" onClick={() => {
                  // window.location.replace(`http://localhost:3000/buyer/view/item/${product[40]}`);
                }}>View</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
