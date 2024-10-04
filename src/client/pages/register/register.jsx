import { useState, useContext } from 'react';
import { AppContext } from "../../App.jsx";
import './register.css';

const Register = () => {
const { apiUrl } = useContext(AppContext);
const [formData, setFormData] = useState({ firstName: "", lastName: "", username: "", password: "" });

function handleInput(event) {
  const { name, value } = event.target;
  console.log("new event.target", event.target.value);
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
    } catch (error) {
      console.error("Error during login:", error);
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
            <button id="signup-button" type="submit" onSubmit={handleSubmit}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    );
};

export default Register;