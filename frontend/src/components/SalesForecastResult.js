import React, { useState } from "react";
import axios from "axios";

export default function SalesForecastResult() {
  const dataFromStorage = JSON.parse(window.localStorage.getItem("data"));
  const [dataFromModel, setDataFromModel] = useState({});
  const [total, setTotal] = useState(0);

  useState(() => {
    getPredictions();
  });

  function getPredictions() {
    let data2model = {
      "XXXS-P": parseFloat(dataFromStorage.XXXS_P),
      "XXS-P": parseFloat(dataFromStorage.XXS_P),
      "XS-P": parseFloat(dataFromStorage.XS_P),
      "S-P": parseFloat(dataFromStorage.S_P),
      "M-P": parseFloat(dataFromStorage.M_P),
      "L-P": parseFloat(dataFromStorage.L_P),
      "XL-P": parseFloat(dataFromStorage.XL_P),
      "XXL-P": parseFloat(dataFromStorage.XXL_P),
      "XXXL-P": parseFloat(dataFromStorage.XXXL_P),
      "XXXXL-P": parseFloat(dataFromStorage.XXXXL_P),
      "XXXXXL-P": parseFloat(dataFromStorage.XXXXXL_P),
      "XXXS-RC": parseInt(dataFromStorage.XXXS_RC),
      "XXS-RC": parseInt(dataFromStorage.XXS_RC),
      "XS-RC": parseInt(dataFromStorage.XS_RC),
      "S-RC": parseInt(dataFromStorage.S_RC),
      "M-RC": parseInt(dataFromStorage.M_RC),
      "L-RC": parseInt(dataFromStorage.L_RC),
      "XL-RC": parseInt(dataFromStorage.XL_RC),
      "XXL-RC": parseInt(dataFromStorage.XXL_RC),
      "XXXL-RC": parseInt(dataFromStorage.XXXL_RC),
      "XXXXL-RC": parseInt(dataFromStorage.XXXXL_RC),
      "XXXXXL-RC": parseInt(dataFromStorage.XXXXXL_RC),
    };
    axios
      .post(`http://localhost:8070/prediction`, data2model)
      .then((res) => {
        setDataFromModel(res.data);
        console.log(data2model);
        setTotal(getTotal(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getTotal(data) {
    let total = 0;

    if (dataFromStorage.XXXS_P !== "0") {
      total = total + parseFloat(dataFromStorage.XXXS_P) * data.XXXS;
    }
    if (dataFromStorage.XXS_P !== "0") {
      total = total + parseFloat(dataFromStorage.XXS_P) * data.XXS;
    }
    if (dataFromStorage.XS_P !== "0") {
      total = total + parseFloat(dataFromStorage.XS_P) * data.XS;
    }
    if (dataFromStorage.S_P !== "0") {
      total = total + parseFloat(dataFromStorage.S_P) * data.S;
    }
    if (dataFromStorage.M_P !== "0") {
      total = total + parseFloat(dataFromStorage.M_P) * data.M;
    }
    if (dataFromStorage.L_P !== "0") {
      total = total + parseFloat(dataFromStorage.L_P) * data.L;
    }
    if (dataFromStorage.XL_P !== "0") {
      total = total + parseFloat(dataFromStorage.XL_P) * data.XL;
    }
    if (dataFromStorage.XXL_P !== "0") {
      total = total + parseFloat(dataFromStorage.XXL_P) * data.XXL;
    }
    if (dataFromStorage.XXXL_P !== "0") {
      total = total + parseFloat(dataFromStorage.XXXL_P) * data.XXXL;
    }
    if (dataFromStorage.XXXXL_P !== "0") {
      total = total + parseFloat(dataFromStorage.XXXXL_P) * data.XXXXL;
    }
    if (dataFromStorage.XXXXXL_P !== "0") {
      total = total + parseFloat(dataFromStorage.XXXXXL_P) * data.XXXXXL;
    }
    return total;
  }

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
            // textAlign: "center",
          }}
        >
          <thead>
            <tr>
              <th className="text-center">Product Size</th>
              <th className="text-center">Product Price</th>
              <th className="text-center">Predicted Sales</th>
              <th className="text-center">Projected Revenue</th>
            </tr>
          </thead>
          <tbody>
            {dataFromStorage.XXXS_P !== "0" && (
              <tr>
                <td className="align-middle text-center">XXXS</td>
                <td className="text-right" style={{ paddingRight: "50px" }}>
                  {dataFromStorage.XXXS_P} €
                </td>
                <td className="text-right" style={{ paddingRight: "100px" }}>
                  {dataFromModel.XXXS}
                </td>
                <td className="text-right" style={{ paddingRight: "70px" }}>
                  {dataFromStorage.XXXS_P * dataFromModel.XXXS} €
                </td>
              </tr>
            )}
            {dataFromStorage.XXS_P !== "0" && (
              <tr>
                <td className="align-middle text-center">XXS</td>
                <td className="text-right" style={{ paddingRight: "50px" }}>
                  {dataFromStorage.XXS_P} €
                </td>
                <td className="text-right" style={{ paddingRight: "100px" }}>
                  {dataFromModel.XXS}
                </td>
                <td className="text-right" style={{ paddingRight: "70px" }}>
                  {dataFromStorage.XXS_P * dataFromModel.XXS} €
                </td>
              </tr>
            )}
            {dataFromStorage.XS_P !== "0" && (
              <tr>
                <td className="align-middle text-center">XS</td>
                <td className="text-right" style={{ paddingRight: "50px" }}>
                  {dataFromStorage.XS_P} €
                </td>
                <td className="text-right" style={{ paddingRight: "100px" }}>
                  {dataFromModel.XS}
                </td>
                <td className="text-right" style={{ paddingRight: "70px" }}>
                  {dataFromStorage.XS_P * dataFromModel.XS} €
                </td>
              </tr>
            )}
            {dataFromStorage.S_P !== "0" && (
              <tr>
                <td className="align-middle text-center">S</td>
                <td className="text-right" style={{ paddingRight: "50px" }}>
                  {dataFromStorage.S_P} €
                </td>
                <td className="text-right" style={{ paddingRight: "100px" }}>
                  {dataFromModel.S}
                </td>
                <td className="text-right" style={{ paddingRight: "70px" }}>
                  {dataFromStorage.S_P * dataFromModel.S} €
                </td>
              </tr>
            )}
            {dataFromStorage.M_P !== "0" && (
              <tr>
                <td className="align-middle text-center">M</td>
                <td className="text-right" style={{ paddingRight: "50px" }}>
                  {dataFromStorage.M_P} €
                </td>
                <td className="text-right" style={{ paddingRight: "100px" }}>
                  {dataFromModel.M}
                </td>
                <td className="text-right" style={{ paddingRight: "70px" }}>
                  {dataFromStorage.M_P * dataFromModel.M} €
                </td>
              </tr>
            )}
            {dataFromStorage.L_P !== "0" && (
              <tr>
                <td className="align-middle text-center">L</td>
                <td className="text-right" style={{ paddingRight: "50px" }}>
                  {dataFromStorage.L_P} €
                </td>
                <td className="text-right" style={{ paddingRight: "100px" }}>
                  {dataFromModel.L}
                </td>
                <td className="text-right" style={{ paddingRight: "70px" }}>
                  {dataFromStorage.L_P * dataFromModel.L} €
                </td>
              </tr>
            )}
            {dataFromStorage.XL_P !== "0" && (
              <tr>
                <td className="align-middle text-center">XL</td>
                <td className="text-right" style={{ paddingRight: "50px" }}>
                  {dataFromStorage.XL_P} €
                </td>
                <td className="text-right" style={{ paddingRight: "100px" }}>
                  {dataFromModel.XL}
                </td>
                <td className="text-right" style={{ paddingRight: "70px" }}>
                  {dataFromStorage.XL_P * dataFromModel.XL} €
                </td>
              </tr>
            )}
            {dataFromStorage.XXL_P !== "0" && (
              <tr>
                <td className="align-middle text-center">XXL</td>
                <td className="text-right" style={{ paddingRight: "50px" }}>
                  {dataFromStorage.XXL_P} €
                </td>
                <td className="text-right" style={{ paddingRight: "100px" }}>
                  {dataFromModel.XXL}
                </td>
                <td className="text-right" style={{ paddingRight: "70px" }}>
                  {dataFromStorage.XXL_P * dataFromModel.XXL} €
                </td>
              </tr>
            )}
            {dataFromStorage.XXXL_P !== "0" && (
              <tr>
                <td className="align-middle text-center">XXXL</td>
                <td className="text-right" style={{ paddingRight: "50px" }}>
                  {dataFromStorage.XXXL_P} €
                </td>
                <td className="text-right" style={{ paddingRight: "100px" }}>
                  {dataFromModel.XXXL}
                </td>
                <td className="text-right" style={{ paddingRight: "70px" }}>
                  {dataFromStorage.XXXL_P * dataFromModel.XXXL} €
                </td>
              </tr>
            )}
            {dataFromStorage.XXXXL_P !== "0" && (
              <tr>
                <td className="align-middle text-center">XXXXL</td>
                <td className="text-right" style={{ paddingRight: "50px" }}>
                  {dataFromStorage.XXXXL_P} €
                </td>
                <td className="text-right" style={{ paddingRight: "100px" }}>
                  {dataFromModel.XXXXL}
                </td>
                <td className="text-right" style={{ paddingRight: "70px" }}>
                  {dataFromStorage.XXXXL_P * dataFromModel.XXXXL} €
                </td>
              </tr>
            )}
            {dataFromStorage.XXXXXL_P !== "0" && (
              <tr>
                <td className="align-middle text-center">XXXXXL</td>
                <td className="text-right" style={{ paddingRight: "50px" }}>
                  {dataFromStorage.XXXXXL_P} €
                </td>
                <td className="text-right" style={{ paddingRight: "100px" }}>
                  {dataFromModel.XXXXXL}
                </td>
                <td className="text-right" style={{ paddingRight: "70px" }}>
                  {dataFromStorage.XXXXXL_P * dataFromModel.XXXXXL} €
                </td>
              </tr>
            )}
            <tr>
              <td className="align-middle text-center"></td>
              <td></td>
              <th className="align-middle text-center">
                Total Projected Earnings
              </th>
              <th className="text-right" style={{ paddingRight: "70px" }}>
                {total} €
              </th>
            </tr>
          </tbody>
        </table>
      </center>
    </>
  );
}
