import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ClientSignIn.css"; // Ensure this file exists and is correctly styled
import { BACKENDURL } from "../config";

const ClientSignIn = () => {
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [errorMessage, setErrorMessage] = useState(""); // Error message
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Tracks login success
  const navigate = useNavigate(); // For redirection after closing the card

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    setErrorMessage(""); // Clear any previous error messages

    try {
      const response = await fetch(`${BACKENDURL}/client/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the content type for JSON payload
        },
        body: JSON.stringify({ email, password }), // Send email and password as payload
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);
        navigate("/post-job");

        // Save token to localStorage (if the backend provides a token)
        if (data.token) {
          localStorage.setItem("authToken", data.token);
        }

        // Set login success state
        setIsLoggedIn(true);
      } else {
        const errorData = await response.json();
        setErrorMessage(
          errorData.message || "Invalid credentials. Please try again."
        );
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center py-8 font-rubik ">
      <div
        className={`form-wrapper ${
          isLoggedIn ? "hiddenone" : ""
        } flex lg:flex-row justify-between`}
      >
        <div className="lg:w-[50%] w-[70%] lg:m-1 m-auto  ">
          <form onSubmit={handleSubmit}>
            <h1>Sign in</h1>
            <div className="social-container ">
              <a href="#" className="social">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <span>or use your account</span>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <input
              type="submit"
              value="Sign In"
              className="bg-[#eeb408] hover:bg-[#c89006] cursor-pointer rounded-full"
            />
            <div className="pt-4 text-base auth-footer">
              Haven't an account?{" "}
              <a href="/signup" className="!text-[#eeb408] font-bold">
                Sign up
              </a>
            </div>
          </form>
        </div>
        <div className="bg-[#004080]  flex flex-col px-12 hidden lg:block  justify-center items-center text-center pt-[130px] ">
          <h1 className="text-[#eeb408]">Hello, Friend!</h1>
          <p className="text-white font-bold">
            Enter your personal details and start your journey with us
          </p>
          <div className="w-[70%] mx-auto mt-16 ">
            <a href="/signup" className="">
              <button className=" ghost  ">Sign Up</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientSignIn;