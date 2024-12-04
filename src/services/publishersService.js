import api from './api';

const getPublishers = async () => {
  const response = await api.get('/publishers');
  return response.data;
};

const getPublisherById = async (id) => {
  const response = await api.get(`/publishers/${id}`);
  return response.data;
};

const createPublisher = async (publisherData) => {
  const response = await api.post('/publishers', publisherData);
  return response;
};

const updatePublisher = async (id, updatedData) => {
  const response = await api.put(`/publishers/${id}`, updatedData);
  return response;
};

const deletePublisher = async (id) => {
  await api.delete(`/publishers/${id}`);
};

export default {
  getPublishers,
  getPublisherById,
  createPublisher,
  updatePublisher,
  deletePublisher,
};
