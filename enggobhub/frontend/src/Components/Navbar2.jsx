import React from "react";
import { Link } from "react-router-dom";    
import "./Navbar2.css";

function Navbar2() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">EngJobHub</div>

        <Link to="/" className="logout-button">
        Logout
        </Link>
      </div>
    </nav>
  );
}

export default Navbar2;