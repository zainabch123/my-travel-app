import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { da } from "date-fns/locale";

import TripContext from "../context/trip";

const TripProvider = ({ children }) => {
  const { token, user } = useAuth();
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [tripData, setTripData] = useState([]);
  const [plannedTrips, setPlannedTrips] = useState([]);
  const [fetchTripsError, setFetchTripsError] = useState(null);
  const [addTripError, setAddTripError] = useState(null);
  const [searchError, setSearchError] = useState(null);
  const [tripCreated, setTripCreated] = useState(false);
  const [itemCreated, setItemCreated] = useState(false);

  const [addItemError, setAddItemError] = useState(null);

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
  }, [token, tripCreated, itemCreated]);

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
      // // localStorage.setItem(
      // //   "hotels in paris",
      // //   JSON.stringify(data.data)
      // // );
      // return tripData;

      // Delete these three line
      const storedData = JSON.parse(localStorage.getItem("data"));
      setTripData(storedData);
      return tripData;
    } catch (error) {
      setSearchError(error.message || "Unable to fetch travel data");
      navigate("/search");
    }
  };

  const addItemToTrip = async (tripId, item, imageUrl) => {
    setAddItemError(null)
    try {
      const res = await fetch(`${apiUrl}/trips/${tripId}/addItem`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: item.name,
          description: item.description,
          imgUrl: imageUrl,
          rating: item.rating,
          category: item.category.name,
        }),
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

       setItemCreated(!itemCreated);
      return data;
    } catch (error) {
      setAddItemError(error.message || "Unable to add item.");
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
    addItemToTrip,
    addItemError,
    setAddItemError,
  };
  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
};

export default TripProvider;
