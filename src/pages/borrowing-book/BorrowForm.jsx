import React, { useState, useEffect } from 'react';
import borrowsService from '../../services/borrowsService';
import { toast } from 'react-toastify';

const BorrowForm = ({
  onClose,
  onBorrowAdded,
  onBorrowUpdated,
  isEditing,
  borrow,
  booksData,
  showSuccessToast,
  selectedBorrow
}) => {
  const [formData, setFormData] = useState({
    borrowerName: "",
    borrowerMail: "",
    borrowingDate: "",
    returnDate: "",
    bookForBorrowingRequest: {
      id: 0,
      name: "",
      publicationYear: 0,
      stock: 0
    }
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading State

  useEffect(() => {
    console.log("Current borrow data:", selectedBorrow);
    if (isEditing && selectedBorrow) {
      setFormData({
        borrowerName: selectedBorrow.borrowerName || "",
        borrowerMail: selectedBorrow.borrowerMail || "",
        borrowingDate: selectedBorrow.borrowingDate || "",
        returnDate: selectedBorrow.returnDate || "",
        bookForBorrowingRequest: selectedBorrow.book
          ? {
            id: selectedBorrow.book.id || 0,
            name: selectedBorrow.book.name || "",
            publicationYear: selectedBorrow.book.publicationYear || 0,
            stock: selectedBorrow.book.stock || 0,
          }
          : { id: 0, name: "", publicationYear: 0, stock: 0 },
      });
    } else {
      setFormData({
        borrowerName: "",
        borrowerMail: "",
        borrowingDate: "",
        returnDate: "",
        bookForBorrowingRequest: { id: 0, name: "", publicationYear: 0, stock: 0 },
      });
    }
    setError("");
  }, [isEditing, borrow]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('bookForBorrowingRequest.')) {
      const key = name.split('.')[1];
      setFormData(prevState => ({
        ...prevState,
        bookForBorrowingRequest: {
          ...prevState.bookForBorrowingRequest,
          [key]: key === 'id' ? parseInt(value, 10) : value
        }
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleBookSelect = (e) => {
    const selectedBookId = parseInt(e.target.value, 10);
    const selectedBook = booksData.find(book => book.id === selectedBookId);
    if (selectedBook) {
      setFormData(prevState => ({
        ...prevState,
        bookForBorrowingRequest: selectedBook
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        bookForBorrowingRequest: {
          id: 0,
          name: "",
          publicationYear: 0,
          stock: 0
        }
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true
    const data = {
      borrowerName: formData.borrowerName,
      borrowerMail: formData.borrowerMail,
      borrowingDate: formData.borrowingDate,
      returnDate: formData.returnDate,
      bookForBorrowingRequest: formData.bookForBorrowingRequest
    };

    if (isEditing) {
      borrowsService
        .updateBorrow(selectedBorrow.id, data)
        .then((response) => {
          console.log('Full response from updateBorrow:', response); // Log the full response
          if (!response.data) {
            throw new Error('Response data is undefined.');
          }
          onBorrowUpdated(response.data);
          showSuccessToast('Borrow updated successfully');
          onClose();
        })
        .catch((error) => {
          console.error('Error updating borrow:', error);
          setError('An error occurred while updating the borrow.');
          toast.error('An error occurred while updating the borrow.');
        })
        .finally(() => {
          setLoading(false); // Set loading to false
        });

    } else {
      borrowsService
        .createBorrow(data)
        .then((response) => {
          console.log('Borrow added:', response.data);
          onBorrowAdded(response.data);
          showSuccessToast('Borrow added successfully');
          onClose();
        })
        .catch((error) => {
          console.error('Error adding borrow:', error);
          setError('An error occurred while adding the borrow.');
          toast.error('An error occurred while adding the borrow.');
        })
        .finally(() => {
          setLoading(false); // Set loading to false
        });
    }
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form className="edit-form" onSubmit={handleSubmit}>
          <div className="form-item">
            <label>Borrower Name:</label>
            <input
              type="text"
              name="borrowerName"
              value={formData.borrowerName}
              onChange={handleChange}
              required
            />
          </div>
          {/* Render Borrower Mail only if not editing */}
          {!isEditing && (
            <div className="form-item">
              <label>Borrower Mail:</label>
              <input
                type="email"
                name="borrowerMail"
                value={formData.borrowerMail}
                onChange={handleChange}
                required
              />
            </div>
          )}
          <div className="form-item">
            <label>Borrowing Date:</label>
            <input
              type="date"
              name="borrowingDate"
              value={formData.borrowingDate}
              onChange={handleChange}
            />
          </div>
          {/* Render Return Date only if editing */}
          {isEditing && (
            <div className="form-item">
              <label>Return Date:</label>
              <input
                type="date"
                name="returnDate"
                value={formData.returnDate}
                onChange={handleChange}
              />
            </div>
          )}
          {/* Render Book selection only if not editing */}
          {!isEditing && (
            <div className="form-item">
              <label>Book:</label>
              <select className='dropdown'
                name="bookForBorrowingRequest.id"
                value={formData.bookForBorrowingRequest.id.toString()}
                onChange={handleBookSelect}
                required
              >
                <option value="">Select a book</option>
                {booksData.map(book => (
                  <option key={book.id} value={book.id}>
                    {book.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="form-actions">
            <button className="btn btn-secondary" type="button" onClick={onClose}>
              Close
            </button>
            <button className="btn btn-primary" type="submit">
              {isEditing ? "Save" : "Add"}
            </button>
          </div>
          {error && <p className="error">{error}</p>}
        </form>
      )}
    </>
  );
};

export default BorrowForm;