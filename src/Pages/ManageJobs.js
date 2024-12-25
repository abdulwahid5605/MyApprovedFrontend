import React, { useEffect, useState } from "react";
import "./manageJobs.css";
import { toast } from "react-toastify"
import { BACKENDURL } from "../config";


const ManageJobs = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const response = await fetch(`${BACKENDURL}/api/admin/jobs`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
                },
            });
            const data = await response.json();
            console.log("Fetched Jobs:", JSON.stringify(data, null, 2)); // Debugging
            setJobs(data);
        } catch (error) {
            console.error("Error fetching jobs:", error);
        }
    };

    const handleDeleteJob = async (jobId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this job?");
        if (!confirmDelete) return;
    
        try {
            const response = await fetch(`${BACKENDURL}/api/admin/jobs/${jobId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
                    "Content-Type": "application/json",
                },
            });
    
            if (response.ok) {
                toast.success("Job deleted successfully");
                fetchJobs(); // Refresh the job list
            } else {
                const errorData = await response.json();
                toast.error(`Failed to delete job: ${errorData.error}`);
            }
        } catch (error) {
            console.error("Error deleting job:", error);
            toast.error("An error occurred while deleting the job.");
        }
    };
    

    return (
        <div className="manage-jobs-container">
            <h1 className="manage-jobs-header">Manage Jobs</h1>
            <div className="card-con">
            {jobs.map((job) => (
                <div key={job._id} className="job-card">
                    {/* Green label for active jobs */}
                    {Array.isArray(job.quotations) && job.quotations.length > 0 && (
                        <div className="active-label">Active</div>
                    )}

                    <h2>Job Details</h2>
                    <p><strong>Work Type:</strong> {job.workType}</p>
                    <p><strong>Property Type:</strong> {job.propertyType}</p>
                    <p><strong>Service Time:</strong> {job.serviceTime}</p>
                    <p><strong>Job Description:</strong> {job.jobDescription}</p>
                    <p>
                        <strong>Posted By:</strong> {job.contactEmail || "N/A"} 
                    </p>
                    <p><strong>Posted On:</strong> {new Date(job.createdAt).toLocaleString()}</p>

                    {/* Show quotations if available */}
                    {Array.isArray(job.quotations) && job.quotations.length > 0 ? (
                        <div>
                            <h3>Quotations</h3>
                            {job.quotations.map((quotation) => (
                                <div key={quotation._id} className="quotation-card">
                                    <p>
                                        <strong>Tradeperson:</strong> {quotation.userId?.name || "N/A"} ({quotation.userId?.email || "N/A"})
                                    </p>
                                    <p>
                                        <strong>Quotation:</strong> {quotation.quotationText || "N/A"}
                                    </p>
                                    <p>
                                        <strong>Applied On:</strong>{" "}
                                        {quotation.createdAt ? new Date(quotation.createdAt).toLocaleString() : "N/A"}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No applications for this job yet.</p>
                    )}

                    {/* Buttons */}
                    <div className="job-buttons">
                    
                        <button className="delete-job" onClick={() => handleDeleteJob(job._id)}>
                            Delete Job
                        </button>
                    </div>
                </div>
            ))}
            </div>
        </div>
    );
};

export default ManageJobs;
