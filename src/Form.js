import React, { useState } from "react";
import "./styles.css";

const MultiStepForm = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = (data, stepErrors = {}) => {
    setFormData({ ...formData, [`step${step}`]: data });
    console.log("Current formData:", formData); // Debugging
    if (Object.keys(stepErrors).length === 0) {
      setStep(step + 1);
    }
  };

  const handleBack = () => setStep(step - 1);

  const handleSubmit = async () => {
    const formattedData = {
      tradespersonType: formData.step1,
      serviceCompletionTime: formData.step2,
      propertyType: formData.step3,
      address: formData.step4,
      contactDetails: formData.step5,
    };

    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:7000/multi-step-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (response.ok) {
        console.log("Form data saved successfully");
        setSubmitted(true);
      } else {
        console.error("Failed to save form data");
      }
    } catch (error) {
      console.error("Error saving form data:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 onNext={handleNext} />;
      case 2:
        return <Step2 onNext={handleNext} />;
      case 3:
        return <Step3 onNext={handleNext} />;
      case 4:
        return <Step4 onNext={handleNext} />;
      case 5:
        return <Step5 onNext={handleNext} />;
      default:
        return null;
    }
  };

  return (
    <div className="multi-step-form">
      {submitted ? (
        <h2>Thank you! Your form has been submitted successfully.</h2>
      ) : (
        <>
          {renderStep()}
          <div className="button-container">
            {step > 1 && <button onClick={handleBack}>Back</button>}
            {step === 5 && <button onClick={handleSubmit}>Submit</button>}
          </div>
          {isSubmitting && <p>Submitting...</p>}
        </>
      )}
    </div>
  );
};

export default MultiStepForm;
