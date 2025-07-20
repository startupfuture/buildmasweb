import axios from 'axios';


const API_URL = 'http://localhost:3001/api/clients';

const getAuthHeaders = async () => {
  return { headers: { Authorization: `Bearer mock-token` } };
};

export const getClients = async () => axios.get(API_URL, await getAuthHeaders());
export const getClient = async (id: number) => axios.get(`${API_URL}/${id}`, await getAuthHeaders());
export const createClient = async (client: { name: string }) => axios.post(API_URL, client, await getAuthHeaders());
export const updateClient = async (id: number, client: { name: string }) => axios.put(`${API_URL}/${id}`, client, await getAuthHeaders());
export const deleteClient = async (id: number) => axios.delete(`${API_URL}/${id}`, await getAuthHeaders());
