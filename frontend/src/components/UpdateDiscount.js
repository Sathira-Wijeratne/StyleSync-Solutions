import axios from "axios";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import AsyncSelect from "react-select/async";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import backgroundImage from "../images/add.jpg";

function UpdateDiscount() {
  if (sessionStorage.getItem("sSyncSolNimda") === null) {
    window.location.replace("/");
  }

  const [discountId, setDiscountId] = useState("");
  const [discountType, setDiscountType] = useState("");
  const [discountRate, setDiscountRate] = useState("");
  const [discountProductName, setDiscountProductName] = useState();
  const [discountDescription, setDiscountDescription] = useState("");
  const [discountStartDate, setDiscountStartDate] = useState(null);
  const [discountExpirationDate, setDiscountExpirationDate] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [descriptionErrorMessage, setDescriptionErrorMessage] = useState("");
  const [rateErrorMessage, setRateErrorMessage] = useState("");

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
        setDiscountDescription(res.data.discount.discountDescription);
        setDiscountStartDate(new Date(res.data.discount.discountStartDate));
        setDiscountExpirationDate(
          new Date(res.data.discount.discountExpirationDate)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

  const handleStartDateClick = (e) => {
    e.stopPropagation();
    document.getElementById("discountStartDate").click();
  };

  const handleExpirationDateClick = (e) => {
    e.stopPropagation();
    document.getElementById("discountExpirationDate").click();
  };

  const handleDiscountTypeInput = (e) => {
    const inputValue = e.target.value;
    const containsDigits = /\d/.test(inputValue);

    if (containsDigits) {
      setDiscountType("");
      setErrorMessage("Only non-numeric characters are allowed.");
    } else {
      setDiscountType(inputValue);
      setErrorMessage("");
    }
  };

  const handleDiscountDescriptionInput = (e) => {
    const inputValue = e.target.value;
    const containsDigits = /\d/.test(inputValue);

    if (containsDigits) {
      setDiscountDescription("");
      setDescriptionErrorMessage("Only non-numeric characters are allowed.");
    } else {
      setDiscountDescription(inputValue);
      setDescriptionErrorMessage("");
    }
  };

  const handleDiscountRateInput = (e) => {
    const inputValue = e.target.value;

    // Check if the input value is not a valid number
    if (isNaN(inputValue) || inputValue === "") {
      setDiscountRate("");
      setRateErrorMessage(
        "Please enter a valid numeric value for Discount Rate."
      );
    } else {
      setDiscountRate(parseFloat(inputValue)); // Convert to a numeric value
      setRateErrorMessage("");
    }
  };

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

        window.location.replace("http://localhost:3000/adminhome/discount/");
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <span class="breadcrumb">
          <div className="container">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="/adminhome">Admin Home</a>
              </li>
              <li class="breadcrumb-item">
                <a href="/adminhome/discount">Discounts</a>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Update Discount
              </li>
            </ol>
          </div>
        </span>
      </nav>
      {/* <div className="container" style={containerStyle}> */}
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div
          style={{
            background: "black",
            padding: "20px",
            borderRadius: "10px",
            width: "80%",
          }}
        >
          <h1 style={{ color: "white" }}>Update Discounts</h1>
          <form onSubmit={updateData}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <div className="form-group">
                  <label style={{ color: "white" }} htmlFor="discountId">
                    Discount Id
                  </label>
                  <input
                    type="text"
                    className="form-control bold-black-outline"
                    id="discountId"
                    value={discountId}
                    pattern="[D][0-9]{3}"
                    placeholder="Enter Discount ID"
                    onChange={(e) => {
                      setDiscountId(e.target.value);
                    }}
                  />
                </div>
              </div>
              {/* <div className="col-md-6 mb-3">
            <div className="form-group">
              <label htmlFor="discountType">Discount Type</label>
              <input
                type="text"
                className="form-control bold-black-outline"
                id="discountType"
                value={discountType}
                placeholder="Enter Discount Type"
                onChange={(e) => {
                  setDiscountType(e.target.value);
                  handleDiscountTypeInput(e);
                }}
              />
              <p style={{ color: "red" }}>{errorMessage}</p>
            </div>
          </div> */}
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <div className="form-group">
                  <label style={{ color: "white" }} htmlFor="discountRate">
                    Discount Rate
                  </label>
                  <input
                    type="text"
                    className="form-control bold-black-outline"
                    id="discountRate"
                    value={discountRate}
                    placeholder="Enter Discount Rate"
                    onChange={(e) => {
                      setDiscountRate(e.target.value);
                      handleDiscountRateInput(e);
                    }}
                  />
                  <p style={{ color: "red" }}>{rateErrorMessage}</p>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="form-group">
                  <label
                    style={{ color: "white" }}
                    htmlFor="discountProductName"
                  >
                    Discount Product Name
                  </label>
                  <input
                    type="text"
                    className="form-control bold-black-outline"
                    id="discountProductName"
                    value={discountProductName}
                    placeholder="Enter Product Name"
                    onChange={(e) => {
                      setDiscountProductName(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <label style={{ color: "white" }} htmlFor="discountDescription">
                Discount Description
              </label>
              <input
                type="text"
                className="form-control bold-black-outline"
                id="discountDescription"
                value={discountDescription}
                placeholder="Enter Description"
                onChange={(e) => {
                  setDiscountDescription(e.target.value);
                  handleDiscountDescriptionInput(e);
                }}
              />
              <p style={{ color: "red" }}>{descriptionErrorMessage}</p>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label
                      style={{ color: "white" }}
                      htmlFor="discountStartDate"
                    >
                      Discount Start Date
                    </label>
                    <div
                      className="input-group datepicker-container bold-black-outline"
                      onClick={handleStartDateClick}
                    >
                      <DatePicker
                        selected={discountStartDate}
                        onChange={(date) => setDiscountStartDate(date)}
                        className="form-control"
                        id="discountStartDate"
                        required
                        placeholderText="Select start date"
                        disabled
                      />
                      <div className="input-group-append">
                        <span className="input-group-text">
                          <FontAwesomeIcon icon={faCalendarAlt} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label
                      style={{ color: "white" }}
                      htmlFor="discountExpirationDate"
                    >
                      Expiration Date of Discount
                    </label>
                    <div
                      className="input-group datepicker-container bold-black-outline"
                      onClick={handleExpirationDateClick}
                    >
                      <DatePicker
                        selected={discountExpirationDate}
                        onChange={(date) => setDiscountExpirationDate(date)}
                        className="form-control"
                        id="discountExpirationDate"
                        required
                        placeholderText="Select expiration date"
                      />
                      <div className="input-group-append">
                        <span className="input-group-text">
                          <FontAwesomeIcon icon={faCalendarAlt} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", flexWrap: "nowrap" }}>
              <button
                type="submit"
                className="btn btn-success col-md-6 mb-3"
                style={{ marginRight: "10px" }}
              >
                Update
              </button>
              <a
                type="button"
                href="/adminhome/discount"
                className="btn btn-secondary col-md-6 mb-3"
              >
                Back
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateDiscount;
