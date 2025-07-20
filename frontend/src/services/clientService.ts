import axios from 'axios';
import { auth } from '../firebase';

const API_URL = 'http://localhost:3001/api/clients';

const getAuthHeaders = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");
  const token = await user.getIdToken();
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const getClients = async () => axios.get(API_URL, await getAuthHeaders());
export const getClient = async (id: number) => axios.get(`${API_URL}/${id}`, await getAuthHeaders());
export const createClient = async (client: { name: string }) => axios.post(API_URL, client, await getAuthHeaders());
export const updateClient = async (id: number, client: { name: string }) => axios.put(`${API_URL}/${id}`, client, await getAuthHeaders());
export const deleteClient = async (id: number) => axios.delete(`${API_URL}/${id}`, await getAuthHeaders());
