import React, { useEffect, useState } from "react";
import "./manageClients.css";
import { toast } from "react-toastify"
import { BACKENDURL } from "../config";

const ManageClients = () => {
    const [clients, setClients] = useState([]);
    const [editFormData, setEditFormData] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        try {
            const response = await fetch(`${BACKENDURL}/api/admin/clients`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
                },
            });
            const data = await response.json();
            setClients(data);
        } catch (error) {
            console.error("Error fetching clients:", error);
        }
    };

    const handleEdit = (client) => {
        setEditFormData(client);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this client?")) return;

        try {
            const response = await fetch(`${BACKENDURL}/api/admin/clients/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
                },
            });

            if (response.ok) {
                setClients(clients.filter((client) => client._id !== id));
                toast.success("Client deleted successfully!");
            } else {
                toast.error("Failed to delete client.");
            }
        } catch (error) {
            console.error("Error deleting client:", error);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!editFormData) return;

        try {
            const response = await fetch(`${BACKENDURL}/api/admin/clients/${editFormData._id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editFormData),
            });

            if (response.ok) {
                fetchClients();
                setEditFormData(null);
                setShowModal(false);
                toast.success("Client updated successfully!");
            } else {
                toast.error("Failed to update client.");
            }
        } catch (error) {
            console.error("Error updating client:", error);
        }
    };

    return (
        <div className="manage-clients-container">
            <h1 className="title">Manage Clients</h1>
            <ul className="client-list">
                {clients.map((client) => (
                    <li key={client._id} className="client-card">
                        <p><strong>Name:</strong> {client.name}</p>
                        <p><strong>Email:</strong> {client.email}</p>
                        <p><strong>Phone Number:</strong> {client.phoneNumber}</p>
                        <p>
                            <strong>Address:</strong> {client.address?.street}, {client.address?.city},{" "}
                            {client.address?.postcode}
                        </p>
                        <div className="action-buttons">
                            <button onClick={() => handleEdit(client)} className="edit-btn">Edit</button>
                            <button onClick={() => handleDelete(client._id)} className="delete-btn">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>

            {showModal && editFormData && (
      <div className="modal-overlay">
      <div className="modal-content">
          <h2>Edit Client</h2>
          <form onSubmit={handleSave}>
              <input
                  type="text"
                  placeholder="Name"
                  value={editFormData.name || ""}
                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                  required
              />
              <input
                  type="email"
                  placeholder="Email"
                  value={editFormData.email || ""}
                  onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                  required
              />
              <input
                  type="text"
                  placeholder="Phone Number"
                  value={editFormData.phoneNumber || ""}
                  onChange={(e) => setEditFormData({ ...editFormData, phoneNumber: e.target.value })}
                  required
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
              />
              <input
                  type="password"
                  placeholder="Password (leave blank to keep current password)"
                  onChange={(e) => setEditFormData({ ...editFormData, password: e.target.value })}
              />
              <div className="modal-buttons">
                  <button type="submit" className="save-btn">Save</button>
                  <button type="button" onClick={() => setShowModal(false)} className="cancel-btn">
                      Cancel
                  </button>
              </div>
          </form>
      </div>
  </div>
  

            )}
        </div>
    );
};

export default ManageClients;
