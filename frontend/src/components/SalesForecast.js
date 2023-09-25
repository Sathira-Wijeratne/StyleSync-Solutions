import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default function SalesForecast() {
  if (sessionStorage.getItem("sSyncSolNimda") === null) {
    window.location.replace("/");
  }

  const [XXXS_P, setXXXS_P] = useState("0");
  const [XXS_P, setXXS_P] = useState("0");
  const [XS_P, setXS_P] = useState("0");
  const [S_P, setS_P] = useState("0");
  const [M_P, setM_P] = useState("0");
  const [L_P, setL_P] = useState("0");
  const [XL_P, setXL_P] = useState("0");
  const [XXL_P, setXXL_P] = useState("0");
  const [XXXL_P, setXXXL_P] = useState("0");
  const [XXXXL_P, setXXXXL_P] = useState("0");
  const [XXXXXL_P, setXXXXXL_P] = useState("0");

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

  function getPredictions(e) {
    e.preventDefault();

    if (validate() === true) {
      var jsonobj = {
        XXXS_P,
        XXS_P,
        XS_P,
        S_P,
        M_P,
        L_P,
        XL_P,
        XXL_P,
        XXXL_P,
        XXXXL_P,
        XXXXXL_P,
        XXXS_RC,
        XXS_RC,
        XS_RC,
        S_RC,
        M_RC,
        L_RC,
        XL_RC,
        XXL_RC,
        XXXL_RC,
        XXXXL_RC,
        XXXXXL_RC,
      };
      var data = JSON.stringify(jsonobj);
      window.localStorage.setItem("data", data);
      window.location.replace("/adminhome/salesforecast/result");
    } else {
      alert("Please enter a product price at least for a one size category!");
    }
  }

  function validate() {
    if (
      XXXS_P === "0" &&
      XXS_P === "0" &&
      XS_P === "0" &&
      S_P === "0" &&
      M_P === "0" &&
      L_P === "0" &&
      XL_P === "0" &&
      XXL_P === "0" &&
      XXXL_P === "0" &&
      XXXXL_P === "0" &&
      XXXXXL_P === "0"
    ) {
      return false;
    } else {
      return true;
    }
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
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={XXXS_P}
                  onChange={(e) => {
                    if (e.target.value === "") {
                      setXXXS_P("0");
                    } else {
                      setXXXS_P(e.target.value);
                    }
                    axios
                      .get(`http://localhost:8070/prediction/getratings/XXXS`)
                      .then((res) => {
                        setXXXS_RC(res.data.length);
                      });
                  }}
                />{" "}
                €
              </td>
            </tr>
            <tr>
              <td className="align-middle">XXS</td>
              <td>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={XXS_P}
                  onChange={(e) => {
                    if (e.target.value === "") {
                      setXXS_P("0");
                    } else {
                      setXXS_P(e.target.value);
                    }
                    axios
                      .get(`http://localhost:8070/prediction/getratings/XXS`)
                      .then((res) => {
                        setXXS_RC(res.data.length);
                      });
                  }}
                />{" "}
                €
              </td>
            </tr>
            <tr>
              <td className="align-middle">XS</td>
              <td>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={XS_P}
                  onChange={(e) => {
                    if (e.target.value === "") {
                      setXS_P("0");
                    } else {
                      setXS_P(e.target.value);
                    }
                    axios
                      .get(`http://localhost:8070/prediction/getratings/XS`)
                      .then((res) => {
                        setXS_RC(res.data.length);
                        console.log(res.data.length);
                      });
                  }}
                />{" "}
                €
              </td>
            </tr>
            <tr>
              <td className="align-middle">S</td>
              <td>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={S_P}
                  onChange={(e) => {
                    if (e.target.value === "") {
                      setS_P("0");
                    } else {
                      setS_P(e.target.value);
                    }
                    axios
                      .get(`http://localhost:8070/prediction/getratings/S`)
                      .then((res) => {
                        setS_RC(res.data.length);
                      });
                  }}
                />{" "}
                €
              </td>
            </tr>
            <tr>
              <td className="align-middle">M</td>
              <td>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={M_P}
                  onChange={(e) => {
                    if (e.target.value === "") {
                      setM_P("0");
                    } else {
                      setM_P(e.target.value);
                    }
                    axios
                      .get(`http://localhost:8070/prediction/getratings/M`)
                      .then((res) => {
                        setM_RC(res.data.length);
                        console.log(res.data.length);
                      });
                  }}
                />{" "}
                €
              </td>
            </tr>
            <tr>
              <td className="align-middle">L</td>
              <td>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={L_P}
                  onChange={(e) => {
                    if (e.target.value === "") {
                      setL_P("0");
                    } else {
                      setL_P(e.target.value);
                    }
                    axios
                      .get(`http://localhost:8070/prediction/getratings/L`)
                      .then((res) => {
                        setL_RC(res.data.length);
                      });
                  }}
                />{" "}
                €
              </td>
            </tr>
            <tr>
              <td className="align-middle">XL</td>
              <td>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={XL_P}
                  onChange={(e) => {
                    if (e.target.value === "") {
                      setXL_P("0");
                    } else {
                      setXL_P(e.target.value);
                    }
                    axios
                      .get(`http://localhost:8070/prediction/getratings/XL`)
                      .then((res) => {
                        setXL_RC(res.data.length);
                      });
                  }}
                />{" "}
                €
              </td>
            </tr>
            <tr>
              <td className="align-middle">XXL</td>
              <td>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={XXL_P}
                  onChange={(e) => {
                    if (e.target.value === "") {
                      setXXL_P("0");
                    } else {
                      setXXL_P(e.target.value);
                    }
                    axios
                      .get(`http://localhost:8070/prediction/getratings/XXL`)
                      .then((res) => {
                        setXXL_RC(res.data.length);
                      });
                  }}
                />{" "}
                €
              </td>
            </tr>
            <tr>
              <td className="align-middle">XXXL</td>
              <td>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={XXXL_P}
                  onChange={(e) => {
                    if (e.target.value === "") {
                      setXXXL_P("0");
                    } else {
                      setXXXL_P(e.target.value);
                    }
                    axios
                      .get(`http://localhost:8070/prediction/getratings/XXXL`)
                      .then((res) => {
                        setXXXL_RC(res.data.length);
                      });
                  }}
                />{" "}
                €
              </td>
            </tr>
            <tr>
              <td className="align-middle">XXXXL</td>
              <td>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={XXXXL_P}
                  onChange={(e) => {
                    if (e.target.value === "") {
                      setXXXXL_P("0");
                    } else {
                      setXXXXL_P(e.target.value);
                    }
                    axios
                      .get(`http://localhost:8070/prediction/getratings/XXXXL`)
                      .then((res) => {
                        setXXXXL_RC(res.data.length);
                      });
                  }}
                />{" "}
                €
              </td>
            </tr>
            <tr>
              <td className="align-middle">XXXXXL</td>
              <td>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={XXXXXL_P}
                  onChange={(e) => {
                    if (e.target.value === "") {
                      setXXXXXL_P("0");
                    } else {
                      setXXXXXL_P(e.target.value);
                    }
                    axios
                      .get(`http://localhost:8070/prediction/getratings/XXXXXL`)
                      .then((res) => {
                        setXXXXXL_RC(res.data.length);
                      });
                  }}
                />{" "}
                €
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
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
