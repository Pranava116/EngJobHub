import React from "react";

export default function JobCard()
{
  return(
    <div className="job-card job-abstract-data">
      <h2 className="job-title">Financial Controller - Analyst</h2>
      <p className="company-name">JPMorgan Chase Bank</p>
      <p className="details">0 - 5 years | ₹ Not Disclosed</p>
      <p className="location">📍 Kolkata, Mumbai, New Delhi, Hyderabad, Pune, Chennai, Bengaluru</p>
      <div className="cardfooter">
        <span>📅 Posted: 1 day ago | 🏢 Openings: 1 | 👥 Applicants: 483</span>
      </div>
      <div className="cardfooter">
        <a href="#" className="button register">Register to apply</a>
        <a href="#" className="button login">Login to apply</a>
      </div>
    </div>
  )
}