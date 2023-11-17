// api.js
import axios from 'axios';

const API_BASE_URL = 'https://stg.dhunjam.in/account/admin/login';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export default api;
