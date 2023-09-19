import React, { useState } from "react";
import axios from "axios";

export default function SalesForecastResult() {
  var dataFromStorage = {};
  const [dataFromModel, setDataFromModel] = useState({});

  const [XXXS_P, setXXXS_P] = useState(0);
  const [XXS_P, setXXS_P] = useState(0);
  const [XS_P, setXS_P] = useState(0);
  const [S_P, setS_P] = useState(0);
  const [M_P, setM_P] = useState(0);
  const [L_P, setL_P] = useState(0);
  const [XL_P, setXL_P] = useState(0);
  const [XXL_P, setXXL_P] = useState(0);
  const [XXXL_P, setXXXL_P] = useState(0);
  const [XXXXL_P, setXXXXL_P] = useState(0);
  const [XXXXXL_P, setXXXXXL_P] = useState(0);

  const [XXXS_RC, setXXXS_RC] = useState(0);
  const [XXS_RC, setXXS_RC] = useState(0);
  const [XS_RC, setXS_RC] = useState(0);
  const [S_RC, setS_RC] = useState(0);
  const [M_RC, setM_RC] = useState(0);
  const [L_RC, setL_RC] = useState(0);
  const [XL_RC, setXL_RC] = useState(0);
  const [XXL_RC, setXXL_RC] = useState(0);
  const [XXXL_RC, setXXXL_RC] = useState(0);
  const [XXXXL_RC, setXXXXL_RC] = useState(0);
  const [XXXXXL_RC, setXXXXXL_RC] = useState(0);

  useState(() => {
    dataFromStorage = JSON.parse(window.localStorage.getItem("data"));
    prepareData();
    // await getRatings();
    getPredictions();
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
      XXXS_RC: parseInt(dataFromStorage.XXXS_RC),
      XXS_RC: parseInt(dataFromStorage.XXS_RC),
      XS_RC: parseInt(dataFromStorage.XS_RC),
      S_RC: parseInt(dataFromStorage.S_RC),
      M_RC: parseInt(dataFromStorage.M_RC),
      L_RC: parseInt(dataFromStorage.L_RC),
      XL_RC: parseInt(dataFromStorage.XL_RC),
      XXL_RC: parseInt(dataFromStorage.XXL_RC),
      XXXL_RC: parseInt(dataFromStorage.XXXL_RC),
      XXXXL_RC: parseInt(dataFromStorage.XXXXL_RC),
      XXXXXL_RC: parseInt(dataFromStorage.XXXXXL_RC),
    };
  }

  async function getRatings() {
    if (dataFromStorage.XXXS_P !== 0) {
      await axios
        .get(`http://localhost:8070/prediction/getratings/XXXS`)
        .then((res) => {
          setXXXS_RC(res.data.length);
        });
    }
    if (dataFromStorage.XXS_P !== 0) {
      await axios
        .get(`http://localhost:8070/prediction/getratings/XXS`)
        .then((res) => {
          setXXS_RC(res.data.length);
        });
    }
    if (dataFromStorage.XS_P !== 0) {
      await axios
        .get(`http://localhost:8070/prediction/getratings/XS`)
        .then((res) => {
          setXS_RC(res.data.length);
          console.log(res.data.length);
        });
    }
    if (dataFromStorage.S_P !== 0) {
      await axios
        .get(`http://localhost:8070/prediction/getratings/S`)
        .then((res) => {
          setS_RC(res.data.length);
        });
    }
    if (dataFromStorage.M_P !== 0) {
      await axios
        .get(`http://localhost:8070/prediction/getratings/M`)
        .then((res) => {
          setM_RC(res.data.length);
          console.log(res.data.length);
        });
    }
    if (dataFromStorage.L_P !== 0) {
      await axios
        .get(`http://localhost:8070/prediction/getratings/L`)
        .then((res) => {
          setL_RC(res.data.length);
        });
    }
    if (dataFromStorage.XL_P !== 0) {
      await axios
        .get(`http://localhost:8070/prediction/getratings/XL`)
        .then((res) => {
          setXL_RC(res.data.length);
        });
    }
    if (dataFromStorage.XXL_P !== 0) {
      await axios
        .get(`http://localhost:8070/prediction/getratings/XXL`)
        .then((res) => {
          setXXL_RC(res.data.length);
        });
    }
    if (dataFromStorage.XXXL_P !== 0) {
      await axios
        .get(`http://localhost:8070/prediction/getratings/XXXL`)
        .then((res) => {
          setXXXL_RC(res.data.length);
        });
    }
    if (dataFromStorage.XXXXL_P !== 0) {
      await axios
        .get(`http://localhost:8070/prediction/getratings/XXXXL`)
        .then((res) => {
          setXXXXL_RC(res.data.length);
        });
    }
    if (dataFromStorage.XXXXXL_P !== 0) {
      await axios
        .get(`http://localhost:8070/prediction/getratings/XXXXXL`)
        .then((res) => {
          setXXXXXL_RC(res.data.length);
        });
    }
  }

  function getPredictions() {
    let data2model = {
      "XXXS-P": dataFromStorage.XXXS_P,
      "XXS-P": dataFromStorage.XXS_P,
      "XS-P": dataFromStorage.XS_P,
      "S-P": dataFromStorage.S_P,
      "M-P": dataFromStorage.M_P,
      "L-P": dataFromStorage.L_P,
      "XL-P": dataFromStorage.XL_P,
      "XXL-P": dataFromStorage.XXL_P,
      "XXXL-P": dataFromStorage.XXXL_P,
      "XXXXL-P": dataFromStorage.XXXXL_P,
      "XXXXXL-P": dataFromStorage.XXXXXL_P,
      "XXXS-RC": dataFromStorage.XXXS_RC,
      "XXS-RC": dataFromStorage.XXS_RC,
      "XS-RC": dataFromStorage.XS_RC,
      "S-RC": dataFromStorage.S_RC,
      "M-RC": dataFromStorage.M_RC,
      "L-RC": dataFromStorage.L_RC,
      "XL-RC": dataFromStorage.XL_RC,
      "XXL-RC": dataFromStorage.XXL_RC,
      "XXXL-RC": dataFromStorage.XXXL_RC,
      "XXXXL-RC": dataFromStorage.XXXXL_RC,
      "XXXXXL-RC": dataFromStorage.XXXXXL_RC,
    };
    axios
      .post(`http://localhost:8070/prediction`, data2model)
      .then((res) => {
        console.log(data2model);
        setDataFromModel(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
                <td>{dataFromModel.XXXS}</td>
                <td>€</td>
              </tr>
            )}
            {dataFromStorage.XXS_P !== 0 && (
              <tr>
                <td className="align-middle">XXS</td>
                <td>€</td>
                <td>{dataFromModel.XXS}</td>
                <td>€</td>
              </tr>
            )}
            {dataFromStorage.XS_P !== 0 && (
              <tr>
                <td className="align-middle">XS</td>
                <td>€</td>
                <td>{dataFromModel.XS}</td>
                <td>€</td>
              </tr>
            )}
            {dataFromStorage.S_P !== 0 && (
              <tr>
                <td className="align-middle">S</td>
                <td>€</td>
                <td>{dataFromModel.S}</td>
                <td>€</td>
              </tr>
            )}
            {dataFromStorage.M_P !== 0 && (
              <tr>
                <td className="align-middle">M</td>
                <td>€</td>
                <td>{dataFromModel.M}</td>
                <td>€</td>
              </tr>
            )}
            {dataFromStorage.L_P !== 0 && (
              <tr>
                <td className="align-middle">L</td>
                <td>€</td>
                <td>{dataFromModel.L}</td>
                <td>€</td>
              </tr>
            )}
            {dataFromStorage.XL_P !== 0 && (
              <tr>
                <td className="align-middle">XL</td>
                <td>€</td>
                <td>{dataFromModel.XL}</td>
                <td>€</td>
              </tr>
            )}
            {dataFromStorage.XXL_P !== 0 && (
              <tr>
                <td className="align-middle">XXL</td>
                <td>€</td>
                <td>{dataFromModel.XXL}</td>
                <td>€</td>
              </tr>
            )}
            {dataFromStorage.XXXL_P !== 0 && (
              <tr>
                <td className="align-middle">XXXL</td>
                <td>€</td>
                <td>{dataFromModel.XXXL}</td>
                <td>€</td>
              </tr>
            )}
            {dataFromStorage.XXXXL_P !== 0 && (
              <tr>
                <td className="align-middle">XXXXL</td>
                <td>€</td>
                <td>{dataFromModel.XXXXL}</td>
                <td>€</td>
              </tr>
            )}
            {dataFromStorage.XXXXXL_P !== 0 && (
              <tr>
                <td className="align-middle">XXXXXL</td>
                <td>€</td>
                <td>{dataFromModel.XXXXXL}</td>
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
