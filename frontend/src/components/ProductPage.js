import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

export default function ProductPage() {
    const [product, setProduct] = useState([]);
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);
    const buyerEmail = sessionStorage.getItem("customerEmail");


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
    });

    function addToCart() {
        const cart = {
            productId: product[40],
            productName: product[1],
            buyerId: buyerEmail,
            productPrice: product[2],
            productImage: product[39],
            productSize: product[20],
            productReviewCount: product[8],
            productQuantity: quantity,
        };
        axios
            .post("http://localhost:8070/cart/add", cart)
            .then(() => {
                alert("Item added to cart!");
            })
            .catch((err) => {
                alert("Something went wrong!");
            });
    }

    return (
        // Referenced from : https://bootsnipp.com/snippets/56bAW
        <div class="container" style={{ marginBottom: "40px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <a type="button" href="/home">
                    <Button variant="dark">Back</Button>
                </a>
                <a type="button" href="/cart">
                    <FontAwesomeIcon icon={faCartShopping} shake size="2xl" />
                </a>
            </div>
            <div class="product-page-card" style={{ marginTop: "20px" }}>
                <div class="container-fliud">
                    <div class="wrapper row">
                        <div class="preview col-md-6">
                            <div class="preview-pic tab-content">
                                <div class="tab-pane active grow" id="pic-1">
                                    <img style={{ borderRadius: "10px" }} src={product[39]} />
                                </div>
                            </div>
                        </div>
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
                                    onChange={(e) => {
                                        setQuantity(e.target.value);
                                    }}
                                />
                            </div>

                            <div class="action">
                                <button
                                    class="add-to-cart btn btn-default"
                                    type="button"
                                    onClick={addToCart}
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
