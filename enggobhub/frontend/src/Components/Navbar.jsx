import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">EngJobHub</div>

        <Link to="/auth" className="register-button">
          Register
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
