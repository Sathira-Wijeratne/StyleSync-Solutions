import React, { useState } from "react";

export default function SalesForecastResult() {
  var dataFromStorage = {};
  var data2display = {};
  var data2model = {};

  useState(async () => {
    dataFromStorage = JSON.parse(window.localStorage.getItem("data"));
    prepareData();

    await getPredictions();
    // prepareForOutput();
    console.log(dataFromStorage);
  });

  function prepareData() {
    dataFromStorage = {
      XXXS_P: parseFloat(dataFromStorage.XXXS_P),
      XXS_P: parseFloat(dataFromStorage.XXS_P),
      XS_P: parseFloat(dataFromStorage.XS_P),
      S_P: parseFloat(dataFromStorage.S_P),
      M_P: parseFloat(dataFromStorage.M_P),
      L_P: parseFloat(dataFromStorage.L_P),
      XL_P: parseFloat(dataFromStorage.XL_P),
      XXL_P: parseFloat(dataFromStorage.XXL_P),
      XXXL_P: parseFloat(dataFromStorage.XXXL_P),
      XXXXL_P: parseFloat(dataFromStorage.XXXXL_P),
      XXXXXL_P: parseFloat(dataFromStorage.XXXXXL_P),
    };
  }

  function getPredictions() {}

  return (
    // <>
    //   <center>
    //     <h2>Prediction Summary</h2>

    //     <span style={{ color: "red" }}>
    //       Please note that the predicted values are for the{" "}
    //       <b>summer season </b>
    //       only.
    //     </span>
    //     <br />
    //     <br />
    //     <table
    //       className="table"
    //       style={{
    //         width: "75%",
    //         textAlign: "center",
    //       }}
    //     >
    //       <thead>
    //         <tr>
    //           <th>Product Size</th>
    //           <th>Product Price</th>
    //           <th>Predicted Sales</th>
    //           <th>Projected Revenue</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         <tr>
    //           <td className="align-middle">XS</td>
    //           <td>€</td>
    //           <td></td>
    //           <td>€</td>
    //         </tr>
    //         <tr>
    //           <td className="align-middle">M</td>
    //           <td>€</td>
    //           <td></td>
    //           <td>€</td>
    //         </tr>
    //         <tr>
    //           <td className="align-middle">XL</td>
    //           <td>€</td>
    //           <td></td>
    //           <td>€</td>
    //         </tr>
    //         <tr>
    //           <td className="align-middle"></td>
    //           <td></td>
    //           <th>Total Projected Earnings</th>
    //           <th>€</th>
    //         </tr>
    //       </tbody>
    //     </table>
    //   </center>
    // </>

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
            {dataFromStorage.XXXS_P !== 0 && (
              <tr>
                <td className="align-middle">XXXS</td>
                <td>€</td>
                <td></td>
                <td>€</td>
              </tr>
            )}
            {dataFromStorage.XXS_P !== 0 && (
              <tr>
                <td className="align-middle">XXS</td>
                <td>€</td>
                <td></td>
                <td>€</td>
              </tr>
            )}
            {dataFromStorage.XS_P !== 0 && (
              <tr>
                <td className="align-middle">XS</td>
                <td>€</td>
                <td></td>
                <td>€</td>
              </tr>
            )}
            {dataFromStorage.S_P !== 0 && (
              <tr>
                <td className="align-middle">S</td>
                <td>€</td>
                <td></td>
                <td>€</td>
              </tr>
            )}
            {dataFromStorage.M_P !== 0 && (
              <tr>
                <td className="align-middle">M</td>
                <td>€</td>
                <td></td>
                <td>€</td>
              </tr>
            )}
            {dataFromStorage.L_P !== 0 && (
              <tr>
                <td className="align-middle">L</td>
                <td>€</td>
                <td></td>
                <td>€</td>
              </tr>
            )}
            {dataFromStorage.XL_P !== 0 && (
              <tr>
                <td className="align-middle">XL</td>
                <td>€</td>
                <td></td>
                <td>€</td>
              </tr>
            )}
            {dataFromStorage.XXL_P !== 0 && (
              <tr>
                <td className="align-middle">XXL</td>
                <td>€</td>
                <td></td>
                <td>€</td>
              </tr>
            )}
            {dataFromStorage.XXXL_P !== 0 && (
              <tr>
                <td className="align-middle">XXXL</td>
                <td>€</td>
                <td></td>
                <td>€</td>
              </tr>
            )}
            {dataFromStorage.XXXXL_P !== 0 && (
              <tr>
                <td className="align-middle">XXXXL</td>
                <td>€</td>
                <td></td>
                <td>€</td>
              </tr>
            )}
            {dataFromStorage.XXXXXL_P !== 0 && (
              <tr>
                <td className="align-middle">XXXXXL</td>
                <td>€</td>
                <td></td>
                <td>€</td>
              </tr>
            )}
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
