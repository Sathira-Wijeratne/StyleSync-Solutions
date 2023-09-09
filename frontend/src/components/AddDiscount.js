// import React, { useEffect, useState } from "react";
// import Select from "react-select";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
// import AsyncSelect from "react-select/async";
// import axios from "axios";
// import backgroundImage from "../images/addBackground.jpg";

// export default function AddDiscount() {
//   const [discountId, setDiscountId] = useState("");
//   //since we are making the type of age as number --> remove "" of useState.
//   const [discountType, setDiscountType] = useState("");
//   const [discountRate, setDiscountRate] = useState();
//   const [discountProductName, setDiscountProductName] = useState();
//   const [discountDescription, setDiscountDescription] = useState("");
//   const [discountStartDate, setDiscountStartDate] = useState(null);
//   const [products, setProducts] = useState([]);
//   //let [upQuantity, setIncrQuantity] = useState();
//   const [discountExpirationDate, setDiscountExpirationDate] = useState(null);
//   const [isMatched, setIsMatched] = useState(true);

//   const [productOptions, setProductOptions] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   // useEffect(() => {
//   //   axios
//   //     .get("http://localhost:8070/product/")
//   //     .then((res) => {
//   //       console.log(res.data);
//   //       setProducts(res.data);
//   //     })
//   //     .catch((err) => {
//   //       alert(err.message);
//   //     });
//   // }, []);

//   useEffect(() => {
//     axios
//       .get("http://localhost:8070/product/")
//       .then((res) => {
//         const productNames = res.data.map((product) => ({
//           value: product[1], // Assuming the product name is in the second column
//           label: product[1],
//         }));
//         setProductOptions(productNames);
//       })
//       .catch((err) => {
//         alert(err.message);
//       });
//   }, []);

//   // Function to filter products based on user input
//   const loadOptions = (inputValue, callback) => {
//     setTimeout(() => {
//       const filteredProducts = productOptions.filter((product) =>
//         product.label.toLowerCase().includes(inputValue.toLowerCase())
//       );
//       callback(filteredProducts);
//     }, 1000); // Simulating a delay for better UX; you can adjust this value
//   };

//   const handleStartDateClick = (e) => {
//     e.stopPropagation();
//     document.getElementById("discountStartDate").click();
//   };

//   const handleExpirationDateClick = (e) => {
//     e.stopPropagation();
//     document.getElementById("discountExpirationDate").click();
//   };

//   const containerStyle = {
//     backgroundImage: `url(${backgroundImage})`, // Set the background image
//     backgroundSize: "cover", // Cover the entire container
//     backgroundRepeat: "no-repeat", // Don't repeat the background image
//     backgroundAttachment: "fixed", // Keep the background image fixed
//     backgroundPosition: "center", // Center the background image
//     minHeight: "100vh", // Make the container at least the height of the viewport
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     color: "white",
//     position: "relative",
//   };

//   function sendData(e) {
//     e.preventDefault();
//     const newDiscount = {
//       discountId,
//       discountType,
//       discountRate,
//       discountProductName: selectedProduct.label,
//       discountDescription,
//       discountStartDate,
//       discountExpirationDate,
//     };
//     axios
//       .post("http://localhost:8070/discount/add", newDiscount)
//       .then(() => {
//         alert(`Discount Added Successfully 👍${isMatched}`);
//         setDiscountId("");
//         setDiscountType("");
//         setDiscountRate();
//         setDiscountProductName();
//         setDiscountDescription("");
//         setDiscountStartDate("");
//         setDiscountExpirationDate("");
//         setIsMatched("");
//       })
//       .catch((err) => {
//         alert(err);
//       });
//   }

//   return (
//     <div>
//       <h1 class="container">Add Discount</h1>
//       <div className="container" style={containerStyle}>
//         <form onSubmit={sendData}>
//           <div className="form-row">
//             <div className="col-ls-6">
//               <div className="form-group">
//                 <div
//                   style={{
//                     marginLeft: "0px",
//                     marginRight: "auto",
//                     width: "20%",
//                   }}
//                 >
//                   <label for="name">Discount ID</label>
//                 </div>

//                 <div class="col-sm-10">
//                   <input
//                     type="text"
//                     className="form-control"
//                     required
//                     id="code"
//                     placeholder="Enter item code"
//                     onChange={(e) => {
//                       var code = setDiscountId(e.target.value);
//                     }}
//                   />
//                   <div required />
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="col-ls-6">
//             <div className="form-group">
//               <div
//                 style={{ marginLeft: "0px", marginRight: "auto", width: "20%" }}
//               >
//                 <label for="discountType">Discount Type</label>
//               </div>

