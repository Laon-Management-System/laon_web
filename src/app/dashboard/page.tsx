"use client";

import React, { useState } from 'react';
import Navbar from '@/compounents/nav';
import { motion } from 'framer-motion';
import Home from './dash_compounents/home';
import Loaners from './laoner/laoner';
import PaymentDue from './laoner/pay_laoner';
import AddLoaner from './laoner/add_laoner';
import Report from './report/report';
import Pawner from './pawning/pawner';
import AddPawner from './pawning/add_pawner';
import UpdateDeletePawner from './pawning/ud_pawner';
import Setting from './setting/setting';
import UpdateDeleteLoaner from './laoner/ud_laoner';  
import DueDatePawner from './pawning/duedate_pawner';
import { 
  FaHome, 
  FaUsers, 
  FaFileInvoiceDollar, 
  FaChartBar, 
  FaCog, 
  FaMoneyBill,
  FaGem,
  FaCaretDown
} from 'react-icons/fa';

function Sidebar({ setActiveComponent }: { setActiveComponent: (component: string) => void }) {
  const [isPawnOpen, setIsPawnOpen] = useState(false);
  const [isLoanOpen, setIsLoanOpen] = useState(false);

  const menuItems = [
    { icon: FaHome, label: 'ទំព័រដើម' },
    { 
      icon: FaFileInvoiceDollar,
      label: 'កម្ចី',
      subItems: [
        { icon: FaUsers, label: 'អ្នកខ្ចីប្រាក់'},
        { icon: FaMoneyBill, label: 'អ្នកត្រូវបង់ការប្រាក់' },
        { icon: FaFileInvoiceDollar, label: 'ថែមអ្នកខ្ចី' },
        { icon: FaFileInvoiceDollar, label: 'កែប្រែអ្នកខ្ចី' }
      ]
    },
    { 
      icon: FaGem, 
      label: 'បញ្ចាំ',
      subItems: [
        { icon: FaGem, label: 'អ្នកបញ្ចាំ'},
        { icon: FaGem, label: 'ថែមអ្នកបញ្ចាំ' },
        { icon: FaGem, label: 'កែប្រែអ្នកបញ្ចាំ' }, 
        { icon: FaGem, label: 'អ្នកបញ្ចាំដែលដល់ថ្ងៃបង់ប្រាក់' },
      ]
    },
    { icon: FaChartBar, label: 'របាយការណ៍' },
    { icon: FaCog, label: 'ការកំណត់' },
  ];

  return (
    <div className=" w-30 bg-black text-white border-r border-gray-800 shadow-lg">
      <nav className="p-6">
        <ul className="space-y-3">
          {menuItems.map((item, index) => {
            return (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 5, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.98 }}
              >
                <button
                  onClick={() => {
                    if (item.label === 'បញ្ចាំ') {
                      setIsPawnOpen(!isPawnOpen);
                    } else if (item.label === 'កម្ចី') {
                      setIsLoanOpen(!isLoanOpen);
                    } else {
                      setActiveComponent(item.label);
                    }
                  }}
                  className="flex items-center justify-between w-full px-6 py-4 rounded-xl transition-all duration-300 text-white hover:bg-gray-700"
                >
                  <div className="flex items-center space-x-4">
                    <item.icon className="text-2xl text-gray-400" />
                    <span className="font-medium tracking-wide text-lg">{item.label}</span>
                  </div>
                  {item.subItems && <FaCaretDown className={`transform transition-transform duration-200 ${(item.label === 'បញ្ចាំ' ? isPawnOpen : isLoanOpen) ? 'rotate-180' : ''}`} />}
                </button>
                {item.subItems && ((item.label === 'បញ្ចាំ' && isPawnOpen) || (item.label === 'កម្ចី' && isLoanOpen)) && (
                  <ul className="ml-12 mt-2 space-y-2">
                    {item.subItems.map((subItem, subIndex) => (
                      <motion.li
                        key={subIndex}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: subIndex * 0.1 }}
                      >
                        <button
                          onClick={() => setActiveComponent(subItem.label)}
                          className="w-full text-left py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
                        >
                          {subItem.label}
                        </button>
                      </motion.li>
                    ))}
                  </ul>
                )}
              </motion.li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export default function Dashboard() {
  const [activeComponent, setActiveComponent] = useState('ទំព័រដើម');

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar setActiveComponent={setActiveComponent} />
      <div className="flex-1">
        <Navbar />
        <main className="p-8">
          {activeComponent === 'ទំព័រដើម' && <Home />}
          {activeComponent === 'អ្នកខ្ចីប្រាក់' && <Loaners />}
          {activeComponent === 'អ្នកត្រូវបង់ការប្រាក់' && <PaymentDue />}
          {activeComponent === 'ថែមអ្នកខ្ចី' && <AddLoaner />}
          {activeComponent === 'របាយការណ៍' && <Report />}
          {activeComponent === 'អ្នកបញ្ចាំ' && <Pawner />}
          {activeComponent === 'ថែមអ្នកបញ្ចាំ' && <AddPawner />}
          {activeComponent === 'កែប្រែអ្នកបញ្ចាំ' && <UpdateDeletePawner />}
          {activeComponent === 'ការកំណត់' && <Setting />}
          {activeComponent === 'កែប្រែអ្នកខ្ចី' && <UpdateDeleteLoaner />}
          {activeComponent === 'អ្នកបញ្ចាំដែលដល់ថ្ងៃបង់ប្រាក់' && <DueDatePawner />}
        </main>
      </div>
    </div>
  );
}
