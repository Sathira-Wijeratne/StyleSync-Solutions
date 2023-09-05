import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Button from 'react-bootstrap/Button';

export default function ProductPage() {

    const [product, setProduct] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8070/product/getDetails/${id}`).then((res) => {
            console.log(res.data);
            setProduct(res.data);
        }).catch((err) => {
            alert(err.message);
        });
    });

    return (
        // Referenced from : https://bootsnipp.com/snippets/56bAW
        <div class="container">
            <div><a type="button" href="/home"><Button variant="dark">Back</Button></a></div>
            <div class="card">
                <div class="container-fliud">
                    <div class="wrapper row">
                        <div class="preview col-md-6">

                            <div class="preview-pic tab-content">
                                <div class="tab-pane active" id="pic-1"><img src={product[39]} /></div>
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
                            <h4 class="price">Price: <span>{product[2]} €</span></h4>
                            {/* <p class="vote"><strong>91%</strong> of buyers enjoyed this product! <strong>(87 votes)</strong></p> */}
                            <h5 class="sizes">sizes:
                                <span class="size" data-toggle="tooltip" title="small">{product[20]}</span>
                            </h5>
                            <div class="action">
                                <button class="add-to-cart btn btn-default" type="button" style={{ marginRight: "10px" }}>Add to cart</button>
                                <button class="like btn btn-default" type="button"><span class="fa fa-heart"></span></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}