//               <div class="col-sm-10">
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="discountType"
//                   required
//                   placeholder="Enter Discount Type"
//                   onChange={(e) => {
//                     setDiscountType(e.target.value);
//                   }}
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="form-group">
//             <div
//               style={{ marginLeft: "0px", marginRight: "auto", width: "20%" }}
//             >
//               <label for="discountRate">Rate of Discount</label>
//             </div>

//             <div class="col-sm-10">
//               <input
//                 type="number"
//                 className="form-control"
//                 required
//                 id="dsicountRate"
//                 placeholder="Enter Rate of Discount"
//                 onChange={(e) => {
//                   setDiscountRate(e.target.value);
//                 }}
//               />
//             </div>
//           </div>
//           <div className="form-group">
//             <div
//               style={{ marginLeft: "0px", marginRight: "auto", width: "20%" }}
//             >
//               <label htmlFor="productName">Product Name</label>
//             </div>
//             <div className="col-sm-10">
//               <AsyncSelect
//                 cacheOptions
//                 defaultOptions
//                 loadOptions={loadOptions}
//                 onInputChange={(newValue) => {
//                   // You can handle the input value as needed
//                   console.log("Input value:", newValue);
//                 }}
//                 onChange={(selectedOption) => {
//                   setSelectedProduct(selectedOption);
//                 }}
//                 value={selectedProduct}
//                 placeholder="Select or type product name..."
//               />
//             </div>
//           </div>
//           <div className="form-group">
//             <div
//               style={{ marginLeft: "0px", marginRight: "auto", width: "20%" }}
//             >
//               <label for="supplier">Discount Description</label>
//             </div>

//             <div class="col-sm-10">
//               <input
//                 type="text"
//                 className="form-control"
//                 required
//                 id="description"
//                 placeholder="Enter Discount Description "
//                 onChange={(e) => {
//                   setDiscountDescription(e.target.value);
//                 }}
//               />
//             </div>
//           </div>
//           <div className="form-group">
//             <div
//               style={{ marginLeft: "0px", marginRight: "auto", width: "20%" }}
//             >
//               <label htmlFor="discountStartDate">Start Discount Date</label>
//             </div>
//             <div className="col-sm-10">
//               <div
//                 className="input-group datepicker-container"
//                 onClick={handleStartDateClick}
//               >
//                 <DatePicker
//                   selected={discountStartDate}
//                   onChange={(date) => setDiscountStartDate(date)}
//                   className="form-control"
//                   style={{
//                     marginLeft: "0px",
//                     marginRight: "auto",
//                     width: "20%",
//                   }}
//                   id="discountStartDate"
//                   required
//                   placeholderText="Select start date"
//                 />
//                 <div className="input-group-append">
//                   <span className="input-group-text">
//                     <FontAwesomeIcon icon={faCalendarAlt} />
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="form-group">
//             <div
//               style={{ marginLeft: "0px", marginRight: "auto", width: "20%" }}
//             >
//               <label htmlFor="discountExpirationDate">
//                 Expiration Date of Discount
//               </label>
//             </div>
//             <div className="col-sm-10">
//               <div
//                 className="input-group datepicker-container"
//                 onClick={handleExpirationDateClick}
//               >
//                 <DatePicker
//                   selected={discountExpirationDate}
//                   onChange={(date) => setDiscountExpirationDate(date)}
//                   className="form-control"
//                   id="discountExpirationDate"
//                   style={{
//                     marginLeft: "0px",
//                     marginRight: "auto",
//                     width: "20%",
//                   }}
//                   required
//                   placeholderText="Select expiration date"
//                 />
//                 <div className="input-group-append">
//                   <span className="input-group-text">
//                     <FontAwesomeIcon icon={faCalendarAlt} />
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <button type="submit" class="btn btn-success">
//             Submit
//           </button>
//           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//           <a type="button" href="/adminhome/discount" class="btn btn-secondary">
//             Back
//           </a>
//         </form>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import AsyncSelect from "react-select/async";
import axios from "axios";
import backgroundImage from "../images/add.jpg";

