'use client'
import React, { useState, useEffect } from 'react'
import { motion} from 'framer-motion'
import {FaSearch, FaChevronDown} from 'react-icons/fa'
import LaonerDetailModel from './model/laoner_detail_model'
import { LoanerService } from '../../../services/loaner.service'
import { Loaner } from '../../../types/loan.types'
import { formatCurrency } from './payment/payment.utils'

export default function Loaners() {
  const [loaners, setLoaners] = useState<Loaner[]>([])
  const [filteredLoaners, setFilteredLoaners] = useState<Loaner[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedLoaner, setSelectedLoaner] = useState<Loaner | null>(null)
  const [showPersonalInfo, setShowPersonalInfo] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed'>('active')

  useEffect(() => {
    const handleCloseModal = () => {
      setShowPersonalInfo(false)
    }

    window.addEventListener('closePersonalModal', handleCloseModal)
    return () => window.removeEventListener('closePersonalModal', handleCloseModal)
  }, [])

  useEffect(() => {
    fetchLoaners()
  }, [])

  useEffect(() => {
    if (filterStatus === 'all') {
      setFilteredLoaners(loaners)
    } else {
      setFilteredLoaners(loaners.filter((loaner: Loaner) => loaner.status === filterStatus))
    }
  }, [filterStatus, loaners])

  const fetchLoaners = async () => {
    try {
      setLoading(true)
      const data = await LoanerService.getAllLoaners()
      setLoaners(data)
      setFilteredLoaners(data.filter((loaner: Loaner) => loaner.status === 'active'))
    } catch (err) {
      setError('Failed to fetch loaners')
      console.error('Error fetching loaners:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="max-w-[90rem] mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">បញ្ជីអ្នកខ្ចីប្រាក់</h2>
          <p className="text-gray-600 mt-2">អ្នកខ្ចីប្រាក់សរុប: {filteredLoaners.length} នាក់</p>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="ស្វែងរក..."
              className="pl-10 text-black pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <div className="relative">
            <button 
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {filterStatus === 'all' ? 'អ្នកខ្ចីទាំងអស់' : 
               filterStatus === 'active' ? 'អ្នកខ្ចីសកម្ម' : 'អ្នកខ្ចីចាស់'}
              <FaChevronDown className="ml-2" />
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  <button 
                    onClick={() => {
                      setFilterStatus('completed')
                      setShowDropdown(false)
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    អ្នកខ្ចីចាស់
                  </button>
                  <button 
                    onClick={() => {
                      setFilterStatus('active')
                      setShowDropdown(false)
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    អ្នកខ្ចីសកម្ម
                  </button>
                  <button 
                    onClick={() => {
                      setFilterStatus('all')
                      setShowDropdown(false)
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    អ្នកខ្ចីទាំងអស់
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200">
                <th className="py-4 px-6 text-left font-semibold text-gray-700">អ្នកខ្ចី</th>
                <th className="py-4 px-6 text-left font-semibold text-gray-700">លេខទូរស័ព្ទ</th>
                <th className="py-4 px-6 text-left font-semibold text-gray-700">អាសយដ្ឋាន</th>
                <th className="py-4 px-6 text-left font-semibold text-gray-700">ប្រាក់កម្ចី</th>
                <th className="py-4 px-6 text-left font-semibold text-gray-700">សារប្រាក់</th>
                <th className="py-4 px-6 text-left font-semibold text-gray-700">រយៈពេល</th>
                <th className="py-4 px-6 text-left font-semibold text-gray-700">ថ្ងៃចាប់ផ្តើម</th>
                <th className="py-4 px-6 text-left font-semibold text-gray-700">ស្ថានភាព</th>
              </tr>
            </thead>
            <tbody>
              {filteredLoaners.map((loaner: Loaner) => (
                <motion.tr
                  key={loaner.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    setSelectedLoaner(loaner);
                    setShowPersonalInfo(true);
                  }}
                >
                  <td className="py-4 px-6">
                    <span className="font-medium text-gray-800">{loaner.name}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-600">{loaner.phone}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-600">{loaner.address}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-medium text-blue-600">
                      {formatCurrency(loaner.amount, loaner.currency)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-600">{loaner.interestRate}%</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-600">{loaner.duration} ខែ</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-600">{loaner.startDate}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      loaner.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {loaner.status === 'active' ? 'អ្នកខ្ចីសកម្ម' : 'អ្នកខ្ចីចាស់'}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <LaonerDetailModel
        isOpen={showPersonalInfo}
        onCloseId="closePersonalModal"
        modalType="personal"
        id={selectedLoaner?.id}
        name={selectedLoaner?.name}
        phone={selectedLoaner?.phone}
        address={selectedLoaner?.address}
        loanAmount={selectedLoaner?.amount}
        interestRate={selectedLoaner?.interestRate}
        duration={selectedLoaner?.duration}
        currency={selectedLoaner?.currency}
      />
    </div>
  )
}
