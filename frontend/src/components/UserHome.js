import React, { useState, useEffect } from "react";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default function UserHome() {
  const [products, setProducts] = useState([]);
  const [avgRatings, setAvgRatings] = useState({});
  const [title_orig, settitle_orig] = useState([]);
  const customerEmail = sessionStorage.getItem("customerEmail");

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

    // Fetch ratings data and calculate average ratings using the getAverageRatings function
    axios.get("http://localhost:8070/rating").then((res) => {
      setAvgRatings(getAverageRatings(res.data));
    });

    getProductDetails();
  }, []);

  // // Function to calculate average ratings for each item using the ratings data fetched from the API
  // function getAverageRatings(arr) {
  //   const itemMap = new Map();
  //   const result = {};

  //   arr.forEach((obj) => {
  //     if (!itemMap.has(obj.title_orig)) {
  //       itemMap.set(obj.title_orig, [obj.rate]);
  //     } else {
  //       itemMap.get(obj.title_orig).push(obj.rate);
  //     }
  //   });

  //   itemMap.forEach((value, key) => {
  //     const sum = value.reduce((acc, curr) => acc + curr, 0);
  //     const avg = sum / value.length;
  //     result[key] = avg;
  //   });

  //   return result;
  // }
  function getAverageRatings(arr) {
    console.log(arr);
    const itemMap = new Map();
    const result = {};

    arr.forEach((obj) => {
      if (!itemMap.has(obj.title_orig)) {
        itemMap.set(obj.title_orig, [obj.noOfRate]);
      } else {
        itemMap.get(obj.title_orig).push(obj.noOfRate);
      }
    });

    itemMap.forEach((value, key) => {
      const sum = value.reduce((acc, curr) => acc + curr, 0);
      const avg = sum / value.length;
      result[key] = avg;
    });

    return result;
  }

  return (
    <div
      className="container"
      style={{ background: "#eee", padding: "3em", borderRadius: "20px" }}
    >
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
        <h1>All Summer Products ☀️</h1>
      </div>
      <div
        id="product-page-body"
        style={{ marginTop: "40px", marginBottom: "40px" }}
      >
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
                border: "5px solid #32a852",
                borderRadius: "20px",
              }}
              key={product[40]}
            >
              <div className="grow">
                <img
                  src={product[39]}
                  style={{ maxWidth: "100%", borderRadius: "10px" }}
                />
              </div>
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
                  {parseFloat(product[2]).toFixed(2)} €
                </span>
                <Rater
                  total={5}
                  rating={avgRatings[product[1]]}
                  interactive={false}
                  style={{ fontSize: "30px" }}
                />
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    window.location.replace(
                      `http://localhost:3000/viewproduct/${product[40]}`
                    );
                  }}
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
