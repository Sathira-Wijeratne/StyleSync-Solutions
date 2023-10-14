import React, { useState, useEffect } from "react";
import axios from "axios";

export default function PurchaseHistory() {
  if (sessionStorage.getItem("sSyncSolRemotsuc") === null) {
    window.location.replace("/");
  }

  const [products, setProducts] = useState([]);
  const buyerEmail = sessionStorage.getItem("customerEmail");

  //variables and functions for sort feature
  const sortByNewestDate = (products) => {
    return products.slice().sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate));
  };

  const sortByOldestDate = (products) => {
    return products.slice().sort((a, b) => new Date(a.purchaseDate) - new Date(b.purchaseDate));
  };

  const sortByHighestTotal = (products) => {
    return products.slice().sort((a, b) => b.purchaseTotal - a.purchaseTotal);
  };

  const sortByLeastTotal = (products) => {
    return products.slice().sort((a, b) => a.purchaseTotal - b.purchaseTotal);
  };

  const sortedByNewestDate = sortByNewestDate(products);
  const sortedByOldestDate = sortByOldestDate(products);
  const sortedByHighestTotal = sortByHighestTotal(products);
  const sortedByLeastTotal = sortByLeastTotal(products);

  //set sorted products to displayed products
  function sortByNewDate() {
    setProducts(sortedByNewestDate);
  }

  function sortByOldDate() {
    setProducts(sortedByOldestDate);
  }

  function sortByHighTotal() {
    setProducts(sortedByHighestTotal);
  }

  function sortByLowTotal() {
    setProducts(sortedByLeastTotal);
  }

  /*variables and functions for sort feature end */

  useEffect(() => {
    function getPurchasedProducts() {
      axios
        .get(`http://localhost:8070/purchases/get/${buyerEmail}`)
        .then((res) => {
          console.log(res.data);
          setProducts(res.data);
        })
        .catch((err) => {
          alert("Could not fetch product details");
          console.log(err.message);
        });
    }

    getPurchasedProducts();
  }, []);

  return (<div>
    <nav aria-label="breadcrumb">
      <span class="breadcrumb">
        <div className="container">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="/home/1">Home</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              Purchase History
            </li>
          </ol>
        </div>
      </span>
    </nav>
    <div className="container">
      <div id="product-page-heading" style={{ textAlign: "center" }}>
        <h1>💰 Transaction History 💰</h1>
      </div>
      <div class="col-md-12">
        <div class="card mb-4">
          <div class="card-header py-3" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h3 class="mb-0">Purchase History</h3>

            <div class="dropdown">
              <button className='btn btn-dark dropdown-toggle' type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Sort by
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" onClick={sortByNewDate}>Newest</a>
                <a class="dropdown-item" onClick={sortByOldDate}>Oldest</a>
                <a class="dropdown-item" onClick={sortByHighTotal}>Most Expensive</a>
                <a class="dropdown-item" onClick={sortByLowTotal}>Least Expensive</a>
              </div>
            </div>
          </div>
          {products.map((product) => (
            <>
              <div class="card-body">
                <b>
                  <p>
                    Purchase Date:{" "}
                    {new Date(product.purchaseDate).toLocaleDateString()}
                  </p>
                </b>

                {product.purchaseItems.map((item) => (
                  <>
                    <div class="row" key={item.productId}>
                      <div class="col-lg-3 col-md-12 mb-4 mb-lg-0">
                        <div
                          class="bg-image hover-overlay hover-zoom ripple rounded"
                          data-mdb-ripple-color="light"
                        >
                          <img
                            src={item.productImage}
                            class="w-100"
                            alt="Blue Jeans Jacket"
                          />
                          <a href="#!">
                            <div
                              className="mask"
                              style={{
                                backgroundColor: "rgba(251, 251, 251, 0.2)",
                              }}
                            ></div>
                          </a>
                        </div>
                      </div>

                      <div class="col-lg-5 col-md-6 mb-4 mb-lg-0">
                        <p>
                          <strong>{item.productName}</strong>
                        </p>
                        <p>Size: {item.productSize}</p>
                        <p class="text-start">
                          Cost : <strong>{parseFloat(item.productPrice).toFixed(2)} €</strong>
                        </p>
                      </div>

                      <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
                        <div
                          className="d-flex mb-4"
                          style={{ maxWidth: 300 }}
                        >
                          <div class="form-outline">
                            <label class="form-label" for="form1">
                              <b>Quantity</b>
                            </label>
                            <input
                              id="form1"
                              min="1"
                              name="quantity"
                              value={item.productQuantity}
                              type="number"
                              class="form-control"
                              style={{ border: "3px solid #000000" }}
                              disabled
                            />

                          </div>
                        </div>
                      </div>
                    </div>
                    <br></br>
                  </>
                ))}
                <center>
                  <h3>
                    <b>Total : {parseFloat(product.purchaseTotal).toFixed(2)} €</b>
                  </h3>
                </center>
              </div>
              <hr
                class="my-4"
                style={{ height: "3px", background: "black" }}
              />
            </>
          ))}
        </div>
      </div>
    </div>
  </div>
  );
}
