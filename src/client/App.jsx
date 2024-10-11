import { useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/login.jsx";
import Register from "./pages/register/register.jsx";
import Dashboard from "./pages/dashboard/dashboard.jsx";
import DisplaySearch from "./pages/displaySearch/displaySearch.jsx";
import ProtectedRoute from "./components/protectedRoute/protectedRoute.jsx";
import { AuthProvider } from "./context/auth.jsx";

import "./App.css";

export const AppContext = createContext();

const apiUrl = import.meta.env.VITE_API_URL;

function App() {
  const [tripData, setTripData] = useState([]);
  const [plannedTrips, setPlannedTrips] = useState([]);
  return (
    <AuthProvider>
      <AppContext.Provider
        value={{ apiUrl, tripData, setTripData, plannedTrips, setPlannedTrips }}
      >
        <Routes>
          <Route path="login" element={<Login />}></Route>
          <Route path="register" element={<Register />}></Route>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <DisplaySearch />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </AppContext.Provider>
    </AuthProvider>
  );
}

export default App;
