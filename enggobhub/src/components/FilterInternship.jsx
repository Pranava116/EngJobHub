import { useState } from "react";
import "../static/FilterIntenship.css"

const FiltersInternship = () => {
  const [profile, setProfile] = useState("");
  const [location, setLocation] = useState("");
  const [workFromHome, setWorkFromHome] = useState(false);
  const [partTime, setPartTime] = useState(false);
  const [activeHire, setActiveHire] = useState(false);
  const [stipend, setStipend] = useState(0);

  const clearFilters = () => {
    setProfile("");
    setLocation("");
    setWorkFromHome(false);
    setPartTime(false);
    setStipend(0);
  };

  return (
    <div className="filter-box">
      <div className="filter-header">Filters</div>

      <label className="input-label">Profile
      <input
        className="marketing"
        type="text"
        placeholder="e.g. Marketing"
        value={profile}
        onChange={(e) => setProfile(e.target.value)}
      />
      </label>

      <label className="input-label">Location
      <input
        type="text"
        placeholder="e.g. Delhi"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      </label>

      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={workFromHome}
          onChange={() => setWorkFromHome(!workFromHome)}
        />
        Work from home
      </label>

      <label className="checkbox-label">
        <input
          name="jobtime"
          type="checkbox"
          checked={partTime}
          onChange={() => setPartTime(!partTime)}
        />
        Part-time
      </label>

      <label className="checkbox-label">
        <input
          name="jobtime"
          type="checkbox"
          checked={activeHire}
          onChange={() => setActiveHire(!activeHire)}
        />
        Actively hiring
      </label>

      <div className="slider-container">
        <label className="slider-label">Desired minimum monthly stipend (₹)</label>
        <input
          type="range"
          min="0"
          max="10000"
          value={stipend}
          onChange={(e) => setStipend(e.target.value)}
          className="slider"
        />
        <div className="slider-labels">
          <span>0</span> <span>2K</span> <span>4K</span> <span>6K</span> <span>8K</span> <span>10K</span>
        </div>
      </div>

      <div className="links">
        <button href="#" className="more-filters">View more filters ⬇</button>
        <button  className="clear-all" onClick={clearFilters}>Clear all</button>
      </div>
    </div>
  );
};

export default FiltersInternship;
