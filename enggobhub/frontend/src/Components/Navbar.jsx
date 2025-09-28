import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">EngJobHub</div>

        {/* Links */}
        <div className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/opportunities" className="nav-link">Opportunities</Link>
          <Link to="/services" className="nav-link">Services</Link>
        </div>

        {/* Search bar */}
        <div className="navbar-search">
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
          />
          <button className="search-button">🔍</button>
        </div>

        {/* Register */}
        <Link to="/auth" className="register-button">
          Register
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
