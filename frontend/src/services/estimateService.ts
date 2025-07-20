import axios from 'axios';


const API_URL = 'http://localhost:3001/api/estimates';

const getAuthHeaders = async () => {
  return { headers: { Authorization: `Bearer mock-token` } };
};

// Define the structure of an Estimate for type safety
export interface Material {
  id: number;
  name: string;
  quantity: number;
  unitPrice: number;
  estimateId: number;
}

export interface Estimate {
  id: number;
  title: string;
  description?: string;
  laborCost?: number;
  materialsTotal?: number;
  totalCost?: number;
  status: 'initiated' | 'in progress' | 'completed';
  clientId: number;
  createdAt: string;
  materials: Material[];
}

// The data required to create a new estimate
export interface CreateEstimateData {
  title: string;
  description?: string;
  laborCost?: number;
  materialsTotal?: number;
  totalCost?: number;
  status?: 'initiated' | 'in progress' | 'completed';
  clientId: number;
}

// The data required to update an estimate
export interface UpdateEstimateData extends Partial<CreateEstimateData> {}

export const getEstimates = async () => axios.get<Estimate[]>(API_URL, await getAuthHeaders());
export const getEstimate = async (id: number) => axios.get<Estimate>(`${API_URL}/${id}`, await getAuthHeaders());
export const createEstimate = async (estimate: CreateEstimateData) => axios.post<Estimate>(API_URL, estimate, await getAuthHeaders());
export const updateEstimate = async (id: number, estimate: UpdateEstimateData) => axios.put<Estimate>(`${API_URL}/${id}`, estimate, await getAuthHeaders());
export const deleteEstimate = async (id: number) => axios.delete(`${API_URL}/${id}`, await getAuthHeaders());
