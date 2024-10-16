import { useState, useEffect, createContext } from "react";
import useAuth from "../hooks/useAuth";
import { da } from "date-fns/locale";

const TripContext = createContext();

const TripProvider = ({ children }) => {
  const { token, user } = useAuth();
  const apiUrl = import.meta.env.VITE_API_URL;
  const [tripData, setTripData] = useState([]);
  const [plannedTrips, setPlannedTrips] = useState([]);
  const [error, setError] = useState(null);
  const [tripCreated, setTripCreated] = useState(false);

  useEffect(() => {
    const fetchUsersTrips = async () => {
      if (!token) {
        setPlannedTrips([]);
        return
      };
      try {
        const res = await fetch(`${apiUrl}/trips/${user.id}`, {
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

        if (data.trips) {
          setPlannedTrips(data.trips);
        }
      } catch (error) {
        setError(error.Error || "Failed to load planned trips");
      }
    };

    fetchUsersTrips();
  }, [token, tripCreated]);


  const addNewTrip = async (newTrip) => {
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
          itinerary: [],
        });
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError(error.message || "Failed to add new trip");
    }
  };

  const value = {
    apiUrl,
    tripData,
    setTripData,
    addNewTrip,
    error,
    plannedTrips,
    setPlannedTrips,
  };
  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
};

export { TripContext, TripProvider };
