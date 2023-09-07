import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

export default function PurchaseHistory() {
    const [products, setProducts] = useState([]);
    const buyerEmail = sessionStorage.getItem("customerEmail");

    useEffect(() => {
        function getPurchasedProducts() {
            axios.get(`http://localhost:8070/purchases/get/${buyerEmail}`).then((res) => {
                console.log(res.data);
                setProducts(res.data);
            }).catch((err) => {
                alert("Could not fetch product details");
                console.log(err.message);
            })
        }

        getPurchasedProducts();
    }, []);

    return (
        <div className="container">
            <div id="product-page-buttons" style={{ float: "right" }}>
                <a type="button" href="/home">
                    <Button variant="dark">Home</Button>
                </a>
                <a type="button" href="/cart">
                    <FontAwesomeIcon icon={faCartShopping} shake size="2xl" style={{ marginLeft: '25px' }} />
                </a>
            </div>
            <div id="product-page-heading" style={{ textAlign: "center" }}>
                <h1>Welcome to your transactions 💲💲💲</h1>
            </div>
            <div class="col-md-12">
                <div class="card mb-4">
                    <div class="card-header py-3">
                        <h5 class="mb-0">Purchase History</h5>
                    </div>
                    {products.map((product) => (
                        <><div class="card-body">
                            <b><p>Purchase Date: {new Date(product.purchaseDate).toLocaleDateString()}</p></b>

                            {product.purchaseItems.map((item) => (
                                <><div class="row" key={item.productId}>
                                    <div class="col-lg-3 col-md-12 mb-4 mb-lg-0">
                                        <div class="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                                            <img
                                                src={item.productImage}
                                                class="w-100"
                                                alt="Blue Jeans Jacket" />
                                            <a href="#!">
                                                <div className="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.2)' }}></div>
                                            </a>
                                        </div>
                                    </div>

                                    <div class="col-lg-5 col-md-6 mb-4 mb-lg-0">
                                        <p><strong>{item.productName}</strong></p>
                                        <p>Size: {item.productSize}</p>
                                        {/* <button type="button" class="btn btn-danger btn-sm me-1 mb-2" data-mdb-toggle="tooltip" title="Remove item" onClick={() => {
                var response = window.confirm("Are you sure you want to remove this item from the cart?");
                if (response) {
                    // removeItem(item.productId);
                }
            }}>
                <i class="fas fa-trash"></i>
            </button> */}
                                    </div>

                                    <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
                                        <div className="d-flex mb-4" style={{ maxWidth: 300 }}>
                                            <div class="form-outline">
                                                <input
                                                    id="form1"
                                                    min="1"
                                                    name="quantity"
                                                    value={item.productQuantity}
                                                    type="number"
                                                    class="form-control"
                                                    style={{ border: '3px solid #1691ef' }}
                                                    disabled
                                                    onChange={(e) => {
                                                        // handleQuantityChange(item.productId, e.target.value);
                                                        // updateProductQuantity(item.productId, e.target.value);
                                                    }} />
                                                <label class="form-label" for="form1">Quantity</label>
                                            </div>
                                        </div>
                                        <p class="text-start text-md-center">
                                            <strong>{item.productPrice} €</strong>
                                        </p>
                                        {/* {calculateTotal(item.productQuantity, item.productPrice)} */}
                                    </div>
                                </div><br></br></>
                            ))}
                            <center><h3><b>Total : {product.purchaseTotal}  €</b></h3></center>
                        </div><hr class="my-4" style={{ height: '3px', background: 'black' }} /></>
                    ))}
                </div>
            </div>
        </div>
    )
}