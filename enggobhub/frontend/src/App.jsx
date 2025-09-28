import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from "./Components/Navbar";
import Auth from "./Pages/Auth";
import Educator from "./Pages/Educator";
import Student from "./Pages/Student";
import Home from "./Pages/HomePage";

function Layout() {
  return (
    <>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Home/>} />
        <Route path="/student" element={<Student/>} />
        <Route path="/educator" element={<Educator />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
