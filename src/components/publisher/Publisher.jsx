import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../../modal";
import PublisherForm from "./PublisherForm";
import { toast } from 'react-toastify';

function Publishers() {
  const [publishers, setPublishers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPublisher, setSelectedPublisher] = useState(null);
  const [loading, setLoading] = useState(true);

  const showSuccessToast = (message) => {
    toast.success(message);
  }

  useEffect(() => {
    axios
      .get('https://right-zorana-mephisto-0553475f.koyeb.app/api/v1/publishers')
      .then((response) => {
        setPublishers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching publishers:", error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false
      });
  }, []);

  const handlePublisherAdded = (newPublisher) => {
    setPublishers((prev) => [...prev, newPublisher]); // Yeni yazarı listeye ekle
  };

  const handleDeletePublisher = (id) => {
    axios
      .delete(`https://right-zorana-mephisto-0553475f.koyeb.app/api/v1/publishers/${id}`)
      .then(() => {
        setPublishers((prev) => prev.filter((publisher) => publisher.id !== id));
        showSuccessToast("Publisher deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting publisher:", error);
        toast.error('Error deleting publisher');
      });
  }

  const handleEditPublisher = (id) => {
    const publisherToEdit = publishers.find((publisher) => publisher.id === id);
    setSelectedPublisher(publisherToEdit);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handlePublisherUpdated = (updatedPublisher) => {
    setPublishers((prev) =>
      prev.map((publisher) =>
        publisher.id === updatedPublisher.id ? updatedPublisher : publisher
      )
    );
  };


  return (
    <>
    {loading && <p>Loading...</p>}
      <div className="toolbar">
        <button id="add-btn" onClick={() => {
          setIsEditing(false);
          setIsModalOpen(true);
          setSelectedPublisher(null);
        }}
        >
          Add Publisher</button>
      </div>
      <div className="content">
        {publishers.length === 0 ? (
          <p>No publishers found. Click "Add Publisher" to create a new entry.</p>
        ) : (
          <table className="authors-table">
            <thead>
              <tr className="table-header">
                <th>ID</th>
                <th>Name</th>
                <th>Establishment Year</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {publishers.map((publisher) => (
                <tr key={publisher.id} className="content-item">
                  <td>{publisher.id}</td>
                  <td>{publisher.name}</td>
                  <td>{publisher.establishmentYear}</td>
                  <td>{publisher.address}</td>
                  <td className="btn-group">
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleEditPublisher(publisher.id)}
                    >
                      <span className="material-symbols-outlined edit-icon">
                        edit
                      </span>
                      Edit
                    </button>
                    <button
                      id="delete-btn"
                      onClick={() => handleDeletePublisher(publisher.id)}
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
        title={isEditing ? "Edit Publisher" : "Add New Publisher"}
      >
        <PublisherForm 
        onClose={() => setIsModalOpen(false)} 
        onPublisherAdded={handlePublisherAdded} 
        isEditing={!!selectedPublisher} 
        publisher={selectedPublisher} 
        onPublisherUpdated={handlePublisherUpdated} 
        showSuccessToast={showSuccessToast}
        />
      </Modal>
    </>
  );
}

export default Publishers;
