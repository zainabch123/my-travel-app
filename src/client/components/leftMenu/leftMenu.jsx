import { Link } from "react-router-dom";
import useTrip from "../../hooks/useTrip";

import './leftMenu.css'

const LeftMenu = () => {
      const { plannedTrips } = useTrip();

  return (
    <aside className="left-menu">
      <Link to="/">
        <h2>My Trips</h2>
      </Link>
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
