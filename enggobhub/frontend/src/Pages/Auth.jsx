// src/pages/Auth.jsx
import React, { useState } from "react";
import "./Auth.css";

function Auth() {
  const [role, setRole] = useState("Student");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLogin, setIsLogin] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRoleToggle = (roleType) => {
    setRole(roleType);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log("Logging in with:", formData);
    } else {
      console.log("Registering as:", role, formData);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">
          {isLogin ? "Login" : `Register as ${role}`}
        </h2>

        {!isLogin && (
          <div className="role-toggle">
            <button
              type="button"
              className={role === "Student" ? "active" : ""}
              onClick={() => handleRoleToggle("Student")}
            >
              Student
            </button>
            <button
              type="button"
              className={role === "Educator" ? "active" : ""}
              onClick={() => handleRoleToggle("Educator")}
            >
              Educator
            </button>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required={!isLogin}
              />
            </div>
          )}

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        {/* Switch between Login/Register */}
        <p className="switch-auth">
          {isLogin ? (
            <>
              Don’t have an account?{" "}
              <span onClick={() => setIsLogin(false)}>Register</span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span onClick={() => setIsLogin(true)}>Login</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default Auth;
