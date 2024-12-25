import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./JobPostForm.css"; // Optional CSS for styling
import { motion } from "framer-motion";
import { toast } from "react-toastify"
import { BACKENDURL } from "../config";

const boxStyle = {
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", 
  border: "1px solid rgba(0, 0, 0, 0.1)", 
  borderRadius: "8px", 
  padding: "20px", 
  backgroundColor: "#fff", 
};

const PostJob = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Handles moving to the next step and saving form data
  const handleNext = (data) => {
    const stepErrors = validateStep(data);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    setFormData({ ...formData, ...data });
    setStep(step + 1);
  };

  // Handles moving back to the previous step
  const handleBack = () => {
    setStep(step - 1);
  };

  // Submits the form data to the backend
  const handleSubmit = async (data) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        toast.error("You are not logged in. Redirecting to login page.");
        navigate("/login");
        return;
      }

      const response = await fetch(`${BACKENDURL}/api/post-job`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Form data saved successfully:", result);
        navigate(`/client-dashboard?email=${data.email}`);
      } else {
        const errorData = await response.json();
        toast.error(
          `Failed to save form data: ${errorData.error || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error saving form data:", error);
      toast.error("An error occurred while saving the form data.");
    } finally {
      setIsLoading(false);
    }
  };

  // Validates the current step's form data
  const validateStep = (data) => {
    const errors = {};
    for (const key in data) {
      if (!data[key]) {
        errors[key] = `${key} is required.`;
      }
    }
    return errors;
  };

  // Renders error messages
  const renderErrors = (field) => {
    if (errors[field]) {
      return <p className="error-message">{errors[field]}</p>;
    }
    return null;
  };

  // Step 1: Type of tradesperson
  const Step1 = ({ onNext }) => {
    const [workType, setWorkType] = useState(formData.workType || "");

    const handleContinue = () => {
      onNext({ workType });
    };

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        style={boxStyle}
      >
        <div>
          <h2>Step 1: What type of tradesperson do you need?</h2>
          <select
            value={workType}
            onChange={(e) => setWorkType(e.target.value)}
          >
            <option value="">Select...</option>
            <option value="bricklayer">Bricklayer</option>
            <option value="electrician">Electrician</option>
            <option value="plumber">Plumber</option>
            <option value="other">Other</option>
          </select>
          {renderErrors("workType")}
          <div>
            <button onClick={handleContinue}>Continue</button>
          </div>
        </div>
      </motion.div>
    );
  };

  // Step 2: When the service is required
  const Step2 = ({ onNext, onBack }) => {
    const [serviceTime, setServiceTime] = useState(formData.serviceTime || "");

    const handleContinue = () => {
      onNext({ serviceTime });
    };

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        style={boxStyle}
      >
        <div>
          <h2>Step 2: When do you want this service completed?</h2>
          <select
            value={serviceTime}
            onChange={(e) => setServiceTime(e.target.value)}
          >
            <option value="">Select...</option>
            <option value="asap">As soon as possible</option>
            <option value="fewDays">Within the next few days</option>
            <option value="noDate">No specific date</option>
          </select>
          {renderErrors("serviceTime")}
          <div>
            <button onClick={onBack}>Back</button>
            <button onClick={handleContinue}>Continue</button>
          </div>
        </div>
      </motion.div>
    );
  };

  // Step 3: Property type
  const Step3 = ({ onNext, onBack }) => {
    const [propertyType, setPropertyType] = useState(
      formData.propertyType || ""
    );

    const handleContinue = () => {
      onNext({ propertyType });
    };

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        style={boxStyle}
      >
        <div>
          <h2>Step 3: What type of property is this?</h2>
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          >
            <option value="">Select...</option>
            <option value="flat">Flat</option>
            <option value="house">House</option>
            <option value="commercial">Commercial Property</option>
          </select>
          {renderErrors("propertyType")}
          <div>
            <button onClick={onBack}>Back</button>
            <button onClick={handleContinue}>Continue</button>
          </div>
        </div>
      </motion.div>
    );
  };

  // Step 4: Address information
  const Step4 = ({ onNext, onBack }) => {
    const [address, setAddress] = useState(
      formData.address || { street: "", city: "", postcode: "" }
    );

    const handleContinue = () => {
      if (!address.street || !address.city || !address.postcode) {
        toast.warn("All address fields are required.");
        return;
      }
      onNext({ address });
    };

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        style={boxStyle}
      >
        <div>
          <h2>Step 4: Address</h2>
          <input
            type="text"
            placeholder="Street"
            value={address.street}
            onChange={(e) =>
              setAddress((prev) => ({ ...prev, street: e.target.value }))
            }
          />
          <input
            type="text"
            placeholder="City"
            value={address.city}
            onChange={(e) =>
              setAddress((prev) => ({ ...prev, city: e.target.value }))
            }
          />
          <input
            type="text"
            placeholder="Postcode"
            value={address.postcode}
            onChange={(e) =>
              setAddress((prev) => ({ ...prev, postcode: e.target.value }))
            }
          />
          {renderErrors("address")}
          <div>
            <button onClick={onBack}>Back</button>
            <button onClick={handleContinue}>Continue</button>
          </div>
        </div>
      </motion.div>
    );
  };

  // Step 5: Email
  const Step5 = ({ onNext, onBack }) => {
    const [email, setEmail] = useState(formData.email || "");

    const handleContinue = () => {
      if (!email) {
        toast.warn("Email is required.");
        return;
      }
      onNext({ email });
    };

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        style={boxStyle}
      >
        <div>
          <h2>Step 5: Enter Your Email</h2>
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {renderErrors("email")}
          <div>
            <button onClick={onBack}>Back</button>
            <button onClick={handleContinue}>Continue</button>
          </div>
        </div>
      </motion.div>
    );
  };

  // Step 6: Job Description
  const Step6 = ({ onBack }) => {
    const [jobDescription, setJobDescription] = useState("");

    const handleSubmitForm = () => {
      if (!jobDescription.trim()) {
        toast.warn("Job description is required.");
        return;
      }
      if (jobDescription.length > 300) {
        toast.warn("Job description must be under 300 characters.");
        return;
      }
      handleSubmit({ ...formData, jobDescription });
    };

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        style={boxStyle}
      >
        <div>
          <h2>Step 6: Job Description</h2>
          <textarea
            placeholder="Write a short job description (max 300 characters)"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            maxLength={300}
            rows={5}
            style={{ width: "100%" }}
          />
          <div>
            <button onClick={onBack}>Back</button>
            <button onClick={handleSubmitForm}>Submit</button>
          </div>
        </div>
      </motion.div>
    );
  };

  // Render current step
  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 onNext={handleNext} />;
      case 2:
        return <Step2 onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <Step3 onNext={handleNext} onBack={handleBack} />;
      case 4:
        return <Step4 onNext={handleNext} onBack={handleBack} />;
      case 5:
        return <Step5 onNext={handleNext} onBack={handleBack} />;
      case 6:
        return <Step6 onBack={handleBack} />;
      default:
        return null;
    }
  };

  return (
    <div className="post-job-form">
      {isLoading && <p>Loading...</p>}
      {renderStep()}
    </div>
  );
};

export default PostJob;
