import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import backgroundImage from "../images/dele.jpg";

export default function DeleteDiscount() {
  const [discountId, setDiscountId] = useState("");
  const [discountType, setDiscountType] = useState("");
  const [discountRate, setDiscountRate] = useState("");
  const [discountProductName, setDiscountProductName] = useState("");
  const [discountDescription, setDiscountDescriptiopn] = useState("");
  const [discountStartDate, setDiscountStartDate] = useState("");
  const [discountExpirationDate, setDiscountExpirationDate] = useState("");

  const { del, id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8070/discount/get/${id}`)
      .then((res) => {
        console.log(res.data);
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

  function deleteData(e) {
    e.preventDefault();
    axios
      .delete(`http://localhost:8070/discount/delete/${id}`)
      .then(() => {
        alert("Discount Deleted");

        window.location.replace("http://localhost:3000/adminhome/discount");
      })
      .catch((err) => {
        alert(err);
      });
  }

  const containerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundPosition: "center",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    position: "relative",
  };

  return (
    <div className="container" style={containerStyle}>
      <h1 className="label-bold-black">Delete Discount</h1>
      <form onSubmit={deleteData}>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label className="label-bold-black" htmlFor="discountId">
                Discount Id
              </label>
              <input
                type="text"
                className="form-control"
                id="discountId"
                value={discountId}
                placeholder="Enter Discount ID"
                disabled
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="label-bold-black" htmlFor="discountType">
                Discount Type
              </label>
              <input
                type="text"
                className="form-control"
                id="discountType"
                value={discountType}
                placeholder="Enter Discount Type"
                disabled
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label className="label-bold-black" htmlFor="discountRate">
                Discount Rate
              </label>
              <input
                type="text"
                className="form-control"
                id="discountRate"
                value={discountRate}
                placeholder="Enter Discount Rate"
                disabled
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="label-bold-black" htmlFor="discountProductName">
                Discount Product Name
              </label>
              <input
                type="text"
                className="form-control"
                id="discountProductName"
                value={discountProductName}
                disabled
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <label className="label-bold-black" htmlFor="discountDescription">
            Discount Description
          </label>
          <input
            type="text"
            className="form-control"
            id="discountDescription"
            value={discountDescription}
            disabled
          />
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label className="label-bold-black" htmlFor="discountStartDate">
                Discount Start Date
              </label>
              <input
                type="text"
                className="form-control"
                id="date"
                value={discountStartDate}
                disabled
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label
                className="label-bold-black"
                htmlFor="discountExpirationDate"
              >
                Discount Expiration Date
              </label>
              <input
                type="text"
                className="form-control"
                id="discountExpirationDate"
                value={discountExpirationDate}
                disabled
              />
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "nowrap" }}>
          <button
            type="submit"
            className="btn btn-danger col-md-6"
            style={{ marginRight: "10px" }}
          >
            Delete
          </button>
          <a
            type="button"
            href="/adminhome/discount"
            className="btn btn-secondary col-md-6"
          >
            Back
          </a>
        </div>
      </form>
    </div>
  );
}
