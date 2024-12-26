import { ApiService } from './api';
import { CurrencyType, LoanStatus } from '../types/loan.types';

export interface CreateLoanerDto {
  name: string;
  phone: string;
  address?: string;
  amount?: number;
  currency?: CurrencyType;
  interestRate?: number;
  duration?: number;
  startDate?: Date;
  endDate?: Date;
  status?: LoanStatus;
}

export class LoanerService {
  static async getAllLoaners() {
    return ApiService.get('/admin/loaners');
  }

  static async getLoaner(id: number) {
    return ApiService.get(`/admin/loaners/${id}`);
  }

  static async createLoaner(data: CreateLoanerDto) {
    return ApiService.post('/admin/loaners', data);
  }

  static async updateLoaner(id: number, data: Partial<CreateLoanerDto>) {
    return ApiService.patch(`/admin/loaners/${id}`, data);
  }

  static async deleteLoaner(id: number) {
    return ApiService.delete(`/admin/loaners/${id}`);
  }

  static async getLoanerPaymentSummary(id: number) {
    return ApiService.get(`/admin/loaners/${id}/summary`);
  }

  static async recordPayment(loanerId: number, scheduleId: number) {
    return ApiService.get(`/admin/loaners/${loanerId}/schedules/${scheduleId}/pay`);
  }
} 