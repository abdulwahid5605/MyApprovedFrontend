import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./ClientDashboard.css";
import { toast } from "react-toastify"
import { BACKENDURL } from "../config";

const ClientDashboard = () => {
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [confirmationData, setConfirmationData] = useState(null); // To handle confirmation dialog
    const location = useLocation();
    const clientEmail = new URLSearchParams(location.search).get("email");

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch(`${BACKENDURL}/api/jobs?email=${clientEmail}`);
                if (response.ok) {
                    const data = await response.json();
                    setJobs(data);
                } else {
                    console.error("Failed to fetch jobs.");
                }
            } catch (error) {
                console.error("Error fetching jobs:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (clientEmail) fetchJobs();
    }, [clientEmail]);

    const handleAcceptQuotation = async () => {
        if (!confirmationData) return;

        const { jobId, quotationId } = confirmationData;

        try {
            const response = await fetch(
                `${BACKENDURL}/api/accept-quotation/${jobId}/${quotationId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.ok) {
                toast.success("Quotation accepted successfully!");
                // Refetch jobs to reflect the changes
                const updatedJobsResponse = await fetch(`${BACKENDURL}/api/jobs?email=${clientEmail}`);
                const updatedJobs = await updatedJobsResponse.json();
                setJobs(updatedJobs);
            } else {
                console.error("Failed to accept quotation.");
            }
        } catch (error) {
            console.error("Error accepting quotation:", error);
        } finally {
            setConfirmationData(null); // Close confirmation dialog
        }
    };

    const showConfirmationDialog = (jobId, quotationId) => {
        setConfirmationData({ jobId, quotationId });
    };

    if (isLoading) {
        return <p style={{textAlign:"center"}}>Loading jobs...</p>;
    }

    return (
        <div className="client-dashboard">
            <h1>Welcome, {clientEmail}</h1>
            <h2 style={{textAlign:"center"}}>Your Posted Jobs</h2>
            <div className="job-list">
                {jobs.length > 0 ? (
                    jobs.map((job) => (
                        <div key={job._id} className="job-card">
                            <h3>Job Details</h3>
                            <p><strong>Work Type:</strong> {job.workType}</p>
                            <p><strong>Description:</strong> {job.jobDescription}</p>

                            {/* Display Accepted Quotation */}
                            {job.acceptedQuotation ? (
                                <div className="accepted-quotation">
                                    <h4>Accepted Quotation</h4>
                                    <p><strong>Tradeperson:</strong> {job.acceptedQuotation.tradeperson.name}</p>
                                    <p><strong>Email:</strong> {job.acceptedQuotation.tradeperson.email}</p>
                                    <p><strong>Contact:</strong> {job.acceptedQuotation.tradeperson.contactNumber}</p>
                                    <p><strong>Quotation:</strong> {job.acceptedQuotation.quotationText}</p>
                                </div>
                            ) : (
                                /* Display Quotations if No Quotation is Accepted */
                                <div className="quotations">
                                    <h4>Quotations</h4>
                                    {job.quotations && job.quotations.length > 0 ? (
                                        job.quotations.map((quotation) => (
                                            <div key={quotation._id} className="quotation-card">
                                                <p><strong>Quotation:</strong> {quotation.quotationText}</p>
                                                <button
                                                    onClick={() => showConfirmationDialog(job._id, quotation._id)}
                                                >
                                                    Accept Quotation
                                                </button>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No quotations submitted for this job yet.</p>
                                    )}
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No jobs posted yet.</p>
                )}
            </div>

            {/* Confirmation Dialog */}
            {confirmationData && (
                <div className="confirmation-dialog">
                    <div className="dialog-content">
                        <h3>Confirm Acceptance</h3>
                        <p>Do you really want to accept this quotation?</p>
                        <div className="dialog-buttons">
                            <button onClick={handleAcceptQuotation}>Yes</button>
                            <button onClick={() => setConfirmationData(null)}>No</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClientDashboard;
