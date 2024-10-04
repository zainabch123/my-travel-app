import { useState, createContext } from 'react'
import { Routes, Route } from "react-router-dom";
import Login from './pages/login/login.jsx';
import Register from './pages/register/register.jsx';
import Dashboard from './pages/dashboard/dashboard.jsx';
import './App.css'

export const AppContext = createContext();

const port = import.meta.env.VITE_PORT;
const apiUrl = `http://localhost:${port}`;

function App() {
   const [token, setToken] = useState(null);
   const [user, setUser] = useState(null);

  return (
    <AppContext.Provider value={{ apiUrl }}>
        <Routes>
          <Route path="login" element={<Login />}></Route>
          <Route path="register" element={<Register/>}></Route>
          <Route path="/dashboard" element={<Dashboard/>}></Route>
        </Routes>
    </AppContext.Provider>
  );
}

export default App
