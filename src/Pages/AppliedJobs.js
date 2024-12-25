import React, { useEffect, useState } from 'react';
import './AppliedJobs.css'; // CSS file for styling
import { BACKENDURL } from '../config';

function AppliedJobs() {
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAppliedJobs = async () => {
        try {
            const response = await fetch(`${BACKENDURL}/api/applied-jobs`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch applied jobs');
            }

            const data = await response.json();

            // Sort jobs: accepted first, then by creation date (newest first)
            const sortedJobs = data.sort((a, b) => {
                if (a.isAccepted && !b.isAccepted) return -1;
                if (!a.isAccepted && b.isAccepted) return 1;

                const dateA = new Date(a.createdAt);
                const dateB = new Date(b.createdAt);

                return dateB - dateA; // Descending order by date
            });

            setAppliedJobs(sortedJobs);
        } catch (error) {
            console.error("Error fetching applied jobs:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppliedJobs();
    }, []);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">Failed to load applied jobs. Please try again later. Error: {error}</div>;
    }

    return (
        <div className="applied-jobs-container">
            <h1>Your Applied Jobs</h1>
            <div className="jobs-grid">
                {appliedJobs.length === 0 ? (
                    <p>No jobs found.</p>
                ) : (
                    appliedJobs.map((job) => (
                        <div
                            key={job._id}
                            className={`job-card ${job.isAccepted ? 'accepted' : 'pending'}`}
                        >
                            <h3>Job Details</h3>
                            <p><strong>Work Type:</strong> {job.jobId?.workType || 'N/A'}</p>
                            <p><strong>Property Type:</strong> {job.jobId?.propertyType || 'N/A'}</p>
                            <p><strong>Service Time:</strong> {job.jobId?.serviceTime || 'N/A'}</p>
                            <p><strong>Address:</strong> {`${job.jobId?.address?.street || 'N/A'}, ${job.jobId?.address?.city || 'N/A'}, ${job.jobId?.address?.postcode || 'N/A'}`}</p>
                            <p><strong>Submitted Quotation:</strong> {job.quotationText || 'N/A'}</p>
                            <p><strong>Applied On:</strong> {job.createdAt ? new Date(job.createdAt).toLocaleString() : 'N/A'}</p>
                            <p><strong>Status:</strong> {job.isAccepted ? 'Accepted' : 'Pending'}</p>

                            {job.isAccepted && (
                                <div className="client-details">
                                    <h4>🎉 Congratulations! This job has been accepted.</h4>
                                    <p><strong>Client Address (Street):</strong> {job.jobId?.address?.street || 'N/A'}</p>
                                    <p><strong>Client Address (City):</strong> {job.jobId?.address?.city || 'N/A'}</p>
                                    <p><strong>Client Address (Postcode):</strong> {job.jobId?.address?.postcode || 'N/A'}</p>
                                    <p><strong>Client Email:</strong> {job.jobId?.contactEmail || 'N/A'}</p>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default AppliedJobs;
