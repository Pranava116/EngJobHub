import React from "react";
import JobCard from "../components/JobCard";
import JobDetails from "../components/JobDetails";
import AboutCompany from "../components/AboutCompany";
import Reviews from "../components/Reviews";
import RelatedJobs from "../components/RelatedJobs";
import "../static/JobDescription.css"

export default function JobDescription()
{
  return(
    <div className="job-wrapper">
      <div className="main-content">
        <JobCard />
        <JobDetails />
        <AboutCompany />
      </div>
      
      <div className="sidebar">
        <RelatedJobs />
        <Reviews />
      </div>
    </div>
  )
}

