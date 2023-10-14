import Button from "react-bootstrap/Button";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminHome() {
  if (sessionStorage.getItem("sSyncSolNimda") === null) {
    window.location.replace("/");
  }
  const [inquries, setIinquries] = useState([]);
  // const [custname, setCustname] = useState();
  // const [custemail, setCustemail] = useState();
  // const [custphone, setCustphone] = useState();
  // const [custinquery, setCustinquery] = useState();

  const containerStyle = {
    display: "flex",
  };

  const navPanelStyle = {
    backgroundColor: "#000000",
    width: "250px",
    padding: "20px",
    height: "100vh",
  };

  const contentStyle = {
    flex: 1,
    padding: "20px",
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

  useEffect(() => {
    axios
      .get(`http://localhost:8070/ContactUs/`)
      .then((res) => {
        console.log(res.data);
        setIinquries(res.data);
        // setCustemail(res.data);
        // setCustphone(res.data);
        // setCustinquery(res.data);
      }).catch((err) => {
        alert(err.message);
      });;
  }, [])

  return (
    <div style={containerStyle}>
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
        <a href="/adminhome/discount/reports" style={linkStyle}>
          <Button style={buttonStyle} variant="dark">
            Reports and Analytics
          </Button>
        </a>
      </nav>
      <div style={contentStyle}>
        <div style={{ textAlign: "center" }}>
          <h1>Customer Inquiries</h1>
        </div>
        <div
        // className="card"
        // style={{
        //   margin: "20px",
        //   maxWidth: "1000px",
        //   minHeight: "100px",
        //   display: "flex",
        //   flexDirection: "column",
        //   justifyContent: "space-between",
        //   maxWidth: "1200px",
        //   height: "80vh",
        //   padding: "20px",
        //   border: "1px solid rgba(255, 255, 255, .25)",
        //   borderRadius: "20px",
        //   backgroundColor: "rgba(255, 255, 255, 0.45)",
        //   boxShadow: "0 0 10px 1px rgba(0, 0, 0, 0.25)",
        //   backdropFilter: "blur(15px)",
        // }}
        >
          {inquries.map((inquries) => (
            <div className="card" style={{ margin: '20px', maxWidth: '1000px', minHeight: '150px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', maxWidth: '1200px', height: '100px', padding: '20px', border: '1px solid rgba(255, 255, 255, .25)', borderRadius: '20px', backgroundColor: 'rgba(255, 255, 255, 0.45)', boxShadow: '0 0 10px 1px rgba(0, 0, 0, 0.25)', backdropFilter: 'blur(15px)' }}>
              <p style={{ margin: '0' }}>
                <strong>Name : </strong> {inquries.name} <br></br>
                <strong>Email : </strong> {inquries.email}<br></br>
                <strong>Phone : </strong> {inquries.phone}<br></br>
                <strong>Inquery : </strong> {inquries.Inquery}
              </p>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}
