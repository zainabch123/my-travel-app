import { useState } from "react";
import useTrip from "../../hooks/useTrip";
import { Link } from "react-router-dom";

import "./displaySearch.css";

const DisplaySearch = () => {
  const { tripData, setTripData } = useTrip();
  const [visiblePanel, setVisiblePanel] = useState("");
  const { plannedTrips, setPlannedTrips } = useTrip();

  console.log("planned Trips", plannedTrips);

  const limitText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  const handleAddToTrip = (index) => {
    setVisiblePanel(visiblePanel === index ? null : index);
  };

 
  return (
    <div className="search-page">
      <div className="display-data-wrapper">
        <ul className="data-cards">
          {tripData.map((data, index) => {
            return (
              <li key={index} className="data-card">
                <div className="card-img">
                  {data.images ? (
                    <img
                      src={
                        data.images[0]?.images?.original?.url
                          ? data.images[0].images.original.url
                          : data.images[0].images.large.url
                      }
                      alt="Data Image"
                    />
                  ) : (
                    <div className="placeholder">No Image Available</div>
                  )}
                </div>
                <div className="card-text">
                  <h2>{data.name}</h2>
                  {data.description && (
                    <p>{limitText(data.description, 200)}</p>
                  )}
                  {data.rating && <p>Rating: {data.rating}</p>}
                </div>
                <div className="card-buttons">
                  <button>View More Details</button>
                  <button type="button" onClick={() => handleAddToTrip(index)}>
                    Add To My Trip
                  </button>
                </div>

                {visiblePanel === index && (
                  <div className="card-panel visible">
                    <h2>Add To:</h2>
                    {plannedTrips.map((trip) => (
                      <Link key={trip.id}>
                        {trip.name}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default DisplaySearch;
