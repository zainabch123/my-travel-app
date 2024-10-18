import { useContext } from "react";
import TripContext from "../context/trip.jsx";


const useTrip = () => {
  return useContext(TripContext);
};

export default useTrip;
