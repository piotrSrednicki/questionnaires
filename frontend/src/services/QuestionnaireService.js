import axios from 'axios';

const API_BASE = 'http://localhost:8000/api/questionnaire';

export default {
  get: (id) => axios.get(`${API_BASE}/${id}/`),
  list: () => axios.get(`${API_BASE}/`),
  create: (data) => axios.post(`${API_BASE}/`, data),
  update: (id, data) => axios.put(`${API_BASE}/${id}/`, data),
  delete: (id) => axios.delete(`${API_BASE}/${id}/`),
  getRandomColour: () => axios.get(`${API_BASE}/random-colour/`),
};
