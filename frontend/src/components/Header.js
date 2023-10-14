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
  const [showDropdown, setShowDropdown] = useState(false); // State to control dropdown visibility

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

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

                {/* Dropdown menu */}
                {(sessionStorage.getItem("customerEmail") ||
                  sessionStorage.getItem("adminEmail")) && (
                    <div className="dropdown" style={{ marginLeft: "25px" }}>
                      <FontAwesomeIcon
                        icon={faUserCircle}
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        size="xl"
                        style={{ marginLeft: "20px", color: "white" }}
                        onClick={toggleDropdown} // Add event handler to toggle dropdown
                      />
                      {/* Sign Out
                    </button> */}
                      <div
                        className={`dropdown-menu ${showDropdown ? "show" : ""}`}
                        aria-labelledby="dropdownMenuButton"
                      >
                        {sessionStorage.getItem("customerEmail") && (
                          <a
                            className="dropdown-item"
                            href="/ContactUs"
                          >
                            Contact Us
                          </a>
                        )}
                        <a
                          className="dropdown-item"
                          href="/"
                          onClick={() => {
                            sessionStorage.removeItem("sSyncSolRemotsuc");
                            sessionStorage.removeItem("sSyncSolNimda");
                            sessionStorage.removeItem("customerEmail");
                            sessionStorage.removeItem("adminEmail");
                          }}
                        >
                          Sign Out
                        </a>
                      </div>
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
