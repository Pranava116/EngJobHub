import React from "react";

export default function AboutCard({title , imgsrc , content}) {
  return (
    <div className="w-full  rounded-lg border shadow-sm bg-white border-slate-200 shadow-slate-950/5 overflow-hidden">
      <div className="p-2 h-68">
        <img
          src={imgsrc}
          alt="UI/UX Review Check"
          className="w-full h-[30rem] rounded"
        />
      </div>
      <div className="w-full h-auto px-3.5 py-4">
        <h2 className="font-sans font-bold text-lg text-center lg:text-xl text-gray-900 p-2">{title}</h2>
        <p className="font-sans text-base mt-1 text-slate-600 font-semibold">{content}</p>
      </div>
      
    </div>
  );
}
