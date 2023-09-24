import React from "react";
import logo from "../images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faClockRotateLeft,
  faCircleUser
  
} from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  return (
    <div className="container-fluid" style={{ backgroundColor: "black" }}>
      <div className="row">
        <div className="col-md-12 text-left">
          <img src={logo} width={80} height={80} alt="Logo" />
        </div>
        <div className="col-md-12 text-end" style={{ justifyContent: "center" }}>

          <a type="button" href="/cart">
            <FontAwesomeIcon
              icon={faCartShopping}
              shake
              size="m"
              style={{ marginLeft: "25px" ,color:"White"}}
            />
          </a>
          <a type="button" href="/purchaseHistory">
            <FontAwesomeIcon
              icon={faClockRotateLeft}
              size="m"
              style={{ marginLeft: "25px",color:"White"}}
            />
          </a>
          <a
            href="/"
            onClick={() => {
              sessionStorage.removeItem("sSyncSolRemotsuc");
              sessionStorage.removeItem("customerEmail");
            }}
          >
             <a type="button">
            <FontAwesomeIcon
              icon={faCircleUser}
              size="m"
              style={{ marginLeft: "25px", color:"White"}}
            />
          </a>
          </a>
        </div>
      </div>
    </div>
  );
}
