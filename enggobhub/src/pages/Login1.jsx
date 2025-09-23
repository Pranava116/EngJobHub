import React, { useState } from "react";
import "../static/Login1.css"

const Login1 = () => {
  const [isLoginActive, setIsLoginActive] = useState(false);

  return (
    <div className="login-complete">
    <div className={`login-container ${isLoginActive ? "login-active" : ""}`}>
      <div className="form-container sign-up">
        <form>
          <h1>Create Account</h1>
          <div className="social-icons">
            <a href="#" className="icons"><i className='bx bxl-google'></i></a>
            <a href="#" className="icons"><i className='bx bxl-facebook'></i></a>
            <a href="#" className="icons"><i className='bx bxl-github'></i></a>
            <a href="#" className="icons"><i className='bx bxl-linkedin'></i></a>
          </div>
          <span>Register with E-mail</span>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Enter E-mail" />
          <input type="password" placeholder="Enter Password" />
          <button type="button">Sign Up</button>
        </form>
      </div>

      <div className="form-container sign-in">
        <form>
          <h1>Sign In</h1>
          <div className="social-icons">
            <a href="#" className="icons"><i className='bx bxl-google'></i></a>
            <a href="#" className="icons"><i className='bx bxl-facebook'></i></a>
            <a href="#" className="icons"><i className='bx bxl-github'></i></a>
            <a href="#" className="icons"><i className='bx bxl-linkedin'></i></a>
          </div>
          <span>Login With Email & Password</span>
          <input type="email" placeholder="Enter E-mail" />
          <input type="password" placeholder="Enter Password" />
          <a href="#">Forget Password?</a>
          <button type="button">Sign In</button>
        </form>
      </div>

      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>"Opportunities<br></br>Await Engineers!"</h1>
            <p>Sign in With ID & Password</p>
            <button className="login-hidden" onClick={() => setIsLoginActive(false)}>Sign In</button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>"Welcome Engineers!"</h1>
            <p>Join the Future of Engineering Careers!</p>
            <button className="login-hidden" onClick={() => setIsLoginActive(true)}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login1;

