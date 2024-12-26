'use client'
import React from 'react'
import { PaymentRow } from './payment.types'
import { formatCurrency } from './payment.utils'

interface LoanSummaryTableProps {
  payments: PaymentRow[]
  currency: string
  loanAmount: number
  interestRate: number
}

export default function LoanSummaryTable({ 
  payments, 
  currency, 
  loanAmount,
  interestRate 
}: LoanSummaryTableProps) {
  const totalPaid = payments.filter(p => p.status === 'paid')
  const totalRemaining = payments.filter(p => p.status !== 'paid')
  
  const calculateTotals = (rows: PaymentRow[]) => ({
    payment: rows.reduce((sum, row) => sum + row.payment, 0),
    interest: rows.reduce((sum, row) => sum + row.interest, 0),
    principal: rows.reduce((sum, row) => sum + row.principal, 0)
  })

  const paidTotals = calculateTotals(totalPaid)
  const remainingTotals = calculateTotals(totalRemaining)

  return (
    <div className="overflow-x-auto text-black mb-8">
      <h3 className="text-xl font-bold text-gray-900 mb-4">របាយការណ៍សង្ខេប</h3>
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">បរិយាយ</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ប្រាក់ដើម</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ការប្រាក់</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">សរុប</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ចំនួនខែ</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {/* Total Loan Row */}
          <tr className="bg-blue-50">
            <td className="px-6 py-4 whitespace-nowrap font-medium">កម្ចីសរុប</td>
            <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(loanAmount, currency)}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              {formatCurrency(loanAmount * (interestRate / 100) * payments.length, currency)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap font-medium">
              {formatCurrency(
                loanAmount + (loanAmount * (interestRate / 100) * payments.length), 
                currency
              )}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">{payments.length}</td>
          </tr>
          
          {/* Paid Amount Row */}
          <tr className="bg-green-50">
            <td className="px-6 py-4 whitespace-nowrap font-medium">បានបង់រួច</td>
            <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(paidTotals.principal, currency)}</td>
            <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(paidTotals.interest, currency)}</td>
            <td className="px-6 py-4 whitespace-nowrap font-medium text-green-600">
              {formatCurrency(paidTotals.payment, currency)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">{totalPaid.length}</td>
          </tr>

          {/* Remaining Amount Row */}
          <tr className="bg-yellow-50">
            <td className="px-6 py-4 whitespace-nowrap font-medium">នៅសល់</td>
            <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(remainingTotals.principal, currency)}</td>
            <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(remainingTotals.interest, currency)}</td>
            <td className="px-6 py-4 whitespace-nowrap font-medium text-yellow-600">
              {formatCurrency(remainingTotals.payment, currency)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">{totalRemaining.length}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
} 