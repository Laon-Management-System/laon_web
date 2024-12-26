'use client'
import { PaymentRow } from './payment.types';
import { formatCurrency } from './payment.utils';

interface LoanSummary {
  totalPayment: number;
  totalInterest: number;
  interestRate: number;
  loanAmount: number;
}

const calculateLoanSummary = (payments: PaymentRow[], interestRate: number, loanAmount: number): LoanSummary => {
  const totalPayment = payments.reduce((sum, row) => sum + row.payment, 0);
  const totalInterest = payments.reduce((sum, row) => sum + row.interest, 0);
  
  return {
    totalPayment,
    totalInterest,
    interestRate,
    loanAmount
  };
};

/**
 * Downloads payment data as CSV file
 * @param {PaymentRow[]} payments 
 */
export const downloadCSV = (payments: PaymentRow[], interestRate: number, loanAmount: number) => {
  const summary = calculateLoanSummary(payments, interestRate, loanAmount);
  
  const headers = ['ខែ', 'ការបង់សរុប', 'ប្រាក់ដើម', 'ការប្រាក់', 'សមតុល្យនៅសល់'];
  const csvContent = [
    'សង្ខេបកម្ចី',
    `ទំហំកម្ចី,${summary.loanAmount.toFixed(2)}`,
    `អត្រាការប្រាក់,${summary.interestRate}%`,
    `ការទូទាត់សរុប,${summary.totalPayment.toFixed(2)}`,
    `ការប្រាក់សរុប,${summary.totalInterest.toFixed(2)}`,
    '',
    headers.join(','),
    ...payments.map(row => [
      row.month,
      row.payment.toFixed(2),
      row.principal.toFixed(2),
      row.interest.toFixed(2),
      row.remainingBalance.toFixed(2)
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'តារាងបង់ប្រាក់.csv');
  document.body.appendChild(link);
  link.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(link);
};
