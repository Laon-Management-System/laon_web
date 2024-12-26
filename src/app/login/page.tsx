'use client'
import React, { useState } from 'react'
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'
import { apiService } from '@/services/api.service';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    phone: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await apiService.login(formData.phone, formData.password);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-50">
      <div className="bg-white p-12 rounded-xl shadow-2xl w-[40rem] transform transition-all hover:scale-[1.02]">
        <div className="mb-10">
          <h1 className="text-5xl font-bold text-center mb-4 text-blue-900 animate-fade-in">សូមស្វាគមន៍</h1>
          <p className="text-lg text-center text-gray-600 mb-3">ប្រព័ន្ធគ្រប់គ្រងកម្ចី</p>
          <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full"></div>
        </div>
        
        <h2 className="text-3xl font-bold text-center mb-10 text-blue-800">ចូល</h2>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="relative">
            <label htmlFor="phone" className="block text-base font-medium text-gray-700 mb-2">
              លេខទូរស័ព្ទ
            </label>
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                className="pl-12 pr-4 py-4 block w-full rounded-lg border text-black border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
                placeholder="បញ្ចូលលេខទូរស័ព្ទរបស់អ្នក"
                defaultValue="012345678"
                required
              />
            </div>
          </div>
          
          <div className="relative">
            <label htmlFor="password" className="block text-base font-medium text-gray-700 mb-2">
              ពាក្យសម្ងាត់
            </label>
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="pl-12 pr-14 py-4 block text-black w-full rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
                placeholder="បញ្ចូលពាក្យសម្ងាត់របស់អ្នក"
                defaultValue="password123"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 text-lg"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-base">
            <label className="flex items-center">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-500 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
              <span className="ml-3 text-gray-600">ចងចាំខ្ញុំ</span>
            </label>
            <a href="#" className="text-blue-500 hover:text-blue-600 hover:underline">ភ��លេចពាក្យសម្ងាត់?</a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white py-4 px-6 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed text-lg font-medium"
          >
            {isLoading ? (
              <span className="inline-flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                កំពុងដំណើរការ...
              </span>
            ) : 'ចូល'}
          </button>
        </form>

        <p className="mt-10 text-center text-gray-600 text-base">
          មិនទាន់មានគណនី? {' '}
          <a href="#" className="text-blue-500 hover:text-blue-600 hover:underline">ចុះឈ្មោះ</a>
        </p>
      </div>
    </div>
  )
}
