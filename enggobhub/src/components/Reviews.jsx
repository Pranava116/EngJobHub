import React from "react";

export default function Reviews()
{
  return(
    <>
     <div className="job-card reviews">
        <h3>Reviews <a href="#">Read all 6177 reviews</a></h3>
        <p>⭐⭐⭐⭐⭐ "Great brand value and global presence."</p>
      </div>
      <div className="job-card benefits">
        <h3>Benefits & Perks <a href="#">View all</a></h3>
        <div className="benefits-grid">
          <div className="benefit-item">🚖<br />Office cab</div>
          <div className="benefit-item">☕<br />Cafeteria</div>
          <div className="benefit-item">📖<br />Training programs</div>
        </div>
      </div>
    </>
  )
}