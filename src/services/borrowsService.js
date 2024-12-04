import api from './api';

const getBorrows = async () => {
  const response = await api.get('/borrows');
  return response.data;
};

const getBorrowById = async (id) => {
  const response = await api.get(`/borrows/${id}`);
  return response.data;
};

const createBorrow = async (borrowData) => {
  const response = await api.post('/borrows', borrowData);
  return response;
};

const updateBorrow = async (id, updatedData) => {
  const response = await api.put(`/borrows/${id}`, updatedData);
  return response;
};

const deleteBorrow = async (id) => {
  await api.delete(`/borrows/${id}`);
};

export default {
  getBorrows,
  getBorrowById,
  createBorrow,
  updateBorrow,
  deleteBorrow,
};
