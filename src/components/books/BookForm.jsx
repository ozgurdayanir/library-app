import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

function BookForm({
    onClose,
    onBookAdded,
    onBookUpdated,
    isEditing,
    book,
    categoriesData,
    publishersData,
    authorsData,
    showSuccessToast
}) {
    const [formData, setFormData] = useState({
        id: 0,
        name: "",
        publicationYear: 0,
        stock: 0,
        author: {
            id: 0,
            name: "string",
            birthDate: "",
            country: "string"
        },
        publisher: {
            id: 0,
            name: "string",
            establishmentYear: 0,
            address: "string"
        },
        categories: {
            id: 0,
            name: "string",
            description: "string"
        }
    });
    const [error, setError] = useState("");

    // Populate form data when editing
    useEffect(() => {
        if (isEditing && book) {
            setFormData({
                id: book.id || 0,
                name: book.name || "",
                publicationYear: book.publicationYear || 0,
                stock: book.stock || 0,
                author: {
                    id: book.author?.id || 0,
                    name: book.author?.name || "",
                    birthDate: book.author?.birthDate || "",
                    country: book.author?.country || ""
                },
                publisher: {
                    id: book.publisher?.id || 0,
                    name: book.publisher?.name || "",
                    establishmentYear: book.publisher?.establishmentYear || 0,
                    address: book.publisher?.address || ""
                },
                categories: book.categories || []
            });
        } else {
            setFormData({
                id: 0,
                name: "",
                publicationYear: 0,
                stock: 0,
                author: {
                    id: 0,
                    name: "string",
                    birthDate: "",
                    country: "string"
                },
                publisher: {
                    id: 0,
                    name: "string",
                    establishmentYear: 0,
                    address: "string"
                },
                categories: {
                    id: 0,
                    name: "string",
                    description: "string"
                }
            });
        }
        setError("");
    }, [isEditing, book]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleAuthorChange = (e, field) => {
        setFormData({
            ...formData,
            author: {
                ...formData.author,
                [field]: e.target.value
            }
        });
    };

    const handlePublisherChange = (e, field) => {
        setFormData({
            ...formData,
            publisher: {
                ...formData.publisher,
                [field]: e.target.value
            }
        });
    };

    // Handle category selection
    const handleCategoryChange = (e) => {
        const selectedCategoryIds = Array.from(e.target.selectedOptions, option => parseInt(option.value));
        const selectedCategories = categoriesData.filter(category => selectedCategoryIds.includes(category.id));
        setFormData({
            ...formData,
            categories: selectedCategories
        });
    };
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Convert stock to number
        const stockValue = parseInt(formData.stock, 10);
    
        // If stock is zero, show an error
        if (stockValue === 0) {
            setError("Stock cannot be zero.");
            return; 
        }
    
        if (isEditing) {
            // Update book
            try {
                const response = await axios.put(
                    `https://right-zorana-mephisto-0553475f.koyeb.app/api/v1/books/${book.id}`,
                    { ...formData, stock: stockValue } // Updated stock
                );
                onBookUpdated(response.data);
                showSuccessToast("Book updated successfully");
                onClose();
            } catch (error) {
                console.error("Error updating book:", error);
                setError("Error updating book");
                toast.error("Error updating book");
            }
        } else {
            // Add new book
            try {
                const response = await axios.post(
                    "https://right-zorana-mephisto-0553475f.koyeb.app/api/v1/books",
                    { ...formData, stock: stockValue } // Güncellenmiş stok
                );
                onBookAdded(response.data);
                showSuccessToast("Book added successfully");
                onClose();
            } catch (error) {
                console.error("Error adding book:", error);
                setError("Error adding book");
                toast.error("Error adding book");
            }
        }
    };
    

    return (
        <form className="edit-form" onSubmit={handleSubmit}>
            {error && <p className="error-message">{error}</p>}
            <div>
                <label>Book Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Publication Year:</label>
                <input
                    type="number"
                    name="publicationYear"
                    value={formData.publicationYear}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Stock:</label>
                <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-item">
                <h4>Author</h4>
                <div className="select-container">
                    <label>Name:</label>
                    <select className="dropdown"
                        type="text"
                        name="name"
                        value={formData.author.id}
                        onChange={(e) => handleAuthorChange(e, "id")}
                        required
                    >
                        <option value="">Select an author</option>
                        {
                            authorsData.map(author => (
                                <option key={author.id} value={author.id}>
                                    {author.name}
                                </option>
                            ))
                        }
                    </select>
                </div>
            </div>
            <div className="form-item">
                <h4>Publisher</h4>
                <div className="select-container">
                    <label>Name:</label>
                    <select className="dropdown"
                        name="name"
                        value={formData.publisher.id}
                        onChange={(e) => handlePublisherChange(e, "id")}
                        required
                    >
                        <option value="">Select a publisher</option>
                        {
                            publishersData.map(publisher => (
                                <option key={publisher.id} value={publisher.id}>
                                    {publisher.name}
                                </option>
                            ))
                        }
                    </select>
                </div>
            </div>
            <div className="form-item">
                <label>Categories:</label>
                <select className="multiple-select"
                    name="categories"
                    value={formData.categories.id}
                    onChange={(e) => handleCategoryChange(e)}
                    multiple={true}
                    required
                >
                    {categoriesData.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
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

export default BookForm;