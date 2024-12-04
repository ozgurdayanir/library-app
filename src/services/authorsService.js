import api from './api';

const getAuthors = async () => {
  const response = await api.get('/authors');
  return response.data;
};

const getAuthorById = async (id) => {
  const response = await api.get(`/authors/${id}`);
  return response.data;
};

const createAuthor = async (authorData) => {
  const response = await api.post('/authors', authorData);
  return response;
};

const updateAuthor = async (id, updatedData) => {
  const response = await api.put(`/authors/${id}`, updatedData);
  return response;
};

const deleteAuthor = async (id) => {
  await api.delete(`/authors/${id}`);
};

export default {
  getAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};
