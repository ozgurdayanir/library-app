import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

function CategoryForm({ onClose, onCategoryAdded, onCategoryUpdated, isEditing, category, showSuccessToast }) {
    const [formData, setFormData] = useState({
        id: 0,
        name: "string",
        description: "string"
    });
    const [error, setError] = useState("");
    

    // Seçili yazarı form alanlarına yükle
    useEffect(() => {
        if (isEditing && category) {
            setFormData({
                id: category.id || 0,
                name: category.name || "",
                description: category.description || "",
            });
        } else {
            setFormData({
                id: 0,
                name: "",
                description: ""
            });
        }
        setError("")
    }, [isEditing, category]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        /*if (
            isEditing &&
            formData.name === publisher.name &&
            formData.establishmentYear === publisher.establishmentYear &&
            formData.address !== publisher.address
        ) {
            setError("You can not just change the address");
            return;
        }*/

        if (isEditing) {
            // Update category
            try {
                const response = await axios.put(
                    `https://right-zorana-mephisto-0553475f.koyeb.app/api/v1/categories/${category.id}`,
                    formData
                );
                onCategoryUpdated(response.data);
                showSuccessToast("Category updated successfully");
                onClose();
            } catch (error) {
                console.error("Error updating category:", error);
                setError("Error updating category");
            }
        } else {
            // Add new category
            try {
                const response = await axios.post(
                    "https://right-zorana-mephisto-0553475f.koyeb.app/api/v1/categories",
                    formData
                );
                onCategoryAdded(response.data);
                showSuccessToast("Category added successfully");
                onClose();
            } catch (error) {
                console.error("Error adding category:", error);
                setError("Error adding category");
                toast.error("Error adding category");
            }
        }
    };

    return (
        <form className="edit-form" onSubmit={handleSubmit}>
            {error && <p className="error-message">{error}</p>}
            <div>
                <label>Category Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
                <label>Description:</label>
                <input
                    type="string"
                    name="description"
                    value={formData.description}
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

export default CategoryForm;
