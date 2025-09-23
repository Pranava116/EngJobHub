import React from "react";
import "../static/CardSlider.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider  from "react-slick";
import { useRef } from "react";

export default function CardSlider()
{
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1
  };
  return(
    <div class="CardSliderContainer">
        <h1>Top Companies Hiring</h1>
        {/* <div class="Cardgrid"> */}
        <Slider {...settings}>
        <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(255, 254, 216, 0.25)">
          <div class="card">
            <img src="https://storage.googleapis.com/a1aa/image/JU3J8PVk4IEju1qxuvn4JJYsGbCn4_444HzpGpaR3xQ.jpg" alt="Google logo"></img>
            <h2>Company 1</h2>
            <p>Job Positions: 50+</p>
            <p>Location: City 1</p>
            <button className="button2">View Jobs</button>
          </div>
        </SpotlightCard>
        <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(255, 254, 216, 0.25)">
            <div class="card">
                <img src="https://storage.googleapis.com/a1aa/image/a3sVGZQxUyhCAdYbDgj3W1eZromC-cmRQ28Gi4fXMNQ.jpg" alt="Microsoft logo"></img>
                <h2>Company 2</h2>
                <p>Job Positions: 30+</p>
                <p>Location: City 2</p>
                <button  className="button2">View Jobs</button>
            </div>
        </SpotlightCard>
        <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(255, 254, 216, 0.25)">
            <div class="card">
                <img src="https://storage.googleapis.com/a1aa/image/Hi0Q62Lh1T2lEkuo8hN2m2UU2NiIqpX4v7HvxlkOuXI.jpg" alt="Goldman Sachs logo"></img>
                <h2>Company 2</h2>
                <p>Job Positions: 30+</p>
                <p>Location: City 2</p>
                <button className="button2">View Jobs</button>
            </div>
        </SpotlightCard>
        <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(255, 254, 216, 0.25)">
            <div class="card">
                <img src="https://storage.googleapis.com/a1aa/image/stJTm5GxVrxpWvqKni9E2Im2POpIM3lvhJLVHfgWMU0.jpg" alt="Amazon logo"></img>
                <h2>Company 2</h2>
                <p>Job Positions: 30+</p>
                <p>Location: City 2</p>
                <button className="button2">View Jobs</button>
            </div>
        </SpotlightCard>
          </Slider>
        {/* </div> */}
    </div>
  )
}


const SpotlightCard = ({ children, className = "", spotlightColor = "rgba(255, 254, 216, 0.2)" }) => {
  const divRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    divRef.current.style.setProperty("--mouse-x", `${x}px`);
    divRef.current.style.setProperty("--mouse-y", `${y}px`);
    divRef.current.style.setProperty("--spotlight-color", spotlightColor);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      className={`card-spotlight ${className}`}
    >
      {children}
    </div>
  );
};



