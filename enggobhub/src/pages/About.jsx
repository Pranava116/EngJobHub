import React from 'react';
import { AnimatedTestimonialsDemo } from '../components/TeamInfo';
import AboutCard from '../components/AboutPageCard';

export default function AboutPage() {
  const cards = [
    {
      id: 1, title: "Connecting Talent with Opportunity",
      content: "Welcome to EngJobHub, your trusted platform for job seekers and employers. We bridge the gap between top talent and the best job opportunities, making hiring and job searching faster, smarter, and more efficient. Whether you're a job seeker looking for your next career move or an employer searching for the perfect candidate, our advanced tools and AI-driven matching system ensure a seamless experience.",
      imgsrc: "/img1.webp"
    },
    {
      id: 2, title: "Our Mission",
      content: "At EngJobHub, our mission is to empower job seekers and employers by providing a seamless, secure, and efficient platform for job searching and hiring. We aim to simplify the recruitment process with advanced technology, making job opportunities accessible while helping companies find the right talent effortlessly.",
      imgsrc: "/img2.webp"
    },
    {
      id: 3, title: "Our Vision",
      content: " We envision a future where job seekers and employers connect effortlessly through an intelligent, scalable, and secure platform. By integrating AI-driven job matching, advanced filtering, resume databases, and employer branding tools, we strive to revolutionize the hiring landscape.",
      imgsrc: "/img5.jpeg"
    },
    {
      id: 4, title: "Why Choose Us?",
      content: " At EngJobHub, we make job searching and hiring effortless for both job seekers and employers. Job seekers can create profiles, update resumes, and apply for jobs with ease, while employers can post listings, manage applications, and access a resume database. Advanced search filters, AI-powered job matching, and instant notifications ensure candidates find the right opportunities quickly.",
      imgsrc: "/img4.jpeg"
    },

  ];

  const [activeIndex, setActiveIndex] = React.useState(1);

  const nextCard = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const prevCard = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

  return (
    <>
      <div className='mt-2 pt-16 bg-slate-200 pb-16 flex justify-center text-5xl font-bold'>
        About Us
      </div>
      <div className=' mt-10 grid grid-cols-6 gap-4'>
        <div className='flex col-span-1 flex-col justify-center'>
          <div className='flex justify-center'>
          <button
            onClick={prevCard}
            className="px-8 py-2 bg-transparent text-white rounded-full  transition w-24 h-24 " 
          >
           <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"></path></svg>

          </button>
          </div>
          
        </div>
        <div className='col-span-4'>
          <AboutCard title={cards[activeIndex].title} imgsrc={cards[activeIndex].imgsrc} content={cards[activeIndex].content} />
        </div>
       
          <div className='flex col-span-1 flex-col justify-center '>
            <div className='flex justify-center'>
            <button
              onClick={nextCard}
              className="px-8 py-2 bg-transparent text-white rounded-full  transition w-24 h-24"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"></path></svg>

            </button>

            </div>
          </div>
        </div>
        <div className='flex justify-center'>
     <div className="aspect-w-16 aspect-h-9">
  <iframe src="https://www.youtube.com/embed/Pw-0pbY9JeU" frameborder="0" allowfullscreen
    className=" m-24 w-[68rem] h-[36rem] top-0 left-0"></iframe>
</div>
     </div>
     <div className='flex justify-center mt-10 font-black text-4xl'>
    <div>Meet Our Team</div>
     </div>
      <div>
        <AnimatedTestimonialsDemo />
      </div>

    </>
  )
}