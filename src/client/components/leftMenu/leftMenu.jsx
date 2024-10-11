import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../App.jsx";


const LeftMenu = () => {
      const { plannedTrips, setPlannedTrips } = useContext(AppContext);
  return (
    <aside className="left-menu">
      <h2>My Trips</h2>
      {plannedTrips && (
        <div className="trip-links">
          {plannedTrips.map((trip, index) => {
            return <Link key={index}>{trip.name}</Link>;
          })}
        </div>
      )}
    </aside>
  );
};

export default LeftMenu;
