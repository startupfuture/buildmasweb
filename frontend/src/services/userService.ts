import axios from 'axios';
import { auth } from '../firebase';

const API_URL = 'http://localhost:3001/api/users';

const getAuthHeaders = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");
  const token = await user.getIdToken();
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const syncUser = async () => {
  return axios.post(`${API_URL}/sync`, {}, await getAuthHeaders());
};
