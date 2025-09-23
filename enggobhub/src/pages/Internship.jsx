import React from "react";
import InternshipOffer from "../components/InternshipOffer";
import FiltersInternship from "../components/FilterInternship";
import "../static/InternshipPage.css"


export default function Internship()
{
  return(
    <div className="InternshipPage">
      <FiltersInternship/>
      <InternshipOffer/>
    </div>
  )
}