export default function AddDiscount() {
  const [discountId, setDiscountId] = useState("");
  const [discountType, setDiscountType] = useState("");
  const [discountRate, setDiscountRate] = useState();
  const [discountProductName, setDiscountProductName] = useState();
  const [discountDescription, setDiscountDescription] = useState("");
  const [discountStartDate, setDiscountStartDate] = useState(null);
  const [discountExpirationDate, setDiscountExpirationDate] = useState(null);
  const [isMatched, setIsMatched] = useState(true);

  const [productOptions, setProductOptions] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8070/product/")
      .then((res) => {
        const productNames = res.data.map((product) => ({
          value: product[1],
          label: product[1],
        }));
        setProductOptions(productNames);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
      const filteredProducts = productOptions.filter((product) =>
        product.label.toLowerCase().includes(inputValue.toLowerCase())
      );
      callback(filteredProducts);
    }, 1000);
  };

  const handleStartDateClick = (e) => {
    e.stopPropagation();
    document.getElementById("discountStartDate").click();
  };

  const handleExpirationDateClick = (e) => {
    e.stopPropagation();
    document.getElementById("discountExpirationDate").click();
  };

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

  function sendData(e) {
    e.preventDefault();
    const newDiscount = {
      discountId,
      discountType,
      discountRate,
      discountProductName: selectedProduct.label,
      discountDescription,
      discountStartDate,
      discountExpirationDate,
    };
    axios
      .post("http://localhost:8070/discount/add", newDiscount)
      .then(() => {
        alert(`Discount Added Successfully 👍${isMatched}`);
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
      <div className="container" style={containerStyle}>
        <form onSubmit={sendData} style={{ marginBottom: "20px" }}>
          <h1 className="container label-bold-black">Add Discount</h1>
          <div className="form-row">
            <div className="col-md-6 mb-3">
              <div className="form-group">
                <label className="label-bold-black" htmlFor="name">
                  Discount ID
                </label>
                <input
                  type="text"
                  className="form-control bold-black-outline"
                  required
                  id="code"
                  placeholder="Enter item code"
                  onChange={(e) => {
                    var code = setDiscountId(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="form-group">
                <label htmlFor="discountType" className="label-bold-black">
                  Discount Type
                </label>
                <input
                  type="text"
                  className="form-control bold-black-outline"
                  id="discountType"
                  required
                  placeholder="Enter Discount Type"
                  onChange={(e) => {
                    setDiscountType(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="col-md-6 mb-3">
              <div className="form-group">
                <label htmlFor="discountRate" className="label-bold-black">
                  Rate of Discount
                </label>
                <input
                  type="number"
                  className="form-control bold-black-outline"
                  required
                  id="dsicountRate"
                  placeholder="Enter Rate of Discount"
                  onChange={(e) => {
                    setDiscountRate(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="form-group">
                <label htmlFor="productName" className="label-bold-black">
                  Product Name
                </label>
                <AsyncSelect
                  cacheOptions
                  defaultOptions
                  loadOptions={loadOptions}
                  onInputChange={(newValue) => {
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
          </div>

          <div className="form-group">
            <label htmlFor="supplier" className="label-bold-black">
              Discount Description
            </label>
            <input
              type="text"
              className="form-control bold-black-outline"
              required
              id="description"
              placeholder="Enter Discount Description"
              onChange={(e) => {
                setDiscountDescription(e.target.value);
              }}
            />
          </div>

          <div className="form-row">
            <div className="col-md-6 mb-3">
              <div className="form-group">
                <label htmlFor="discountStartDate" className="label-bold-black">
                  Start Discount Date
                </label>
                <div
                  className="input-group datepicker-container"
                  onClick={handleStartDateClick}
                >
                  <DatePicker
                    selected={discountStartDate}
                    onChange={(date) => setDiscountStartDate(date)}
                    className="form-control bold-black-outline"
                    id="discountStartDate"
                    required
                    placeholderText="Select start date"
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faCalendarAlt} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="form-group">
                <label
                  htmlFor="discountExpirationDate"
                  className="label-bold-black"
                >
                  Expiration Date of Discount
                </label>
                <div
                  className="input-group datepicker-container"
                  onClick={handleExpirationDateClick}
                >
                  <DatePicker
                    selected={discountExpirationDate}
                    onChange={(date) => setDiscountExpirationDate(date)}
                    className="form-control bold-black-outline"
                    id="discountExpirationDate"
                    required
                    placeholderText="Select expiration date"
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faCalendarAlt} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="form-group">
            <button
              type="submit"
              className="btn btn-success col-md-6 mb-3"
              style={{ marginLeft: "10px" }}
            >
              Submit
            </button>
            <a
              type="button"
              style={{ marginLeft: "10px" }}
              href="/adminhome/discount"
              className="btn btn-secondary col-md-6 mb-3"
            >
              Back
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
