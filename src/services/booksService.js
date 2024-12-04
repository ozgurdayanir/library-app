import api from './api';

const getBooks = async () => {
  const response = await api.get('/books');
  return response.data;
};

const getBookById = async (id) => {
  const response = await api.get(`/books/${id}`);
  return response.data;
};

const createBook = async (bookData) => {
  const response = await api.post('/books', bookData);
  return response;
};

const updateBook = async (id, updatedData) => {
  const response = await api.put(`/books/${id}`, updatedData);
  return response;
};

const deleteBook = async (id) => {
  await api.delete(`/books/${id}`);
};

export default {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
