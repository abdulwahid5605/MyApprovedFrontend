import React, { useEffect, useState } from "react";
import "./manageTradeperson.css"; // Import the CSS file
import { toast } from "react-toastify"
import { BACKENDURL } from "../config";

const ManageTradespersons = () => {
    const [tradespersons, setTradespersons] = useState([]);
    const [editFormData, setEditFormData] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchTradespersons();
    }, []);

    const fetchTradespersons = async () => {
        try {
            const response = await fetch(`${BACKENDURL}/api/admin/tradespeople`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
                },
            });
            const data = await response.json();
            setTradespersons(data);
        } catch (error) {
            console.error("Error fetching tradespersons:", error);
        }
    };

    const handleEdit = (person) => {
        setEditFormData(person);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this tradesperson?")) return;

        try {
            const response = await fetch(`${BACKENDURL}/api/admin/tradespeople/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
                },
            });

            if (response.ok) {
                setTradespersons(tradespersons.filter((person) => person._id !== id));
                toast.success("Tradesperson deleted successfully!");
            } else {
                toast.error("Failed to delete tradesperson.");
            }
        } catch (error) {
            console.error("Error deleting tradesperson:", error);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!editFormData) return;

        try {
            const response = await fetch(`${BACKENDURL}/api/admin/tradespeople/${editFormData._id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editFormData),
            });

            if (response.ok) {
                fetchTradespersons();
                setEditFormData(null);
                setShowModal(false);
                toast.success("Tradesperson updated successfully!");
            } else {
                toast.error("Failed to update tradesperson.");
            }
        } catch (error) {
            console.error("Error updating tradesperson:", error);
        }
    };

    return (
        <div className="manage-tradespersons-container">
            <h1>Manage Tradespersons</h1>
            <div className="tradespersons-grid">
                {tradespersons.map((person) => (
                    <div className="tradesperson-card" key={person._id}>
                        <h2>{person.name}</h2>
                        <p><strong>Email:</strong> {person.email}</p>
                        <p><strong>Business Name:</strong> {person.businessName}</p>
                        <p><strong>Contact Number:</strong> {person.contactNumber}</p>
                        <p><strong>Trade:</strong> {person.trade}</p>
                        <p>
                            <strong>Address:</strong> {person.address?.street}, {person.address?.city}, {person.address?.postcode}
                        </p>
                        <p><strong>Joined:</strong> {new Date(person.createdAt).toLocaleDateString()}</p>
                        <div className="button-group">
                            <button className="edit-button" onClick={() => handleEdit(person)}>Edit</button>
                            <button className="delete-button" onClick={() => handleDelete(person._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && editFormData && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Edit Tradesperson</h2>
                        <form onSubmit={handleSave}>
                            <input
                                type="text"
                                placeholder="Name"
                                value={editFormData.name || ""}
                                onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                                required
                                className="input-field"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={editFormData.email || ""}
                                onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                                required
                                className="input-field"
                            />
                            <input
                                type="text"
                                placeholder="Business Name"
                                value={editFormData.businessName || ""}
                                onChange={(e) => setEditFormData({ ...editFormData, businessName: e.target.value })}
                                required
                                className="input-field"
                            />
                            <input
                                type="text"
                                placeholder="Contact Number"
                                value={editFormData.contactNumber || ""}
                                onChange={(e) => setEditFormData({ ...editFormData, contactNumber: e.target.value })}
                                required
                                className="input-field"
                            />
                            <input
                                type="text"
                                placeholder="Trade"
                                value={editFormData.trade || ""}
                                onChange={(e) => setEditFormData({ ...editFormData, trade: e.target.value })}
                                required
                                className="input-field"
                            />
                            <input
                                type="text"
                                placeholder="Street"
                                value={editFormData.address?.street || ""}
                                onChange={(e) =>
                                    setEditFormData({
                                        ...editFormData,
                                        address: { ...editFormData.address, street: e.target.value },
                                    })
                                }
                                required
                                className="input-field"
                            />
                            <input
                                type="text"
                                placeholder="City"
                                value={editFormData.address?.city || ""}
                                onChange={(e) =>
                                    setEditFormData({
                                        ...editFormData,
                                        address: { ...editFormData.address, city: e.target.value },
                                    })
                                }
                                required
                                className="input-field"
                            />
                            <input
                                type="text"
                                placeholder="Postcode"
                                value={editFormData.address?.postcode || ""}
                                onChange={(e) =>
                                    setEditFormData({
                                        ...editFormData,
                                        address: { ...editFormData.address, postcode: e.target.value },
                                    })
                                }
                                required
                                className="input-field"
                            />
                            <input
                                type="password"
                                placeholder="Password (leave blank to keep current password)"
                                onChange={(e) => setEditFormData({ ...editFormData, password: e.target.value })}
                                className="input-field"
                            />
                            <div className="button-group">
                                <button type="submit" className="save-button">Save</button>
                                <button type="button" className="cancel-button" onClick={() => setShowModal(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageTradespersons;
