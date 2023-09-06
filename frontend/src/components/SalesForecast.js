import React from "react";

export default function SalesForecast() {
  return (
    <div className="container">
      <center>
        <h1>Sales Forecast</h1>
        <table className="table" style={{ marginLeft: "20%" }}>
          <thead>
            <tr>
              <th>Product Size</th>
              <th className="th-sm">Product Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>XXXS</td>
              <td>
                <input type="number" />
              </td>
            </tr>
            <tr>
              <td>XXS</td>
              <td></td>
            </tr>
            <tr>
              <td>XS</td>
              <td></td>
            </tr>
            <tr>
              <td>S</td>
              <td></td>
            </tr>
            <tr>
              <td>M</td>
              <td></td>
            </tr>
            <tr>
              <td>L</td>
              <td></td>
            </tr>
            <tr>
              <td>XL</td>
              <td></td>
            </tr>
            <tr>
              <td>XXL</td>
              <td></td>
            </tr>
            <tr>
              <td>XXXL</td>
              <td></td>
            </tr>
            <tr>
              <td>XXXXL</td>
              <td></td>
            </tr>
            <tr>
              <td>XXXXXL</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </center>
    </div>
  );
}
