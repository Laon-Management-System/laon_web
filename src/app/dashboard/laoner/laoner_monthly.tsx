import React, { useEffect, useState } from 'react';
import { apiService } from '../../../services/api.service';
import { motion } from 'framer-motion';
import { FaUser, FaPhone, FaMapMarkerAlt, FaDollarSign, FaCalendarAlt, FaClock, FaPercentage } from 'react-icons/fa';

interface LoanerDetails {
  id: number;
  name: string;
  phone: string;
  address: string;
  amount: number;
  currency: string;
  interestRate: number;
  duration: number;
  startDate: string;
  endDate: string;
  paidPayments: number;
  totalPayments: number;
  paidAmount: number;
  remainingAmount: number;
  monthlyInterest: number;
  schedules: Array<{
    term: number;
    dueDate: string;
    payment: number;
    principal: number;
    balance: number;
    status: string;
    paidDate: string | null;
  }>;
}

export const LoanerDetails: React.FC<{ loanerId: number }> = ({ loanerId }) => {
  const [details, setDetails] = useState<LoanerDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await apiService.getLoanerDetails(loanerId);
        setDetails({
          ...data,
          schedules: data?.schedules || []
        });
      } catch (error) {
        console.error('Error fetching details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (loanerId) {
      fetchDetails();
    }
  }, [loanerId]);

  const calculateSummary = () => {
    if (!details) return null;

    // Filter paid schedules
    const paidSchedules = details.schedules.filter(s => s.paidDate);
    
    // Calculate total paid amount (sum of all paid payments)
    const paidAmount = paidSchedules.reduce((sum, s) => sum + Number(s.payment), 0);
    
    // Calculate total amount (loan amount + total interest)
    const monthlyInterest = Number(details.amount) * (details.interestRate / 100);
    const totalInterest = monthlyInterest * details.duration;
    const totalAmount = Number(details.amount) + totalInterest;
    
    // Calculate remaining amount
    const remainingAmount = totalAmount - paidAmount;

    return {
      paidPayments: paidSchedules.length,
      totalPayments: details.schedules.length,
      paidAmount: Number(paidAmount.toFixed(2)),
      remainingAmount: Number(remainingAmount.toFixed(2)),
      monthlyInterest: Number(monthlyInterest.toFixed(2))
    };
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
  
  if (!details) return (
    <div className="text-center text-gray-500 py-8">រកមិនឃើញទិន្នន័យ</div>
  );

  const summary = calculateSummary();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-lg p-8 text-gray-800 w-full"
    >
      {/* Loaner Info Card */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-10 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
          <FaUser className="text-blue-600" />
          ព័ត៌មានអ្នកខ្ចី
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <FaUser className="text-blue-600" />
              <span className="font-medium">ឈ្មោះ:</span>
              <span>{details.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <FaPhone className="text-blue-600" />
              <span className="font-medium">ទូរស័ព្ទ:</span>
              <span>{details.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-blue-600" />
              <span className="font-medium">អាសយដ្ឋាន:</span>
              <span>{details.address}</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <FaDollarSign className="text-blue-600" />
              <span className="font-medium">ចំនួនទឹកប្រាក់:</span>
              <span className="font-semibold text-blue-600">{details.amount} {details.currency}</span>
            </div>
            <div className="flex items-center gap-3">
              <FaPercentage className="text-blue-600" />
              <span className="font-medium">អត្រាការប្រាក់:</span>
              <span className="text-green-600 font-semibold">{details.interestRate}%</span>
            </div>
            <div className="flex items-center gap-3">
              <FaClock className="text-blue-600" />
              <span className="font-medium">រយៈពល:</span>
              <span>{details.duration} ខែ</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Payment Schedule */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-10 w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
          <FaCalendarAlt className="text-blue-600" />
          តារាងបង់ប្រាក់
        </h2>
        <div className="overflow-x-auto rounded-xl border border-gray-200 w-full">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ខែ</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">ការបង់សរុប</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">ប្���ាក់ដើម</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">សមតុល្យ</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">ស្ថានភាព</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">ថ្ងៃត្រវបង់</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">ថ្ងៃបានបង់</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {details.schedules.map((schedule) => (
                <motion.tr 
                  key={schedule.term}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">{schedule.term}</td>
                  <td className="px-6 py-4 text-right font-medium text-blue-600">{schedule.payment} {details.currency}</td>
                  <td className="px-6 py-4 text-right">{schedule.principal} {details.currency}</td>
                  <td className="px-6 py-4 text-right">{schedule.balance} {details.currency}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        schedule.paidDate 
                          ? 'bg-green-100 text-green-800 border border-green-200' 
                          : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                      }`}>
                        {schedule.paidDate ? 'បង់រួច' : 'មិនទាន់បង់'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">{new Date(schedule.dueDate).toLocaleDateString('km-KH')}</td>
                  <td className="px-6 py-4 text-center">
                    {schedule.paidDate ? new Date(schedule.paidDate).toLocaleDateString('km-KH') : '-'}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Payment Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">សង្ខេបការបង់ប្រាក់</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
              <span className="font-medium">បានបង់:</span>
              <span className="text-blue-600 font-semibold">{summary?.paidPayments}/{summary?.totalPayments} ដង</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
              <span className="font-medium">ប្រាក់បានបង់:</span>
              <span className="text-green-600 font-semibold">{summary?.paidAmount} {details.currency}</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
              <span className="font-medium">ប្រាក់នៅសល់:</span>
              <span className="text-red-600 font-semibold">{summary?.remainingAmount} {details.currency}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
              <span className="font-medium">ការប្រាក់ប្រចាំខែ:</span>
              <span className="text-blue-600 font-semibold">{summary?.monthlyInterest} {details.currency}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};