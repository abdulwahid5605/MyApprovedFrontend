import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PhoneInput from "react-phone-input-2"; // For phone number input
import "react-phone-input-2/lib/style.css"; // Styles for phone input
import "./TradepersonRegister.css"; // External CSS for styling
import { BACKENDURL } from "../config";

const TradepersonRegister = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        businessName: "",
        contactNumber: "",
        trade: "",
        street: "",
        city: "",
        postcode: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    const validateField = (name, value) => {
        switch (name) {
            case "name":
                return value.length >= 3 ? "" : "Name must be at least 3 characters long.";
            case "email":
                return /\S+@\S+\.\S+/.test(value) ? "" : "Invalid email format.";
            case "businessName":
                return value.trim() ? "" : "Business name is required.";
            case "contactNumber":
                return value ? "" : "Contact number is required.";
            case "password":
                return value.length >= 6 ? "" : "Password must be at least 6 characters long.";
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

    const handlePhoneChange = (value) => {
        setFormData({ ...formData, contactNumber: value });
        setErrors((prevErrors) => ({
            ...prevErrors,
            contactNumber: value ? "" : "Contact number is required.",
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        for (const key in formData) {
            const error = validateField(key, formData[key]);
            if (error) newErrors[key] = error;
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            const response = await axios.post(`${BACKENDURL}/tradeperson/register`, formData);
            setSuccessMessage("Registration successful! Redirecting to login page...");
            setTimeout(() => navigate("/login"), 2000);
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
            setErrors({ form: error.response?.data?.error || "Registration failed. Try again." });
        }
    };

    return (
        <div className="trades-form-page">
            <div className="trades-form-container">
                <h2>Tradeperson Registration</h2>
                {errors.form && <p className="error-message">{errors.form}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                    {errors.name && <p className="error-message">{errors.name}</p>}

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                    {errors.email && <p className="error-message">{errors.email}</p>}

                    <input
                        type="text"
                        name="businessName"
                        placeholder="Business Name"
                        value={formData.businessName}
                        onChange={handleInputChange}
                        required
                    />
                    {errors.businessName && <p className="error-message">{errors.businessName}</p>}

                    <PhoneInput
                        country={"us"}
                        value={formData.contactNumber}
                        onChange={handlePhoneChange}
                    />
                    {errors.contactNumber && <p className="error-message">{errors.contactNumber}</p>}

                    <select
                        name="trade"
                        value={formData.trade}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select Trade</option>
                        <option value="bricklayer">Bricklayer</option>
                        <option value="electrician">Electrician</option>
                        <option value="plumber">Plumber</option>
                        <option value="other">Other</option>
                    </select>

                    <input
                        type="text"
                        name="street"
                        placeholder="Street"
                        value={formData.street}
                        onChange={handleInputChange}
                        required
                    />
                    {errors.street && <p className="error-message">{errors.street}</p>}

                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                    />
                    {errors.city && <p className="error-message">{errors.city}</p>}

                    <input
                        type="text"
                        name="postcode"
                        placeholder="Postcode"
                        value={formData.postcode}
                        onChange={handleInputChange}
                        required
                    />
                    {errors.postcode && <p className="error-message">{errors.postcode}</p>}

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                    {errors.password && <p className="error-message">{errors.password}</p>}

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                    />
                    {errors.confirmPassword && (
                        <p className="error-message">{errors.confirmPassword}</p>
                    )}

                    <button type="submit" className="submit-btn">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default TradepersonRegister;
