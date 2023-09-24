import React from "react";
import logo from "../images/logo.png";

export default function Header() {
  return (
    // <div>
    //   <nav className="navbar fixed-top bg-dark" style={{ color: "White" }}>
    //     <div className="row">
    //       <div className="col-3">
    //         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    //         <img src={logo} width="40%" alt="Logo"></img>
    //       </div>
    //       <div className="col" style={{ fontSize: "70px" }}>
    //         <b>StyleSync Summer Store</b>
    //       </div>
    //     </div>
    //   </nav>
    //   <br></br>
    //   <br></br>
    //   <br></br>
    //   <br></br>
    //   <br></br>
    //   <br></br>
    //   <br></br>
    // </div>
    <div class="container-fluid" style={{backgroundColor:"Black"}}>
    <img src={logo} width={80} height={80}  alt="Logo"></img>

    </div>
  );
}
