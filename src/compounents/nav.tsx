"use client";

import { FaUserCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';


export default function Navbar() {
  const router = useRouter();

  const handleProfileClick = () => {
    router.push('/dashboard/profile');
  };

  return (
    <nav className="w-full bg-white border-b border-gray-200 shadow-md h-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between items-center h-32">
          {/* Logo/Title */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-4"
          >
            <Image
              src="https://images-platform.99static.com/gaDxf-0iE-iXxhcigv-uhLQbnrA=/488x1946:1500x2958/500x500/top/smart/99designs-contests-attachments/103/103608/attachment_103608517" 
              alt="Company Logo"
              width={64}
              height={64}
              className="rounded-full"
            />
            <h1 className="text-4xl font-bold text-blue-900">
              ប្រព័ន្ធគ្រប់គ្រងកម្ចី
            </h1>
          </motion.div>

          {/* Profile */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
          >
            <button 
              onClick={handleProfileClick}
              className="flex items-center space-x-4 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <span className="text-xl text-gray-700 font-medium">គណនី</span>
              <FaUserCircle className="text-4xl text-gray-600" />
            </button>
          </motion.div>
        </div>
      </div>
    </nav>
  );
}
