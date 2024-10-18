import { useState, useEffect, useRef } from "react";
import useTrip from "../../hooks/useTrip";
import { Link } from "react-router-dom";

import "./displaySearch.css";

const DisplaySearch = () => {
  const { tripData, searchError } = useTrip();
  const [visiblePanel, setVisiblePanel] = useState("");
  const { plannedTrips, addItemToTrip, addItemError, setAddItemError } =
    useTrip();
  const [itemAdded, setItemAdded] = useState(null);

  const scrollableRef = useRef(null);

  useEffect(() => {
    // Scroll to the top of the container whenever tripData changes
    if (scrollableRef.current) {
      scrollableRef.current.scrollTo({
        top: 0, 
        behavior: "smooth", 
      });
    }
  }, [tripData]); 

  const limitText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  const handleOnClick = (index) => {
    setAddItemError(null);
    setVisiblePanel(visiblePanel === index ? null : index);
  };

  const handleAddToTrip = async (tripId, item) => {
    const imageUrl =
      item.images[0]?.images?.original?.url ||
      item.images[0]?.images?.large?.url;

    const response = await addItemToTrip(tripId, item, imageUrl);

    if (response) {
      setItemAdded(true);
      setVisiblePanel(null);
      setTimeout(() => setItemAdded(null), 2000);
    }
  };

  if (searchError) {
    return <div className="error-message">{searchError}</div>;
  }

  return (
    <div className="search-page" ref={scrollableRef}>
      {itemAdded && (
        <div className="added-item-graphic">
          <p>Added to Trip!</p>
        </div>
      )}
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
                  <button type="button" onClick={() => handleOnClick(index)}>
                    Add To My Trip
                  </button>
                </div>

                {visiblePanel === index && (
                  <div className="card-panel visible">
                    <h2>Add To:</h2>
                    {plannedTrips.map((trip) => (
                      <Link
                        key={trip.id}
                        onClick={() => {
                          handleAddToTrip(trip.id, data);
                        }}
                      >
                        {trip.name}
                      </Link>
                    ))}
                    {addItemError && (
                      <div className="modal-error-message">{addItemError}</div>
                    )}
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
