import "./TradepersonDashboard.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKENDURL } from "../config";

function TradespersonDashboard() {
  const [jobs, setJobs] = useState([]); // Initialize jobs as an empty array
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const fetchJobs = async (page) => {
    try {
      const response = await fetch(
        `${BACKENDURL}/api/matching-jobs?page=${page}&limit=10`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        const error = await response.text();
        console.error("API Error:", error); // Debugging log
        throw new Error(error);
      }

      const data = await response.json();
      console.log("Fetched jobs:", data); // Debugging log
      setJobs(data.jobs || []); // Ensure jobs is always an array
      setCurrentPage(data.currentPage || 1);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setJobs([]); // Set jobs to an empty array if the API call fails
    }
  };

  const handleApply = (jobId) => {
    navigate(`/apply/${jobId}`);
  };

  const handlePageChange = (page) => {
    fetchJobs(page);
  };

  useEffect(() => {
    fetchJobs(currentPage);
  }, [currentPage]);
  return (
    <div className="tradeperson-dashboard">
      <h1 className="font-rubik">Tradesperson Dashboard</h1>
      <ul className="jobs-container flex flex-col lg:flex-row">
        {Array.isArray(jobs) && jobs.length > 0 ? (
          jobs.map((job) => (
            <li key={job._id}>
              <p>
                <span className="text-black"> Work Type:</span> {job.workType}
              </p>

              <p>
                <span className="text-black">Property Type: </span>
                {job.propertyType}
              </p>
              <p>
                <span className="text-black">Service Time:</span>{" "}
                {job.serviceTime}
              </p>
              <p>
                <span className="text-black">Job:</span> {job.jobDescription}
              </p>
              <p>
                <span className="text-black">Address:</span>{" "}
                {job.address.street}, {job.address.city}, {job.address.postcode}
              </p>
              <p>
                <span className="text-black">
                  <strong>Posted On:</strong>
                </span>
                {new Date(job.createdAt).toLocaleString()}
              </p>
              <button onClick={() => handleApply(job._id)}>
                Apply for this Job
              </button>
            </li>
          ))
        ) : (
          <p>No jobs available</p>
        )}
      </ul>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            className="pagination-button"
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TradespersonDashboard;