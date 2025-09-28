import React from "react";
import Navbar from "../Components/Navbar";
import Cards from "../Components/Cards";
import Slider from "../Components/Slider";
import Footer from "../Components/Footer";

export default function HomePage() {
  
  const slides = [
    { name: "Welcome to EngJobHub", image: "https://img.freepik.com/free-photo/hands-typing-keyboard-top-view_23-2149762478.jpg?semt=ais_hybrid&w=740&q=80" },
    { name: "Upload Courses", image: "https://media.istockphoto.com/id/1325786046/vector/tiny-characters-creating-content-copywriting-marketing-concept-home-based-copywriter-writer.jpg?s=612x612&w=0&k=20&c=mBwFjw011d94o1Y57aajyrQP0E6j0FlYdKPZHqE8Lp0=" },
    { name: "Boost Your Skills", image: "https://blog.iilm.edu/wp-content/uploads/2020/05/Guide-to-Professional-Networking-and-Job-Search.jpg" }
  ];

  return (
    <>
      <Navbar />
      <Slider slides={slides} />
      <Footer/>
      
    </>
  );
}
