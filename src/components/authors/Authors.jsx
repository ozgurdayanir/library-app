import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../../modal/modal";
import AuthorForm from "../authors/AuthorForm";
import { toast } from 'react-toastify';

function Authors() {
  const [authors, setAuthors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://right-zorana-mephisto-0553475f.koyeb.app/api/v1/authors')
      .then((response) => {
        setAuthors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false
      });
  }, []);

  const handleAuthorAdded = (newAuthor) => {
    setAuthors((prev) => [...prev, newAuthor]); // Yeni yazarı listeye ekle
  };

  const handleDeleteAuthor = (id) => {
    axios
      .delete(`https://right-zorana-mephisto-0553475f.koyeb.app/api/v1/authors/${id}`)
      .then(() => {
        setAuthors((prev) => prev.filter((author) => author.id !== id));
        toast.success('Author deleted successfully');
      })
      .catch((error) => {
        console.error("Error deleting author:", error);
        toast.error('Error deleting author');
      });
  }

  const handleEditAuthor = (id) => {
    const authorToEdit = authors.find((author) => author.id === id);
    setSelectedAuthor(authorToEdit);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleAuthorUpdated = (updatedAuthor) => {
    setAuthors((prev) =>
      prev.map((author) =>
        author.id === updatedAuthor.id ? updatedAuthor : author
      )
    );
  };

  const showSuccessToast = (message) => {
    toast.success(message);
  };

  return (
    <>
    {loading && <p>Loading...</p>}
      <div className="toolbar">
        <button id="add-btn" onClick={() => {
          setIsEditing(false);
          setIsModalOpen(true);
          setSelectedAuthor(null);
        }}
        >
          Add Author</button>
      </div>
      <div className="content">
        {authors.length === 0 ? (
          <p>No authors found. Click "Add Author" to create a new entry.</p>
        ) : (
          <table className="authors-table">
            <thead>
              <tr className="table-header">
                <th>ID</th>
                <th>Name</th>
                <th>Birth Date</th>
                <th>Country</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {authors.map((author) => (
                <tr key={author.id} className="content-item">
                  <td>{author.id}</td>
                  <td>{author.name}</td>
                  <td>{author.birthDate}</td>
                  <td>{author.country}</td>
                  <td className="btn-group">
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleEditAuthor(author.id)}
                    >
                      <span className="material-symbols-outlined edit-icon">
                        edit
                      </span>
                      Edit
                    </button>
                    <button
                      id="delete-btn"
                      onClick={() => handleDeleteAuthor(author.id)}
                    >
                      <span className="material-symbols-outlined delete-icon">
                        delete
                      </span>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isEditing ? "Edit Author" : "Add New Author"}
      >
        <AuthorForm 
        onClose={() => setIsModalOpen(false)} 
        onAuthorAdded={handleAuthorAdded} 
        isEditing={!!selectedAuthor} 
        author={selectedAuthor} 
        onAuthorUpdated={handleAuthorUpdated} 
        showSuccessToast={showSuccessToast}
        />
      </Modal>
    </>
  );
}

export default Authors;
