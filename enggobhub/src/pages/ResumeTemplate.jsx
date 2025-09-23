import React from "react";
import "../static/ResumeTemplate.css";

const templates = [
  { id: 1, imgSrc: "https://placehold.co/300x300", title: "Template 1" },
  { id: 2, imgSrc: "https://placehold.co/300x300", title: "Template 2" },
  { id: 3, imgSrc: "https://placehold.co/300x300", title: "Template 3" },
  { id: 4, imgSrc: "https://placehold.co/300x300", title: "Template 4" },
  { id: 5, imgSrc: "https://placehold.co/300x300", title: "Template 5" },
  { id: 6, imgSrc: "https://placehold.co/300x300", title: "Template 6" },
  { id: 7, imgSrc: "https://placehold.co/300x300", title: "Template 7" },
  { id: 8, imgSrc: "https://placehold.co/300x300", title: "Template 8" },
  { id: 9, imgSrc: "https://placehold.co/300x300", title: "Template 9" },
  
];

const ResumeTemplates = () => {
  return (
    <section className="templates-section">
      <h2 className="text-5xl font-bold mt-10 mr-10">Resume Templates</h2>
      <div className="templates-grid">
        {templates.map((template) => (
          <div key={template.id} className="template-card">
            <img src={template.imgSrc} alt={template.title} />
            <h3>{template.title}</h3>
            <div className="download-buttons">
              <a href="#" className="download-btn pdf-btn">
                Download PDF
              </a>
              <a href="#" className="download-btn word-btn">
                Download Word
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ResumeTemplates;
