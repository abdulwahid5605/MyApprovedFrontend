import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MultiStepForm.css";

const MultiStepForm = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    tradespersonType: "",
    serviceCompletionTime: "",
    propertyType: "",
    address: {
      street: "",
      city: "",
      postcode: "",
    },
    contactDetails: {
      email: "",
      confirmEmail: "",
    },
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(true); // Tracks form visibility
  const [showLoginPopup, setShowLoginPopup] = useState(false); // Tracks login prompt visibility

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (step === 4) {
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [name]: value,
        },
      });
    } else if (step === 5) {
      setFormData({
        ...formData,
        contactDetails: {
          ...formData.contactDetails,
          [name]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const validateStep = () => {
    if (step === 1 && !formData.tradespersonType) {
      setError("Please select a tradesperson type.");
      return false;
    }
    if (step === 2 && !formData.serviceCompletionTime) {
      setError("Please select a service completion time.");
      return false;
    }
    if (step === 3 && !formData.propertyType) {
      setError("Please select a property type.");
      return false;
    }
    if (
      step === 4 &&
      (!formData.address.street ||
        !formData.address.city ||
        !formData.address.postcode)
    ) {
      setError("Please fill out all address fields.");
      return false;
    }
    if (step === 4 && !/^\d+$/.test(formData.address.postcode)) {
      setError("Postcode must be numeric.");
      return false;
    }
    if (
      step === 5 &&
      (!formData.contactDetails.email || !formData.contactDetails.confirmEmail)
    ) {
      setError("Both email fields are required.");
      return false;
    }
    if (
      step === 5 &&
      formData.contactDetails.email !== formData.contactDetails.confirmEmail
    ) {
      setError("Emails must match.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = () => {
    setShowLoginPopup(true);
    setTimeout(() => {
      navigate("/signin");
    }, 3000); // Redirect to login page after 3 seconds
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h2>Step 1: What type of tradesperson do you need?</h2>
            <select
              name="tradespersonType"
              value={formData.tradespersonType}
              onChange={handleChange}
              style={{backgroundColor:"white"}}
            >
              <option value="">Select...</option>
              <option value="bricklayer">Bricklayer</option>
              <option value="electrician">Electrician</option>
              <option value="plumber">Plumber</option>
              <option value="carpenter">Carpenter</option>
            </select>
          </div>
        );
      case 2:
        return (
          <div>
            <h2>Step 2: When do you want this service completed?</h2>
            <select
              name="serviceCompletionTime"
              value={formData.serviceCompletionTime}
              onChange={handleChange}
              style={{backgroundColor:"white"}}
            >
              <option value="">Select...</option>
              <option value="asap">As soon as possible</option>
              <option value="fewDays">Within the next few days</option>
            </select>
          </div>
        );
      case 3:
        return (
          <div>
            <h2>Step 3: What type of property do you have?</h2>
            <select
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              style={{backgroundColor:"white"}}
            >
              <option value="">Select...</option>
              <option value="flat">Flat</option>
              <option value="house">House</option>
            </select>
          </div>
        );
      case 4:
        return (
          <div>
            <h2>Step 4: Address</h2>
            <input
              type="text"
              name="street"
              placeholder="Street"
              value={formData.address.street}
              onChange={handleChange}
              style={{backgroundColor:"white"}}
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.address.city}
              onChange={handleChange}
              style={{backgroundColor:"white"}}
            />
            <input
              type="text"
              name="postcode"
              placeholder="Postcode"
              value={formData.address.postcode}
              onChange={handleChange}
              style={{backgroundColor:"white"}}
            />
          </div>
        );
      case 5:
        return (
          <div>
            <h2>Step 5: Contact Details</h2>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.contactDetails.email}
              onChange={handleChange}
              style={{backgroundColor:"white"}}
            />
            <input
              type="email"
              name="confirmEmail"
              placeholder="Confirm Email"
              value={formData.contactDetails.confirmEmail}
              onChange={handleChange}
              style={{backgroundColor:"white"}}
            />
          </div>
        );
      default:
        return null;
    }
  };

  if (!isFormVisible) return null;

  return (
    <div className="multi-step-form-wahid relative">
      <div className="border border-red-500 flex items-center">
        <button
          className="top-0 right-2 absolute w-fit cross"
          onClick={() => setIsFormVisible(false)}
        >
          ✖
        </button>
      </div>
      {submitted ? (
        <>
          <h2>Thank you! Your form has been submitted successfully.</h2>
          <button onClick={() => setIsFormVisible(false)}>Close</button>
        </>
      ) : (
        <>
          {renderStep()}
          {error && <p className="error-message">{error}</p>}
          <div className="lg:w-[18%] w-[30%]">
            {step > 1 && <button onClick={handleBack} className="w-fit">Back</button>}
            {step < 5 && <button onClick={handleNext} className="w-fit">Next</button>}
            {step === 5 && <button onClick={handleSubmit} className="w-fit">Submit</button>}
          </div>
        </>
      )}
      {showLoginPopup && (
        <div className="popup-message">
          <p> Login to post your job</p>
        </div>
      )}
    </div>
  );
};

export default MultiStepForm;