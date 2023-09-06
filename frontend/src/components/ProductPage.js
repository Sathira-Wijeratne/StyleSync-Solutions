import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Rater from "react-rater";
import Button from "react-bootstrap/Button";

export default function ProductPage() {
  const [product, setProduct] = useState([]);
  const { id } = useParams();
  const [rate, setRate] = useState(0); // Initial user rating for the product is set to 0

  useEffect(() => {
    axios
      .get(`http://localhost:8070/product/getDetails/${id}`)
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });

    // Fetching the user rating for the product
    axios
      .get(`http://localhost:8070/rating/get/${customerEmail}/${title_orig}`)
      .then((res) => {
        console.log(res.data);
        setRate(res.data[0].rate); // If user has already rated the product, set the rating to the user's previous rating
      });
  });

  // Function to allow users to rate the product
  function rateProduct(value) {
    const newRate = {
      title_orig,
      customerEmail,
      noOfRate,
    };
    // Check if the product has been rated before or not
    if (rate === 0) {
      // If not, add the rating to the server
      axios.post("http://localhost:8071/rate/add", newRate).catch((err) => {
        alert("Rating Service is not available.");
      });
    } else {
      // If already rated, update the rating on the server
      axios.put("http://localhost:8071/rate/update", newRate).catch((err) => {
        alert("Rating Service is not available.");
      });
    }
  }

  return (
    // Referenced from : https://bootsnipp.com/snippets/56bAW
    <div class="container" style={{ marginBottom: "40px" }}>
      <div>
        <a type="button" href="/home">
          <Button variant="dark">Back</Button>
        </a>
      </div>
      <div class="card" style={{ marginTop: "20px" }}>
        <div class="container-fliud">
          <div class="wrapper row">
            <div class="preview col-md-6">
              <div class="preview-pic tab-content">
                <div class="tab-pane active grow" id="pic-1">
                  <img style={{ borderRadius: "10px" }} src={product[39]} />
                </div>
              </div>
            </div>
            {/* Create a Rater component to allow users to rate the product */}
            <b>Rate the Product</b> &nbsp;
            <Rater
              onRate={(noOfRate) => {
                rateProduct(noOfRate.rating);
              }}
              total={5}
              rating={rate}
              style={{ fontSize: "30px" }}
            />
            <div class="details col-md-6">
              <h3 class="product-title">{product[1]}</h3>
              <div class="rating">
                <div class="stars">
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star"></span>
                  <span class="fa fa-star"></span>
                </div>
                <span class="review-no">{product[8]} reviews</span>
              </div>
              {/* <p class="product-description">Suspendisse quos? Tempus cras iure temporibus? Eu laudantium cubilia sem sem! Repudiandae et! Massa senectus enim minim sociosqu delectus posuere.</p> */}
              <h4 class="price">
                Price: <span>{parseFloat(product[2]).toFixed(2)} €</span>
              </h4>
              {/* <p class="vote"><strong>91%</strong> of buyers enjoyed this product! <strong>(87 votes)</strong></p> */}
              <h5 class="sizes">
                Size:
                <span class="size" data-toggle="tooltip" title="small">
                  {product[20]}
                </span>
              </h5>
              <div
                style={{ display: "flex", alignItems: "center" }}
                className="sizes"
              >
                <span style={{ marginRight: "10px" }}>Quantity: </span>
                <input
                  className="form-control"
                  type="number"
                  min="1"
                  defaultValue="1"
                  style={{ width: "80px" }}
                />
              </div>

              <div class="action">
                <button
                  class="add-to-cart btn btn-default"
                  type="button"
                  style={{ marginRight: "10px" }}
                >
                  Add to cart
                </button>
                <button class="like btn btn-default" type="button">
                  <span class="fa fa-heart"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
