import React, { useState } from "react";
import Button from "react-bootstrap/Button";

export default function SalesForecast() {
  const [result, setResult] = useState(<></>);

  function getPredictions(e) {
    e.preventDefault();
    processResult();
  }

  function processResult() {
    setResult(
      <>
        <h2>Result</h2>
        <center>
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

  return (
    <div className="container">
      <a type="button" href="/adminhome">
        <Button variant="dark">Back</Button>
      </a>
      <center>
        <h1>Sales Forecast</h1>
        Enter the product price along with the size of the product that you want
        to get the sales forecast
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
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="align-middle">XXXS</td>
              <td>
                <input type="number" step="0.01" /> €
              </td>
            </tr>
            <tr>
              <td className="align-middle">XXS</td>
              <td>
                <input type="number" step="0.01" /> €
              </td>
            </tr>
            <tr>
              <td className="align-middle">XS</td>
              <td>
                <input type="number" step="0.01" /> €
              </td>
            </tr>
            <tr>
              <td className="align-middle">S</td>
              <td>
                <input type="number" step="0.01" /> €
              </td>
            </tr>
            <tr>
              <td className="align-middle">M</td>
              <td>
                <input type="number" step="0.01" /> €
              </td>
            </tr>
            <tr>
              <td className="align-middle">L</td>
              <td>
                <input type="number" step="0.01" /> €
              </td>
            </tr>
            <tr>
              <td className="align-middle">XL</td>
              <td>
                <input type="number" step="0.01" /> €
              </td>
            </tr>
            <tr>
              <td className="align-middle">XXL</td>
              <td>
                <input type="number" step="0.01" /> €
              </td>
            </tr>
            <tr>
              <td className="align-middle">XXXL</td>
              <td>
                <input type="number" step="0.01" /> €
              </td>
            </tr>
            <tr>
              <td className="align-middle">XXXXL</td>
              <td>
                <input type="number" step="0.01" /> €
              </td>
            </tr>
            <tr>
              <td className="align-middle">XXXXXL</td>
              <td>
                <input type="number" step="0.01" /> €
              </td>
            </tr>
            <br />
          </tbody>
        </table>
      </center>
      <div>
        <button
          onClick={(e) => {
            getPredictions(e);
          }}
          style={{ marginLeft: "70%" }}
          className="btn btn-primary"
        >
          Get Predictions
        </button>
        <br />
        <br />
        {result}
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}