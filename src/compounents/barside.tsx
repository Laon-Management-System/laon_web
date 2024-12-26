"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FaHome, 
  FaUsers, 
  FaFileInvoiceDollar, 
  FaChartBar, 
  FaCog, 
  FaMoneyBill,
  FaGem
} from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { icon: FaHome, label: 'ទំព័រដើម', href: '/dashboard' },
    { icon: FaUsers, label: 'អ្នកខ្ចីប្រាក់', href: '/borrowers' },
    { icon: FaFileInvoiceDollar, label: 'កម្ចី', href: '/loans' },
    { icon: FaMoneyBill, label: 'អ្នកត្រូវបង់ការប្រាក់', href: '/payingloans' },
    { icon: FaGem, label: 'បញ្ចាំ', href: '/pawning' },
    { icon: FaChartBar, label: 'របាយការណ៍', href: '/reports' },
    { icon: FaCog, label: 'ការកំណត់', href: '/settings' },
  ];

  return (
    <div className="h-screen w-30 bg-black text-white border-r border-gray-800 shadow-lg">
      <nav className="p-6">
        <ul className="space-y-3">
          {menuItems.map((item, index) => {
            const isActive = pathname === item.href;
            
            return (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 5, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href={item.href}
                  className={`flex items-center space-x-4 px-6 py-4 rounded-xl transition-all duration-300 ${
                    isActive 
                      ? 'bg-blue-600 text-white font-semibold shadow-md' 
                      : 'text-white hover:bg-gray-700'
                  }`}
                >
                  <item.icon className={`text-2xl ${isActive ? 'text-white' : 'text-gray-400'}`} />
                  <span className="font-medium tracking-wide text-lg">{item.label}</span>
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
