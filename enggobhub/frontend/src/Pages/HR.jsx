import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../Components/Navbar";
import "./HR.css";

export default function HR() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    company: "",
    description: "",
    location: "",
    type: "",
    salary: 0,
  });

  const API_BASE = "http://localhost:5000/api/jobs";

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

  useEffect(() => {
    if (user?.id) fetchJobs();
  }, [user]);

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
    } catch (err) {
      console.error("Failed to delete job:", err.response?.data || err);
      alert(
        "Failed to delete job: " + (err.response?.data?.message || err.message)
      );
    }
  };

  return (
    <div className="hr-page">
      <Navbar />
      <div className="hr-container">
        <h1>HR Job Management</h1>

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

        <h2 className="posted-jobs-title">Your Posted Jobs</h2>

        {loading ? (
          <p>Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <p className="no-jobs">No jobs posted yet.</p>
        ) : (
          <div className="jobs-grid">
            {jobs.map((job) => (
              <div key={job._id} className="job-card">
                <h3>{job.company}</h3>
                <p className="job-location">{job.location}</p>
                <p className="job-description">{job.description}</p>
                <div className="job-meta">
                  <span>{job.type}</span>
                  {job.salary && <span>💰 {job.salary}</span>}
                </div>
                {job.applicants?.length > 0 && (
                  <details className="job-applicants">
                    <summary>View Applicants ({job.applicants.length})</summary>
                    <ul>
                      {job.applicants.map((a) => (
                        <li key={a._id}>
                          {a.name} – {a.email}
                        </li>
                      ))}
                    </ul>
                  </details>
                )}
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(job._id)}
                >
                  Delete Job
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
