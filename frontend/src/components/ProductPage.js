import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
import Form from 'react-bootstrap/Form';
import { RiSendPlane2Line } from 'react-icons/ri';

export default function ProductPage() {

  const [product, setProduct] = useState([]);
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const buyerEmail = sessionStorage.getItem("customerEmail");
  const [rate, setRate] = useState(0); // Initial user rating for the product is set to 0
  const [title_orig, settitle_orig] = useState([]);
  const customerEmail = sessionStorage.getItem("customerEmail");
  const [customerComment, setCustomerComment] = useState("");
  const [size,setSize]=useState("");
  const [rateObj,setRateObj]=useState({});

  useEffect(() => {
    axios.get(`http://localhost:8070/product/getDetails/${id}`).then((res) => {
      console.log(res.data);
      setProduct(res.data);
      settitle_orig(res.data[1]);
      setSize(res.data[20]);
      
      axios
        .get(
          `http://localhost:8070/rating/getbyemailandtitle/${customerEmail}/${res.data[1]}`
        ).then((res) => {
          if (res.data.length != 0) {
            console.log(res.data);
            setRate(res.data[0].noOfRate); // If user has already rated the product, set the rating to the user's previous rating
            setRateObj(res.data);
            console.log(res.data[0]);
          }
        });
    }).catch((err) => {
      alert(err.message);
    });
  }, [customerEmail, title_orig]);

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

  // Function to allow users to rate the product
  function rateProduct(noOfRate) {
    const newRate = {
      title_orig,
      customerEmail,
      "noOfRate":noOfRate,
      "customerComments":customerComment,
      size
    };
    // Check if the product has been rated before or not
    if (rate === 0) {
      // If not, add the rating to the server
      axios.post("http://localhost:8070/rating/add", newRate).catch((err) => {
        alert("Rating Service is not available.");
      });
    } else {
      // If already rated, update the rating on the server
      axios.put("http://localhost:8070/rating/update", newRate).catch((err) => {
        alert("Rating Service is not available.");
      });
    }
  }
  //Styles added to the comments section
  const buttonStyle = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0',
    marginLeft: '10px', 
    color: '#007bff', // 
  };

  const containerStyle = {
    display: 'flex',
    alignItems: 'center', // Vertically center the form control and button
  };

  //Function to save comments 
  function submitComment(e){
    e.preventDefault();

    //Avoid user submitting an empty comment
    if(customerComment.trim()===""){
      alert("Comment cannot be empty");
      return;
    }

    console.log(rateObj)


    //create an object and send it to the db using the api
    const commentData = {
      title_orig,
      customerEmail,
      "noOfRate":rate,
      "customerComments":customerComment,
      size
    };

    if (rateObj.length!==0) {
      // If not, add the rating to the server
      axios.put("http://localhost:8070/rating/update", commentData).then(()=>{
      alert("Hi");
      }).catch((err) => {
        alert(err);
        alert("Error in uploading a update.");
    });
    } else {
      // If already rated, update the rating on the server
      axios.post("http://localhost:8070/rating/add", commentData).catch((err) => {
        alert("Error in uploading a comment.");
      });
    }

    


  }



  return (
    // Referenced from : https://bootsnipp.com/snippets/56bAW
    <div class="container" style={{ marginBottom: "40px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a type="button" href="/home">
          <Button variant="dark">Back</Button>
        </a>
        <div>
          <a type="button" href="/cart">
            <FontAwesomeIcon icon={faCartShopping} shake size="2xl" />
          </a>
          <a type="button" href="/purchaseHistory">
            <FontAwesomeIcon icon={faClockRotateLeft} size="2xl" style={{ marginLeft: '25px' }} />
          </a>
        </div>
      </div>
      <div class="product-page-card" style={{ marginTop: "20px", borderRadius: '10px' }}>
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

              {/* Rating function related logic begin here  */}
              <div class="rating">
                <b>Rate the Product</b> &nbsp;
                <Rater
                  onRate={(noOfRate) => {
                    rateProduct(noOfRate.rating);
                  }}
                  total={5}
                  rating={rate}
                  style={{ fontSize: "30px" }}
                /><br /><br />
                <span class="review-no">{product[8]} reviews</span>
              </div>
              {/* Rating function related logic Ends here  */}

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
              </div>
            </div>
          </div>
        </div>

        <br></br>
        <h2><b>Product Reviews </b></h2>
        <br></br>
        <Form onSubmit={submitComment}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={containerStyle}>
          <Form.Control
            type="text"
            placeholder="Add Comments"
            value={customerComment}
            onChange={(e) => setCustomerComment(e.target.value)}
          />
          <button type="submit" style={buttonStyle}>
            <RiSendPlane2Line />
          </button>
        </Form.Group>
      </Form>

      </div>
    </div>
  );
}
