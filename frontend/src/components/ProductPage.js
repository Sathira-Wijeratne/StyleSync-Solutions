import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
import Form from "react-bootstrap/Form";
import { RiSendPlane2Line } from "react-icons/ri";

export default function ProductPage() {
  if (sessionStorage.getItem("sSyncSolRemotsuc") === null) {
    window.location.replace("/");
  }

  const [product, setProduct] = useState([]);
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const buyerEmail = sessionStorage.getItem("customerEmail");
  const [rate, setRate] = useState(0);
  const [title_orig, settitle_orig] = useState([]);
  const customerEmail = sessionStorage.getItem("customerEmail");
  const [customerComment, setCustomerComment] = useState("");
  const [size, setSize] = useState("");
  const [rateObj, setRateObj] = useState({});
  const [hasRateObj, setHasRateObj] = useState(false);
  const [custcomments, setcustComments] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8070/product/getDetails/${id}`)
      .then((res) => {
        setProduct(res.data);
        settitle_orig(res.data[1]);
        setSize(res.data[20]);

        axios
          .get(
            `http://localhost:8070/rating/getbyemailandtitle/${customerEmail}/${res.data[1]}`
          )
          .then((res) => {
            setRateObj(res.data);
            if (res.data.length !== 0) {
              setRate(res.data[0].noOfRate);
              setRateObj(res.data);
              setCustomerComment(res.data[0].customerComments);
            }
          });

        axios
          .get(`http://localhost:8070/rating/get/${res.data[1]}`)
          .then((res) => {
            console.log(res.data);
            setcustComments(res.data);
          });
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [id, customerEmail, title_orig]);

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

  function rateProduct(noOfRate) {
    const newRate = {
      title_orig,
      customerEmail,
      noOfRate: noOfRate,
      customerComments: customerComment,
      size,
    };

    if (rate === 0 && rateObj.length === 0 && hasRateObj === false) {
      axios
        .post("http://localhost:8070/rating/add", newRate)
        .then(() => {
          setHasRateObj(true);
          setRate(noOfRate);
        })
        .catch((err) => {
          alert("Rating Service is not available.");
        });
    } else {
      axios.put("http://localhost:8070/rating/update", newRate).catch((err) => {
        alert("Rating Service is not available.");
      });
    }
  }

  const buttonStyle = {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "0",
    marginLeft: "10px",
    color: "#000", // Set the text color to black
  };

  const containerStyle = {
    display: "flex",
    alignItems: "center",
  };

  function submitComment(e) {
    e.preventDefault();

    if (customerComment.trim() === "") {
      alert("Comment cannot be empty");
      return;
    }

    const commentData = {
      title_orig,
      customerEmail,
      noOfRate: rate,
      customerComments: customerComment,
      size,
    };

    if (rateObj.length !== 0 || hasRateObj === true) {
      axios
        .put("http://localhost:8070/rating/update", commentData)
        .then(() => {
          alert("Comment Updated");
        })
        .catch((err) => {
          alert(err);
          alert("Error in uploading an update.");
        });
    } else {
      axios
        .post("http://localhost:8070/rating/add", commentData)
        .then(() => {
          setHasRateObj(true);
          alert("Comment Added Successfully");
        })
        .catch((err) => {
          alert("Error in uploading a comment.");
        });
    }
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
  <div className="breadcrumb" style={{ height: "80px" ,fontSize:"15px"}}>
    <div className="container">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <a href="/home">Home</a>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Product
        </li>
      </ol>
    </div>
  </div>
</nav>

      <div className="container">
        <br></br>
        <br></br>
        <div className="container-fliud">
          <div className="wrapper row">
            <div className="preview col-md-6">
              <div className="preview-pic tab-content">
                <div className="tab-pane active grow" id="pic-1">
                  <img
                    alt="..."
                    style={{
                      borderRadius: "10px",
                      width: "300px",
                      height: "300px",
                    }}
                    src={product[39]}
                  />
                </div>
              </div>
            </div>
            <div className="details col-md-6">
              <h3
                className="product-title"
                style={{ fontFamily: "Oswald, sans-serif" }}
              >
                {product[1]}
              </h3>

              <div className="rating">
                <b>Rate the Product</b> &nbsp;
                <Rater
                  onRate={(noOfRate) => {
                    rateProduct(noOfRate.rating);
                  }}
                  total={5}
                  rating={rate}
                  style={{ fontSize: "30px" }}
                />
                <br />
                <br />
                <span className="review-no">{product[8]} reviews</span>
              </div>

              <h4 className="price">
                Price: <span>{parseFloat(product[2]).toFixed(2)} €</span>
              </h4>

              <h5 className="sizes">
                Size:
                <span className="size" data-toggle="tooltip" title="small">
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

              <div className="action">
                <button
                  className="add-to-cart btn btn-default"
                  type="button"
                  onClick={addToCart}
                  style={{ marginRight: "10px" ,backgroundColor:"black"}}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>

        <br></br>
        <h3>
          <b>Product comments </b>
        </h3>
        <br></br>
        <Form onSubmit={submitComment}>
          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlInput1"
            style={containerStyle}
          >
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

        {custcomments.map((custcomments) => (
         <div className="card" style={{ margin:'20px',maxWidth: '1000px', minHeight: '100px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', maxWidth: '1200px', height: '50px', padding: '35px', border: '1px solid rgba(255, 255, 255, .25)', borderRadius: '20px', backgroundColor: 'rgba(255, 255, 255, 0.45)', boxShadow: '0 0 10px 1px rgba(0, 0, 0, 0.25)', backdropFilter: 'blur(15px)' }}>
         <p style={{ margin: '0' }}><strong>{custcomments.customerEmail} : </strong> {custcomments.customerComments}</p>
         </div>
        ))}

        <br></br>


      </div>
    </div>
  );
}
