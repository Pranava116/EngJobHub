import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Student.css";

export default function Student() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
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
      await Promise.all([fetchCourses(), fetchEnrolledCourses()]);
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
        </nav>
      </aside>

      {/* Main Content - Courses Section */}
      <main className="main-content">
        <div className="content-header">
          <h2 className="section-title">
            {activeTab === 'all-courses' ? 'Available Courses' : 'My Enrolled Courses'}
          </h2>
          <div className="course-count">
            {activeTab === 'all-courses' ? courses.length : enrolledCourses.length} courses
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
        ) : (
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
        )}
      </main>
    </div>
  );
}
