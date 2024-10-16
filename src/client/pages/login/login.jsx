import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import useTrip from "../../hooks/useTrip";
import useAuth from "../../hooks/useAuth";
import "./login.css";

const Login = () => {
  const { apiUrl } = useTrip();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);

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
    
        if (data.token) {
          login(data.token, data.user);
          navigate("/")
        } else {
          setError(data.error);
        }
      } catch (error) {
        console.error("Error during login:", error);
        setError("An error occurred during login. Please try again.");
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
          {error && <p className="error">{error}</p>}
          <button id="login-button" type="submit" onSubmit={handleSubmit}>
            Log In
          </button>
        </form>
        <div className="login-options">
          <p>Or login in with</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 56 56"
            height="56"
          >
            <path
              fill="#3284FF"
              d="M47.19 28c0-1.294-.12-2.558-.34-3.784H28v7.568h11.408c-.74 2.62-2.297 4.86-4.378 6.406l5.886 4.684c3.88-3.66 6.273-8.967 6.273-14.874Z"
            />
            <path
              fill="#FF3424"
              d="M28.246 16.108c2.868 0 5.451 1.038 7.452 2.767l5.448-5.525C37.744 10.032 33.152 8 28 8c-7.678 0-14.525 4.51-17.857 11.074l6.688 5.099c1.71-4.701 6.253-8.065 11.415-8.065Z"
            />
            <path
              fill="#FB0"
              d="m10.268 37.167 6.449-5.13a11.968 11.968 0 0 1 .114-7.864l-6.688-5.099a19.661 19.661 0 0 0 .125 18.093Z"
            />
            <path
              fill="#26B14C"
              d="m16.717 32.037-6.449 5.13C13.645 43.6 20.416 48 28 48c5.036 0 9.539-1.94 12.916-5.126L35.03 38.19a11.294 11.294 0 0 1-6.784 2.242c-5.282 0-9.916-3.522-11.529-8.395Z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 56 56"
            height="56"
          >
            <path
              fill="#1877F2"
              d="M48 28c0-11.046-8.954-20-20-20S8 16.954 8 28c0 9.983 7.314 18.257 16.875 19.757V33.78h-5.078V28h5.078v-4.406c0-5.013 2.986-7.782 7.554-7.782 2.188 0 4.477.391 4.477.391v4.922h-2.522c-2.484 0-3.259 1.542-3.259 3.123V28h5.547l-.887 5.781h-4.66v13.976C40.686 46.257 48 37.983 48 28Z"
            />
            <path
              fill="#fff"
              d="M35.785 33.781 36.672 28h-5.547v-3.752c0-1.581.775-3.123 3.26-3.123h2.521v-4.922s-2.288-.39-4.477-.39c-4.568 0-7.554 2.768-7.554 7.78V28h-5.078v5.781h5.078v13.976c2.07.324 4.18.324 6.25 0V33.78h4.66Z"
            />
          </svg>
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
