'use client'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaUserCircle, FaPhone, FaMapMarkerAlt, FaSearch, FaMoneyBill, FaCalendar } from 'react-icons/fa'
import { apiService } from '../../../services/api.service'
import { formatCurrency } from './payment/payment.utils'


interface PaymentDue {
  loanerName: string
  phone: string
  address: string
  term: number
  payment: string
  dueDate: string
  status: string
  loanerId: number
  scheduleId: number
}

export default function PaymentDue() {
  const [paymentsDue, setPaymentsDue] = useState<PaymentDue[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDuePayments = async () => {
    try {
      setLoading(true)
      const today = new Date().toISOString().split('T')[0]
      const data = await apiService.getDuePayments(today)
      setPaymentsDue(data)
    } catch (err) {
      setError('Failed to fetch due payments')
      console.error('Error fetching due payments:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDuePayments()
  }, [])

  const handlePayment = async (loanerId: number, scheduleId: number) => {
    try {
      await apiService.recordPayment(loanerId, scheduleId)
      // Refresh the list after payment
      fetchDuePayments()
    } catch (err) {
      console.error('Error recording payment:', err)
    }
  }

  const filteredPayments = paymentsDue.filter(payer => {
    if (!searchTerm) return true;
    
    const search = searchTerm.toLowerCase();
    return (
      (payer.loanerName?.toLowerCase() || '').includes(search) ||
      (payer.phone || '').includes(search) ||
      (payer.address?.toLowerCase() || '').includes(search)
    );
  });

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="max-w-[90rem] mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">បញ្ជីអ្នកត្រូវបង់ប្រាក់</h2>
          <p className="text-gray-600 mt-2">អ្នកត្រូវបង់ប្រាក់សរុប: {filteredPayments.length} នាក់</p>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="ស្វែងរក..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 text-black pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200">
                <th className="py-4 px-6 text-left font-semibold text-gray-700">អុខញី</th>
                <th className="py-4 px-6 text-left font-semibold text-gray-700">ប្រាក់ត្រូវបង់</th>
                <th className="py-4 px-6 text-left font-semibold text-gray-700">ការប្រាក់ត្រូវបង់</th>
                <th className="py-4 px-6 text-left font-semibold text-gray-700">ខែទី</th>
                <th className="py-4 px-6 text-left font-semibold text-gray-700">ថ្ងៃត្រូវបង់</th>
                <th className="py-4 px-6 text-left font-semibold text-gray-700">សកម្មភាព</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payer) => (
                <motion.tr
                  key={`${payer.loanerId}-${payer.scheduleId}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <FaUserCircle className="text-2xl text-blue-500" />
                      </div>
                      <div className="ml-3">
                        <span className="font-medium text-gray-800 block">{payer.loanerName}</span>
                        <span className="text-sm text-gray-500">{payer.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-medium text-black">{payer.payment}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-medium text-black">{payer.payment}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-medium text-black">{payer.term}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-orange-600 font-medium">{payer.dueDate}</span>
                  </td>
                  <td className="py-4 px-6">
                    <button 
                      onClick={() => handlePayment(payer.loanerId, payer.scheduleId)}
                      className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <FaMoneyBill />
                      បង់ប្រាក់
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
