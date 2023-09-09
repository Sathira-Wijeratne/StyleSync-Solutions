// import React from "react";
// import Button from "react-bootstrap/Button";
// import card1Image from "../images/card1.jpg";
// import card2Image from "../images/card2.jpg";
// import card3Image from "../images/card3.jpg";
// import card4Image from "../images/card4.jpg";
// import backgroundImage from "../images/background-admin.jpeg";

// export default function AdminHome() {
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
//   };

//   return (
//     <div className="container" style={containerStyle}>
//       style=
//       {{
//         backgroundImage: `url(${backgroundImage})`, // Set the background image
//         backgroundSize: "cover", // Cover the entire container
//         backgroundRepeat: "no-repeat", // Don't repeat the background image
//         backgroundAttachment: "fixed", // Keep the background image fixed
//         backgroundPosition: "center", // Center the background image
//         minHeight: "100vh", // Make the container at least the height of the viewport
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         color: "white",
//       }}
//       <div style={{ float: "right" }}>
//         <a
//           href="/"
//           onClick={() => {
//             sessionStorage.removeItem("sSyncSolNimda");
//             sessionStorage.removeItem("adminEmail");
//           }}
//         >
//           {/*Buttons*/}
//           <Button variant="danger">Signout</Button>
//           {/* Display four cards */}

//           <h1 className="admin-heading">Admin Dashboard</h1>

//           <div className="card-matrix">
//             <a href="/adminhome/discount/add">
//               {/* Different-colored cards */}
//               <div className="card card-blue-hil">
//                 <img src={card1Image} alt="Card 1" className="card-image" />
//                 <div className="card-content">Add Discounts</div>
//               </div>
//             </a>

//             <a href="/adminhome/discount/">
//               <div className="card card-green-hil">
//                 <img src={card2Image} alt="Card 2" className="card-image" />
//                 <div className="card-content">View Discounts</div>
//               </div>
//             </a>
//             <a href="/adminhome/discount/update/">
//               <div className="card card-orange-hil">
//                 <img src={card3Image} alt="Card 3" className="card-image" />
//                 <div className="card-content">Update Discounts</div>
//               </div>
//             </a>

//             <a href="/adminhome/discount/reports">
//               <div className="card card-purple-hil">
//                 <img src={card4Image} alt="Card 4" className="card-image" />
//                 <div className="card-content">Generate Reports</div>
//               </div>
//             </a>
//           </div>
//         </a>
//       </div>
//       <h1>Welcome Admin</h1>
//     </div>
//   );
// }
import React from "react"; // Import your background image
import Card from "react-bootstrap/Card";
import CardImg from "react-bootstrap/CardImg";
import Button from "react-bootstrap/Button";
import backgroundImage from "../images/backgroundImage.jpg";
import {
  faPlus,
  faEdit,
  faTrash,
  faChartLine,
  faList,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AdminHome() {
  const containerStyle = {
    backgroundImage: `url(${backgroundImage})`, // Set the background image
    backgroundSize: "cover", // Cover the entire container
    backgroundRepeat: "no-repeat", // Don't repeat the background image
    backgroundAttachment: "fixed", // Keep the background image fixed
    backgroundPosition: "center", // Center the background image
    minHeight: "100vh", // Make the container at least the height of the viewport
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    position: "relative",
  };

  const cardStyle = {
    width: "250px",
    height: "250px",
    margin: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Add background color with opacity
    borderRadius: "10px", // Add rounded corners
  };

  const buttonStyle = {
    position: "absolute",
    top: "20px", // Adjust the top position as needed
    right: "20px", // Adjust the right position as needed
    fontSize: "20px",
  };

  const linkStyle = {
    textDecoration: "none",
    color: "white",
  };

  return (
    <div className="container" style={containerStyle}>
      {/* <h1 style={{ fontSize: "36px", fontWeight: "bold" }}>Welcome Admin</h1> */}
      <Button
        variant="danger"
        style={buttonStyle} // Apply styles to the button
        onClick={() => {
          sessionStorage.removeItem("sSyncSolNimda");
          sessionStorage.removeItem("adminEmail");
        }}
      >
        Signout
      </Button>
      <div style={{ float: "right" }}>
        <a
          href="/"
          onClick={() => {
            sessionStorage.removeItem("sSyncSolNimda");
            sessionStorage.removeItem("adminEmail");
          }}
        >
          {/*Buttons*/}
        </a>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Card 1 */}
        <Card style={cardStyle}>
          {/* <CardImg
            variant="top"
            src="../images/card1.jpg" // Replace with the actual image path
            alt="Card 1 Image"
          /> */}
          <Card.Body
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <a href="/adminhome/discount/add" style={linkStyle}>
              <Card.Title>Add Discount</Card.Title>
              <FontAwesomeIcon
                icon={faPlus}
                style={{ fontSize: "48px", marginTop: "10px" }}
              />
              {/* <Card.Text>Card content here.</Card.Text> */}
            </a>
          </Card.Body>
        </Card>

        {/* Card 2 */}
        <Card style={cardStyle}>
          {/* <CardImg
            variant="top"
            src="../images/card2.jpg" // Replace with the actual image path
            alt="Card 2 Image"
          /> */}
          <Card.Body
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <a href="/adminhome/discount/" style={linkStyle}>
              <Card.Title>View All Discounts</Card.Title>
              <FontAwesomeIcon
                icon={faList}
                style={{ fontSize: "48px", marginTop: "10px" }}
              />
              {/* <Card.Text>Card content here.</Card.Text> */}
            </a>
          </Card.Body>
        </Card>

        {/* Card 3 */}
        <Card style={cardStyle}>
          {/* <CardImg
            variant="top"
            src="../images/card3.jpg" // Replace with the actual image path
            alt="Card 3 Image"
          /> */}
          <Card.Body
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Card.Title>Update Discounts</Card.Title>
            <FontAwesomeIcon
              icon={faEdit}
              style={{ fontSize: "48px", marginTop: "10px" }}
            />
            {/* <Card.Text>Card content here.</Card.Text> */}
          </Card.Body>
        </Card>

        {/* Card 4 */}
        <Card style={cardStyle}>
          {/* <CardImg
            variant="top"
            // src="../images/card4.jpg" // Replace with the actual image path
            alt="Card 4 Image"
          /> */}
          <Card.Body
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Card.Title>Reports and Analytics</Card.Title>
            <FontAwesomeIcon
              icon={faChartLine}
              style={{ fontSize: "48px", marginTop: "10px" }}
            />
            {/* <Card.Text>Card content here.</Card.Text> */}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
