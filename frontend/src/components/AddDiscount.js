import React, { useEffect, useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import AsyncSelect from "react-select/async";
import axios from "axios";
import backgroundImage from "../images/add.jpg";

export default function AddDiscount() {
  if (sessionStorage.getItem("sSyncSolNimda") === null) {
    window.location.replace("/");
  }

  const [discountId, setDiscountId] = useState("");
  const [discountType, setDiscountType] = useState("");
  const [discountRate, setDiscountRate] = useState();
  const [discountProductName, setDiscountProductName] = useState();
  const [discountDescription, setDiscountDescription] = useState("");
  const [discountStartDate, setDiscountStartDate] = useState(null);
  const [discountExpirationDate, setDiscountExpirationDate] = useState(null);
  const [isMatched, setIsMatched] = useState(true);
  const [productOptions, setProductOptions] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [descriptionErrorMessage, setDescriptionErrorMessage] = useState("");
  const [productNameErrorMessage, setProductNameErrorMessage] = useState("");
  const [rateErrorMessage, setRateErrorMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8070/product/")
      .then((res) => {
        const productNames = res.data.map((product) => ({
          value: product[1],
          label: product[1],
        }));
        setProductOptions(productNames);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
      const filteredProducts = productOptions.filter((product) =>
        product.label.toLowerCase().includes(inputValue.toLowerCase())
      );
      callback(filteredProducts);
    }, 1000);
  };

  const handleStartDateClick = (e) => {
    e.stopPropagation();
    document.getElementById("discountStartDate").click();
  };

  const handleExpirationDateClick = (e) => {
    e.stopPropagation();
    document.getElementById("discountExpirationDate").click();
  };

  // const containerStyle = {
  //   backgroundImage: `url(${backgroundImage})`,
  //   backgroundSize: "cover",
  //   backgroundRepeat: "no-repeat",
  //   backgroundAttachment: "fixed",
  //   backgroundPosition: "center",
  //   minHeight: "100vh",
  //   display: "flex",
  //   flexDirection: "column",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   color: "white",
  //   position: "relative",
  // };

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

  function sendData(e) {
    e.preventDefault();
    const newDiscount = {
      discountId,
      discountType,
      discountRate,
      discountProductName: selectedProduct.label,
      discountDescription,
      discountStartDate,
      discountExpirationDate,
    };
    axios
      .post("http://localhost:8070/discount/add", newDiscount)
      .then(() => {
        alert(`Discount Added Successfully 👍`);
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
                Add Discount
              </li>
            </ol>
          </div>
        </span>
      </nav>
      <div className="container">
        <form onSubmit={sendData} style={{ marginBottom: "20px" }}>
          <center><h1 className="container label-bold-black">Add Discount</h1></center>
          <div className="form-row">
            <div className="col-md-6 mb-3">
              <div className="form-group">
                <label className="label-bold-black" htmlFor="name">
                  Discount ID
                </label>
                <input
                  type="text"
                  className="form-control bold-black-outline"
                  required
                  id="code"
                  pattern="[D][0-9]{3}"
                  placeholder="Enter item code"
                  onChange={(e) => {
                    var code = setDiscountId(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="form-group">
                <label htmlFor="discountRate" className="label-bold-black">
                  Rate of Discount
                </label>
                <input
                  type="number"
                  className="form-control bold-black-outline"
                  required
                  id="dsicountRate"
                  placeholder="Enter Rate of Discount"
                  onChange={(e) => {
                    setDiscountRate(e.target.value);
                    handleDiscountRateInput(e);
                  }}
                />
                <p style={{ color: "red" }}>{rateErrorMessage}</p>
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="col-md-6 mb-3">
              <div className="form-group">
                <label htmlFor="productName" className="label-bold-black">
                  Product Name
                </label>
                <AsyncSelect
                  cacheOptions
                  defaultOptions
                  loadOptions={loadOptions}
                  onInputChange={(newValue) => {
                    console.log("Input value:", newValue);
                  }}
                  onChange={(selectedOption) => {
                    setSelectedProduct(selectedOption);
                  }}
                  value={selectedProduct}
                  placeholder="Select or type product name..."
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="supplier" className="label-bold-black">
              Discount Description
            </label>
            <input
              type="text"
              className="form-control bold-black-outline"
              required
              id="description"
              placeholder="Enter Discount Description"
              onChange={(e) => {
                setDiscountDescription(e.target.value);
                handleDiscountDescriptionInput(e);
              }}
            />
            <p style={{ color: "red" }}>{descriptionErrorMessage}</p>
          </div>

          <div className="form-row">
            <div className="col-md-6 mb-3">
              <div className="form-group">
                <label htmlFor="discountStartDate" className="label-bold-black">
                  Start Discount Date
                </label>
                <div
                  className="input-group datepicker-container"
                  onClick={handleStartDateClick}
                >
                  <DatePicker
                    selected={discountStartDate}
                    onChange={(date) => setDiscountStartDate(date)}
                    className="form-control bold-black-outline"
                    id="discountStartDate"
                    required
                    placeholderText="Select start date"
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
                  htmlFor="discountExpirationDate"
                  className="label-bold-black"
                >
                  Expiration Date of Discount
                </label>
                <div
                  className="input-group datepicker-container"
                  onClick={handleExpirationDateClick}
                >
                  <DatePicker
                    selected={discountExpirationDate}
                    onChange={(date) => setDiscountExpirationDate(date)}
                    className="form-control bold-black-outline"
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

          <div
            className="form-group"
            style={{ display: "flex", flexWrap: "nowrap" }}
          >
            <button type="submit" className="btn btn-success col-md-6 mb-3">
              Submit
            </button>
            <a
              type="button"
              style={{ marginLeft: "10px" }}
              href="/adminhome/discount"
              className="btn btn-secondary col-md-6 mb-3"
            >
              Back
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
