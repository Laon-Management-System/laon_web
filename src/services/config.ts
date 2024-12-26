export const API_BASE_URL = 'http://localhost:8000/api';

export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  
  // Loaners
  LOANERS: '/admin/loaners',
  LOANER_PAYMENTS: (id: number) => `/admin/loaners/${id}/payments`,
  DUE_PAYMENTS: '/admin/loaners/due-payments',
  RECORD_PAYMENT: (loanerId: number, scheduleId: number) => 
    `/admin/loaners/${loanerId}/schedules/${scheduleId}/record-payment`,
  LOANER_SCHEDULES: (loanerId: number) => `/admin/loaners/${loanerId}/schedules`,
  DOWNLOAD_SCHEDULE: (loanerId: number) => `/admin/loaners/${loanerId}/schedule/download`,
  LOANER_DETAILS: (loanerId: number) => `/admin/loaners/${loanerId}`,
  LOANER_SUMMARY: (loanerId: number) => `/admin/loaners/${loanerId}/summary`,
  LOANS: '/api/admin/loans',
  PAWNERS: '/admin/pawners',
}; 