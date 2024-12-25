import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ClientSignIn.css"; // Import your CSS file
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { BACKENDURL } from "../config";

const TradepersonLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BACKENDURL}/tradeperson/login`,
        formData
      );
      const { token } = response.data;
      localStorage.setItem("token", token); // Store token in localStorage
      toast.success("Login successful!");
      navigate("/dashboard"); // Redirect to dashboard
    } catch (error) {
      toast.error("Login failed. Check your credentials.");
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center py-8 font-rubik">
      <div
        className={`form-wrapper right-panel-active  flex justify-between lg:flex-row flex-col`}
      >
        <div className="lg:w-[50%] w-[70%] lg:mx-1 m-auto flex justify-center ">
          <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div className="social-container">
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
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />

            <button type="submit">Login</button>
            <div className="pt-4 text-base auth-footer">
              Haven't account?{" "}
              <Link to="/register" className="!text-[#eeb408] font-bold">
                Register
              </Link>
            </div>
          </form>
        </div>
        <div className="bg-[#004080]  flex flex-col px-12 hidden lg:block  justify-center items-center text-center pt-[130px] ">
          <h1 className="text-[#eeb408]">Hello, Friend!</h1>
          <p className="text-white font-bold">
            Enter your personal details and start your journey with us
          </p>
          <div className="w-[70%] mx-auto mt-16 ">
            <a href="/register" className="">
              <button className=" ghost  ">Register</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradepersonLogin;
