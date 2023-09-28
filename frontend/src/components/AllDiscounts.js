import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import backgroundImage from "../images/trrrr.jpg";

export default function AllDiscounts() {
  if (sessionStorage.getItem("sSyncSolNimda") === null) {
    window.location.replace("/");
  }

  const [discounts, setDiscounts] = useState([]);
  let history = useHistory();

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
    <div className="container" style={containerStyle}>
      <h1 style={{ color: "black" }}>All Discounts</h1>
      <div className="d-flex justify-content-end">
        <Button
          variant="primary"
          onClick={() => {
            window.location.replace(
              `http://localhost:3000/adminhome/discount/add/`
            );
          }}
        >
          <FontAwesomeIcon icon={faPlus} /> Add New Discounts
        </Button>
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
            <th scope="col">Description</th>
            <th scope="col">Start Date</th>
            <th scope="col">Expiration Date</th>
            <th scope="col"></th>
            <th scope="col"></th>
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
              <td className="label-bold-black">
                {discount.discountDescription}
              </td>
              <td className="label-bold-black">{discount.discountStartDate}</td>
              <td className="label-bold-black">
                {discount.discountExpirationDate}
              </td>
              <td>
                <button
                  className="btn btn-success"
                  onClick={() => {
                    window.location.replace(
                      `http://localhost:3000/adminhome/discount/update/${discount._id}`
                    );
                  }}
                >
                  <FontAwesomeIcon icon={faEdit} />
                  {/* UPDATE */}
                </button>
              </td>

              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    window.location.replace(
                      `http://localhost:3000/adminhome/discount/delete/${discount._id}`
                    );
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                  {/* DELETE */}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
