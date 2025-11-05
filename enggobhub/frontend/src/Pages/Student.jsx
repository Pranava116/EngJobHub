import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Student.css";

export default function Student() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [externalJobs, setExternalJobs] = useState([]);
  const [jobQuery, setJobQuery] = useState('software engineer');
  const [jobLocation, setJobLocation] = useState('India');
  const [hasSearchedExternal, setHasSearchedExternal] = useState(false);
  const [jobApplyState, setJobApplyState] = useState({});
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [resumeInput, setResumeInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all-courses');
  const [enrollmentStatus, setEnrollmentStatus] = useState({});

  // Student info from authenticated user
  const student = {
    name: user?.name || "Student",
    email: user?.email || "student@engjobhub.com",
    role: user?.role || "student",
  };

  // Fetch all available courses
  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/courses', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const data = await response.json();
        setCourses(data);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  // Fetch enrolled courses
  const fetchEnrolledCourses = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/courses/student/my-courses', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const data = await response.json();
        setEnrolledCourses(data);
      }
    } catch (error) {
      console.error('Error fetching enrolled courses:', error);
    }
  };

  // Fetch all jobs
  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/jobs', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const data = await response.json();
        setJobs(data);
      }
    } catch (err) {
      console.error('Error fetching jobs:', err);
    }
  };

  // Fetch Indeed external jobs
  const fetchExternalJobs = async (opts = {}) => {
    try {
      const token = localStorage.getItem('token');
      const q = encodeURIComponent(opts.query ?? jobQuery);
      const loc = encodeURIComponent(opts.location ?? jobLocation);
      const response = await fetch(`http://localhost:5000/api/external-jobs/indeed?query=${q}&location=${loc}&page=1`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const data = await response.json();
        setExternalJobs(Array.isArray(data?.jobs) ? data.jobs : []);
        setHasSearchedExternal(true);
      }
    } catch (err) {
      console.error('Error fetching external jobs:', err);
    }
  };

  // Enroll in a course
  const enrollInCourse = async (courseId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/courses/${courseId}/enroll`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        setEnrollmentStatus(prev => ({ ...prev, [courseId]: 'enrolled' }));
        // Refresh enrolled courses
        fetchEnrolledCourses();
        alert('Successfully enrolled in course!');
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to enroll in course');
      }
    } catch (error) {
      console.error('Error enrolling in course:', error);
      alert('Failed to enroll in course');
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchCourses(), fetchEnrolledCourses(), fetchJobs()]);
      setLoading(false);
    };
    loadData();
  }, []);

  // Check if student is enrolled in a course
  const isEnrolled = (courseId) => {
    return enrolledCourses.some(course => course._id === courseId);
  };

  // Navigate to course details
  const viewCourseDetails = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  // Job helpers
  const hasApplied = (job) => {
    if (!user?._id && !user?.id) return false;
    const currentUserId = user?._id || user?.id;
    return Array.isArray(job.applicants) && job.applicants.some((a) => {
      if (typeof a === 'string') return a === currentUserId;
      return a?._id === currentUserId;
    });
  };

  const applyToJob = async (jobId) => {
    try {
      setJobApplyState((prev) => ({ ...prev, [jobId]: 'applying' }));
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/applications/apply', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ jobId, resume: resumeInput || undefined })
      });
      if (response.ok) {
        alert('Application submitted successfully');
        await fetchJobs();
        setJobApplyState((prev) => ({ ...prev, [jobId]: 'applied' }));
        setShowApplyModal(false);
        setSelectedJob(null);
        setResumeInput('');
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to apply for job');
        setJobApplyState((prev) => ({ ...prev, [jobId]: 'idle' }));
      }
    } catch (err) {
      console.error('Error applying to job:', err);
      alert('Failed to apply for job');
      setJobApplyState((prev) => ({ ...prev, [jobId]: 'idle' }));
    }
  };

  const openApplyModal = (job) => {
    setSelectedJob(job);
    setResumeInput('');
    setShowApplyModal(true);
  };

  const closeApplyModal = () => {
    setShowApplyModal(false);
    setSelectedJob(null);
    setResumeInput('');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="student-dashboard">
      {/* Left Sidebar - Student Info */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2 className="sidebar-title">Student Dashboard</h2>
          <div className="user-avatar">
            <span>{student.name.charAt(0).toUpperCase()}</span>
          </div>
        </div>
        
        <div className="student-profile">
          <h3>{student.name}</h3>
          <p><strong>Email:</strong> {student.email}</p>
          <p><strong>Role:</strong> {student.role}</p>
        </div>

        <div className="dashboard-stats">
          <div className="stat-item">
            <span className="stat-number">{courses.length}</span>
            <span className="stat-label">Available Courses</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{enrolledCourses.length}</span>
            <span className="stat-label">Enrolled Courses</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button 
            className={`nav-btn ${activeTab === 'all-courses' ? 'active' : ''}`}
            onClick={() => setActiveTab('all-courses')}
          >
            📚 All Courses
          </button>
          <button 
            className={`nav-btn ${activeTab === 'enrolled' ? 'active' : ''}`}
            onClick={() => setActiveTab('enrolled')}
          >
            ✅ My Courses
          </button>
          <button 
            className={`nav-btn ${activeTab === 'jobs' ? 'active' : ''}`}
            onClick={() => setActiveTab('jobs')}
          >
            💼 Jobs
          </button>
        </nav>
      </aside>

      {/* Main Content - Courses Section */}
      <main className="main-content">
        <div className="content-header">
          <h2 className="section-title">
            {activeTab === 'all-courses' && 'Available Courses'}
            {activeTab === 'enrolled' && 'My Enrolled Courses'}
            {activeTab === 'jobs' && 'Available Jobs'}
          </h2>
          <div className="course-count">
            {activeTab === 'all-courses' && `${courses.length} courses`}
            {activeTab === 'enrolled' && `${enrolledCourses.length} courses`}
            {activeTab === 'jobs' && `${jobs.length + (hasSearchedExternal ? externalJobs.length : 0)} jobs`}
          </div>
        </div>

        {activeTab === 'all-courses' ? (
          <div className="course-grid">
            {courses.length > 0 ? (
              courses.map((course) => (
                <div key={course._id} className="course-card">
                  <div className="course-header">
                    <h3 className="course-title">{course.courseName}</h3>
                    <span className={`difficulty-badge ${course.difficulty}`}>
                      {course.difficulty}
                    </span>
                  </div>
                  
                  {/* Course Image */}
                  {course.courseContents && course.courseContents[0]?.image && (
                    <div className="course-image-container">
                      <img 
                        src={course.courseContents[0].image} 
                        alt={course.courseName}
                        className="course-image"
                      />
                    </div>
                  )}
                  
                  {/* Course Description */}
                  {course.courseContents && course.courseContents[0]?.description && (
                    <p className="course-description">
                      {course.courseContents[0].description}
                    </p>
                  )}
                  
                  <p className="course-educator">
                    👨‍🏫 {course.educator?.name || 'Unknown Educator'}
                  </p>
                  
                  {course.category && (
                    <p className="course-category">📂 {course.category}</p>
                  )}
                  
                  <div className="course-meta">
                    <span><strong>Duration:</strong> {course.duration} weeks</span>
                    <span><strong>Students:</strong> {course.enrolledStudents?.length || 0}</span>
                    <span><strong>Rating:</strong> ⭐ {course.rating || 'N/A'}</span>
                  </div>
                  
                  <div className="course-actions">
                    {isEnrolled(course._id) ? (
                      <button className="enrolled-btn" disabled>
                        ✅ Enrolled
                      </button>
                    ) : (
                      <button 
                        className="enroll-btn"
                        onClick={() => enrollInCourse(course._id)}
                      >
                        🎓 Enroll Now
                      </button>
                    )}
                    <button 
                      className="view-btn"
                      onClick={() => viewCourseDetails(course._id)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-courses">
                <p>No courses available at the moment.</p>
              </div>
            )}
          </div>
        ) : activeTab === 'enrolled' ? (
          <div className="course-grid">
            {enrolledCourses.length > 0 ? (
              enrolledCourses.map((course) => (
                <div key={course._id} className="course-card enrolled">
                  <div className="course-header">
                    <h3 className="course-title">{course.courseName}</h3>
                    <span className="enrolled-badge">✅ Enrolled</span>
                  </div>
                  
                  {/* Course Image */}
                  {course.courseContents && course.courseContents[0]?.image && (
                    <div className="course-image-container">
                      <img 
                        src={course.courseContents[0].image} 
                        alt={course.courseName}
                        className="course-image"
                      />
                    </div>
                  )}
                  
                  {/* Course Description */}
                  {course.courseContents && course.courseContents[0]?.description && (
                    <p className="course-description">
                      {course.courseContents[0].description}
                    </p>
                  )}
                  
                  <p className="course-educator">
                    👨‍🏫 {course.educator?.name || 'Unknown Educator'}
                  </p>
                  
                  {course.category && (
                    <p className="course-category">📂 {course.category}</p>
                  )}
                  
                  <div className="course-meta">
                    <span><strong>Duration:</strong> {course.duration} weeks</span>
                    <span><strong>Students:</strong> {course.enrolledStudents?.length || 0}</span>
                    <span><strong>Progress:</strong> 0%</span>
                  </div>
                  
                  <div className="course-actions">
                    <button className="continue-btn">📚 Continue Learning</button>
                    <button 
                      className="view-btn"
                      onClick={() => viewCourseDetails(course._id)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-courses">
                <p>You haven't enrolled in any courses yet.</p>
                <button 
                  className="browse-btn"
                  onClick={() => setActiveTab('all-courses')}
                >
                  Browse Courses
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="course-grid">
            {/* Search/filter for external jobs */}
            <div className="course-card" style={{ gridColumn: '1 / -1' }}>
              <div className="course-header">
                <h3 className="course-title">Find External Jobs (Indeed)</h3>
                <span className="enrolled-badge">External</span>
              </div>
              <div className="course-actions" style={{ gap: '8px', flexWrap: 'wrap' }}>
                <input
                  type="text"
                  value={jobQuery}
                  onChange={(e) => setJobQuery(e.target.value)}
                  placeholder="Role or keywords (e.g., React, Intern)"
                  className="view-btn"
                  style={{ flex: '1 1 240px', textAlign: 'left' }}
                />
                <input
                  type="text"
                  value={jobLocation}
                  onChange={(e) => setJobLocation(e.target.value)}
                  placeholder="Location (e.g., India, Remote)"
                  className="view-btn"
                  style={{ flex: '1 1 200px', textAlign: 'left' }}
                />
                <button className="enroll-btn" onClick={() => fetchExternalJobs({ query: jobQuery, location: jobLocation })}>
                  🔎 Search Indeed
                </button>
              </div>
            </div>

            {/* Internal jobs */}
            {jobs.length > 0 && jobs.map((job) => (
              <div key={job._id} className="course-card">
                <div className="course-header">
                  <h3 className="course-title">{job.company}</h3>
                  <span className="enrolled-badge">{job.type}</span>
                </div>

                <p className="course-description">{job.description}</p>

                <div className="course-meta">
                  <span><strong>Location:</strong> {job.location}</span>
                  <span><strong>Salary:</strong> {job.salary ? `₹${job.salary}` : 'N/A'}</span>
                  <span><strong>Posted:</strong> {new Date(job.createdAt).toLocaleDateString()}</span>
                </div>

                <div className="course-actions">
                  {hasApplied(job) || jobApplyState[job._id] === 'applied' ? (
                    <button className="enrolled-btn" disabled>
                      ✅ Applied
                    </button>
                  ) : (
                    <button
                      className="enroll-btn"
                      onClick={() => openApplyModal(job)}
                      disabled={jobApplyState[job._id] === 'applying'}
                    >
                      Apply
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* External Indeed jobs (only after search) */}
            {hasSearchedExternal && externalJobs.length > 0 && externalJobs.map((job) => (
              <div key={job.id} className="course-card">
                <div className="course-header">
                  <h3 className="course-title">{job.title}</h3>
                  <span className="enrolled-badge">Source: {job.source || 'Indeed'}</span>
                </div>

                <p className="course-description">{job.company} {job.location ? `• ${job.location}` : ''}</p>

                <div className="course-meta">
                  <span><strong>Remote:</strong> {job.remote ? 'Yes' : 'No'}</span>
                  <span><strong>Salary:</strong> {job.salary ? job.salary : 'N/A'}</span>
                  <span><strong>Posted:</strong> {job.postedAt ? new Date(job.postedAt).toLocaleDateString() : 'N/A'}</span>
                </div>

                <div className="course-actions">
                  <a
                    href={job.applyLink || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="view-btn"
                  >
                    View on Indeed
                  </a>
                </div>
              </div>
            ))}

            {jobs.length === 0 && (!hasSearchedExternal || externalJobs.length === 0) && (
              <div className="no-courses" style={{ gridColumn: '1 / -1' }}>
                <p>No jobs available at the moment.</p>
              </div>
            )}
          </div>
        )}
      </main>

      {showApplyModal && selectedJob && (
        <div className="modal-overlay" onClick={closeApplyModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Apply for {selectedJob.company}</h3>
              <button className="modal-close" onClick={closeApplyModal}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="resumeInput">Resume (paste text or URL)</label>
                <textarea
                  id="resumeInput"
                  className="textarea"
                  rows={6}
                  placeholder="Paste your resume text or a link to your resume"
                  value={resumeInput}
                  onChange={(e) => setResumeInput(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="view-btn" onClick={closeApplyModal}>Cancel</button>
              <button
                className="enroll-btn"
                onClick={() => applyToJob(selectedJob._id)}
                disabled={jobApplyState[selectedJob._id] === 'applying'}
              >
                {jobApplyState[selectedJob._id] === 'applying' ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
