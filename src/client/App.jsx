import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import Login from './pages/login/login.jsx'
import './App.css'

function App() {
   const [token, setToken] = useState(null);
   const [user, setUser] = useState(null);

  return (
    <>
      <Routes>
        <Route path="login" element= {<Login/>}></Route>
        <Route path="register"></Route>
      </Routes>
    </>
  );
}

export default App
