import backgroundImage from "../images/reports.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const DiscountsReport = () => {
  if (sessionStorage.getItem("sSyncSolNimda") === null) {
    window.location.replace("/");
  }

  // const [selectedMonth, setSelectedMonth] = useState("");
  // const [discounts, setDiscounts] = useState([]);
  // let history = useHistory();
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState(""); // Add selectedYear state
  const [discounts, setDiscounts] = useState([]);
  const [quantitySold, setQuantitySold] = useState([]); // State to store quantity sold
  let history = useHistory();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    console.log("Hello");
    function getDiscounts() {
      axios
        .get("http://localhost:8070/discount/")
        .then((res) => {
          console.log(res.data);
          setDiscounts(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getDiscounts();
  }, []);

  useEffect(() => {
    if (selectedMonth && selectedYear) {
      axios
        .get(
          `http://localhost:8070/total-purchases/${selectedYear}/${selectedMonth}/`
        )
        .then((res) => {
          setQuantitySold(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  }, [selectedMonth, selectedYear]);

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
    <div style={containerStyle}>
      <div className="container">
        <br />
        <h1
          style={{
            backgroundColor: "#d5dae2",
            borderRadius: "10px",
            marginBottom: "10px",
            padding: "5px",
          }}
        >
          Discounts Report
        </h1>
      </div>
      <div className="container">
        <select
          className="form-control"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {/* ...options for months */}
        </select>
        <select
          className="form-control"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="">Select a Year</option>
          {/* Add options for years here */}
        </select>
      </div>
      <div
        className="form-group"
        style={{ display: "flex", flexWrap: "nowrap" }}
      >
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </div>
      <table
        className="table table-borderless; table-hover"
        style={{ marginTop: "20px" }}
      >
        <div className="row">
          <div class="btn-group" role="group" aria-label="Basic example"></div>
          <div class="btn-group" role="group" aria-label="Basic example"></div>
        </div>
        <thead class="thead-dark">
          <tr>
            <th scope="col">Discount ID</th>
            <th scope="col">Discount Rate</th>
            <th scope="col">Product Name</th>
            <th scope="col">Quantity Sold</th>
          </tr>
        </thead>

        <tbody>
          {discounts.map((discount) => (
            <tr scope="row">
              <td class="text-uppercase label-bold-black">
                {discount.discountId}
              </td>
              <td className="label-bold-black">{discount.discountRate}</td>
              <td className="label-bold-black">
                {discount.discountProductName}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DiscountsReport;
