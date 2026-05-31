import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import toast from "react-hot-toast";

// =====================================
// Login Component
//
// Handles both Login and Signup.
// =====================================

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Login existing user
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );

      // Save user data in Redux store
      dispatch(addUser(res.data));

      toast.success("Login successful!");

      // Redirect to feed page
      navigate("/feed");
    } catch (err) {
      // Display error from backend
      setError(
        err?.response?.data || "Something went wrong"
      );
    }
  };

  // Register a new user
  const handleSignup = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );

      // Save user data in Redux store
      dispatch(addUser(res.data));

      toast.success("Your account has been created successfully!");

      // Redirect to profile page
      navigate("/profile");
    } catch (err) {
      // Display error from backend
      setError(
        err?.response?.data || "Something went wrong"
      );
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">

          {/* Form Heading */}
          <h2 className="card-title justify-center">
            {isLoginForm ? "Login" : "Signup"}
          </h2>

          {/* Signup Fields */}
          {!isLoginForm && (
            <>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">
                  First Name
                </legend>
                <input
                  type="text"
                  className="input"
                  value={firstName}
                  onChange={(e) =>
                    setFirstName(e.target.value)
                  }
                  placeholder="Enter first name"
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">
                  Last Name
                </legend>
                <input
                  type="text"
                  className="input"
                  value={lastName}
                  onChange={(e) =>
                    setLastName(e.target.value)
                  }
                  placeholder="Enter last name"
                />
              </fieldset>
            </>
          )}

          {/* Email Input */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">
              Email ID
            </legend>
            <input
              type="email"
              className="input"
              value={emailId}
              onChange={(e) =>
                setEmailId(e.target.value)
              }
              placeholder="Enter email ID"
            />
          </fieldset>

          {/* Password Input */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">
              Password
            </legend>
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Enter password"
            />
          </fieldset>

          {/* Error Message */}
          <p className="text-red-500">{error}</p>

          {/* Login / Signup Button */}
          <div className="card-actions justify-center mt-4">
            <button
              className="btn btn-primary"
              onClick={
                isLoginForm ? handleLogin : handleSignup
              }
            >
              {isLoginForm ? "Login" : "Signup"}
            </button>
          </div>

          {/* Switch Login and Signup Form */}
          <p
            className="text-center cursor-pointer mt-2"
            onClick={() =>
              setIsLoginForm((value) => !value)
            }
          >
            {isLoginForm
              ? "New User? Signup Here"
              : "Existing User? Login Here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;