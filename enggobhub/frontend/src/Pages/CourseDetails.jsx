import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./CourseDetails.css";

function CourseDetails() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [relatedCourses, setRelatedCourses] = useState([]);
  const [progress, setProgress] = useState(0);

  // Fetch course details
  const fetchCourseDetails = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/courses/${courseId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const courseData = await response.json();
        setCourse(courseData);
        
        // Check if user is enrolled
        if (user?.role === 'student') {
          const enrolledResponse = await fetch('http://localhost:5000/api/courses/student/my-courses', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          
          if (enrolledResponse.ok) {
            const enrolledCourses = await enrolledResponse.json();
            setIsEnrolled(enrolledCourses.some(c => c._id === courseId));
            
            // Calculate progress for enrolled students
            if (isEnrolled) {
              setProgress(Math.floor(Math.random() * 100)); // Mock progress for now
            }
          }
        }
        
        // Fetch related courses
        await fetchRelatedCourses(courseData.category);
      } else {
        setError('Course not found');
      }
    } catch (error) {
      console.error('Error fetching course details:', error);
      setError('Failed to load course details');
    } finally {
      setLoading(false);
    }
  };

  // Fetch related courses
  const fetchRelatedCourses = async (category) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/courses?category=${category}&limit=3`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const courses = await response.json();
        // Filter out current course
        setRelatedCourses(courses.filter(c => c._id !== courseId));
      }
    } catch (error) {
      console.error('Error fetching related courses:', error);
    }
  };

  // Submit rating and review
  const submitReview = async () => {
    if (!rating || !review.trim()) {
      alert('Please provide both rating and review');
      return;
    }

    try {
      setSubmittingReview(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/courses/${courseId}/review`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ rating, review })
      });

      if (response.ok) {
        alert('Review submitted successfully!');
        setReview('');
        setRating(0);
        // Refresh course data to show updated rating
        fetchCourseDetails();
      } else {
        alert('Failed to submit review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review');
    } finally {
      setSubmittingReview(false);
    }
  };

  // Enroll in course
  const handleEnroll = async () => {
    if (!user || user.role !== 'student') {
      alert('Please login as a student to enroll in courses');
      return;
    }

    try {
      setEnrolling(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/courses/${courseId}/enroll`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setIsEnrolled(true);
        alert('Successfully enrolled in course!');
        // Update course data to reflect new enrollment
        setCourse(prev => ({
          ...prev,
          enrolledStudents: [...(prev.enrolledStudents || []), user.id]
        }));
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to enroll in course');
      }
    } catch (error) {
      console.error('Error enrolling in course:', error);
      alert('Failed to enroll in course');
    } finally {
      setEnrolling(false);
    }
  };

  useEffect(() => {
    if (courseId) {
      fetchCourseDetails();
    }
  }, [courseId]);

  if (loading) {
    return (
      <div className="course-details-loading">
        <div className="loading-spinner"></div>
        <p>Loading course details...</p>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="course-details-error">
        <h2>Course Not Found</h2>
        <p>{error || 'The course you are looking for does not exist.'}</p>
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="course-details-container">
      {/* Header */}
      <div className="course-details-header">
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Back
        </button>
        <div className="header-content">
          <h1 className="course-title">{course.courseName}</h1>
          <div className="course-badges">
            <span className={`difficulty-badge ${course.difficulty}`}>
              {course.difficulty}
            </span>
            <span className="category-badge">{course.category}</span>
            {isEnrolled && <span className="enrolled-badge">✅ Enrolled</span>}
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="course-tabs">
        <button 
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          📋 Overview
        </button>
        <button 
          className={`tab-btn ${activeTab === 'curriculum' ? 'active' : ''}`}
          onClick={() => setActiveTab('curriculum')}
        >
          📚 Curriculum
        </button>
        <button 
          className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          ⭐ Reviews
        </button>
        <button 
          className={`tab-btn ${activeTab === 'related' ? 'active' : ''}`}
          onClick={() => setActiveTab('related')}
        >
          🔗 Related Courses
        </button>
      </div>

      {/* Main Content */}
      <div className="course-details-content">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            {/* Left Column - Course Media */}
            <div className="course-media-section">
              {/* Course Image */}
              {course.courseContents && course.courseContents[0]?.image && (
                <div className="course-image-container">
                  <img 
                    src={course.courseContents[0].image} 
                    alt={course.courseName}
                    className="course-main-image"
                  />
                </div>
              )}

              {/* Course Video */}
              {course.courseContents && course.courseContents[0]?.video && (
                <div className="course-video-container">
                  <h3>Course Preview</h3>
                  <video 
                    src={course.courseContents[0].video}
                    controls
                    className="course-video"
                    poster={course.courseContents[0].image}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}

              {/* Progress Bar for Enrolled Students */}
              {isEnrolled && (
                <div className="progress-section">
                  <h3>📈 Your Progress</h3>
                  <div className="progress-container">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <span className="progress-text">{progress}% Complete</span>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Course Info */}
            <div className="course-info-section">
              {/* Educator Info */}
              <div className="educator-info">
                <h3>👨‍🏫 Educator</h3>
                <div className="educator-details">
                  <div className="educator-avatar">
                    <span>{course.educator?.name?.charAt(0)?.toUpperCase() || 'E'}</span>
                  </div>
                  <div className="educator-text">
                    <h4>{course.educator?.name || 'Unknown Educator'}</h4>
                    <p>{course.educator?.email || 'No email provided'}</p>
                  </div>
                </div>
              </div>

              {/* Course Description */}
              {course.courseContents && course.courseContents[0]?.description && (
                <div className="course-description-section">
                  <h3>📝 Description</h3>
                  <p className="course-description">
                    {course.courseContents[0].description}
                  </p>
                </div>
              )}

              {/* Course Stats */}
              <div className="course-stats">
                <h3>📊 Course Statistics</h3>
                <div className="stats-grid">
                  <div className="stat-item">
                    <span className="stat-icon">⏱️</span>
                    <div className="stat-content">
                      <span className="stat-value">{course.duration}</span>
                      <span className="stat-label">Weeks</span>
                    </div>
                  </div>
                  <div className="stat-item">
                    <span className="stat-icon">👥</span>
                    <div className="stat-content">
                      <span className="stat-value">{course.enrolledStudents?.length || 0}</span>
                      <span className="stat-label">Students</span>
                    </div>
                  </div>
                  <div className="stat-item">
                    <span className="stat-icon">⭐</span>
                    <div className="stat-content">
                      <span className="stat-value">{course.rating || 'N/A'}</span>
                      <span className="stat-label">Rating</span>
                    </div>
                  </div>
                  <div className="stat-item">
                    <span className="stat-icon">📅</span>
                    <div className="stat-content">
                      <span className="stat-value">{new Date(course.createdAt).toLocaleDateString()}</span>
                      <span className="stat-label">Created</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enrollment Section */}
              {user?.role === 'student' && (
                <div className="enrollment-section">
                  <h3>🎓 Enrollment</h3>
                  {isEnrolled ? (
                    <div className="enrolled-status">
                      <p>✅ You are enrolled in this course!</p>
                      <button className="continue-learning-btn">
                        📚 Continue Learning
                      </button>
                    </div>
                  ) : (
                    <div className="enroll-section">
                      <p>Ready to start learning? Enroll now to access course content!</p>
                      <button 
                        className="enroll-btn"
                        onClick={handleEnroll}
                        disabled={enrolling}
                      >
                        {enrolling ? 'Enrolling...' : '🎓 Enroll Now'}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        )}

        {/* Curriculum Tab */}
        {activeTab === 'curriculum' && (
          <div className="curriculum-section">
            <h2>📚 Course Curriculum</h2>
            {course.courseContents && course.courseContents.length > 0 ? (
              <div className="curriculum-list">
                {course.courseContents.map((content, index) => (
                  <div key={index} className="curriculum-item">
                    <div className="curriculum-header">
                      <span className="lesson-number">Lesson {index + 1}</span>
                      <h3>{content.name}</h3>
                      <span className="lesson-status">
                        {isEnrolled ? '🔓 Unlocked' : '🔒 Locked'}
                      </span>
                    </div>
                    {content.description && (
                      <p className="lesson-description">{content.description}</p>
                    )}
                    <div className="lesson-materials">
                      {content.image && (
                        <div className="material-item">
                          <span className="material-icon">🖼️</span>
                          <span>Course Image</span>
                        </div>
                      )}
                      {content.video && (
                        <div className="material-item">
                          <span className="material-icon">🎥</span>
                          <span>Video Content</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No curriculum available yet.</p>
            )}
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div className="reviews-section">
            <h2>⭐ Reviews & Ratings</h2>
            
            {/* Rating Summary */}
            <div className="rating-summary">
              <div className="rating-overview">
                <span className="rating-score">{course.rating || 'N/A'}</span>
                <div className="rating-stars">
                  {[1, 2, 3, 4, 5].map(star => (
                    <span 
                      key={star} 
                      className={`star ${star <= (course.rating || 0) ? 'filled' : ''}`}
                    >
                      ⭐
                    </span>
                  ))}
                </div>
                <p>Based on {course.enrolledStudents?.length || 0} student reviews</p>
              </div>
            </div>

            {/* Submit Review */}
            {user?.role === 'student' && isEnrolled && (
              <div className="submit-review-section">
                <h3>Write a Review</h3>
                <div className="review-form">
                  <div className="rating-input">
                    <label>Rating:</label>
                    <div className="star-rating">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          className={`star-btn ${star <= rating ? 'active' : ''}`}
                          onClick={() => setRating(star)}
                        >
                          ⭐
                        </button>
                      ))}
                    </div>
                  </div>
                  <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Share your experience with this course..."
                    className="review-textarea"
                  />
                  <button 
                    className="submit-review-btn"
                    onClick={submitReview}
                    disabled={submittingReview || !rating || !review.trim()}
                  >
                    {submittingReview ? 'Submitting...' : 'Submit Review'}
                  </button>
                </div>
              </div>
            )}

            {/* Reviews List */}
            <div className="reviews-list">
              <h3>Student Reviews</h3>
              <div className="review-item">
                <div className="review-header">
                  <div className="reviewer-info">
                    <span className="reviewer-avatar">👤</span>
                    <span className="reviewer-name">Anonymous Student</span>
                  </div>
                  <div className="review-rating">
                    ⭐⭐⭐⭐⭐
                  </div>
                </div>
                <p className="review-text">
                  "This course was amazing! The instructor explained everything clearly and the content was very helpful."
                </p>
                <span className="review-date">2 days ago</span>
              </div>
            </div>
          </div>
        )}

        {/* Related Courses Tab */}
        {activeTab === 'related' && (
          <div className="related-courses-section">
            <h2>🔗 Related Courses</h2>
            {relatedCourses.length > 0 ? (
              <div className="related-courses-grid">
                {relatedCourses.map((relatedCourse) => (
                  <div key={relatedCourse._id} className="related-course-card">
                    {relatedCourse.courseContents && relatedCourse.courseContents[0]?.image && (
                      <img 
                        src={relatedCourse.courseContents[0].image} 
                        alt={relatedCourse.courseName}
                        className="related-course-image"
                      />
                    )}
                    <div className="related-course-info">
                      <h3>{relatedCourse.courseName}</h3>
                      <p className="related-course-educator">
                        by {relatedCourse.educator?.name || 'Unknown Educator'}
                      </p>
                      <div className="related-course-meta">
                        <span>{relatedCourse.duration} weeks</span>
                        <span>{relatedCourse.difficulty}</span>
                        <span>⭐ {relatedCourse.rating || 'N/A'}</span>
                      </div>
                      <button 
                        className="view-related-btn"
                        onClick={() => navigate(`/course/${relatedCourse._id}`)}
                      >
                        View Course
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No related courses found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseDetails;
