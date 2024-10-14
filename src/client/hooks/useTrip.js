import { useContext } from "react";
import { TripContext } from "../context/trip";


const useTrip = () => {
  return useContext(TripContext);
};

export default useTrip;
