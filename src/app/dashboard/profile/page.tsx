'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit, FaKey, FaCalendar, FaUserTie, FaArrowLeft } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

export default function Profile() {
  const router = useRouter()
  const userData = {
    name: "សុខ វាសនា",
    email: "sokvasna@example.com", 
    phone: "012 345 678",
    address: "ភ្នំពេញ, កម្ពុជា",
    role: "អ្នកគ្រប់គ្រង",
    joinDate: "០១-មករា-២០២៤"
  }

  const handleUpdateProfile = () => {
    console.log('Updating profile...')
  }

  const handleChangePassword = () => {
    console.log('Changing password...')
  }

  const handleBackToDashboard = () => {
    router.push('/dashboard')
  }

  return (
    <div className="w-full bg-white px-6 py-10">
      {/* Back Button */}
      <button
        onClick={handleBackToDashboard}
        className="flex items-center gap-2 px-4 py-2 mb-4 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <FaArrowLeft />
        <span>ត្រឡប់ក្រោយ</span>
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative bg-white rounded-3xl shadow-2xl border border-gray-100"
      >
        {/* Profile Header with Background */}
        <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-3xl">
          <div className="absolute -bottom-16 left-10">
            <div className="w-32 h-32 bg-white rounded-full p-2 shadow-xl">
              <div className="w-full h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                <FaUser className="text-5xl text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Header Content */}
        <div className="pt-20 px-10 pb-8 border-b border-gray-200">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">{userData.name}</h2>
          <div className="flex items-center gap-4">
            <span className="px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
              {userData.role}
            </span>
            <span className="text-gray-500 flex items-center gap-2">
              <FaCalendar className="text-gray-400" />
              ចូលរួមនៅ {userData.joinDate}
            </span>
          </div>
        </div>

        {/* Profile Information */}
        <div className="p-10">
          <h3 className="text-2xl font-bold text-gray-800 mb-8">ព័ត៌មានលម្អិត</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-2xl transition-all hover:bg-gray-100 border border-gray-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <FaEnvelope className="text-xl text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">អ៊ីមែល</p>
                    <p className="font-semibold text-gray-900">{userData.email}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-2xl transition-all hover:bg-gray-100 border border-gray-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-green-100 rounded-xl">
                    <FaPhone className="text-xl text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">លេខទូរស័ព្ទ</p>
                    <p className="font-semibold text-gray-900">{userData.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-2xl transition-all hover:bg-gray-100 border border-gray-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-red-100 rounded-xl">
                    <FaMapMarkerAlt className="text-xl text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">អាសយដ្ឋាន</p>
                    <p className="font-semibold text-gray-900">{userData.address}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-2xl transition-all hover:bg-gray-100 border border-gray-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <FaUserTie className="text-xl text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">តួនាទី</p>
                    <p className="font-semibold text-gray-900">{userData.role}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <button
              onClick={handleUpdateProfile}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl"
            >
              <FaEdit />
              <span>កែប្រែព័ត៌មាន</span>
            </button>

            <button
              onClick={handleChangePassword}
              className="flex items-center justify-center gap-2 bg-gray-700 text-white px-8 py-3 rounded-xl hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl"
            >
              <FaKey />
              <span>ប្តូរពាក្យសម្ងាត់</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
