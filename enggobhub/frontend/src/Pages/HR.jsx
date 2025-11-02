import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import "./HR.css";

export default function HR() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [applicationsLoading, setApplicationsLoading] = useState(false);
  const [jobApplications, setJobApplications] = useState({}); // { jobId: [applications] }
  const [activeTab, setActiveTab] = useState("post-job");
  const [formData, setFormData] = useState({
    company: "",
    description: "",
    location: "",
    type: "",
    salary: 0,
  });
  
  const API_BASE = "http://localhost:5000/api/jobs";
  const API_APPLICATIONS = "http://localhost:5000/api/applications";

  // Fetch jobs posted by the logged-in HR
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_BASE}/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(res.data); // myJobs route returns only this HR's jobs
    } catch (err) {
      console.error("Failed to load jobs:", err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch applications for all posted jobs
  const fetchApplicationsForJobs = async () => {
    if (jobs.length === 0) return;
    
    try {
      setApplicationsLoading(true);
      const token = localStorage.getItem("token");
      const applicationsMap = {};

      // Fetch applications for each job
      for (const job of jobs) {
        try {
          const res = await axios.get(`${API_APPLICATIONS}/job/${job._id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          applicationsMap[job._id] = res.data;
        } catch (err) {
          console.error(`Failed to load applications for job ${job._id}:`, err.response?.data || err);
          applicationsMap[job._id] = [];
        }
      }

      setJobApplications(applicationsMap);
    } catch (err) {
      console.error("Failed to load applications:", err.response?.data || err);
    } finally {
      setApplicationsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) fetchJobs();
  }, []);

  // Fetch applications when switching to "Your Posted Jobs" tab
  useEffect(() => {
    if (activeTab === "posted-jobs" && jobs.length > 0) {
      fetchApplicationsForJobs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  // Fetch applications when jobs change (e.g., after posting/deleting) and tab is active
  useEffect(() => {
    if (activeTab === "posted-jobs" && jobs.length > 0) {
      fetchApplicationsForJobs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobs.length]);

  // Create new job
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(API_BASE, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Job created successfully!");
      setFormData({
        company: "",
        description: "",
        location: "",
        type: "",
        salary: 0,
      });
      fetchJobs(); // reload jobs after posting
    } catch (err) {
      console.error("Error creating job:", err.response?.data || err);
      alert(
        "Failed to create job: " + (err.response?.data?.message || err.message)
      );
    }
  };

  // Delete job
  const handleDelete = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_BASE}/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Job deleted successfully!");
      fetchJobs(); // reload jobs after deletion
      // Update applications map
      const newApplications = { ...jobApplications };
      delete newApplications[jobId];
      setJobApplications(newApplications);
    } catch (err) {
      console.error("Failed to delete job:", err.response?.data || err);
      alert(
        "Failed to delete job: " + (err.response?.data?.message || err.message)
      );
    }
  };

  // Update application status
  const handleStatusUpdate = async (applicationId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `${API_APPLICATIONS}/${applicationId}/status`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Application status updated successfully!");
      // Refresh applications
      fetchApplicationsForJobs();
    } catch (err) {
      console.error("Failed to update status:", err.response?.data || err);
      alert(
        "Failed to update status: " + (err.response?.data?.message || err.message)
      );
    }
  };

  return (
    <div className="hr-page">
      <Navbar />
      <div className="hr-container">
        <h1>HR Job Management</h1>

        {/* Navigation Tabs */}
        <div className="hr-nav">
          <button
            className={`nav-btn ${activeTab === "post-job" ? "active" : ""}`}
            onClick={() => setActiveTab("post-job")}
          >
            ➕ Post Job
          </button>
          <button
            className={`nav-btn ${activeTab === "posted-jobs" ? "active" : ""}`}
            onClick={() => setActiveTab("posted-jobs")}
          >
            📋 Your Posted Jobs
          </button>
        </div>

        {/* Post Job Tab */}
        {activeTab === "post-job" && (
          <div className="post-job-section">
            <form className="job-form" onSubmit={handleSubmit}>
              <h2>Post a New Job</h2>
              <div className="form-grid">
                <input
                  type="text"
                  placeholder="Company Name"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="Job Type (Full-time, Part-time)"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  required
                />
                <input
                  type="number"
                  placeholder="Salary"
                  value={formData.salary}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      salary: parseFloat(e.target.value) || 0,
                    })
                  }
                />
              </div>

              <textarea
                placeholder="Job Description"
                rows="4"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              ></textarea>

              <button type="submit">Post Job</button>
            </form>
          </div>
        )}

        {/* Your Posted Jobs Tab */}
        {activeTab === "posted-jobs" && (
          <div className="posted-jobs-section">
            <h2 className="posted-jobs-title">Your Posted Jobs</h2>

            {loading ? (
              <p className="loading">Loading jobs...</p>
            ) : jobs.length === 0 ? (
              <p className="no-jobs">No jobs posted yet.</p>
            ) : (
              <div className="jobs-list">
                {jobs.map((job) => {
                  const applications = jobApplications[job._id] || [];
                  return (
                    <div key={job._id} className="job-card-with-applications">
                      <div className="job-header">
                        <div className="job-info">
                          <h3>{job.company}</h3>
                          <p className="job-location">📍 {job.location}</p>
                          <p className="job-description">{job.description}</p>
                          <div className="job-meta">
                            <span className="job-type">{job.type}</span>
                            {job.salary > 0 && (
                              <span className="job-salary">💰 ${job.salary}</span>
                            )}
                          </div>
                        </div>
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(job._id)}
                        >
                          🗑️ Delete Job
                        </button>
                      </div>

                      <div className="applications-section">
                        <div className="applications-header">
                          <h4 className="applications-title">
                            Applications ({applications.length})
                          </h4>
                        </div>
                        {applicationsLoading ? (
                          <p className="loading-small">Loading applications...</p>
                        ) : applications.length === 0 ? (
                          <p className="no-applications">
                            No applications yet for this job.
                          </p>
                        ) : (
                          <div className="applications-grid">
                            {applications.map((application) => (
                              <div
                                key={application._id}
                                className="application-card"
                              >
                                <div className="application-card-header">
                                  <div className="applicant-avatar">
                                    {(application.applicant?.name || "A").charAt(0).toUpperCase()}
                                  </div>
                                  <div className="applicant-details">
                                    <strong className="applicant-name">
                                      {application.applicant?.name || "N/A"}
                                    </strong>
                                    <span className="applicant-email">
                                      {application.applicant?.email || "N/A"}
                                    </span>
                                  </div>
                                </div>
                                <div className="application-card-body">
                                  <div className="application-meta-row">
                                    <span
                                      className={`status-badge status-${application.status}`}
                                    >
                                      {application.status}
                                    </span>
                                    <span className="applied-date">
                                      {new Date(
                                        application.appliedAt
                                      ).toLocaleDateString()}
                                    </span>
                                  </div>
                                  {application.resume && (
                                    <a
                                      href={application.resume}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="resume-link"
                                    >
                                      📄 View Resume
                                    </a>
                                  )}
                                </div>
                                <div className="application-card-footer">
                                  {application.status === "pending" && (
                                    <>
                                      <button
                                        className="status-btn reviewed"
                                        onClick={() =>
                                          handleStatusUpdate(
                                            application._id,
                                            "reviewed"
                                          )
                                        }
                                      >
                                        Review
                                      </button>
                                      <button
                                        className="status-btn accepted"
                                        onClick={() =>
                                          handleStatusUpdate(
                                            application._id,
                                            "accepted"
                                          )
                                        }
                                      >
                                        Accept
                                      </button>
                                      <button
                                        className="status-btn rejected"
                                        onClick={() =>
                                          handleStatusUpdate(
                                            application._id,
                                            "rejected"
                                          )
                                        }
                                      >
                                        Reject
                                      </button>
                                    </>
                                  )}
                                  {application.status === "reviewed" && (
                                    <>
                                      <button
                                        className="status-btn accepted"
                                        onClick={() =>
                                          handleStatusUpdate(
                                            application._id,
                                            "accepted"
                                          )
                                        }
                                      >
                                        Accept
                                      </button>
                                      <button
                                        className="status-btn rejected"
                                        onClick={() =>
                                          handleStatusUpdate(
                                            application._id,
                                            "rejected"
                                          )
                                        }
                                      >
                                        Reject
                                      </button>
                                    </>
                                  )}
                                  {(application.status === "accepted" || application.status === "rejected") && (
                                    <span className="final-status-message">
                                      {application.status === "accepted" ? "✅ Accepted" : "❌ Rejected"}
                                    </span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}