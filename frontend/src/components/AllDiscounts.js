import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function AllDiscounts() {
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

  return (
    <div className="container">
      <h1>All Discounts</h1>

      <table className="table table-borderless">
        <div className="row">
          <div class="btn-group" role="group" aria-label="Basic example"></div>
          <div class="btn-group" role="group" aria-label="Basic example">
            <button
              type="button"
              class="btn btn-outline-dark"
              onClick={() => {
                window.location.replace(
                  `http://localhost:3000/adminhome/discount/add/`
                );
              }}
            >
              Add New Discounts
            </button>
          </div>
        </div>

        <tr>
          <th scope="col">Discount ID</th>
          <th scope="col">Discount Type</th>
          <th scope="col">Discount Rate</th>
          <th scope="col">Product Name</th>
          <th scope="col">Description</th>
          <th scope="col">Start Date</th>
          <th scope="col">Expiration Date</th>
        </tr>

        <tbody>
          {discounts.map((discount) => (
            <tr scope="row">
              <td class="text-uppercase">{discount.discountId}</td>
              <td class="text-uppercase">{discount.discountType}</td>
              <td class="text-uppercase">{discount.discountRate}</td>
              <td class="text-uppercase">{discount.discountProductName}</td>
              <td class="text-uppercase">{discount.discountDescription}</td>
              <td class="text-uppercase">{discount.discountStartDate}</td>
              <td class="text-uppercase">{discount.discountExpirationDate}</td>
              <td>
                <button
                  className="btn btn-success"
                  onClick={() => {
                    window.location.replace(
                      `http://localhost:3000/adminhome/discount/update/${discount._id}`
                    );
                  }}
                >
                  UPDATE
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
                  DELETE
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
