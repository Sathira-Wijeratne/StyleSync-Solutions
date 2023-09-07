import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";

export default function ShoppingCart() {
    const [products, setProducts] = useState([]);
    const [productCount, setProductCount] = useState("");
    const buyerEmail = sessionStorage.getItem("customerEmail");
    let total = 0;

    useEffect(() => {
        function getCartItems() {
            axios.get(`http://localhost:8070/cart/get/${buyerEmail}`).then((res) => {
                setProducts(res.data);
                console.log(res.data);
                getProductCount(res.data);
            }).catch((err) => {
                alert("Opps! Error in loading the cart items");
                console.log(err.message);
            })
        }

        getCartItems();

    }, []);

    function getProductCount(data) {
        if (data.length > 1) {
            setProductCount(data.length + " items");
        } else {
            setProductCount(data.length + " item");
        }
        console.log("This is the product count :" + productCount);
    }

    function calculateTotal(quantity, price) {
        total = total + (quantity * price);
    }

    function removeItem(productId) {
        axios.delete(`http://localhost:8070/cart/remove/${buyerEmail}/${productId}`).then((res) => {
            // alert("Item removed from the cart");
            window.location.reload();
        }).catch((err) => {
            alert("Opps! Error in removing the item from the cart");
            console.log(err.message);
        })
    }

    function clearCart() {
        axios.delete(`http://localhost:8070/cart/removeAll/${buyerEmail}`).then((res) => {
            // alert("Item removed from the cart");
            window.location.replace("/home");
        }).catch((err) => {
            alert("Opps! Error in removing the items from the cart");
            console.log(err.message);
        })
    }

    // function handleQuantityChange(productId, newQuantity) {
    //     const updatedProduct = products.map((product) => {
    //         if (product.productId === productId) {
    //             return { ...product, productQuantity: newQuantity };
    //         }
    //         return product;
    //     });
    //     setProducts(updatedProduct);
    // }

    function makePurchase() {
        const newPurchase = {
            buyerEmail: buyerEmail,
            purchaseDate: Date.now(),
            purchaseItems: products,
            purchaseTotal: total,
        };


        axios.post(`http://localhost:8070/purchases/add/`, newPurchase).then((res) => {
            alert("Purchase successful");
            clearCart();
        }).catch((err) => {
            alert("Opps! Error in purchasing");
            console.log(err.message);
        })
    }

    if (products.length > 0) {
        return (
            // Referenced from : https://mdbootstrap.com/docs/standard/extended/shopping-carts/#!
            <div class="container py-5">
                <div style={{ marginTop: '5px', display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <a type="button" href="/home">
                        <Button variant="dark">Home</Button>
                    </a>
                </div>

                <div class="row d-flex justify-content-center my-4">
                    <div class="col-md-8">
                        <div class="card mb-4">
                            <div class="card-header py-3">
                                <h5 class="mb-0">Cart - {productCount}</h5>
                            </div>
                            <div class="card-body">
                                {products.map((product) => (
                                    <><div class="row" key={product.productId}>
                                        <div class="col-lg-3 col-md-12 mb-4 mb-lg-0">
                                            <div class="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                                                <img
                                                    src={product.productImage}
                                                    class="w-100"
                                                    alt="Blue Jeans Jacket" />
                                                <a href="#!">
                                                    <div className="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.2)' }}></div>
                                                </a>
                                            </div>
                                        </div>

                                        <div class="col-lg-5 col-md-6 mb-4 mb-lg-0">
                                            <p><strong>{product.productName}</strong></p>
                                            <p>Size: {product.productSize}</p>
                                            <button type="button" class="btn btn-danger btn-sm me-1 mb-2" data-mdb-toggle="tooltip" title="Remove item" onClick={() => {
                                                var response = window.confirm("Are you sure you want to remove this item from the cart?");
                                                if (response) {
                                                    removeItem(product.productId);
                                                }
                                            }}>
                                                <i class="fas fa-trash"></i>
                                            </button>
                                        </div>

                                        <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
                                            <div className="d-flex mb-4" style={{ maxWidth: 300 }}>
                                                <div class="form-outline">
                                                    <input
                                                        id="form1"
                                                        min="1"
                                                        name="quantity"
                                                        value={product.productQuantity}
                                                        type="number"
                                                        class="form-control"
                                                        style={{ border: '3px solid #1691ef' }}
                                                        onChange={(e) => {
                                                            // handleQuantityChange(product.productId, e.target.value);
                                                        }} />
                                                    <label class="form-label" for="form1">Quantity</label>
                                                </div>
                                            </div>
                                            <p class="text-start text-md-center">
                                                <strong>{product.productPrice} €</strong>
                                            </p>
                                            {calculateTotal(product.productQuantity, product.productPrice)}
                                        </div>
                                    </div><hr class="my-4" /></>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card mb-4">
                            <div class="card-header py-3">
                                <h5 class="mb-0">Summary</h5>
                            </div>
                            <div class="card-body">
                                <ul class="list-group list-group-flush">
                                    <li
                                        class="list-group-item d-flex justify-content-between align-items-center px-0">
                                        Products
                                        <span>{parseFloat(total).toFixed(2)} €</span>
                                    </li>
                                    <li
                                        class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                        <div>
                                            <strong>Total amount</strong>
                                            <strong>
                                                <p class="mb-0">(including VAT)</p>
                                            </strong>
                                        </div>
                                        <span><strong>{parseFloat(total).toFixed(2)} €</strong></span>
                                    </li>
                                </ul>

                                <button type="button" class="btn btn-primary btn-lg btn-block" onClick={() => {
                                    var response = window.confirm("Are you sure you want to purchase?");
                                    if (response) {
                                        makePurchase();
                                    }
                                }}>
                                    Pay Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            // Referenced from : https://bbbootstrap.com/snippets/bootstrap-empty-cart-template-25715727
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="card" style={{ height: "150%" }}>
                            <div class="card-body cart">
                                <div class="col-sm-12 empty-cart-cls text-center">
                                    <img src="https://i.imgur.com/dCdflKN.png" width="130" height="130" class="img-fluid mb-4 mr-3" />
                                    <h1><strong>Your Cart is Empty 😔</strong></h1>
                                    <a href="/home" class="btn btn-primary cart-btn-transform m-3" data-abc="true" style={{ fontSize: '30px' }}>Go back to shopping</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
