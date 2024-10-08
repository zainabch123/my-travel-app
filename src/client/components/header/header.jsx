import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./header.css";

const Header = () => {
  const { user, logout } = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  const handleOnClickProfile = () => {
    setIsVisible(!isVisible);
  };

  return (
    <header className="header">
      <div className="travel-planner-logo">
        <h1>TripPlanner</h1>
      </div>
      <div className="search-bar-wrapper">
        <input
          type="text"
          id="search-bar"
          name="search-bar"
          placeholder="Search hotels, attractions, activities, and more..."
        ></input>
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
