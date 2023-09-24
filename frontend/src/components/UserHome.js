import React, { useState, useEffect } from "react";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
// import Button from "react-bootstrap/Button";
import axios from "axios";
import womens from "../images/womens.png";
import imageTwo from "../images/imageTwo.png";
import image03 from "../images/image03.png";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faCartShopping,
//   faClockRotateLeft,
// } from "@fortawesome/free-solid-svg-icons";

export default function UserHome() {
  const [products, setProducts] = useState([]);
  const [avgRatings, setAvgRatings] = useState({});
  const [title_orig, settitle_orig] = useState([]);
  const customerEmail = sessionStorage.getItem("customerEmail");
  const [FeaturedProductOne, setFeaturedProductOne] = useState([]);
  const [FeaturedProductTwo, setFeaturedProductTwo] = useState([]);
  const [FeaturedProductThree, setFeaturedProductThree] = useState([]);
  const [FeaturedProductFour, setFeaturedProductFour] = useState([]);

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

    axios.get("http://localhost:8070/rating/featuredProducts").then((res) => {
      axios
        .get(
          `http://localhost:8070/product/getFeaturedDetails/${res.data[0]._id}`
        )
        .then((res) => {
          setFeaturedProductOne(res.data);
        });
      axios
        .get(
          `http://localhost:8070/product/getFeaturedDetails/${res.data[1]._id}`
        )
        .then((res) => {
          setFeaturedProductTwo(res.data);
        });
      axios
        .get(
          `http://localhost:8070/product/getFeaturedDetails/${res.data[2]._id}`
        )
        .then((res) => {
          setFeaturedProductThree(res.data);
        });
      axios
        .get(
          `http://localhost:8070/product/getFeaturedDetails/${res.data[3]._id}`
        )
        .then((res) => {
          setFeaturedProductFour(res.data);
        });
    });
  }, []);

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
  <div>
<div className="container-flex" style={{ height: "50vh", overflow: "hidden" }}>
  <div id="carouselExampleControls" className="carousel slide" data-ride="carousel" style={{ height: "100%" }}>
    <div className="carousel-inner" style={{ height: "100%" }}>
      <div className="carousel-item active" style={{ height: "100%" }}>
        <img
          className="d-block w-100"
          src={image03}
          alt="Second slide"
          style={{ maxHeight: "100%", width: "100%", objectFit: "cover" }}
        />
      </div>
      <div className="carousel-item" style={{ height: "100%" }}>
        <img
          className="d-block w-100"
          src={imageTwo}
          alt="Second slide"
          style={{ maxHeight: "100%", width: "100%", objectFit: "cover" }}
        />
      </div>
      <div className="carousel-item" style={{ height: "100%" }}>
        <img
          className="d-block w-100"
          src={womens}
          alt="Second slide"
          style={{ maxHeight: "100%", width: "100%", objectFit: "cover" }}
        />
      </div>
    </div>
    <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="sr-only">Previous</span>
    </a>
    <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="sr-only">Next</span>
    </a>
  </div>
</div>   
     <div>
      <div
        className="container-flex"
        style={{
          background: "#eee",
          padding: "3em",
          borderRadius: "00px",
          marginBottom: "20px",
        }}
      >
        <div>
          <div id="product-page-heading" style={{ textAlign: "center" }}>
          <h1 style={{ fontFamily: 'Oswald, sans-serif' }}>Featured Products</h1>


            <br></br>
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
            {/* Featured Product one */}
            <div
                id="product-page-product"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "1rem",
                  border: "5px solid #027ee3",
                  borderColor:"black",
                  borderRadius: "20px",
              }}
              key={FeaturedProductOne[1]}
            >
            <div className="grow">
              <img
                src={FeaturedProductOne[39]}
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
                    {FeaturedProductOne[1]}
                  </h3>

                  <span style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
                    {parseFloat(FeaturedProductOne[2]).toFixed(2)} €
                  </span>

                  <Rater
                    total={5}
                    rating={avgRatings[FeaturedProductOne[1]]}
                    interactive={false}
                    style={{ fontSize: "30px" }}
                  />

                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      window.location.replace(
                        `http://localhost:3000/viewproduct/${FeaturedProductOne[40]}`
                      );
                    }}
                    style={{ backgroundColor: "black", color: "white" }}
                  >
                    View
                  </button>
                </div>
              </div>

              {/* Featured Product two */}
              <div
                id="product-page-product"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "1rem",
                  border: "5px solid #027ee3",
                  borderColor:"black",
                  borderRadius: "20px",
                }}
                key={FeaturedProductTwo[2]}
              >
                <div className="grow">
                  <img
                    src={FeaturedProductTwo[39]}
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
                    {FeaturedProductTwo[1]}
                  </h3>
                  <span style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
                    {parseFloat(FeaturedProductTwo[2]).toFixed(2)} €
                  </span>

                  <Rater
                    total={5}
                    rating={avgRatings[FeaturedProductTwo[1]]}
                    interactive={false}
                    style={{ fontSize: "30px" }}
                  />
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      window.location.replace(
                        `http://localhost:3000/viewproduct/${FeaturedProductTwo[40]}`
                      );
                    }}
                    style={{ backgroundColor: "black", color: "white" }}
                  >
                    View
                  </button>
                </div>
              </div>

              {/* Featured Product three */}
              <div
                id="product-page-product"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "1rem",
                  border: "5px solid #027ee3",
                  borderColor:"black",
                  borderRadius: "20px",
                }}
                key={FeaturedProductThree[3]}
              >
                <div className="grow">
                  <img
                    src={FeaturedProductThree[39]}
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
                    {FeaturedProductThree[1]}
                  </h3>
                  <span style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
                    {parseFloat(FeaturedProductThree[2]).toFixed(2)} €
                  </span>

                  <Rater
                    total={5}
                    rating={avgRatings[FeaturedProductThree[1]]}
                    interactive={false}
                    style={{ fontSize: "30px" }}
                  />
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      window.location.replace(
                        `http://localhost:3000/viewproduct/${FeaturedProductThree[40]}`
                      );
                    }}
                    style={{ backgroundColor: "black", color: "white" }}
                  >
                    View
                  </button>
                </div>
              </div>

              {/* Featured Product four */}
              <div
                id="product-page-product"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "1rem",
                  border: "5px solid #027ee3",
                  borderColor:"black",
                  borderRadius: "20px",
                }}
                key={FeaturedProductFour[4]}
              >
                <div className="grow">
                  <img
                    src={FeaturedProductFour[39]}
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
                    {FeaturedProductFour[1]}
                  </h3>
                  <span style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
                    {parseFloat(FeaturedProductFour[2]).toFixed(2)} €
                  </span>

                  <Rater
                    total={5}
                    rating={avgRatings[FeaturedProductFour[1]]}
                    interactive={false}
                    style={{ fontSize: "30px" }}
                  />
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      window.location.replace(
                        `http://localhost:3000/viewproduct/${FeaturedProductFour[40]}`
                      );
                    }}
                    style={{ backgroundColor: "black", color: "white" }}
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
            <br></br>

            <div>
              <div id="product-page-heading" style={{ textAlign: "center" }}>
              <h1 style={{ fontFamily: 'Oswald, sans-serif' }}>All Products</h1>

                <br></br>
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
                        border: "5px solid #027ee3",
                        borderColor:"black",
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
                        <h3
                          style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}
                        >
                          {product[1]}
                        </h3>
                        <span
                          style={{ fontWeight: "bold", marginBottom: "0.5rem" }}
                        >
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
                          style={{ backgroundColor: "black", color: "white" }}
                        >
                          View
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> 
  );
}
