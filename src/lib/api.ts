import axios from "axios";

// API base URL
const API_URL = "http://localhost:3001/api";

// Configuração do axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para adicionar o token de autenticação
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interface para dados de autenticação
export interface AuthResponse {
  success: boolean;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

// Interfaces para contratos e templates
export interface IContract {
  _id: string;
  title: string;
  description?: string;
  type: string;
  status: "draft" | "pending" | "active" | "expired" | "cancelled";
  parties: IParty[];
  clauses: IClause[];
  value?: number;
  startDate?: string;
  endDate?: string;
  createdBy: string;
  content?: string;
  blockchainHash?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IParty {
  name: string;
  email: string;
  documentType: "cpf" | "cnpj";
  documentNumber: string;
  signed: boolean;
  signedAt?: string;
}

export interface IClause {
  title: string;
  content: string;
  order: number;
}

export interface IContractTemplate {
  _id: string;
  title: string;
  description: string;
  type: string;
  category: string;
  clauses: IClause[];
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IContractStats {
  total: number;
  upcomingExpiration: number;
  byStatus: { _id: string; count: number }[];
  byType: { _id: string; count: number }[];
}

// Funções de autenticação
export const auth = {
  register: async (
    name: string,
    email: string,
    password: string
  ): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/register", {
      name,
      email,
      password,
    });
    return response.data;
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/login", {
      email,
      password,
    });
    return response.data;
  },

  me: async (): Promise<AuthResponse> => {
    const response = await api.get<AuthResponse>("/auth/me");
    return response.data;
  },
};

// Funções para contratos
export const contracts = {
  getAll: async (): Promise<IContract[]> => {
    const response = await api.get<{ success: boolean; data: IContract[] }>(
      "/contracts"
    );
    return response.data.data;
  },

  getById: async (id: string): Promise<IContract> => {
    const response = await api.get<{ success: boolean; data: IContract }>(
      `/contracts/${id}`
    );
    return response.data.data;
  },

  create: async (contract: Partial<IContract>): Promise<IContract> => {
    const response = await api.post<{ success: boolean; data: IContract }>(
      "/contracts",
      contract
    );
    return response.data.data;
  },

  update: async (
    id: string,
    contract: Partial<IContract>
  ): Promise<IContract> => {
    const response = await api.put<{ success: boolean; data: IContract }>(
      `/contracts/${id}`,
      contract
    );
    return response.data.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/contracts/${id}`);
  },

  sign: async (id: string, email: string): Promise<IContract> => {
    const response = await api.put<{ success: boolean; data: IContract }>(
      `/contracts/${id}/sign`,
      { email }
    );
    return response.data.data;
  },

  getStats: async (): Promise<IContractStats> => {
    const response = await api.get<{ success: boolean; data: IContractStats }>(
      "/contracts/stats"
    );
    return response.data.data;
  },
};

// Funções para templates
export const templates = {
  getAll: async (): Promise<IContractTemplate[]> => {
    const response = await api.get<{
      success: boolean;
      data: IContractTemplate[];
    }>("/templates");
    return response.data.data;
  },

  getById: async (id: string): Promise<IContractTemplate> => {
    const response = await api.get<{
      success: boolean;
      data: IContractTemplate;
    }>(`/templates/${id}`);
    return response.data.data;
  },

  getMetadata: async (): Promise<{ categories: string[]; types: string[] }> => {
    const response = await api.get<{
      success: boolean;
      data: { categories: string[]; types: string[] };
    }>("/templates/metadata");
    return response.data.data;
  },
};

export default api;
