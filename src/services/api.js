import axios from 'axios';

const api = axios.create({
  baseURL: 'https://right-zorana-mephisto-0553475f.koyeb.app/api/v1', // API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
