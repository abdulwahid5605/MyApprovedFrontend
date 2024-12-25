import React, { useState } from "react";
import PhoneInput from "react-phone-input-2"; // Import the library
import "react-phone-input-2/lib/style.css"; // Import styles
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKENDURL } from "../config";

const ClientRegister = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    street: "",
    city: "",
    postcode: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return value.length >= 3
          ? ""
          : "Name must be at least 3 characters long.";
      case "email":
        return /\S+@\S+\.\S+/.test(value) ? "" : "Invalid email format.";
      case "password":
        return value.length >= 6
          ? ""
          : "Password must be at least 6 characters long.";
      case "confirmPassword":
        return value === formData.password ? "" : "Passwords do not match.";
      case "street":
      case "city":
      case "postcode":
        return value.trim() ? "" : "This field is required.";
      default:
        return "";
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };

  const handlePhoneNumberChange = (value) => {
    setFormData({ ...formData, phoneNumber: value });
    setErrors((prevErrors) => ({
      ...prevErrors,
      phoneNumber: value ? "" : "Phone number is required.",
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    for (const key in formData) {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    }
    if (!formData.phoneNumber)
      newErrors.phoneNumber = "Phone number is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form
    if (!validateForm()) {
      console.log("Validation failed:", errors);
      return;
    }

    // Log formData to ensure all fields are present
    console.log("Submitting Form Data:", formData);

    try {
      // Make the API call
      const response = await axios.post(
        `${BACKENDURL}/client/register`,
        {
          ...formData,
          phoneNumber: `+${formData.phoneNumber}`, // Ensure phoneNumber is formatted
        }
      );

      // Show success message
      setSuccessMessage(response.data.message || "Registration successful!");
      setTimeout(() => navigate("/signin"), 2000);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      setErrors({
        form: error.response?.data?.error || "Registration failed. Try again.",
      });
    }
  };

  return (
    <div className="register-form">
      <h1>Register</h1>
      {errors.form && <p className="error">{errors.form}</p>}
      {successMessage && <p className="success">{successMessage}</p>}

      <form
        onSubmit={handleSubmit}
        className="lg:w-[40%] w-[90%] mx-auto min-h-screen"
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
        />
        {errors.name && <p className="error">{errors.name}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
        />
        {errors.password && <p className="error">{errors.password}</p>}

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
        />
        {errors.confirmPassword && (
          <p className="error">{errors.confirmPassword}</p>
        )}
        <PhoneInput
          country={"us"}
          value={formData.phoneNumber}
          onChange={handlePhoneNumberChange}
          inputClass="h-16 text-lg w-18"
          inputStyle={{
            width: "100%",
            height: "41px", // Increase height
            fontSize: "18px", // Adjust font size
            // padding: "10px", // Adjust padding for better spacing
          }}
        />
        {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}

        <input
          type="text"
          name="street"
          placeholder="Street"
          value={formData.street}
          onChange={handleInputChange}
        />
        {errors.street && <p className="error">{errors.street}</p>}

        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleInputChange}
        />
        {errors.city && <p className="error">{errors.city}</p>}

        <input
          type="text"
          name="postcode"
          placeholder="Postcode"
          value={formData.postcode}
          onChange={handleInputChange}
        />
        {errors.postcode && <p className="error">{errors.postcode}</p>}
        <div className="w-[30%] mx-auto my-3 ">
          <button
            type="submit"
            className="px-2 py-3 bg-[#EEB408] hover:bg-[#c89006] rounded-full"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClientRegister;
