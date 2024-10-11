import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { format } from "date-fns";
import useAuth from "../../hooks/useAuth";
import { AppContext } from "../../App.jsx";
import "./dashboard.css";

const Dashboard = () => {
  const { token } = useAuth();
  const { apiUrl, plannedTrips, setPlannedTrips } = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);
  const [newTrip, setNewTrip] = useState({
    name: "",
    location: "",
    startDate: "",
    endDate: "",
    imgUrl: "",
  });
  const [error, setError] = useState(null);
  const [tripCreated, setTripCreated] = useState(false);

  useEffect(() => {
    const fetchUsersTrips = async () => {
      if (!token) return;
      try {
        const res = await fetch(`${apiUrl}/trips/usersTrips`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();

        if (data.trips) {
          setPlannedTrips(data.trips);
        } else {
          setError(data.error);
        }
      } catch (error) {
        setError(error.message || "Failed to load planned trips");
      }
    };

    fetchUsersTrips();
  }, [token, tripCreated]);

  function handleInput(event) {
    const { name, value } = event.target;
    setNewTrip({
      ...newTrip,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const addNewTrip = async () => {
      try {
        const res = await fetch(`${apiUrl}/trips/addTrip`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newTrip),
        });

        const data = await res.json();

        if (data.trip) {
          setTripCreated(!tripCreated);
          setNewTrip({
            name: "",
            location: "",
            startDate: "",
            endDate: "",
            imgUrl: "",
          });
          closeModal();
        } else {
          setError(data.error);
        }
      } catch (error) {
        setError(error.message || "Failed to add new trip");
      }
    };

    addNewTrip();
  }

  const handleAddTripClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="planned-trips-wrapper">
        <div className="planned-trips-header">
          <h1>Planned Trips</h1>
          <button className="add-trip-button" onClick={handleAddTripClick}>
            + Add New Trip{" "}
          </button>
        </div>
        {plannedTrips && (
          <div className="planned-trips">
            <ul className="trip-cards">
              {plannedTrips.map((trip, index) => {
                return (
                  <li key={index} className="trip-card">
                    {trip.imgUrl ? (
                      <img src={trip.imgUrl} alt="Trip Image" />
                    ) : (
                      <div className="placeholder">No Image Available</div>
                    )}
                    <div className="card-content">
                      <h3>{trip.name}</h3>
                      <p>{trip.location}</p>
                      <p>
                        {trip.startDate
                          ? format(new Date(trip.startDate), "dd-MM-yyyy")
                          : ""}{" "}
                        to{" "}
                        {trip.endDate
                          ? format(new Date(trip.endDate), "dd-MM-yyyy")
                          : ""}
                      </p>
                    </div>
                    <button>View Details</button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <form onSubmit={handleSubmit}>
              <button className="close-modal" onClick={closeModal}>
                x
              </button>
              <h2>Add New Trip</h2>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={newTrip.name}
                onChange={handleInput}
              ></input>
              <label htmlFor="img">Cover Photo</label>
              <input
                type="text"
                id="imgUrl"
                name="imgUrl"
                value={newTrip.imgUrl}
                onChange={handleInput}
              ></input>
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={newTrip.location}
                onChange={handleInput}
              ></input>
              <label htmlFor="startDate">Start Date</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={newTrip.startDate}
                onChange={handleInput}
              ></input>
              <label htmlFor="endDate">End Date</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={newTrip.endDate}
                onChange={handleInput}
              ></input>
              <button
                id="new-trip-form-submit"
                type="submit"
                onSubmit={handleSubmit}
              >
                Add Trip
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
