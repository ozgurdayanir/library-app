import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import publishersService from "../../services/publishersService";

function PublisherForm({ onClose, onPublisherAdded, onPublisherUpdated, isEditing, publisher, showSuccessToast }) {
    const [formData, setFormData] = useState({
        id: 0,
        name: "string",
        establishmentYear: 0,
        address: "string"
    });
    const [error, setError] = useState("");


    // Set selected publisher in the form
    useEffect(() => {
        if (isEditing && publisher) {
            setFormData({
                id: publisher.id || 0,
                name: publisher.name || "",
                establishmentYear: publisher.establishmentYear || "",
                address: publisher.address || "",
            });
        } else {
            setFormData({
                id: 0,
                name: "",
                establishmentYear: "",
                address: "",
            });
        }
        setError("")
    }, [isEditing, publisher]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEditing) {
            // Update publisher
            publishersService
                .updatePublisher(publisher.id, formData)
                .then((response) => {
                    console.log("Publisher updated:", response.data);
                    onPublisherUpdated(response.data);
                    showSuccessToast("Publisher updated successfully");
                    onClose();
                })
                .catch((error) => {
                    console.error("Error updating publisher:", error);
                    toast.error("Error updating publisher");
                });
        } else {
            // Ekleme işlemi
            publishersService
                .createPublisher(formData)
                .then((response) => {
                    onPublisherAdded(response.data);
                    showSuccessToast("Publisher added successfully");
                    onClose();
                })
                .catch((error) => {
                    console.error("Error adding publisher:", error);
                    toast.error("Error adding publisher");
                });
        }
    };

    return (
        <form className="edit-form" onSubmit={handleSubmit}>
            {/* {error && <p className="error-message">{error}</p>} */}
            <div>
                <label>Publisher Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <label>Establishment Year:</label>
            <input
                type="number"
                name="establishmentYear"
                value={formData.establishmentYear}
                onChange={handleChange}
                required
            />
            <label>Address:</label>
            <textarea
                type="string"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
            />
            <div className="form-actions">
                <button className="btn btn-secondary" type="button" onClick={onClose}>
                    Close
                </button>
                <button className="btn btn-primary" type="submit">{isEditing ? "Save" : "Add"}</button>
            </div>
        </form>
    );
}

export default PublisherForm;
