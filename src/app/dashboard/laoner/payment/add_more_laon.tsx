'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import { apiService } from '../../../../services/api.service'

interface AddMoreLoanProps {
  loanerId: number
  onSuccess?: () => void
}

export default function AddMoreLoan({ loanerId, onSuccess }: AddMoreLoanProps) {
  const [amount, setAmount] = useState('')
  const [interestRate, setInterestRate] = useState('')
  const [duration, setDuration] = useState('')
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0])
  const [currency, setCurrency] = useState('USD')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await apiService.addMoreLoan({
        loanerId,
        amount: parseFloat(amount),
        interestRate: parseFloat(interestRate),
        duration: parseInt(duration),
        startDate,
        currency
      })

      toast.success('បានបន្ថែមកម្ចីថ្មីដោយជោគជ័យ')
      onSuccess?.()
      
      // Reset form
      setAmount('')
      setInterestRate('')
      setDuration('')
      setStartDate(new Date().toISOString().split('T')[0])
      setCurrency('USD')
    } catch (error) {
      console.error('Error adding loan:', error)
      toast.error('មានបញ្ហាក្នុងការបន្ថែមកម្ចី')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">បន្ថែមកម្ចីថ្មី</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ចំនួនទឹកប្រាក់
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-black"
            placeholder="បញ្ចូលចំនួនទឹកប្រាក់"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            អត្រាការប្រាក់ (%)
          </label>
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-black"
            placeholder="បញ្ចូលអត្រាការប្រាក់"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            រយៈពេល (ខែ)
          </label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-black"
            placeholder="បញ្ចូលរយៈពេល"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ថ្ងៃចាប់ផ្តើម
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-black"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            រូបិយប័ណ្ណ
          </label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-black"
          >
            <option value="USD">USD</option>
            <option value="KHR">KHR</option>
          </select>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-600 text-white rounded-lg py-3 px-4 hover:bg-blue-700 transition-colors duration-200 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'កំពុងដំណើរការ...' : 'បន្ថែមកម្ចី'}
        </motion.button>
      </form>
    </div>
  )
}