import { Link } from "react-router-dom";
import "./Navbar.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";    
function Navbar() {
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    navigate("/");
    setTimeout(() => {
      logout();
    }, 100);
  };
  return (
    <nav className="navbar">
      <div className="navbar-container">
       
        <div className="navbar-logo">EngJobHub</div>

        
        <div className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/opportunities" className="nav-link">Opportunities</Link>
          <Link to="/services" className="nav-link">Services</Link>
        </div>

        
        <div className="navbar-search">
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
          />
          <button className="search-button">🔍</button>
        </div>
        {isAuthenticated ? (
          <button className="register-button" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link to="/auth" className="register-button">
            Register
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
