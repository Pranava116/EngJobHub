import React from 'react';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Header from './components/Header';
import Footer from './components/Footer';
import Login1 from './pages/Login1';
import Contact from './pages/Contact';
import Courses from './pages/Courses';
import Internship from './pages/Internship';
import AboutPage from './pages/About';
import JobDescription from './pages/JobDescription';
import ResumeTemplates from './pages/ResumeTemplate';
import {HashRouter as Router, Routes, Route,useLocation} from 'react-router-dom'
import './App.css';


function Layout() {
  const location = useLocation();
  const hideFooter = location.pathname === "/login";
  return (
      <div>
        <Header/>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<Blog/>}/>
              <Route path="/login" element={<Login1 />} />
              <Route path="/contact" element={<Contact/>}/>
              <Route path='/internship' element={<Internship/>} />
              <Route path='/about' element={<AboutPage/>} />
              <Route path='/courses' element={<Courses/>}/>
              <Route path='/jobdescription' element={<JobDescription/>}/>
              <Route path='/jobs' element={<Internship/>} />
              <Route path='/jobdescription' element={<JobDescription/>}/>
              <Route path='/courses' element={<Courses/>}/>
              <Route path='/resumetemplates' element={<ResumeTemplates/>}/>
          </Routes>
          {!hideFooter && <Footer />}
      </div>
  );
}

// function App() {
//   return (
//     <Router>
//       <Header/>
//       <Routes>
//         <Route path="/" element={<Home/>}/>
//         <Route path="/blog" element={<Blog/>}/>
//         <Route path="/login" element={<Login1/>}/>
//       </Routes>
//       <Footer/>
//     </Router>
//   );
// }

export default function App() {
  return (
      <Router>
          <Layout />
      </Router>
  );
}

