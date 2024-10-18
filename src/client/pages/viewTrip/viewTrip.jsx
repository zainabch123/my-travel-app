import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useTrip from "../../hooks/useTrip";
import useAuth from "../../hooks/useAuth";
import { format } from "date-fns";


import "./viewTrip.css";

const ViewTrip = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const {apiUrl} = useTrip();
  const [tripData, setTripData] = useState({ tripItems: []});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


   const limitText = (text, maxLength) => {
     if (text.length > maxLength) {
       return text.substring(0, maxLength) + "...";
     }
     return text;
   };

   useEffect(() => {
     const fetchTripItems = async () => {
       try {
         const res = await fetch(`${apiUrl}/trips/view/${id}`, {
           method: "GET",
           headers: {
             "Content-Type": "application/json",
             Authorization: `Bearer ${token}`,
           },
         });

         const data = await res.json();

         if (data.error) {
           throw new Error(data.error);
         }

         setTripData(data.trip);
       } catch (error) {
         setError(error.message || "Unable to fetch travel data");
       } finally {
         setIsLoading(false);
       };
    }

     fetchTripItems();
   }, [id]);

   if (isLoading) {
     return (
       <div className="overlay">
         <div className="spinner"></div>
         <div className="loading-text">Loading, please wait...</div>
       </div>
     );
   }

  return (
    <div className="trip-page">
      <div className="trip-wrapper">
        <h1>{tripData.name}</h1>
        <div className="trip-details-section">
          <h2>Trip Details</h2>
          <div className="trip-image">
            <img src={tripData.imgUrl} alt="Trip Image" />
          </div>
          <div className="trip-content">
            <p>Location: {tripData.location}</p>
            <p>
              Start Date:{" "}
              {tripData.startDate
                ? format(new Date(tripData.startDate), "dd-MM-yyyy")
                : ""}
            </p>
            <p>
              End Date:{" "}
              {tripData.endDate
                ? format(new Date(tripData.endDate), "dd-MM-yyyy")
                : ""}
            </p>
          </div>
        </div>
        <div className="row1">
          <div className="hotels-section">
            <h2>Hotels:</h2>
            {tripData?.tripItems
              ?.filter((item) => item.category === "hotel")
              .map((item) => (
                <div className="item-card" key={item.id}>
                  <div className="item-image">
                    <img src={item.imgUrl}></img>
                  </div>
                  <div className="item-content">
                    <h3>{item.name}</h3>
                    <p>{limitText(item.description, 51)}</p>
                  </div>
                </div>
              ))}
          </div>
          <div className="attractions-section">
            <h2>Attractions:</h2>
            {tripData?.tripItems
              ?.filter(
                (item) =>
                  item.category === "attraction" ||
                  item.category === "geographic"
              )
              .map((item) => (
                <div key={item.id}>
                  <div className="item-card" key={item.id}>
                    <div className="item-image">
                      <img src={item.imgUrl}></img>
                    </div>
                    <div className="item-content">
                      <h3>{item.name}</h3>
                      <p>{limitText(item.description, 51)}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="row2">
          <div className="restaurants-section">
            <h2>Restaurants:</h2>
            {tripData?.tripItems
              ?.filter((item) => item.category === "restaurant")
              .map((item) => (
                <div key={item.id}>
                  <div className="item-card" key={item.id}>
                    <div className="item-image">
                      <img src={item.imgUrl}></img>
                    </div>
                    <div className="item-content">
                      <h3>{item.name}</h3>
                      <p>{limitText(item.description, 51)}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTrip;
