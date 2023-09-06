import React from "react";
import Button from "react-bootstrap/Button";

export default function AdminHome() {
  return (
    <div className="container">
      <div style={{ float: "right" }}>
        <a
          href="/"
          onClick={() => {
            sessionStorage.removeItem("sSyncSolNimda");
            sessionStorage.removeItem("adminEmail");
          }}
        >
          {/*Buttons*/}
          <Button variant="danger">Signout</Button>
        </a>
      </div>
      <h1>Welcome Admin</h1>
      <a href="/adminhome/salesforecast">
        <button className="btn btn-primary">Sales Forecast</button>
      </a>
    </div>
  );
}
