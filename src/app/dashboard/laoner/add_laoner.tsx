'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaUser, FaPhone, FaMapMarkerAlt, FaDollarSign, FaCalendar, FaClock, FaPercent } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import MonthlyPaying from './monthly_paying'
import { CurrencyType } from '../../../types/loan.types'
import { apiService } from '../../../services/api.service'

export default function AddLoaner() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    id: 0,
    name: '',
    phone: '',
    address: '',
    loanAmount: '',
    currency: 'USD',
    startDate: '',
    interestRate: '',
    duration: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const startDate = new Date(formData.startDate)
      const endDate = new Date(startDate)
      endDate.setMonth(endDate.getMonth() + parseInt(formData.duration))

      const loanerData = {
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        amount: parseFloat(formData.loanAmount),
        currency: formData.currency as CurrencyType,
        startDate: startDate.toISOString().split('T')[0],  // Format as YYYY-MM-DD
        endDate: endDate.toISOString().split('T')[0],      // Format as YYYY-MM-DD
        interestRate: parseFloat(formData.interestRate),
        duration: parseInt(formData.duration),
        status: 'active'  // Add default status
      }

      const response = await apiService.addLoaner(loanerData)
      setFormData(prev => ({ ...prev, id: response.id }))
      toast.success('អ្នកខ្ចីថ្មីត្រូវបានបន្ថែមដោយជោគជ័យ', {
        duration: 3000,
        position: 'top-center'
      })
      // Reset form after successful submission
      setFormData({
        id: 0,
        name: '',
        phone: '',
        address: '',
        loanAmount: '',
        currency: 'USD',
        startDate: '',
        interestRate: '',
        duration: ''
      })
    } catch (error: any) {
      console.error('Failed to add loaner:', error.response?.data?.message)
      
      // Check if error message contains "already exists"
      if (error.response?.data?.message?.includes('already exists')) {
        toast.error('អ្នកខ្ចីនេះមានរួចហើយ', {
          duration: 3000,
          position: 'top-center'
        })
      } else {
        toast.error(Array.isArray(error.response?.data?.message) 
          ? error.response?.data?.message.join(', ') 
          : 'មានបញ្ហាក្នុងការបន្ថែមអ្នកខ្ចីថ្មី',
          {
            duration: 3000,
            position: 'top-center'
          }
        )
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    let newValue = value
    
    // Ensure positive numbers for numeric fields
    if (['loanAmount', 'interestRate', 'duration'].includes(name)) {
      const numValue = parseFloat(value)
      if (numValue < 0) {
        newValue = '0'
      }
    }

    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }))
  }

  const formatCurrency = (amount: string, currency: string) => {
    if (!amount) return ''
    const num = parseFloat(amount)
    if (currency === 'KHR') {
      return `${num.toLocaleString()} ៛`
    }
    return `$${num.toLocaleString()}`
  }

  return (
    <div className="max-w-5xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-2xl shadow-xl p-10"
      >
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">បន្ថែមអ្នកខ្ចីថ្មី</h2>
          <p className="text-gray-600 mt-2">បំពេញព័ត៌មានលម្អិតរបស់អ្នកខ្ចីថ្មី</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">ឈ្មោះ</label>
                <div className="relative">
                  <FaUser className="absolute left-4 top-3.5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="pl-12 text-black w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    placeholder="បញ្ចូលឈ្មោះ"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">លេខទូរស័ព្ទ</label>
                <div className="relative">
                  <FaPhone className="absolute left-4 top-3.5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="pl-12 w-full text-black p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    placeholder="បញ្ចូលលេខទូរស័ព្ទ"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">អាសយដ្ឋាន</label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-4 top-3.5 text-gray-400" />
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="pl-12 w-full text-black p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    placeholder="បញ្ចូលអាសយដ្ឋាន"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">ចំនួនទឹកប្រាក់</label>
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    {formData.currency === 'USD' ? (
                      <FaDollarSign className="absolute left-4 top-3.5 text-gray-400" />
                    ) : (
                      <span className="absolute left-4 top-2.5 text-gray-400 font-semibold">៛</span>
                    )}
                    <input
                      type="number"
                      min="0"
                      name="loanAmount"
                      value={formData.loanAmount}
                      onChange={handleChange}
                      className="pl-12 w-full text-black p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                      placeholder={formData.currency === 'USD' ? 'បញ្ចូលចំនួនដុល្លារ' : 'បញ្ចូលចំនួនរៀល'}
                    />
                  </div>
                  <select
                    name="currency"
                    value={formData.currency}
                    onChange={handleChange}
                    className="w-24 text-black p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  >
                    <option value="USD">USD</option>
                    <option value="KHR">រៀល</option>
                  </select>
                </div>
                {formData.loanAmount && (
                  <p className="text-sm text-gray-500 mt-2">
                    {formatCurrency(formData.loanAmount, formData.currency)}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">អត្រាការប្រាក់ (%)</label>
                <div className="relative">
                  <FaPercent className="absolute left-4 top-3.5 text-gray-400" />
                  <input
                    type="number"
                    min="0"
                    name="interestRate"
                    value={formData.interestRate}
                    onChange={handleChange}
                    className="pl-12 w-full text-black p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    placeholder="បញ្ចូលអត្រាការប្រាក់"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">ថ្ងៃខ្ចី</label>
                <div className="relative">
                  <FaCalendar className="absolute left-4 top-3.5 text-gray-400" />
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="pl-12 w-full text-black p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">រយៈពេល (ខែ)</label>
                <div className="relative">
                  <FaClock className="absolute left-4 top-3.5 text-gray-400" />
                  <input
                    type="number"
                    min="0"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="pl-12 w-full text-black p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    placeholder="បញ្ចូលរយៈពេល"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
              className="px-8 py-3 border-2 border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
            >
              បោះបង់
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transform hover:translate-y-[-1px] transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              បញ្ជូន
            </button>
          </div>
        </form>
      </motion.div>

      {formData.loanAmount && formData.interestRate && formData.duration && (
        <div className="mt-8">
          <MonthlyPaying
            loanAmount={Math.abs(Number(formData.loanAmount))}
            interestRate={Math.abs(Number(formData.interestRate))}
            duration={Math.abs(Number(formData.duration))}
            currency={formData.currency}
            loanerId={formData.id}
          />
        </div>
      )}
    </div>
  )
}
