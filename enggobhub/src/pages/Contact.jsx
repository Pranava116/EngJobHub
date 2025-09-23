import React from "react";
import "../static/Contact.css";

const Contact = () => {
  return (
    <div className="page-container">
      <div className="content-wrapper">
        <h1 className="header-title">Contact Us</h1>
        <p className="description-text">
          Have questions about engineering job opportunities? Reach out to us,
          and we'll respond as soon as possible.
        </p>
        <form className="contact-form">
          <label className="form-label">Your Email</label>
          <input type="email" className="input-field" placeholder="Enter email" />
          
          <label className="form-label">Topic</label>
          <select className="select-field">
            <option>Select a topic</option>
            <option>Job Openings</option>
            <option>Internships</option>
            <option>Career Guidance</option>
          </select>
          
          <label className="form-label">Subject</label>
          <input type="text" className="input-field" placeholder="Let us know how we can help" />
          
          <label className="form-label">Full Description</label>
          <textarea className="textarea-field" placeholder="Include as much detail as possible"></textarea>
          
          <div className="checkbox-container">
            <input type="checkbox" className="checkbox-field" />
            <span>I agree to the Terms and Privacy Policy</span>
          </div>
          
          <div className="checkbox-container">
            <input type="checkbox" className="checkbox-field" />
            <span>Keep me updated on job offers</span>
          </div>
          
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
