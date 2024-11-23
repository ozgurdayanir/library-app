import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../../modal"
import BookForm from "./BookForm";
import { toast } from 'react-toastify';


function Books() {
  const [books, setBooks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [categories, setCategories] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch books
  useEffect(() => {
    axios
      .get('http://right-zorana-mephisto-0553475f.koyeb.app/api/v1/books')
      .then((response) => {
        console.log("Fetched books:", response.data);
        setBooks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  }, []);

  // fetch categories
  useEffect(() => {
    axios
      .get('http://right-zorana-mephisto-0553475f.koyeb.app/api/v1/categories')
      .then((response) => {
        console.log("Fetched categories:", response.data);
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  // fetch publishers
  useEffect(() => {
    axios
      .get('https://right-zorana-mephisto-0553475f.koyeb.app/api/v1/publishers')
      .then((response) => {
        console.log("Fetched publishers:", response.data);
        setPublishers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching publishers:", error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false
      });;
  }, []);

  // fetch authors
  useEffect(() => {
    axios
      .get('https://right-zorana-mephisto-0553475f.koyeb.app/api/v1/authors')
      .then((response) => {
        console.log("Fetched authors:", response.data);
        setAuthors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching authors:", error);
      });
  }, []);

  const handleBookAdded = (newBook) => {
    setBooks((prev) => [...prev, newBook]); // add a new book
  };

  const handleDeleteBook = (id) => {
    axios
      .delete(`https://right-zorana-mephisto-0553475f.koyeb.app/api/v1/books/${id}`)
      .then(() => {
        setBooks((prev) => prev.filter((book) => book.id !== id));
        toast.success('Book deleted successfully');
      })
      .catch((error) => {
        console.error("Error deleting book:", error);
        toast.error('Error deleting book');
      });
  }

  const handleEditBook = (id) => {
    const bookToEdit = books.find((book) => book.id === id);
    setSelectedBook(bookToEdit);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleBookUpdated = (updatedBook) => {
    setBooks((prev) =>
      prev.map((book) =>
        book.id === updatedBook.id ? updatedBook : book
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
          setSelectedBook(null);
        }}
        >
          Add Book</button>
      </div>
      <div className="content">
        {books.length === 0 ? (
          <p>No books found. Click "Add Book" to create a new entry.</p>
        ) : (
          <table className="authors-table">
            <thead>
              <tr className="table-header">
                <th>ID</th>
                <th>Name</th>
                <th>Publication Year</th>
                <th>Stock</th>
                <th>Author</th>
                <th>Publisher</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id} className="content-item">
                  <td>{book.id}</td>
                  <td>{book.name}</td>
                  <td>{book.publicationYear}</td>
                  <td>{book.stock}</td>
                  <td>{book.author?.name || "No Author"}</td>
                  <td>{book.publisher?.name || "No Publisher"}</td>
                  <td>
                    {book.categories?.length > 0
                      ? book.categories.map((category) => (
                        <span key={category.id}>{category.name}</span>
                      ))
                      : "No Categories"}
                  </td>
                  <td className="btn-group">
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleEditBook(book.id)}
                    >
                      <span className="material-symbols-outlined edit-icon">
                        edit
                      </span>
                      Edit
                    </button>
                    <button
                      id="delete-btn"
                      onClick={() => handleDeleteBook(book.id)}
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
        title={isEditing ? "Edit Book" : "Add New Book"}
      >
        <BookForm 
        onClose={() => setIsModalOpen(false)} 
        onBookAdded={handleBookAdded} 
        isEditing={!!selectedBook} 
        book={selectedBook} 
        onBookUpdated={handleBookUpdated} 
        categoriesData={categories} 
        publishersData={publishers} 
        authorsData={authors}
        showSuccessToast={showSuccessToast}
        />
      </Modal>
    </>
  );
}

export default Books;
