import Button from "react-bootstrap/Button";


export default function AdminHome() {
  if (sessionStorage.getItem("sSyncSolNimda") === null) {
    window.location.replace("/");
  }

  const navPanelStyle = {
    backgroundColor: "#000000",
    width: "250px",
    padding: "20px",
    height: "100vh",
    alignItems: "center",
    justifyContent: "start",
  };

  const buttonStyle = {
    width: "200px",
    height: "50px",
    marginBottom: "10px",
  };

  const linkStyle = {
    textDecoration: "none",
    color: "white",
  };

  return (
    <div>
      <nav style={navPanelStyle}>
        <a href="/adminhome/ProductRatingReport" style={linkStyle}>
          <Button style={buttonStyle} variant="dark">
            Rating Report
          </Button>
        </a>
        <a href="/adminhome/salesforecast" style={linkStyle}>
          <Button style={buttonStyle} variant="dark">
            Sales Forecast
          </Button>
        </a>
        <a href="/adminhome/discount/add" style={linkStyle}>
          <Button style={buttonStyle} variant="dark">
            Add Discount
          </Button>
        </a>
        <a href="/adminhome/discount/" style={linkStyle}>
          <Button style={buttonStyle} variant="dark">
            View All Discounts
          </Button>
        </a>
        <Button style={buttonStyle} variant="dark" disabled>
          Update Discounts
        </Button>
        <a href="/adminhome/discount/reports" style={linkStyle}>
          <Button style={buttonStyle} variant="dark">
            Reports and Analytics
          </Button>
        </a>
      </nav>
      <div alignItems='left'>
        

      </div>
    </div>
  );
}
