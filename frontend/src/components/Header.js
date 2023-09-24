import React, { useState } from "react";
import logo from "../images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faClockRotateLeft,
  faUserCircle,
  faHouse
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
                <a type="button" href="/home">
                  <FontAwesomeIcon
                    icon={faHouse}
                    size="xl" // Change to "1x" for normal size
                    style={{ marginLeft: "25px", color: "white" }}
                  />
                </a>
                <a type="button" href="/cart">
                  <FontAwesomeIcon
                    icon={faCartShopping}
                    shake
                    size="xl" // Change to "1x" for normal size
                    style={{ marginLeft: "25px", color: "white" }}
                  />
                </a>
                <a type="button" href="/purchaseHistory">
                  <FontAwesomeIcon
                    icon={faClockRotateLeft}
                    size="xl" // Change to "1x" for normal size
                    style={{ marginLeft: "25px", color: "white" }}
                  />
                </a>
                <div
                  onClick={toggleDropdown}
                  style={{ cursor: "pointer", marginLeft: "25px" }}
                >
                  <FontAwesomeIcon
                    icon={faUserCircle}
                    size="xl" // Change to "1x" for normal size
                    style={{ color: "white" }}
                  />
                </div>
                {/* Dropdown menu */}
                {showDropdown && (
                  <div className="dropdown" style={{ marginLeft: "25px" }}>
                    <button
                      className="btn btn-danger dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      style={{ backgroundColor: "black", border: "none" }}
                    >
                      Sign Out
                    </button>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <a
                        className="dropdown-item"
                        href="/"
                        onClick={() => {
                          sessionStorage.removeItem("sSyncSolRemotsuc");
                          sessionStorage.removeItem("customerEmail");
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
