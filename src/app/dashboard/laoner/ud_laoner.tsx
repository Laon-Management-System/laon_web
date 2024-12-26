'use client'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaUserCircle, FaEdit, FaTrash, FaSearch } from 'react-icons/fa'
import { toast } from 'react-hot-toast'
import { apiService } from '../../../services/api.service'
import { Loaner } from '../../../types/loan.types'
import UpdateLoanerModal from './update_loaner_modal'

export default function UdLoaner() {
  const [loaners, setLoaners] = useState<Loaner[]>([])
  const [selectedLoaner, setSelectedLoaner] = useState<Loaner | null>(null)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchLoaners = async () => {
    try {
      setLoading(true)
      const data = await apiService.getLoaners()
      setLoaners(data)
    } catch (error) {
      console.error('Error fetching loaners:', error)
      toast.error('មានបញ្ហាក្នុងការទាញយកទិន្នន័យ')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLoaners()
  }, [])

  const handleUpdate = (loaner: Loaner) => {
    setSelectedLoaner(loaner)
    setShowUpdateModal(true)
  }

  const handleDelete = async (id: number) => {
    if (window.confirm('តើអ្នកពិតជាចង់លុបអ្នកខ្ចីនេះមែនទេ?')) {
      try {
        await apiService.deleteLoaner(id)
        toast.success('អ្នកខ្ចីត្រូវបានលុបដោយជោគជ័យ')
        fetchLoaners() // Refresh list
      } catch (error) {
        console.error('Error deleting loaner:', error)
        toast.error('មានបញ្ហាក្នុងការលុបអ្នកខ្ចី')
      }
    }
  }

  const filteredLoaners = loaners.filter(loaner => {
    if (!searchTerm) return true
    const search = searchTerm.toLowerCase()
    return (
      loaner.name.toLowerCase().includes(search) ||
      loaner.phone.includes(search) ||
      (loaner.address?.toLowerCase() || '').includes(search)
    )
  })

  if (loading) return <div>Loading...</div>

  return (
    <div className="max-w-[90rem] mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">បញ្ជីអ្នកខ្ចីប្រាក់</h2>
          <p className="text-gray-600 mt-2">អ្នកខ្ចីប្រាក់សរុប: {filteredLoaners.length} នាក់</p>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="ស្វែងរក..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200">
                <th className="py-4 px-6 text-left font-semibold text-gray-700">អ្នកខ្ចី</th>
                <th className="py-4 px-6 text-left font-semibold text-gray-700">ចំនួនទឹកប្រាក់</th>
                <th className="py-4 px-6 text-left font-semibold text-gray-700">អត្រាការប្រាក់</th>
                <th className="py-4 px-6 text-left font-semibold text-gray-700">រយៈពេល</th>
                <th className="py-4 px-6 text-left font-semibold text-gray-700">ស្ថានភាព</th>
                <th className="py-4 px-6 text-center font-semibold text-gray-700">សកម្មភាព</th>
              </tr>
            </thead>
            <tbody>
              {filteredLoaners.map((loaner) => (
                <motion.tr
                  key={loaner.id}
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
                        <span className="font-medium text-gray-800 block">{loaner.name}</span>
                        <span className="text-sm text-gray-500">{loaner.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-medium text-blue-600">
                      ${loaner.amount}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-600">{loaner.interestRate}%</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-600">{loaner.duration} ខែ</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      loaner.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {loaner.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex justify-center space-x-3">
                      <button
                        onClick={() => handleUpdate(loaner)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                      >
                        <FaEdit className="text-xl" />
                      </button>
                      <button
                        onClick={() => handleDelete(loaner.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <FaTrash className="text-xl" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showUpdateModal && selectedLoaner && (
        <UpdateLoanerModal
          loaner={selectedLoaner}
          onClose={() => {
            setShowUpdateModal(false)
            setSelectedLoaner(null)
          }}
          onUpdate={() => {
            fetchLoaners()
            setShowUpdateModal(false)
            setSelectedLoaner(null)
          }}
        />
      )}
    </div>
  )
}
