import React, { useState } from "react";
import "../static/Header.css";
import searchbutton from "../static/images/search_button.png";
import { NavLink } from "react-router-dom";

export default function Header() {
  const [showOpportunities, setShowOpportunities] = useState(false);
  const [showServices, setShowServices] = useState(false);

  const logo = "/engjobhu_icon.jpg";

  return (
    <div className="header-container">
      <nav className="headernav">
        <div className="left-header">
        <img src={logo} alt="logo" className="logoimage" />
        <span className="logoname">ENGJOBHUB</span>
        </div>
        <div className="InputContainer">
          <input placeholder="Search.." id="input" className="input" name="text" type="text" />
          <button className="search-btn">
            <img src={searchbutton} alt="search" />
          </button>
        </div>
        <div className="btncontainer">
          <NavLink to={'/'}>
            <button className="btnnav">Home</button>
          </NavLink>

          {/* Opportunities Dropdown */}
          <div className="dropdown-container"
            onMouseEnter={() => setShowOpportunities(true)}
            onMouseLeave={() => setShowOpportunities(false)}>
            <button className="btnnav">Opportunities</button>
            {showOpportunities && (
              <div className="dropdown-menu">
                <div className="dropdown-left">
                  <NavLink to="/internship">Internships</NavLink>
                  <hr className="hr" />
                  <NavLink to="/internships-bangalore">Interns In Bangalore</NavLink>
                  <NavLink to="/internships-remote">Work From Home</NavLink>
                </div>
                <div className="dropdown-right">
                  <NavLink to="/jobs">Jobs</NavLink>
                  <hr className="hr" />
                  <NavLink to="/jobs-bangalore">Jobs In Bangalore</NavLink>
                  <NavLink to="/jobs-remote">Work From Home</NavLink>
                </div>
              </div>
            )}
          </div>

          {/* Services Dropdown */}
          <div className="dropdown-container"
            onMouseEnter={() => setShowServices(true)}
            onMouseLeave={() => setShowServices(false)}>
            <button className="btnnav">Services</button>
            {showServices && (
              <div className="dropdown-menu">
                <div className="dropdown-left">
                  <NavLink to="/courses">Courses</NavLink>
                  <hr className="hr" />
                  <NavLink to="/internships-bangalore">Free Courses</NavLink>
                  <NavLink to="/internships-remote">Paid Courses</NavLink>
                </div>
                <div className="dropdown-right">
                  <NavLink to="/resumetemplates">Resume</NavLink>
                  <hr className="hr" />
                  <NavLink to="/jobs-bangalore">AI Resume Builder</NavLink>
                  <NavLink to="/resumetemplates">Resume Template</NavLink>
                </div>
              </div>
            )}
          </div>

          <NavLink to={"/blog"}>
            <button className="btnnav">Blog</button>
          </NavLink>
          <NavLink to={"/login"}>
            <button className="btnnav">Register</button>
          </NavLink>
        </div>
        </nav>
      </div>
  );
}
