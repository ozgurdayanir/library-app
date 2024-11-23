import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../../modal";
import BorrowForm from "./BorrowForm";
import { toast } from 'react-toastify';

function Borrows() {
  const [borrows, setBorrows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedBorrow, setSelectedBorrow] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch borrows
  useEffect(() => {
    axios
      .get('https://right-zorana-mephisto-0553475f.koyeb.app/api/v1/borrows')
      .then((response) => {
        setBorrows(response.data);
      })
      .catch((error) => {
        console.error("Error fetching borrows:", error);
      });
  }, []);

  // Fetch books
  useEffect(() => {
    axios
      .get('https://right-zorana-mephisto-0553475f.koyeb.app/api/v1/books')
      .then((response) => {
        console.log("Fetched books:", response.data);
        setBooks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false
      });
  }, []);

  const handleBorrowAdded = (newBorrow) => {
    setBorrows((prev) => [...prev, newBorrow]); // Yeni yazarı listeye ekle
  };

  const handleDeleteBorrow = (id) => {
    axios
      .delete(`https://right-zorana-mephisto-0553475f.koyeb.app/api/v1/borrows/${id}`)
      .then(() => {
        setBorrows((prev) => prev.filter((borrow) => borrow.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting borrow:", error);
        toast.error('Error deleting borrow');
      });
  };

  const handleEditBorrow = (id) => {
    const borrowToEdit = borrows.find((borrow) => borrow.id === id);
    setSelectedBorrow(borrowToEdit);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleBorrowUpdated = (updatedBorrow) => {
    setBorrows((prev) =>
      prev.map((borrow) =>
        borrow.id === updatedBorrow.id ? updatedBorrow : borrow
      )
    );
  };
  const showSuccessToast = (message) => {
    toast.success(message);
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="toolbar">
            <button
              id="add-btn"
              onClick={() => {
                setIsEditing(false);
                setIsModalOpen(true);
                setSelectedBorrow(null);
              }}
            >
              Add Borrow
            </button>
          </div>
          <div className="content">
            {borrows.length === 0 ? (
              <p>No borrows found. Click "Add Borrow" to create a new entry.</p>
            ) : (
              <table className="authors-table">
                <thead>
                  <tr className="table-header">
                    <th>ID</th>
                    <th>Borrower Name</th>
                    <th>Mail</th>
                    <th>Book</th>
                    <th>Borrowing Date</th>
                    <th>Return Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {borrows.map((borrow) => (
                    <tr key={borrow.id} className="content-item">
                      <td>{borrow.id}</td>
                      <td>{borrow.borrowerName}</td>
                      <td>{borrow.borrowerMail}</td>
                      <td>{borrow.book.name}</td>
                      <td>{borrow.borrowingDate}</td>
                      <td>{borrow.returnDate}</td>
                      <td className="btn-group">
                        <button
                          className="btn btn-secondary"
                          onClick={() => handleEditBorrow(borrow.id)}
                        >
                          <span className="material-symbols-outlined edit-icon">
                            edit
                          </span>
                          Edit
                        </button>
                        <button
                          id="delete-btn"
                          onClick={() => handleDeleteBorrow(borrow.id)}
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
            title={isEditing ? "Edit Borrow" : "Add New Borrow"}
          >
            <BorrowForm
              onClose={() => setIsModalOpen(false)}
              onBorrowAdded={handleBorrowAdded}
              onBorrowUpdated={handleBorrowUpdated}
              booksData={books}
              showSuccessToast={showSuccessToast}
              isEditing={isEditing}
              selectedBorrow={selectedBorrow}
            />
          </Modal>
        </>
      )}
    </>
  );
}

export default Borrows;