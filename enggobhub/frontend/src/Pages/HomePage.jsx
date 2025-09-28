import Navbar from "../Components/Navbar";
import "./HomePage.css";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <div className="homepage">
        <div className="homepage-section">
          <h1>Welcome to EngJobHub</h1>
          <p>Your platform for engineering job listings and resources.</p>
        </div>
      </div>
    </>
  );
}
