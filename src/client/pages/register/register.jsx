import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import useTrip from "../../hooks/useTrip";
import useAuth from "../../hooks/useAuth";
import "./register.css";

const Register = () => {
  const { apiUrl } = useTrip();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);

  function handleInput(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const registerUser = async () => {
      try {
        const res = await fetch(apiUrl + "/user/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await res.json();
        console.log("data", data);

        if (data.token) {
          login(data.token, data.user);
          navigate("/");
        } else {
          setError(data.error);
        }
      } catch (error) {
        console.error("Error during login:", error);
        setError("An error occurred during registration. Please try again.");
      }
    };

    registerUser();
  }

  return (
    <div className="register-page">
      <div className="register-form">
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>
          <label htmlFor="firstName">First Name </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            onChange={handleInput}
          />
          <label htmlFor="lastName">Last Name </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            onChange={handleInput}
          />
          <label htmlFor="username">Email </label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={handleInput}
          />
          <label htmlFor="password">Password </label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleInput}
          />
          {error && <p className="error">{error}</p>}
          <button id="signup-button" type="submit" onSubmit={handleSubmit}>
            Sign Up
          </button>
        </form>
        <div className="login-option">
          <p>Already a user?</p>
          <Link to={`/login`}>
            <button id="login-button" type="button">
              Login In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
