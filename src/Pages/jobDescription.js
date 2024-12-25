import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./JobDescription.css"; // Optional CSS
import { toast } from "react-toastify"
import { BACKENDURL } from "../config";

const JobDescription = () => {
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const jobId = queryParams.get("jobId");

  const handleSubmit = async () => {
    if (!description || description.split(" ").length > 100) {
      setError("Description must be between 1 and 100 words.");
      return;
    }

    setError("");
    try {
      const response = await fetch(`${BACKENDURL}/api/job-description/${jobId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({ description }),
      });

      if (response.ok) {
        toast.success("Job description saved successfully!");
        navigate("/client-dashboard");
      } else {
        toast.error("Failed to save job description.");
      }
    } catch (error) {
      console.error("Error saving job description:", error);
      toast.error("An error occurred while saving the job description.");
    }
  };

  const handleInputChange = (e) => {
    const text = e.target.value;

    // Auto-correction: Capitalize the first letter of each sentence
    const correctedText = text
      .replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (c) => c.toUpperCase())
      .slice(0, 500); // Limit to 500 characters

    setDescription(correctedText);
  };

  return (
    <div className="job-description-form">
      <h2>Describe Your Job</h2>
      <p>Please provide a detailed description of the job (max 100 words).</p>
      <textarea
        placeholder="Enter job description..."
        value={description}
        onChange={handleInputChange}
        rows={5}
        maxLength={500}
      />
      {error && <p className="error-message">{error}</p>}
      <button onClick={handleSubmit} className="submit-btn">
        Submit
      </button>
    </div>
  );
};

export default JobDescription;
