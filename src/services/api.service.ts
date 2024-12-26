import axios, { AxiosInstance } from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from './config';
import { CreatePawnerDto } from '../types/pawn.types';

interface PaymentData {
  loanerId: number;
  scheduleId?: number;
  amount: number;
  paymentDate: string;
}

interface AddMoreLoanData {
  loanerId: number;
  amount: number;
  interestRate: number;
  duration: number;
  startDate: string;
  currency: string;
}

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    // Add request interceptor
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add response interceptor
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Handle unauthorized access
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth methods
  async login(phone: string, password: string) {
    const response = await this.api.post(API_ENDPOINTS.LOGIN, { phone, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  }

  // Loaners methods
  async getLoaners() {
    const response = await this.api.get(API_ENDPOINTS.LOANERS);
    return response.data;
  }

  async addLoaner(loanerData: any) {
    const response = await this.api.post(API_ENDPOINTS.LOANERS, loanerData);
    return response.data;
  }

  async updateLoaner(id: number, loanerData: any) {
    const response = await this.api.patch(
      `${API_ENDPOINTS.LOANERS}/${id}`,
      loanerData
    );
    return response.data;
  }

  async deleteLoaner(id: number) {
    const response = await this.api.delete(`/loaners/${id}`);
    return response.data;
  }

  // Pawners methods
  async getPawners() {
    const response = await this.api.get('/pawners');
    return response.data;
  }

  async addPawner(pawnerData: any) {
    const response = await this.api.post('/pawners', pawnerData);
    return response.data;
  }

  async updatePawner(id: number, pawnerData: any) {
    const response = await this.api.put(`/pawners/${id}`, pawnerData);
    return response.data;
  }

  async deletePawner(id: number) {
    const response = await this.api.delete(`/pawners/${id}`);
    return response.data;
  }

  // Reports methods
  async getReports() {
    const response = await this.api.get('/reports');
    return response.data;
  }

  async getDuePayments(date: string) {
    const response = await this.api.get(API_ENDPOINTS.DUE_PAYMENTS, {
      params: { date }
    });
    return response.data;
  }

  async recordPayment(loanerId: number, scheduleId: number) {
    const response = await this.api.get(
      `${API_ENDPOINTS.LOANERS}/${loanerId}/schedules/${scheduleId}/pay`
    );
    return response.data;
  }

  async getLoanerSchedules(loanerId: number) {
    try {
      const response = await this.api.get(
        `${API_ENDPOINTS.LOANERS}/${loanerId}/schedules`,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
      );
      
      // If no data, return empty array
      if (!response.data) return [];
      
      // If data exists, return it
      return response.data;
    } catch (error) {
      console.error('Error fetching schedules:', error);
      return [];
    }
  }

  async getPaymentSummary(loanerId: number) {
    try {
      const response = await this.api.get(
        `${API_ENDPOINTS.LOANERS}/${loanerId}/summary`,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching payment summary:', error);
      throw error;
    }
  }

  async getLoanerReport(loanerId: number) {
    try {
      const response = await this.api.get(
        API_ENDPOINTS.DOWNLOAD_SCHEDULE(loanerId),
        { 
          responseType: 'blob',
          headers: {
            'Accept': 'application/pdf'
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error downloading report:', error);
      throw error;
    }
  }

  async findOne(id: number) {
    const response = await this.api.get(`${API_ENDPOINTS.LOANERS}/${id}`);
    return response.data;
  }

  async getLoanerDetails(loanerId: number) {
    try {
      console.log('Making API request for loanerId:', loanerId);
      const response = await this.api.get(
        `/admin/loaners/${loanerId}`,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      
      if (response.status === 200) {
        console.log('Success Response:', response.data);
        return response.data;
      } else {
        console.error('Non-200 response:', response);
        throw new Error(`API returned status ${response.status}`);
      }
    } catch (error) {
      console.error('API Error:', {
        url: `/admin/loaners/${loanerId}`
      });
      throw error;
    }
  }

  async makePayment(data: PaymentData) {
    const response = await this.api.post(
      `${API_ENDPOINTS.LOANERS}/${data.loanerId}/payments`,
      data
    );
    return response.data;
  }

  async addMoreLoan(data: AddMoreLoanData) {
    const response = await this.api.post(
      `${API_ENDPOINTS.LOANERS}/${data.loanerId}/additional-loan`,
      data
    );
    return response.data;
  }

  // Pawning Methods
  static async getPawners() {
    const response = await fetch(`${API_BASE_URL}/admin/pawners`);
    if (!response.ok) {
      throw new Error('Failed to fetch pawners');
    }
    return response.json();
  }

  static async getPawner(id: number) {
    const response = await fetch(`${API_BASE_URL}/admin/pawners/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch pawner');
    }
    return response.json();
  }

  static async addPawner(data: any) {
    const response = await fetch(`${API_BASE_URL}/admin/pawners`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to add pawner');
    }
    return response.json();
  }

  static async updatePawner(id: number, data: any) {
    const response = await fetch(`${API_BASE_URL}/admin/pawners/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to update pawner');
    }
    return response.json();
  }

  static async deletePawner(id: number) {
    const response = await fetch(`${API_BASE_URL}/admin/pawners/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete pawner');
    }
    return response.json();
  }

  static async completePawn(id: number) {
    const response = await fetch(`${API_BASE_URL}/admin/pawners/${id}/complete`, {
      method: 'PATCH',
    });
    if (!response.ok) {
      throw new Error('Failed to complete pawn');
    }
    return response.json();
  }

  static async patch(endpoint: string, data: any) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        if (response.status === 409) {
          throw new Error('ទិន្នន័យត្រូវបានកែប្រែដោយអ្នកប្រើប្រាស់ផ្សេង។ សូមធ្វើការផ្ទុកឡើងវិញ');
        }
        throw new Error(errorData.message || `API Error: ${response.statusText}`);
      }

      return response.json();
    } catch (error: any) {
      console.error('Patch error:', error);
      throw error;
    }
  }

  private async post(url: string, data: any) {
    const response = await this.api.post(url, data);
    return response.data;
  }

  async createPawner(data: CreatePawnerDto) {
    return this.post('/admin/pawners', data);
  }
}

export const apiService = new ApiService(); 