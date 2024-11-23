import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function AuthorForm({ onClose, onAuthorAdded, onAuthorUpdated, isEditing, author, showSuccessToast }) {
    const [formData, setFormData] = useState({
        name: "",
        birthDate: "",
        country: "",
    });

    // Seçili yazarı form alanlarına yükle
    useEffect(() => {
        if (isEditing && author) {
            setFormData({
                name: author.name || "",
                birthDate: author.birthDate || "",
                country: author.country || "",
            });
        } else {
            setFormData({
                name: "",
                birthDate: "",
                country: "",
            });
        }
    }, [isEditing, author]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEditing) {
            // Update author
            try {
                const response = await axios.put(
                    `https://right-zorana-mephisto-0553475f.koyeb.app/api/v1/authors/${author.id}`,
                    formData
                );
                onAuthorUpdated(response.data);
                showSuccessToast("Author updated successfully");
                onClose();
            } catch (error) {
                console.error("Error updating author:", error);
                toast.error("Error updating author");
            }
        } else {
            // Ekleme işlemi
            try {
                const response = await axios.post(
                    "https://right-zorana-mephisto-0553475f.koyeb.app/api/v1/authors",
                    formData
                );
                onAuthorAdded(response.data);
                showSuccessToast("Author added successfully");
                onClose();
            } catch (error) {
                console.error("Error adding author:", error);
                toast.error("Error adding author");
            }
        }
    };

    return (
        <form className="edit-form" onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Birth Date:</label>
                <input
                    type="date"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Country:</label>
                <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-actions">
                <button className="btn btn-secondary" type="button" onClick={onClose}>
                    Close
                </button>
                <button className="btn btn-primary" type="submit">{isEditing ? "Save" : "Add"}</button>
            </div>
        </form>
    );
}

export default AuthorForm;
