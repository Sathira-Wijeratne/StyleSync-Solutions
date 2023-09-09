import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import backgroundImage from "../images/delete.jpg";

export default function DeleteDiscount() {
  const [discountId, setDiscountId] = useState("");
  const [discountType, setDiscountType] = useState("");
  const [discountRate, setDiscountRate] = useState("");
  const [discountProductName, setDiscountProductName] = useState();
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
          <div className="col-md-6 mb-3">
            <div className="form-group">
              <div
                style={{ marginLeft: "0px", marginRight: "auto", width: "20%" }}
              >
                <label className="label-bold-black" htmlFor="discountId">
                  Discount Id
                </label>
              </div>
              <div class="col-sm-10">
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
          </div>
          <div className="col-md-6 mb-3">
            <div className="form-group">
              <div
                style={{ marginLeft: "0px", marginRight: "auto", width: "20%" }}
              >
                <label className="label-bold-black" htmlFor="discountType">
                  Discount Type
                </label>
              </div>
              <div class="col-sm-10">
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
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <div className="form-group">
              <div
                style={{ marginLeft: "0px", marginRight: "auto", width: "20%" }}
              >
                <label className="label-bold-black" htmlFor="discountRate">
                  Discount Rate
                </label>
              </div>
              <div class="col-sm-10">
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
          </div>
          <div className="col-md-6 mb-3">
            <div className="form-group">
              <div
                style={{ marginLeft: "0px", marginRight: "auto", width: "30%" }}
              >
                <label
                  className="label-bold-black"
                  htmlFor="discountProductName"
                >
                  Discount Product Name
                </label>
              </div>
              <div class="col-sm-10">
                <input
                  type="number"
                  className="form-control"
                  id="discountProductName"
                  value={discountProductName}
                  // placeholder="Enter Discount Product Name"
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
        <div className="form-group">
          <div style={{ marginLeft: "0px", marginRight: "auto", width: "30%" }}>
            <label className="label-bold-black" htmlFor="discountDescription">
              Discount Description
            </label>
          </div>
          <div class="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="discountDescription"
              value={discountDescription}
              // placeholder="Enter Discount Description"
              disabled
            />
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <div className="form-group">
                <div
                  style={{
                    marginLeft: "0px",
                    marginRight: "auto",
                    width: "30%",
                  }}
                >
                  <label
                    className="label-bold-black"
                    htmlFor="discountStartDate"
                  >
                    Discount Start Date
                  </label>
                </div>

                <div class="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="date"
                    value={discountStartDate}
                    // placeholder="Enter Discount Start Date"
                    disabled
                  />
                </div>
              </div>
            </div>

            {/* <div className="row"> */}
            <div className="col-md-6 mb-3">
              <div className="form-group">
                <div
                  style={{
                    marginLeft: "0px",
                    marginRight: "auto",
                    width: "30%",
                  }}
                >
                  <label
                    className="label-bold-black"
                    htmlFor="discountExpirationDate"
                  >
                    Discount Expiration Date
                  </label>
                </div>

                <div class="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="discountExpirationDate"
                    value={discountExpirationDate}
                    // placeholder="Enter Discount Expiration Date"
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-danger">
          Delete
        </button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <a type="button" href="/adminhome/discount" class="btn btn-secondary">
          Back
        </a>
      </form>
    </div>
  );
}
