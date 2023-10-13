import Button from "react-bootstrap/Button";
import React, { useEffect, useState } from "react";

export default function AdminHome() {
  if (sessionStorage.getItem("sSyncSolNimda") === null) {
    window.location.replace("/");
  }

  const [custcomments, setCustcomments] = useState([]);

  const navPanelStyle = {
    backgroundColor: "#000000",
    width: "250px",
    padding: "20px",
    height: "100vh",
    alignItems: "center",
    justifyContent: "start",
  };

  const buttonStyle = {
    width: "200px",
    height: "50px",
    marginBottom: "10px",
  };

  const linkStyle = {
    textDecoration: "none",
    color: "white",
  };

  return (
    <div>
      <div>
        <center>
          <h1>Customer Inquries</h1>
        </center>
      </div>
      <div
        className="card"
        style={{
          margin: "20px",
          maxWidth: "1000px",
          minHeight: "100px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          maxWidth: "1200px",
          height: "50px",
          padding: "35px",
          border: "1px solid rgba(255, 255, 255, .25)",
          borderRadius: "20px",
          backgroundColor: "rgba(255, 255, 255, 0.45)",
          boxShadow: "0 0 10px 1px rgba(0, 0, 0, 0.25)",
          backdropFilter: "blur(15px)",
        }}
      >
        <p style={{ margin: "0" }}>
          <strong>{custcomments.customerEmail} : </strong>{" "}
          {custcomments.customerComments}
        </p>
      </div>
      <nav style={navPanelStyle}>
        <a href="/adminhome/ProductRatingReport" style={linkStyle}>
          <Button style={buttonStyle} variant="dark">
            Rating Report
          </Button>
        </a>
        <a href="/adminhome/salesforecast" style={linkStyle}>
          <Button style={buttonStyle} variant="dark">
            Sales Forecast
          </Button>
        </a>
        <a href="/adminhome/discount/add" style={linkStyle}>
          <Button style={buttonStyle} variant="dark">
            Add Discount
          </Button>
        </a>
        <a href="/adminhome/discount/" style={linkStyle}>
          <Button style={buttonStyle} variant="dark">
            View All Discounts
          </Button>
        </a>
        <Button style={buttonStyle} variant="dark" disabled>
          Update Discounts
        </Button>
        <a href="/adminhome/discount/reports" style={linkStyle}>
          <Button style={buttonStyle} variant="dark">
            Reports and Analytics
          </Button>
        </a>
      </nav>
    </div>
  );
}
