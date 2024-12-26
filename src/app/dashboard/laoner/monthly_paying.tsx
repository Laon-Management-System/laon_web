'use client'
import React, { useEffect, useState } from 'react'
import { PaymentRow, MonthlyPayingProps } from './payment/payment.types'
import { formatCurrency } from './payment/payment.utils'
import { apiService } from '../../../services/api.service'

interface PaymentSummary {
  totalAmount: string
  totalInterest: number
  paidAmount: string
  remainingAmount: string
  totalPayments: number
  paidPayments: number
  remainingPayments: number
}

export default function MonthlyPaying({ loanAmount, interestRate, duration, currency, loanerId }: MonthlyPayingProps) {
  const [summary, setSummary] = useState<PaymentSummary | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        if (!loanerId) return
        const response = await apiService.getPaymentSummary(loanerId)
        setSummary(response)
      } finally {
        setLoading(false)
      }
    }

    fetchSummary()
  }, [loanerId])

  if (loading) return <div>កំពុងផ្ទុក...</div>
  if (!summary) return null

  return (
    <div className= "rounded-2xl shadow-xl p-6 text-black">
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="space-y-4">
          <div>
            <span className="text-gray-600">ទំហំកម្ចី:</span>
            <span className="ml-2 font-medium">{formatCurrency(Number(summary.totalAmount), currency)}</span>
          </div>
          <div>
            <span className="text-gray-600">ការប្រាក់សរុប:</span>
            <span className="ml-2 font-medium">{formatCurrency(summary.totalInterest, currency)}</span>
          </div>
          <div>
            <span className="text-gray-600">ប្រាក់បានបង់:</span>
            <span className="ml-2 font-medium text-green-600">{formatCurrency(Number(summary.paidAmount), currency)}</span>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <span className="text-gray-600">ប្រាក់នៅសល់:</span>
            <span className="ml-2 font-medium text-yellow-600">{formatCurrency(Number(summary.remainingAmount), currency)}</span>
          </div>
          <div>
            <span className="text-gray-600">ការបង់សរុប:</span>
            <span className="ml-2 font-medium">{summary.paidPayments}/{summary.totalPayments} ខែ</span>
          </div>
          <div>
            <span className="text-gray-600">នៅសល់:</span>
            <span className="ml-2 font-medium">{summary.remainingPayments} ខែ</span>
          </div>
        </div>
      </div>

      {/* Monthly Interest Info */}
      <div className="bg-blue-50 p-4 rounded-lg mb-8">
        <div className="text-blue-800">
          <span className="font-medium">ការប្រាក់ប្រចាំខែ:</span>
          <span className="ml-2">{formatCurrency((loanAmount * interestRate) / 100, currency)}</span>
          <span className="ml-2 text-sm">({interestRate}% ក្នុងមួយខែ)</span>
        </div>
      </div>
    </div>
  )
}

