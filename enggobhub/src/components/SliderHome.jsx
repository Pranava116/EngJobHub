import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../static/SliderHome.css";
import slider1 from "../static/images/slider1.jpg";
import slider2 from "../static/images/corporate_blog.jpg";
import slider3 from "../static/images/cybersecurity_blog.jpg";

function SliderHome() {
  const sliderRef = useRef(null); 

  const settings = {
    dots: true,
    infinite: true,
    speed: 650,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderRef.current) {
        sliderRef.current.slickNext(); 
      }
    }, 5000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="home-slider-container">
      <div className="slider-container">
        <Slider ref={sliderRef} {...settings}>
          <div className="sliderimgdiv">
            <img src={slider1} alt="slider" />
          </div>
          <div className="sliderimgdiv">
            <img src={slider2} alt="slider" />
          </div>
          <div className="sliderimgdiv">
            <img src={slider3} alt="slider" />
          </div>
        </Slider>
      </div>
    </div>
  );
}

export default SliderHome;
