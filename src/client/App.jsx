import { useState, createContext } from 'react'
import { Routes, Route } from "react-router-dom";
import Login from './pages/login/login.jsx';
import Register from './pages/register/register.jsx';
import Dashboard from './pages/dashboard/dashboard.jsx';
import ProtectedRoute from './components/protectedRoute/protectedRoute.jsx';
import { AuthProvider } from './context/auth.jsx';
import './App.css'

export const AppContext = createContext();

const port = import.meta.env.VITE_PORT;
const apiUrl = `http://localhost:${port}`;

function App() {
  return (
    <AuthProvider>
      <AppContext.Provider value={{ apiUrl }}>
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
        </Routes>
      </AppContext.Provider>
    </AuthProvider>
  );
}

export default App
