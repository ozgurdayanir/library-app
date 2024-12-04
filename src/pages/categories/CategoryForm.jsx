import React, { useState, useEffect } from "react";
import categoriesService from "../../services/categoriesService";
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
        if (isEditing) {
            // Update category
            categoriesService
                .updateCategory(category.id, formData)
                .then((response) => {
                    onCategoryUpdated(response.data);
                    showSuccessToast("Category updated successfully");
                    onClose();
                })
        } else {
            // Add new category
            categoriesService
                .createCategory(formData)
                .then((response) => {
                    onCategoryAdded(response.data);
                    showSuccessToast("Category added successfully");
                    onClose();
                })
                .catch((error) => {
                    console.error("Error adding category:", error);
                    toast.error("Error adding category");
            })
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
