import React from "react";
import "../static/Courses.css"

const courses = [
  { image: "web-dev.png", title: "Web Development", duration: "8 weeks", rating: "4.1", learners: "121,153" },
  { image: "python.png", title: "Programming with Python", duration: "6 weeks", rating: "4.2", learners: "87,360" },
  { image: "web-dev.png", title: "Web Development", duration: "8 weeks", rating: "4.1", learners: "121,153" },
  { image: "python.png", title: "Programming with Python", duration: "6 weeks", rating: "4.2", learners: "87,360" },
  { image: "python.png", title: "Programming with Python", duration: "6 weeks", rating: "4.2", learners: "87,360" },
  
  { image: "python.png", title: "Programming with Python", duration: "6 weeks", rating: "4.2", learners: "87,360" },
  { image: "digital-marketing.png", title: "Digital Marketing", duration: "8 weeks", rating: "4.5", learners: "73,494" }
];

const educators = [
  { image: "placeholder.png", name: "Educator 1", expertise: "Expert in AI" },
  { image: "placeholder.png", name: "Educator 2", expertise: "Data Science Specialist" },
  { image: "placeholder.png", name: "Educator 3", expertise: "Web Development Guru" },
  { image: "placeholder.png", name: "Educator 2", expertise: "Data Science Specialist" },
  { image: "placeholder.png", name: "Educator 3", expertise: "Web Development Guru" }
];

const categories = [
  "Most Popular", "IIT Madras Pravartak Certified", "Programming", "Business & Management",
  "Core Engineering", "Data Science", "Design", "Artificial Intelligence", "Creative Arts",
  "Language", "Career Development", "Architecture"
];

const Courses = () => {
  return (
    <div className="course-container">
      {/* Sidebar */}
      <aside className="category-sidebar">
        <h2>Categories</h2>
        <ul>
          {categories.map((category, index) => (
            <li key={index} className={index === 0 ? "active" : ""}>{category}</li>
          ))}
        </ul>
      </aside>

      {/* Main Courses Section */}
      <main className="courses">
        {courses.map((course, index) => (
          <div key={index} className="course-card">
            <img src={course.image} alt={course.title} />
            <h3>{course.title}</h3>
            <p>{course.duration} • {course.rating} ★ | {course.learners} learners</p>
          </div>
        ))}
      </main>

      {/* Educators Section */}
      <div className="educator-rightside">
        <h2>Top Educators</h2>
        <div className="educator-slider">
          {educators.map((educator, index) => (
            <div key={index} className="educator-card">
              <img src={educator.image} alt={educator.name} />
              <h3>{educator.name}</h3>
              <p>{educator.expertise}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
