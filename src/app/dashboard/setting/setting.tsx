'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaUser, FaLock, FaLanguage, FaPalette, FaBell, FaDatabase } from 'react-icons/fa'

export default function Setting() {
  const [language, setLanguage] = useState('km')
  const [theme, setTheme] = useState('light')
  const [notifications, setNotifications] = useState(true)
  const [autoBackup, setAutoBackup] = useState(true)

  return (
    <div className="max-w-[90rem] mx-auto px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-100"
      >
        {/* Header */}
        <div className="mb-12 border-b border-gray-200 pb-8">
          <h2 className="text-4xl font-bold text-gray-900">ការកំណត់</h2>
          <p className="text-gray-600 mt-3 text-xl">គ្រប់គ្រងការកំណត់កម្មវិធី</p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-8">
          {/* Account Settings */}
          <div className="bg-gray-50 p-6 rounded-2xl">
            <div className="flex items-center mb-6">
              <FaUser className="text-blue-500 text-2xl mr-4" />
              <h3 className="text-2xl font-bold text-gray-800">គណនី</h3>
            </div>
            <div className="space-y-4">
              <button className="w-full text-left px-4 py-3 bg-white rounded-xl hover:bg-gray-50 transition-colors">
                <p className="font-semibold text-gray-700">ប្តូរព័ត៌មានផ្ទាល់ខ្លួន</p>
              </button>
              <button className="w-full text-left px-4 py-3 bg-white rounded-xl hover:bg-gray-50 transition-colors">
                <p className="font-semibold text-gray-700">ប្តូរអ៊ីមែល</p>
              </button>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-gray-50 p-6 rounded-2xl">
            <div className="flex items-center mb-6">
              <FaLock className="text-green-500 text-2xl mr-4" />
              <h3 className="text-2xl font-bold text-gray-800">សុវត្ថិភាព</h3>
            </div>
            <div className="space-y-4">
              <button className="w-full text-left px-4 py-3 bg-white rounded-xl hover:bg-gray-50 transition-colors">
                <p className="font-semibold text-gray-700">ប្តូរពាក្យសម្ងាត់</p>
              </button>
              <button className="w-full text-left px-4 py-3 bg-white rounded-xl hover:bg-gray-50 transition-colors">
                <p className="font-semibold text-gray-700">ការផ្ទៀងផ្ទាត់ពីរជាន់</p>
              </button>
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-gray-50 p-6 rounded-2xl">
            <div className="flex items-center mb-6">
              <FaPalette className="text-purple-500 text-2xl mr-4" />
              <h3 className="text-2xl font-bold text-gray-800">ចំណូលចិត្ត</h3>
            </div>
            <div className="space-y-6">
              {/* Language */}
              <div className="flex items-center justify-between px-4 py-3 bg-white rounded-xl">
                <div className="flex items-center">
                  <FaLanguage className="text-xl text-gray-500 mr-3" />
                  <p className="font-semibold text-gray-700">ភាសា</p>
                </div>
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="km">ខ្មែរ</option>
                  <option value="en">English</option>
                </select>
              </div>

              {/* Theme */}
              <div className="flex items-center justify-between px-4 py-3 bg-white rounded-xl">
                <div className="flex items-center">
                  <FaPalette className="text-xl text-gray-500 mr-3" />
                  <p className="font-semibold text-gray-700">រូបរាង</p>
                </div>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="light">ភ្លឺ</option>
                  <option value="dark">ងងឹត</option>
                </select>
              </div>

              {/* Notifications */}
              <div className="flex items-center justify-between px-4 py-3 bg-white rounded-xl">
                <div className="flex items-center">
                  <FaBell className="text-xl text-gray-500 mr-3" />
                  <p className="font-semibold text-gray-700">ការជូនដំណឹង</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={notifications}
                    onChange={(e) => setNotifications(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {/* Auto Backup */}
              <div className="flex items-center justify-between px-4 py-3 bg-white rounded-xl">
                <div className="flex items-center">
                  <FaDatabase className="text-xl text-gray-500 mr-3" />
                  <p className="font-semibold text-gray-700">បម្រុងទុកស្វ័យប្រវត្តិ</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={autoBackup}
                    onChange={(e) => setAutoBackup(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
