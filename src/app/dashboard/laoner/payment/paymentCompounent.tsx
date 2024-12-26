'use client'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMoneyBillWave, FaCalendarAlt, FaTimes } from 'react-icons/fa';
import { apiService } from '../../../../services/api.service';
import { toast } from 'react-hot-toast';

interface PaymentComponentProps {
  loanerId: number;
  scheduleId?: number;
}

interface Schedule {
  id: number;
  term: number;
  dueDate: string;
  payment: number;
  principal: number;
  balance: number;
  status: string;
  paidDate: string | null;
}

export const PaymentComponent: React.FC<PaymentComponentProps> = ({ loanerId, scheduleId }) => {
  const [amount, setAmount] = useState<string>('');
  const [paymentDate, setPaymentDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [loading, setLoading] = useState(false);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [selectedSchedule, setSelectedSchedule] = useState<number | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const data = await apiService.getLoanerDetails(loanerId);
        setSchedules(data.schedules || []);
      } catch (error) {
        console.error('Error fetching schedules:', error);
        toast.error('មានបញ្ហាក្នុងការទាញយកកាលវិភាគ');
      }
    };

    fetchSchedules();
  }, [loanerId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSchedule) {
      toast.error('សូមជ្រើសរើសកាលវិភាគបង់ប្រាក់');
      return;
    }
    
    setLoading(true);

    try {
      await apiService.makePayment({
        loanerId,
        scheduleId: selectedSchedule,
        amount: parseFloat(amount),
        paymentDate
      });
      
      toast.success('ការបង់ប្រាក់បានជោគជ័យ');
      setAmount('');
      setSelectedSchedule(null);
      setShowPaymentModal(false);
      
      // Refresh schedules after payment
      const data = await apiService.getLoanerDetails(loanerId);
      setSchedules(data.schedules || []);
      
    } catch (error) {
      console.error('Error making payment:', error);
      toast.error('មានបញ្ហាក្នុងការបង់ប្រាក់');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto text-black">
      <div className="overflow-x-auto rounded-xl border border-gray-200 mb-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ដង</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">កាលបរិច្ឆេទ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ចំនួនទឹកប្រាក់</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ស្ថានភាព</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">សកម្មភាព</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {schedules.map((schedule) => (
              <tr key={schedule.id}>
                <td className="px-6 py-4 whitespace-nowrap">{schedule.term}</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(schedule.dueDate).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">${schedule.payment}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    schedule.status === 'PAID' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {schedule.status === 'PAID' ? 'បានបង់រួច' : 'មិនទាន់បង់'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => {
                      setSelectedSchedule(schedule.id);
                      setAmount(schedule.payment.toString());
                      setShowPaymentModal(true);
                    }}
                    disabled={schedule.status === 'PAID'}
                    className={`px-4 py-2 rounded-lg text-sm ${
                      schedule.status === 'PAID'
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {schedule.status === 'PAID' ? 'បានបង់រួច' : 'បង់ប្រាក់'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {showPaymentModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-xl p-6 w-full max-w-md relative"
            >
              <button
                onClick={() => setShowPaymentModal(false)}
                className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
              
              <h2 className="text-xl font-bold mb-6">បង់ប្រាក់</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ចំនួនទឹកប្រាក់
                  </label>
                  <div className="relative">
                    <FaMoneyBillWave className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="text-black pl-10 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-3"
                      placeholder="បញ្ចូលចំនួនទឹកប្រាក់"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    កាលបរិច្ឆេទបង់ប្រាក់
                  </label>
                  <div className="relative">
                    <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="date"
                      value={paymentDate}
                      onChange={(e) => setPaymentDate(e.target.value)}
                      className="text-black pl-10 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-3"
                      required
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-blue-600 text-white rounded-lg py-3 px-4 hover:bg-blue-700 transition-colors duration-200 ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? 'កំពុងដំណើរការ...' : 'បង់ប្រាក់'}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
