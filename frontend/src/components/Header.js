import React, { useState } from "react";
import logo from "../images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faClockRotateLeft,
  faUserCircle,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  return (
    <div className="container-fluid" style={{ backgroundColor: "black" }}>
      <table className="borderless">
        <tbody>
          <tr>
            <td>
              <div className="col-md-12 text-left">
                <img src={logo} width={80} height={80} alt="Logo" />
              </div>
            </td>
            <td width={1050}></td>
            <td>
              <div
                className="col-md-12 text-end"
                style={{ justifyContent: "right", display: "flex" }}
              >
                {sessionStorage.getItem("customerEmail") && (
                  <a type="button" href="/home/1">
                    <FontAwesomeIcon
                      icon={faHouse}
                      size="xl" // Change to "1x" for normal size
                      style={{ marginLeft: "25px", color: "white" }}
                    />
                  </a>
                )}
                {sessionStorage.getItem("adminEmail") && (
                  <a type="button" href="/adminhome">
                    <FontAwesomeIcon
                      icon={faHouse}
                      size="xl" // Change to "1x" for normal size
                      style={{ marginLeft: "25px", color: "white" }}
                    />
                  </a>
                )}
                {sessionStorage.getItem("customerEmail") && (
                  <a type="button" href="/cart">
                    <FontAwesomeIcon
                      icon={faCartShopping}
                      shake
                      size="xl" // Change to "1x" for normal size
                      style={{ marginLeft: "25px", color: "white" }}
                    />
                  </a>
                )}
                {sessionStorage.getItem("customerEmail") && (
                  <a type="button" href="/purchaseHistory">
                    <FontAwesomeIcon
                      icon={faClockRotateLeft}
                      size="xl" // Change to "1x" for normal size
                      style={{ marginLeft: "25px", color: "white" }}
                    />
                  </a>
                )}
                {(sessionStorage.getItem("customerEmail") ||
                  sessionStorage.getItem("adminEmail")) && (
                    <div className="dropdown" style={{ marginLeft: "25px" }}>
                      <button
                        className="btn btn-danger"
                        type="button"
                        id="dropdownMenuButton"
                        style={{ backgroundColor: "black", border: "none" }}
                        onClick={() => {
                          sessionStorage.removeItem("sSyncSolRemotsuc");
                          sessionStorage.removeItem("sSyncSolNimda");
                          sessionStorage.removeItem("customerEmail");
                          sessionStorage.removeItem("adminEmail");
                          window.location.replace("/");
                        }}
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
