'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { FaChartLine, FaUsers, FaMoneyBill, FaExchangeAlt, FaArrowUp, FaArrowDown, FaGem, FaDownload } from 'react-icons/fa'

// Sample data
const reportData = {
  totalLoans: {
    amount: "$25,000",
    change: "+12%",
    positive: true
  },
  activeLoans: {
    count: 48,
    change: "+5",
    positive: true
  },
  monthlyInterest: {
    amount: "$1,200",
    change: "-3%", 
    positive: false
  },
  transactions: {
    count: 156,
    change: "+23",
    positive: true
  },
  totalPawns: {
    amount: "$15,000",
    change: "+8%",
    positive: true
  },
  activePawners: {
    count: 32,
    change: "+3",
    positive: true
  }
}

const recentTransactions = [
  {
    id: 1,
    name: "សុខ វាសនា",
    type: "បង់ការប្រាក់",
    amount: "$500",
    date: "២០-មករា-២០២៤"
  },
  {
    id: 2,
    name: "ចាន់ សុផល",
    type: "បង់ប្រាក់ដើម",
    amount: "$1,000",
    date: "១៨-មករា-២០២៤"
  },
  {
    id: 3,
    name: "រស្មី មករា",
    type: "ខ្ចីបន្ថែម",
    amount: "$2,000",
    date: "១៥-មករា-២០២៤"
  },
  {
    id: 4,
    name: "គង់ សុខា",
    type: "បញ្ចាំមាស",
    amount: "$3,000",
    date: "១៤-មករា-២០២៤"
  }
]

export default function Report() {
  const handleDownloadReport = () => {
    // Add logic to generate and download report
    console.log('Downloading report...')
  }

  return (
    <div className="max-w-[90rem] mx-auto">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">របាយការណ៍</h2>
          <p className="text-gray-600 mt-2">ទិន្នន័យសង្ខេបនៃប្រតិបត្តិការ</p>
        </div>
        <button
          onClick={handleDownloadReport}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FaDownload />
          <span>ទាញយករបាយការណ៍</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 mb-12">
        {/* Loan Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 mb-1">ប្រាក់កម្ចីសរុប</p>
                <h3 className="text-2xl font-bold text-gray-900">{reportData.totalLoans.amount}</h3>
                <div className={`flex items-center mt-2 ${reportData.totalLoans.positive ? 'text-green-500' : 'text-red-500'}`}>
                  {reportData.totalLoans.positive ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
                  <span>{reportData.totalLoans.change}</span>
                </div>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <FaMoneyBill className="text-2xl text-blue-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 mb-1">អ្នកខ្ចីសកម្ម</p>
                <h3 className="text-2xl font-bold text-gray-900">{reportData.activeLoans.count}</h3>
                <div className={`flex items-center mt-2 ${reportData.activeLoans.positive ? 'text-green-500' : 'text-red-500'}`}>
                  {reportData.activeLoans.positive ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
                  <span>{reportData.activeLoans.change}</span>
                </div>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <FaUsers className="text-2xl text-green-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 mb-1">ការប្រាក់ប្រចាំខែ</p>
                <h3 className="text-2xl font-bold text-gray-900">{reportData.monthlyInterest.amount}</h3>
                <div className={`flex items-center mt-2 ${reportData.monthlyInterest.positive ? 'text-green-500' : 'text-red-500'}`}>
                  {reportData.monthlyInterest.positive ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
                  <span>{reportData.monthlyInterest.change}</span>
                </div>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <FaChartLine className="text-2xl text-purple-600" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Pawn Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 mb-1">ប្រាក់បញ្ចាំសរុប</p>
                <h3 className="text-2xl font-bold text-gray-900">{reportData.totalPawns.amount}</h3>
                <div className={`flex items-center mt-2 ${reportData.totalPawns.positive ? 'text-green-500' : 'text-red-500'}`}>
                  {reportData.totalPawns.positive ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
                  <span>{reportData.totalPawns.change}</span>
                </div>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <FaGem className="text-2xl text-yellow-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 mb-1">អ្នកបញ្ចាំសកម្ម</p>
                <h3 className="text-2xl font-bold text-gray-900">{reportData.activePawners.count}</h3>
                <div className={`flex items-center mt-2 ${reportData.activePawners.positive ? 'text-green-500' : 'text-red-500'}`}>
                  {reportData.activePawners.positive ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
                  <span>{reportData.activePawners.change}</span>
                </div>
              </div>
              <div className="bg-pink-100 p-3 rounded-lg">
                <FaUsers className="text-2xl text-pink-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 mb-1">ប្រតិបត្តិការសរុប</p>
                <h3 className="text-2xl font-bold text-gray-900">{reportData.transactions.count}</h3>
                <div className={`flex items-center mt-2 ${reportData.transactions.positive ? 'text-green-500' : 'text-red-500'}`}>
                  {reportData.transactions.positive ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
                  <span>{reportData.transactions.change}</span>
                </div>
              </div>
              <div className="bg-orange-100 p-3 rounded-lg">
                <FaExchangeAlt className="text-2xl text-orange-600" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">ប្រតិបត្តិការថ្មីៗ</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ឈ្មោះ</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ប្រភេទ</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ចំនួនទឹកប្រាក់</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">កាលបរិច្ឆេទ</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentTransactions.map((transaction) => (
                <motion.tr 
                  key={transaction.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{transaction.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {transaction.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-blue-600 font-medium">
                    {transaction.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {transaction.date}
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
