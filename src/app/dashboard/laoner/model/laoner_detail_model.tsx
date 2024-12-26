'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaFilePdf } from 'react-icons/fa'
import { LoanerDetails } from '../laoner_monthly'
import { PaymentComponent } from '../payment/paymentCompounent'
import AddMoreLoan from '../payment/add_more_laon'
import { apiService } from '../../../../services/api.service'
import { toast } from 'react-hot-toast'
import { useState } from 'react'

interface LaonerDetailModelProps {
  isOpen: boolean
  onCloseId: string
  modalType: string
  id?: number
  name?: string
  phone?: string
  address?: string
  loanAmount?: number
  interestRate?: number
  duration?: number
  currency?: string
}

export default function UnifiedModal({
  isOpen,
  onCloseId,
  id,
}: LaonerDetailModelProps) {
  const [activeTab, setActiveTab] = useState('details')
  
  if (!isOpen) return null

  const handleClose = () => {
    window.dispatchEvent(new CustomEvent(onCloseId))
  }

  const handleDownloadReport = async () => {
    try {
      if (!id) {
        toast.error('អ្នកខ្ចីមិនត្រូវបានជ្រើសរើស')
        return
      }

      const response = await apiService.getLoanerReport(Number(id))
      const blob = new Blob([response], { type: 'application/pdf' })
      const url = window.URL.createObjectURL(blob)
      window.open(url)
      
      toast.success('កំពុងទាញយករបាយការណ៍')
    } catch (error) {
      console.error('Error downloading report:', error)
      toast.error('មានបញ្ហាក្នុងការទាញយករបាយការណ៍')
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 bg-gray-50 w-full"
      >
        <div className="h-screen flex flex-col w-full">
          {/* Header */}
          <div className="bg-white shadow-sm p-6 border-b border-gray-200 flex justify-between items-center w-full">
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                តារាងបង់ប្រាក់ប្រចាំខែ
              </h2>
              
              {/* Tab Switcher */}
              <div className="flex bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                    activeTab === 'details' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  ព័ត៌មានលម្អិត
                </button>
                <button
                  onClick={() => setActiveTab('payment')}
                  className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                    activeTab === 'payment'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  បង់ប្រាក់
                </button>
                <button
                  onClick={() => setActiveTab('additional')}
                  className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                    activeTab === 'additional'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  ខ្ចីថែម
                </button>
              </div>
            </div>
            
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDownloadReport}
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <FaFilePdf className="text-lg" />
                <span>បោះពុម្ព</span>
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClose} 
                className="p-2.5 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <FaTimes className="text-gray-500 text-xl" />
              </motion.button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto p-8 w-full">
            <div className="w-full bg-white rounded-xl shadow-sm">
              {activeTab === 'details' ? (
                <LoanerDetails loanerId={id!} />
              ) : activeTab === 'payment' ? (
                <div className="p-8">
                  <PaymentComponent loanerId={id!} />
                </div>
              ) : (
                <div className="p-8">
                  <AddMoreLoan loanerId={id!} />
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
