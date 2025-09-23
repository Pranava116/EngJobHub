import React from "react";
import "../static/Internship.css"
import companyOffer from "../static/images/company-logo-1.jpg"

const jobListings = [
  {
    title: "Audit & Compliance Officer",
    company: "ZustPe Payments Private Limited",
    location: "Chennai",
    experience: "0 year(s)",
    salary: "₹2,52,000 - ₹3,72,000",
    posted: "1 week ago",
    type: "Fresher Job",
    logo: "company-logo-1.jpg",
  },
  {
    title: "Audit & Compliance Officer",
    company: "ZustPe Payments Private Limited",
    location: "Chennai",
    experience: "0 year(s)",
    salary: "₹2,52,000 - ₹3,72,000",
    posted: "1 week ago",
    type: "Fresher Job",
    logo: "company-logo-1.jpg",
  },
  {
    title: "Audit & Compliance Officer",
    company: "ZustPe Payments Private Limited",
    location: "Chennai",
    experience: "0 year(s)",
    salary: "₹2,52,000 - ₹3,72,000",
    posted: "1 week ago",
    type: "Fresher Job",
    logo: "company-logo-1.jpg",
  },
  {
    title: "Audit & Compliance Officer",
    company: "ZustPe Payments Private Limited",
    location: "Chennai",
    experience: "0 year(s)",
    salary: "₹2,52,000 - ₹3,72,000",
    posted: "1 week ago",
    type: "Fresher Job",
    logo: "company-logo-1.jpg",
  },
  {
    title: "Administration Executive (Female Candidates Only)",
    company: "Balaji Auto Centre",
    location: "Kolkata",
    experience: "0 year(s)",
    salary: "₹2,00,000 - ₹2,40,000",
    posted: "4 days ago",
    type: "Fresher Job",
    logo: "company-logo-1.jpg",
  },
  {
    title: "Software Engineer",
    company: "Google",
    location: "Bangalore",
    experience: "1+ year(s)",
    salary: "₹12 LPA",
    posted: "2 weeks ago",
    type: "Experienced Job",
    logo: "company-logo-1.jpg",
  },
  {
    title: "Data Scientist",
    company: "Microsoft",
    location: "Hyderabad",
    experience: "2+ year(s)",
    salary: "₹15 LPA",
    posted: "3 weeks ago",
    type: "Experienced Job",
    logo: "company-logo-1.jpg",
  },
];

const InternshipOffer = () => {
  return (
    <div className="job-container">
      <h2>Recommended Jobs</h2>
      <div className="job-list">
        {jobListings.map((job, index) => (
          <div className="job-card" key={index}>
            <div className="job-info">
              <h3>{job.title}</h3>
              <p className="company">
                {job.company} <span className="badge">Actively hiring</span>
              </p>
              <p className="details">
                📍 {job.location} &nbsp; | &nbsp; {job.experience} &nbsp; | &nbsp; {job.salary}
              </p>
              <p className="meta">⏳ {job.posted} • {job.type}</p>
            </div>
            <img src={companyOffer} alt="Company Logo" className="company-logo" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InternshipOffer;
