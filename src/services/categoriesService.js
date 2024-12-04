import api from './api';

const getCategories = async () => {
  const response = await api.get('/categories');
  return response;
};

const getCategoryById = async (id) => {
  const response = await api.get(`/categories/${id}`);
  return response.data;
};

const createCategory = async (categoryData) => {
  const response = await api.post('/categories', categoryData);
  return response;
};

const updateCategory = async (id, updatedData) => {
  const response = await api.put(`/categories/${id}`, updatedData);
  return response;
};

const deleteCategory = async (id) => {
  await api.delete(`/categories/${id}`);
};

export default {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
