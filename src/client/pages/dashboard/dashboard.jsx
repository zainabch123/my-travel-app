import { useState } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import useTrip from "../../hooks/useTrip";

import "./dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const { plannedTrips, addNewTrip, addTripError, setAddTripError, fetchTripsError } = useTrip();
  const [showModal, setShowModal] = useState(false);
  const [newTrip, setNewTrip] = useState({
    name: "",
    location: "",
    startDate: "",
    endDate: "",
    imgUrl: "",
  });

  function handleInput(event) {
    const { name, value } = event.target;
    setNewTrip({
      ...newTrip,
      [name]: value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

   const result = await addNewTrip(newTrip);

   if (result) {
    setNewTrip({
      name: "",
      location: "",
      startDate: "",
      endDate: "",
      imgUrl: "",
      itinerary: [],
    });
    closeModal();
   }
  }

  const handleAddTripClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setAddTripError(null)
    setShowModal(false);
  };

  if (fetchTripsError) {
    return <div className="error-message">{fetchTripsError}</div>;
  }

  const calculateDaysRemaining = (startDate) => {
    const currentDate = new Date();
    const tripStartDate = new Date(startDate);
    
    const timeDifference = tripStartDate - currentDate;
    const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    return daysRemaining;
  };
  return (
    <div className="dashboard-page">
      <div className="planned-trips-wrapper">
        {plannedTrips && (
          <div className="planned-trips">
            <ul className="trip-cards">
              {plannedTrips.map((trip, index) => {
                const daysRemaining = calculateDaysRemaining(trip.startDate);
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
                      {daysRemaining !== null && (
                        <p className="days-remaining">
                          {daysRemaining} day{daysRemaining !== 1 ? "s" : ""}{" "}
                          left until the trip!
                        </p>
                      )}
                    </div>
                    <button onClick={() => navigate(`/viewTrip/${trip.id}`)}>
                      View Details
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      <div className="planned-trips-header">
        <button className="add-trip-button" onClick={handleAddTripClick}>
          +
        </button>
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
              {addTripError && (
                <div className="modal-error-message">{addTripError}</div>
              )}
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
    </div>
  );
};

export default Dashboard;
