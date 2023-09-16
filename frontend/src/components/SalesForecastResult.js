import React from "react";

export default function SalesForecastResult() {
  return (
    <>
      <center>
        <h2>Prediction Summary</h2>

        <span style={{ color: "red" }}>
          Please note that the predicted values are for the{" "}
          <b>summer season </b>
          only.
        </span>
        <br />
        <br />
        <table
          className="table"
          style={{
            width: "75%",
            textAlign: "center",
          }}
        >
          <thead>
            <tr>
              <th>Product Size</th>
              <th>Product Price</th>
              <th>Predicted Sales</th>
              <th>Projected Revenue</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="align-middle">XS</td>
              <td>€</td>
              <td></td>
              <td>€</td>
            </tr>
            <tr>
              <td className="align-middle">M</td>
              <td>€</td>
              <td></td>
              <td>€</td>
            </tr>
            <tr>
              <td className="align-middle">XL</td>
              <td>€</td>
              <td></td>
              <td>€</td>
            </tr>
            <tr>
              <td className="align-middle"></td>
              <td></td>
              <th>Total Projected Earnings</th>
              <th>€</th>
            </tr>
          </tbody>
        </table>
      </center>
    </>
  );
}
