import React from "react"; 
import "../static/ServiceBlog.css"
import blog1 from "../static/images/slider1.jpg"
import blog2 from "../static/images/analytics_blog.jpg"
import blog3 from "../static/images/corporate_blog.jpg"
import blog4 from "../static/images/cybersecurity_blog.jpg"


export default function ServiceBlog()
{
  const blogcards =[
    {
      id:1,
      title:'Overview of fintech Services',
      content:'At Engjobhub, we offer a comprehensive range of services designed to streamline the job search and recruitment process.Our platform provides job seekers with access to a diverse array of job posts spanning various industries and career levels. From entry-level positions to executive roles, we connect talented individuals with opportunities that align with their skills, experience, and aspirations.',
      img:blog1
    },
    {
      id:2,
      title:'Engineering Careers',
      content:"Engineering is a dynamic and diverse field with exciting career opportunities. Engineers design cutting-edge technology, solve complex problems, and improve infrastructure, shaping the world around us. Whether in aerospace, civil, mechanical, or electrical engineering, professionals in this field drive meaningful advancements in society. With a strong focus on innovation, creativity, and problem-solving, engineers are in high demand across industries, enjoying competitive salaries and career growth. Whether you're a recent graduate or an experienced professional, engineering offers endless possibilities to push boundaries and make a real impact.",
      img:blog2
    },
    {
      id:3,
      title:"Top talent for HR recruitment",
      content:"At [Your Job Portal Name], we recognize the vital role of human resources in organizational success. We connect HR professionals with top opportunities across industries, whether you're an HR manager seeking leadership or a specialist looking to grow. For employers, we provide targeted recruitment solutions to help attract top talent. With our extensive network and innovative hiring strategies, we're committed to building high-performing HR teams that drive businesses forward.",
      img:blog3
    },
    {
      id:4,
      title:"Other Trending Posts",
      content:"Cyber Security protects systems and data from cyber threats. Big Data Analytics helps in processing and analyzing large datasets for insights. Blockchain ensures secure and transparent transactions. The Internet of Things (IoT) connects devices for smarter automation. Artificial Intelligence enables machines to learn and make decisions. Human Resources manages workforce and organizational development.",
      img:blog4
    }
    

  ]
  return(
    <div className="BlogContainerdiv">
      {blogcards.map((blog) => (
        (blog.id%2!==0) ?(
        
        <div className="BlogContainer" key={blog.id}>
          <div className="box">
          <div className="boxContent">
              <span className="title">{blog.title}</span>
              <div className="content">{blog.content}</div>
            </div>
            <div className="blogdiv">
              <img src={blog.img} alt={blog.title} />
            </div>
          </div>
        </div>
        ): 
        (
          <div className="BlogContainer" key={blog.id}>
          <div className="box">
          
            <div className="blogdiv">
              <img src={blog.img} alt={blog.title} />
            </div>
            <div className="boxContent">
              <span className="title">{blog.title}</span>
              <div className="content">{blog.content}</div>
            </div>
          </div>
        </div>
        )
      ))}
    </div>
  )
}