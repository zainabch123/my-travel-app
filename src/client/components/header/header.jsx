import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useTrip from "../../hooks/useTrip";
import useAuth from "../../hooks/useAuth";

import "./header.css";

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const { fetchTravelData } = useTrip();
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) return;

    setLoading(true);

    const res = await fetchTravelData(searchInput);

    setLoading(false);

    if (res) {
      setSearchInput("");
      navigate("/search");
    }
  };

  function handleInput(event) {
    setSearchInput(event.target.value);
  }

  const handleOnClickProfile = () => {
    setIsVisible(!isVisible);
  };

  return (
    <header className="header">
      <div className="travel-planner-logo" onClick={() => navigate("/")}>
        <svg
          fill="#000000"
          version="1.1"
          id="Layer_1"
          viewBox="0 0 512.001 512.001"
        >
          <g>
            <g>
              <path d="M344.381,143.771C254.765,56.017,102.37,103.776,79.825,227.7c-31.849,4.598-59.138,25.445-72.018,55.076    c-0.016,0.035-0.032,0.07-0.047,0.107c-26.687,61.602,18.784,130.232,85.51,130.232h282.267    c75.246,0,136.463-61.216,136.463-136.462C512,189.241,430.314,123.682,344.381,143.771z M375.537,381.12H93.271    c-69.246,0-84.534-98.263-18.714-119.456c14.753-4.65,43.01-7.348,74.38,21.892c6.464,6.024,16.586,5.667,22.61-0.794    c6.024-6.464,5.668-16.586-0.794-22.61c-17.93-16.712-38.071-27.33-58.484-31.453c22.034-99.077,147.374-131.851,215.247-56.305    c4.189,4.661,10.714,6.451,16.693,4.57c67.272-21.117,135.795,29.374,135.795,99.69    C480.005,334.256,433.141,381.12,375.537,381.12z" />
            </g>
          </g>
        </svg>
        <h1>TripPlanner</h1>
      </div>
      <div className="search-bar-wrapper">
        <input
          type="text"
          id="search-bar"
          name="search-bar"
          placeholder="Search hotels, attractions, restaurants, and more..."
          value={searchInput || ""}
          onChange={handleInput}
        ></input>
        <button id="search-query-submit" type="button" onClick={handleSubmit}>
          {loading ? <div className="spinner"></div> : "Search"}
        </button>
        
      </div>
      {user && (
        <div className="profile-circle" onClick={handleOnClickProfile}>
          <p>{`${user.firstName[0]}${user.lastName[0]}`}</p>
        </div>
      )}

      {isVisible && (
        <div className="user-panel">
          <Link to="#">
            <p>Profile</p>
          </Link>

          <Link to="#">
            <p>Account Settings</p>
          </Link>

          <Link
            to="#"
            onClick={(e) => {
              e.preventDefault();
              logout();
            }}
          >
            <p>Log Out</p>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
