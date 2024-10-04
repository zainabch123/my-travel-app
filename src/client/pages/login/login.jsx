import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../App.jsx";
import "./login.css";

const Login = () => {
  const { apiUrl } = useContext(AppContext);
  const [formData, setFormData] = useState({ username: "", password: "" });

  function handleInput(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const loginUser = async () => {
      try {
        const res = await fetch(apiUrl + "/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await res.json();
        console.log("data", data);
      } catch (error) {
        console.error("Error during login:", error);
      }
    };

    loginUser();
  }
  return (
    <div className="login-page">
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <label htmlFor="username">Email </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInput}
          />
          <label htmlFor="password">Password </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInput}
          />
          <button id="login-button" type="submit" onSubmit={handleSubmit}>
            Log In
          </button>
        </form>
        <div className="login-options">
          <p>Or login in with</p>
        </div>
        <div className="signup-option">
          <p>Need an account?</p>
          <Link to={`/register`}>
            <button id="signup-button" type="button">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
