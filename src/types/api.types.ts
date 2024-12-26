export interface Loaner {
  id: number;
  name: string;
  phone: string;
  address: string;
  created_at: string;
  updated_at: string;
}

export interface Pawner {
  id: number;
  name: string;
  phone: string;
  address: string;
  created_at: string;
  updated_at: string;
}

export interface Loan {
  id: number;
  loaner_id: number;
  amount: number;
  currency: 'USD' | 'KHR';
  interest_rate: number;
  duration: number;
  start_date: string;
  end_date: string;
  status: 'active' | 'completed' | 'defaulted';
  created_by: number;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
} 