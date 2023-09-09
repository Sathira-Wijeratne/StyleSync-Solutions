import React, { useEffect, useState } from "react";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import axios from "axios";

export default function AddDiscount() {
  const [discountId, setDiscountId] = useState("");
  //since we are making the type of age as number --> remove "" of useState.
  const [discountType, setDiscountType] = useState("");
  const [discountRate, setDiscountRate] = useState();
  const [discountProductName, setDiscountProductName] = useState();
  const [discountDescription, setDiscountDescription] = useState("");
  const [discountStartDate, setDiscountStartDate] = useState("");
  const [products, setProducts] = useState([]);
  //let [upQuantity, setIncrQuantity] = useState();
  const [discountExpirationDate, setDiscountExpirationDate] = useState("");
  const [isMatched, setIsMatched] = useState(true);

  const [productOptions, setProductOptions] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8070/product/")
  //     .then((res) => {
  //       console.log(res.data);
  //       setProducts(res.data);
  //     })
  //     .catch((err) => {
  //       alert(err.message);
  //     });
  // }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8070/product/")
      .then((res) => {
        const productNames = res.data.map((product) => ({
          value: product[1], // Assuming the product name is in the second column
          label: product[1],
        }));
        setProductOptions(productNames);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  // Function to filter products based on user input
  const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
      const filteredProducts = productOptions.filter((product) =>
        product.label.toLowerCase().includes(inputValue.toLowerCase())
      );
      callback(filteredProducts);
    }, 1000); // Simulating a delay for better UX; you can adjust this value
  };

  function sendData(e) {
    e.preventDefault();
    const newDiscount = {
      discountId,
      discountType,
      discountRate,
      discountProductName,
      discountDescription,
      discountStartDate,
      discountExpirationDate,
    };
    axios
      .post("http://localhost:8070/discount/add", newDiscount)
      .then(() => {
        alert(`Discount Added ${isMatched}`);
        setDiscountId("");
        setDiscountType("");
        setDiscountRate();
        setDiscountProductName();
        setDiscountDescription("");
        setDiscountStartDate("");
        setDiscountExpirationDate("");
        setIsMatched("");
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div>
      <h1 class="container">Add Discount</h1>
      <form onSubmit={sendData} class="container">
        <div className="form-group">
          <div style={{ marginLeft: "0px", marginRight: "auto", width: "10%" }}>
            <label for="name">Discount ID</label>
          </div>

          <div class="col-sm-10">
            <input
              type="text"
              className="form-control"
              required
              id="code"
              placeholder="Enter item code"
              onChange={(e) => {
                var code = setDiscountId(e.target.value);
              }}
            />
            <div required />
          </div>
        </div>
        <div className="form-group">
          <div style={{ marginLeft: "0px", marginRight: "auto", width: "10%" }}>
            <label for="discountType">Discount Type</label>
          </div>

          <div class="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="discountType"
              required
              placeholder="Enter Discount Type"
              onChange={(e) => {
                setDiscountType(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="form-group">
          <div style={{ marginLeft: "0px", marginRight: "auto", width: "10%" }}>
            <label for="discountRate">Rate of Discount</label>
          </div>

          <div class="col-sm-10">
            <input
              type="number"
              className="form-control"
              required
              id="dsicountRate"
              placeholder="Enter Rate of Discount"
              onChange={(e) => {
                setDiscountRate(e.target.value);
              }}
            />
          </div>
        </div>
        {/* <div className="form-group">
          <div style={{ marginLeft: "0px", marginRight: "auto", width: "10%" }}>
            <label for="productName">Product Name</label>
          </div>

          <div class="col-sm-10">
            <input
              type="text"
              className="form-control"
              required
              id="productName"
              placeholder="Enter Product Name "
              onChange={(e) => {
                setDiscountProductName(e.target.value);
              }}
            />
          </div>
        </div> */}
        <div className="form-group">
          <div style={{ marginLeft: "0px", marginRight: "auto", width: "10%" }}>
            <label htmlFor="productName">Product Name</label>
          </div>
          <div className="col-sm-10">
            <AsyncSelect
              cacheOptions
              defaultOptions
              loadOptions={loadOptions}
              onInputChange={(newValue) => {
                // You can handle the input value as needed
                console.log("Input value:", newValue);
              }}
              onChange={(selectedOption) => {
                setSelectedProduct(selectedOption);
              }}
              value={selectedProduct}
              placeholder="Select or type product name..."
            />
          </div>
        </div>
        {/* <b>Select the delivery agent</b> <br />
        <select
          id="productName"
          onChange={(e) => {
            setDelAgent(e.target.value);
          }}
        ></select>{" "}
        <br /> */}
        <div className="form-group">
          <div style={{ marginLeft: "0px", marginRight: "auto", width: "10%" }}>
            <label for="supplier">Discount Description</label>
          </div>

          <div class="col-sm-10">
            <input
              type="text"
              className="form-control"
              required
              id="description"
              placeholder="Enter Discount Description "
              onChange={(e) => {
                setDiscountDescription(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="form-group">
          <div style={{ marginLeft: "0px", marginRight: "auto", width: "10%" }}>
            <label for="order">Starting Date of Discount</label>
          </div>

          <div class="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="startingDate"
              required
              placeholder="Enter Staring Date of Discount "
              onChange={(e) => {
                setDiscountStartDate(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="form-group">
          <div style={{ marginLeft: "0px", marginRight: "auto", width: "10%" }}>
            <label for="expirationDate">Expiration Date of Discount</label>
          </div>

          <div class="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="expirationDate"
              required
              placeholder="Enter Date of Expiration "
              onChange={(e) => {
                setDiscountExpirationDate(e.target.value);
              }}
            />
          </div>
        </div>
        <button type="submit" class="btn btn-success">
          Submit
        </button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <a type="button" href="/adminhome/discount" class="btn btn-secondary">
          Back
        </a>
      </form>
    </div>
  );
}
