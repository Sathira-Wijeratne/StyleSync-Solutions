import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UpdateDiscount() {
  const [discountId, setDiscountId] = useState("");
  const [discountType, setDiscountType] = useState("");
  const [discountRate, setDiscountRate] = useState("");
  const [discountProductName, setDiscountProductName] = useState();
  const [discountDescription, setDiscountDescriptiopn] = useState("");
  const [discountStartDate, setDiscountStartDate] = useState("");
  const [discountExpirationDate, setDiscountExpirationDate] = useState("");

  const { update, id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:8070/discount/get/${id}`)
      .then((res) => {
        console.log(res.data.discount);
        setDiscountId(res.data.discount.discountId);
        setDiscountType(res.data.discount.discountType);
        setDiscountRate(res.data.discount.discountRate);
        setDiscountProductName(res.data.discount.discountProductName);
        setDiscountDescriptiopn(res.data.discount.discountDescription);
        setDiscountStartDate(res.data.discount.discountStartDate);
        setDiscountExpirationDate(res.data.discount.discountExpirationDate);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function updateData(e) {
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
      .put(`http://localhost:8070/discount/update/${id}`, newDiscount)
      .then(() => {
        alert("Discount  Updated");

        window.location.replace("http://localhost:3000/discount/");
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div>
      <h1>Update Discounts</h1>
      <form onSubmit={updateData}>
        <div className="form-group">
          <div style={{ marginLeft: "0px", marginRight: "auto", width: "10%" }}>
            <label for="discountId">Discount Id</label>
          </div>

          <div class="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="discountId"
              value={discountId}
              placeholder="Enter Discount ID"
              onChange={(e) => {
                setDiscountId(e.target.value);
              }}
            />
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
              value={discountType}
              placeholder="Enter Discount Type"
              onChange={(e) => {
                setDiscountType(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="form-group">
          <div style={{ marginLeft: "0px", marginRight: "auto", width: "10%" }}>
            <label for="discountRate">Discount Rate</label>
          </div>

          <div class="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="discountRate"
              value={discountRate}
              placeholder="Enter Discount Rate"
              onChange={(e) => {
                setDiscountRate(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="form-group">
          <div style={{ marginLeft: "0px", marginRight: "auto", width: "10%" }}>
            <label for="discountProductName">Discount Product Name</label>
          </div>

          <div class="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="discountProductName"
              value={discountProductName}
              placeholder="Enter quantity"
              onChange={(e) => {
                setDiscountProductName(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="form-group">
          <div style={{ marginLeft: "0px", marginRight: "auto", width: "10%" }}>
            <label for="discountDescription">Discount Description</label>
          </div>

          <div class="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="discountDescription"
              value={discountDescription}
              placeholder="Enter supplier"
              onChange={(e) => {
                setDiscountDescriptiopn(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="form-group">
          <div style={{ marginLeft: "0px", marginRight: "auto", width: "10%" }}>
            <label for="discountStartDate">Discount Start Date</label>
          </div>

          <div class="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="discountStartDate"
              value={discountStartDate}
              placeholder="Enter Start Date"
              onChange={(e) => {
                setDiscountStartDate(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="form-group">
          <div style={{ marginLeft: "0px", marginRight: "auto", width: "10%" }}>
            <label for="discountExpirationDate">Discount Expiration Date</label>
          </div>

          <div class="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="discountExpirationDate"
              value={discountExpirationDate}
              placeholder="Enter Date Of Expiration"
              onChange={(e) => {
                setDiscountExpirationDate(e.target.value);
              }}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-success">
          Update
        </button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <a type="button" href="/discount" class="btn btn-secondary">
          Back
        </a>
      </form>
    </div>
  );
}

export default UpdateDiscount;
