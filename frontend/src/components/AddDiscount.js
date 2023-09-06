import React, { useEffect, useState } from "react";
import "../styles/CreateDiscount.css";
import axios from "axios";

export default function AddDiscount() {
  const [discountId, setDiscountId] = useState("");
  //since we are making the type of age as number --> remove "" of useState.
  const [discountType, setDiscountType] = useState("");
  const [discountRate, setDiscountRate] = useState();
  const [discountProductName, setDiscountProductName] = useState();
  const [discountDescription, setDiscountDescription] = useState("");
  const [discountStartDate, setDiscountStartDate] = useState("");
  //let [upQuantity, setIncrQuantity] = useState();
  const [discountExpirationDate, setDiscountExpirationDate] = useState([]);
  const [isMatched, setIsMatched] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8070/discount/")
      .then((res) => {
        console.log(res.data);
        setDiscounts(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  function sendData(e) {
    e.preventDefault();
    const newDiscount = {
      discountId,
      discountType,
      discountRate,
      discountProductName,
      discountDescription,
      discountStartDate,
      discountExpirationDate,
    };
    axios
      .post("http://localhost:8070/discount/add", newDiscount)
      .then(() => {
        alert(`Discount Added ${isMatched}`);
        setDiscountId("");
        setDiscountType("");
        setDiscountRate();
        setDiscountProductName();
        setDiscountDescription("");
        setDiscountStartDate("");
        setDiscountExpirationDate("");
        setIsMatched("");
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div>
      <h1>Add Discount</h1>
      <form onSubmit={sendData} class="container">
        <div className="form-group; form-container">
          <div style={{ marginLeft: "0px", marginRight: "auto", width: "10%" }}>
            <label for="name">Discount ID</label>
          </div>

          <div class="col-sm-10">
            <input
              type="text"
              className="form-control"
              required
              id="code"
              placeholder="Enter item code"
              onChange={(e) => {
                var code = setDiscountId(e.target.value);
              }}
            />
            <div required />
          </div>
        </div>
        <div className="form-group">
          <div style={{ marginLeft: "0px", marginRight: "auto", width: "10%" }}>
            <label for="discountType">Discount Type</label>
          </div>

          <div class="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="discountType"
              required
              placeholder="Enter Discount Type"
              onChange={(e) => {
                setDiscountType(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="form-group">
          <div style={{ marginLeft: "0px", marginRight: "auto", width: "10%" }}>
            <label for="discountRate">Rate of Discount</label>
          </div>

          <div class="col-sm-10">
            <input
              type="number"
              className="form-control"
              required
              id="dsicountRate"
              placeholder="Enter Rate of Discount"
              onChange={(e) => {
                setDiscountRate(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="form-group">
          <div style={{ marginLeft: "0px", marginRight: "auto", width: "10%" }}>
            <label for="productName">Product Name</label>
          </div>

          <div class="col-sm-10">
            <input
              type="text"
              className="form-control"
              required
              id="productName"
              placeholder="Enter Product Name "
              onChange={(e) => {
                setsetDiscountProductName(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="form-group">
          <div style={{ marginLeft: "0px", marginRight: "auto", width: "10%" }}>
            <label for="supplier">Discount Description</label>
          </div>

          <div class="col-sm-10">
            <input
              type="text"
              className="form-control"
              required
              id="description"
              placeholder="Enter Discpount Description "
              onChange={(e) => {
                setDiscountDescription(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="form-group">
          <div style={{ marginLeft: "0px", marginRight: "auto", width: "10%" }}>
            <label for="order">Starting Date of Discount</label>
          </div>

          <div class="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="startingDate"
              required
              placeholder="Enter Staring Date of Discount "
              onChange={(e) => {
                setDiscountStartDate(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="form-group">
          <div style={{ marginLeft: "0px", marginRight: "auto", width: "10%" }}>
            <label for="expirationDate">Expiration Date of Discount</label>
          </div>

          <div class="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="expirationDate"
              required
              placeholder="Enter Date of Expiration "
              onChange={(e) => {
                setDiscountExpirationDate(e.target.value);
              }}
            />
          </div>
        </div>
        <button type="submit" class="btn btn-success">
          Submit
        </button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <a type="button" href="/discount" class="btn btn-secondary">
          Back
        </a>
      </form>
    </div>
  );
}
