import React from "react"
import SliderHome from "../components/SliderHome";
import HomePageForm from "../components/HomePageForm";
import CardSlider from "../components/CardSlider";
import CompanySlider from "../components/CompanySlider";
export default function Home()
{
  return (
    <>
      <SliderHome/>
      <CardSlider/>
      <HomePageForm/>
      <CompanySlider/>
    </>
  )
}