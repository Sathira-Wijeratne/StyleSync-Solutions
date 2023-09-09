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
      <h1>Welcome Admin</h1>
      <a href="/adminhome/ProductRatingReport">
        <button className="btn btn-primary">Rating Report</button>
      </a>
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
            <a href="/adminhome/discount/reports" style={linkStyle}>
              <Card.Title>Reports and Analytics</Card.Title>
              <FontAwesomeIcon
                icon={faChartLine}
                style={{ fontSize: "48px", marginTop: "10px" }}
              />
              {/* <Card.Text>Card content here.</Card.Text> */}
            </a>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
