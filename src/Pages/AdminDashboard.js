import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const navigate = useNavigate();

    // Redirect to the respective management pages
    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
            <h1>Admin Dashboard</h1>
            <p>Welcome, Admin!</p>
            <div style={{ marginTop: "20px" }}>
                <button
                    onClick={() => handleNavigation("/admin/manage-clients")}
                    style={{ display: "block", marginBottom: "10px", padding: "10px", width: "100%" }}
                >
                    Manage Clients
                </button>
                <button
                    onClick={() => handleNavigation("/admin/tradespeople")}
                    style={{ display: "block", marginBottom: "10px", padding: "10px", width: "100%" }}
                >
                    Manage Tradespersons
                </button>
                <button
                    onClick={() => handleNavigation("/admin/manage-jobs")}
                    style={{ display: "block", marginBottom: "10px", padding: "10px", width: "100%" }}
                >
                    Manage Jobs
                </button>
            </div>
        </div>
    );
};

export default AdminDashboard;
