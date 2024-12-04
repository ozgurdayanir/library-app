import React, { useState, useEffect } from "react";
import Modal from "../../modals";
import borrowsService from "../../services/borrowsService";
import BorrowForm from "./BorrowForm";
import booksService from "../../services/booksService";
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
    borrowsService
      .getBorrows()
      .then((data) => setBorrows(data))
      .catch((error) => {
        console.error("Error fetching borrows:", error);
        toast.error("Error fetching borrows");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Fetch books
  useEffect(() => {
    booksService
      .getBooks()
      .then((data) => setBooks(data))
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  }, []);

  const handleBorrowAdded = (newBorrow) => {
    setBorrows((prev) => [...prev, newBorrow]); // Yeni yazarı listeye ekle
  };

  const handleDeleteBorrow = (id) => {
    borrowsService
      .deleteBorrow(id)
      .then(() => {
        setBorrows((prev) => prev.filter((borrow) => borrow.id !== id));
        toast.success("Borrow deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting borrow:", error);
        toast.error("Error deleting borrow");
      });
  };

  const handleEditBorrow = (id) => {
    const borrowToEdit = borrows.find((borrow) => borrow.id === id);
    setSelectedBorrow(borrowToEdit);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleBorrowUpdated = (updatedBorrow) => {
    if (!updatedBorrow || !updatedBorrow.id) {
      console.error('Updated borrow is invalid:', updatedBorrow);
      return;
    }
    setBorrows((prevBorrows) =>
      prevBorrows.map((borrow) =>
        borrow.id === updatedBorrow.id ? updatedBorrow : borrow
      )
    );
  };
  const  showSuccessToast = (message) => {
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