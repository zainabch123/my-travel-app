import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { da } from "date-fns/locale";

const TripContext = createContext();

const TripProvider = ({children}) => {
  const { token, user } = useAuth();
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [tripData, setTripData] = useState([]);
  const [plannedTrips, setPlannedTrips] = useState([]);
  const [fetchTripsError, setFetchTripsError] = useState(null);
  const [addTripError, setAddTripError] = useState(null);
  const [searchError, setSearchError] = useState(null);
  const [tripCreated, setTripCreated] = useState(false);

  useEffect(() => {
    const fetchUsersTrips = async () => {
      if (!token) {
        setPlannedTrips([]);
        return;
      }
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

        setPlannedTrips(data.trips);
      } catch (error) {
        setFetchTripsError(error.Error || "Unable to load planned trips.");
      }
    };

    fetchUsersTrips();
  }, [token, tripCreated]);

  const addNewTrip = async (newTrip) => {
    setAddTripError(null);
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

      if (data.error) {
        throw new Error(data.error);
      }

      setTripCreated(!tripCreated);
      return data;
    } catch (error) {
      setAddTripError(error.message || "Failed to add new trip.");
    }
  };

  const fetchTravelData = async (searchInput) => {
    setSearchError(null);
    try {
      // const res = await fetch(`${apiUrl}/api/search?searchQuery=${searchInput}`);
      // const data = await res.json();

      // if (data.error) {
      //   throw new Error(data.error);
      // }

      // setTripData(data.data);
      // localStorage.setItem("data", JSON.stringify(data.data));
      // navigate("/search");

      // Delete these three line
      const storedData = JSON.parse(localStorage.getItem("data"));
      setTripData(storedData);
      navigate("/search");
    } catch (error) {
      setSearchError(error.message || "Unable to fetch travel data");
      navigate("/search");
    }
  };

  const value = {
    apiUrl,
    tripData,
    setTripData,
    addNewTrip,
    plannedTrips,
    setPlannedTrips,
    fetchTravelData,
    searchError,
    addTripError,
    fetchTripsError,
    setAddTripError,
  };
  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
};

export { TripContext, TripProvider };
