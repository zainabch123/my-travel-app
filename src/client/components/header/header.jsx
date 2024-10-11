import { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AppContext } from "../../App.jsx";
import useAuth from "../../hooks/useAuth";
import "./header.css";
import { da } from "date-fns/locale";

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const { apiUrl, tripData, setTripData } = useContext(AppContext);
  const [searchInput, setSearchInput] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const fetchData = async () => {
    const res = await fetch(
      `${apiUrl}/api/search?searchQuery=${searchInput}`);

    const data = await res.json();
    setTripData(data.data);
    navigate("/search");

    }
    fetchData()
}

  function handleInput (event) {
    setSearchInput(
      event.target.value,
    );
  }

  const handleOnClickProfile = () => {
    setIsVisible(!isVisible);
  };

  return (
    <header className="header">
      <div className="travel-planner-logo">
        <h1>TripPlanner</h1>
      </div>
      <div className="search-bar-wrapper">
        <select name="search-filter" id="search-filter">
          <option value="default">Select Type</option>
          <option value="hotels">Hotels</option>
          <option value="attractions">Attractions</option>
          <option value="restaurants">Restaurants</option>
        </select>
        <input
          type="text"
          id="search-bar"
          name="search-bar"
          placeholder="Search hotels, attractions, activities, and more..."
          value={searchInput || ""}
          onChange={handleInput}
        ></input>
        <button id="search-query-submit" type="button" onClick={handleSubmit}>
          Search
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
