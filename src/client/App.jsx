import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/login.jsx";
import Register from "./pages/register/register.jsx";
import Dashboard from "./pages/dashboard/dashboard.jsx";
import DisplaySearch from "./pages/displaySearch/displaySearch.jsx";
import ViewTrip from "./pages/viewTrip/viewTrip.jsx";
import ProtectedRoute from "./components/protectedRoute/protectedRoute.jsx";
import  AuthProvider  from "./provider/authProvider.jsx";
import TripProvider from "./provider/tripProvider.jsx";

import "./App.css";

const App = () => {
  return (
    <AuthProvider>
      <TripProvider>
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

          <Route
            path="/viewTrip/:id"
            element={
              <ProtectedRoute>
                <ViewTrip />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </TripProvider>
    </AuthProvider>
  );
}

export default App;
