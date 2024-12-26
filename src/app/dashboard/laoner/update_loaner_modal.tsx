'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaTimes, FaUser, FaPhone, FaMapMarkerAlt, FaDollarSign, FaCalendar, FaClock, FaPercent } from 'react-icons/fa'
import { toast } from 'react-hot-toast'
import { apiService } from '../../../services/api.service'
import { Loaner, CurrencyType } from '../../../types/loan.types'

interface UpdateLoanerModalProps {
  loaner: Loaner
  onClose: () => void
  onUpdate: () => void
}

export default function UpdateLoanerModal({ loaner, onClose, onUpdate }: UpdateLoanerModalProps) {
  const [formData, setFormData] = useState({
    name: loaner.name,
    phone: loaner.phone,
    address: loaner.address || '',
    amount: loaner.amount.toString(),
    currency: loaner.currency,
    interestRate: loaner.interestRate.toString(),
    duration: loaner.duration.toString(),
    startDate: new Date(loaner.startDate).toISOString().split('T')[0]
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const startDate = new Date(formData.startDate)
      const endDate = new Date(startDate)
      endDate.setMonth(endDate.getMonth() + parseInt(formData.duration))

      const updateData = {
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        amount: parseFloat(formData.amount),
        currency: formData.currency as CurrencyType,
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        interestRate: parseFloat(formData.interestRate),
        duration: parseInt(formData.duration)
      }

      await apiService.updateLoaner(loaner.id, updateData)
      toast.success('អ្នកខ្ចីត្រូវបានធ្វើបច្ចុប្បន្នភាពដោយជោគជ័យ')
      onUpdate()
    } catch (error: any) {
      console.error('Failed to update loaner:', error)
      toast.error(error.response?.data?.message || 'មានបញ្ហាក្នុងការធ្វើបច្ចុប្បន្នភាព')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl m-4 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">ធ្វើបច្ចុប្បន្នភាពអ្នកខ្ចី</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <FaTimes className="text-gray-500 text-xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">ឈ្មោះ</label>
              <div className="relative">
                <FaUser className="absolute left-4 top-3.5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="pl-12 w-full text-black p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="បញ្ចូលឈ្មោះ"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">លេខទូរស័ព្ទ</label>
              <div className="relative">
                <FaPhone className="absolute left-4 top-3.5 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="pl-12 w-full text-black p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="បញ្ចូលលេខទូរស័ព្ទ"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">អាសយដ្ឋាន</label>
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-4 top-3.5 text-gray-400" />
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="pl-12 w-full text-black p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="បញ្ចូលអាសយដ្ឋាន"
                />
              </div>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">ចំនួនទឹកប្រាក់</label>
              <div className="relative">
                <FaDollarSign className="absolute left-4 top-3.5 text-gray-400" />
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="pl-12 w-full text-black p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="បញ្ចូលចំនួនទឹកប្រាក់"
                />
              </div>
            </div>

            {/* Interest Rate */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">អត្រាការប្រាក់</label>
              <div className="relative">
                <FaPercent className="absolute left-4 top-3.5 text-gray-400" />
                <input
                  type="number"
                  name="interestRate"
                  value={formData.interestRate}
                  onChange={handleChange}
                  className="pl-12 w-full text-black p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="បញ្ចូលអត្រាការប្រាក់"
                />
              </div>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">រយៈពេល (ខែ)</label>
              <div className="relative">
                <FaClock className="absolute left-4 top-3.5 text-gray-400" />
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="pl-12 w-full text-black p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="បញ្ចូលរយៈពេល"
                />
              </div>
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">ថ្ងៃចាប់ផ្តើម</label>
              <div className="relative">
                <FaCalendar className="absolute left-4 top-3.5 text-gray-400" />
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="pl-12 w-full text-black p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Currency */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">រូបិយប័ណ្ណ</label>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="w-full text-black p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="USD">USD</option>
                <option value="KHR">KHR</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border-2 border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              បោះបង់
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              រក្សាទុក
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  )
} 