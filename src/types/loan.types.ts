export enum CurrencyType {
  USD = 'USD',
  KHR = 'KHR',
  THB = 'THB'
}

export enum LoanStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
  DEFAULTED = 'defaulted',
  CANCELLED = 'cancelled'
}

export interface Loaner {
  id: number;
  name: string;
  phone: string;
  address?: string;
  amount: number;
  currency: CurrencyType;
  interestRate: number;
  monthlyInterest: number;
  duration: number;
  startDate: string;
  endDate: string;
  status: LoanStatus;
  createdAt: string;
  updatedAt: string;
  schedules?: LoanSchedule[];
}

export interface LoanSchedule {
  id: number;
  loanerId: number;
  term: number;
  payment: number;
  principal: number;
  balance: number;
  paymentStatus: 'pending' | 'paid' | 'overdue';
  paidDate?: string;
  dueDate?: string;
} 