import axios from 'axios';


const API_URL = 'http://localhost:3001/api/users';

const getAuthHeaders = async () => {
  return { headers: { Authorization: `Bearer mock-token` } };
};

export const syncUser = async () => {
  return axios.post(`${API_URL}/sync`, {}, await getAuthHeaders());
};
