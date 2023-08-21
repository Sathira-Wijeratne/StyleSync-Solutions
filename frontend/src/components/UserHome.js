import React from "react";
import Button from "react-bootstrap/Button";

export default function UserHome() {
  return (
    <div className="container">
      <div style={{ float: "right" }}>
        <a
          href="/"
          onClick={() => {
            sessionStorage.removeItem("sSyncSolRemotsuc");
            sessionStorage.removeItem("customerEmail");
          }}
        >
          {/*Buttons*/}
          <Button variant="danger">Signout</Button>
        </a>
      </div>
      <h1>Welcome Customer</h1>
    </div>
  );
}
