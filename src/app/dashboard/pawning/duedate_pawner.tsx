'use client'
import React, { useState, useEffect } from 'react'
import { Table, Tag, message, Modal, DatePicker } from 'antd'
import { PawnerService } from '../../../services/pawner.service'
import { motion } from 'framer-motion'
import dayjs from 'dayjs'
import PawnerDetail from './pawnerDetail'

interface DuePayment {
  paymentId: number;
  pawnerId: number;
  pawnerName: string;
  pawnerPhone: string;
  term: number;
  amount: string;
  dueDate: string;
  daysOverdue: number;
}

export default function DueDatePawner() {
  const [payments, setPayments] = useState<DuePayment[]>([])
  const [filteredPayments, setFilteredPayments] = useState<DuePayment[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPawnerId, setSelectedPawnerId] = useState<number | null>(null)
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false)
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs()) // Initialize with today's date

  useEffect(() => {
    const fetchDuePayments = async () => {
      try {
        setLoading(true)
        console.log('Starting to fetch due payments...')
        const response = await PawnerService.getDueDatePawners()
        console.log('Component received response:', response)
        if (response.data && Array.isArray(response.data)) {
          console.log('Setting payments with:', response.data)
          setPayments(response.data)
          // Filter for today's payments by default
          const todayPayments = response.data.filter(payment => {
            const paymentDate = dayjs(payment.dueDate)
            return paymentDate.isSame(dayjs(), 'day')
          })
          setFilteredPayments(todayPayments)
        } else {
          console.warn('Received invalid data format:', response)
          setPayments([])
          setFilteredPayments([])
        }
      } catch (error) {
        console.error('Component error:', error)
        message.error('មានបញ្ហាក្នុងការទញយកទិន្នន័យ')
        setPayments([])
        setFilteredPayments([])
      } finally {
        setLoading(false)
      }
    }

    fetchDuePayments()
  }, [])

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    setSelectedDate(date || dayjs())
    if (!date) {
      const todayPayments = payments.filter(payment => {
        const paymentDate = dayjs(payment.dueDate)
        return paymentDate.isSame(dayjs(), 'day')
      })
      setFilteredPayments(todayPayments)
      return
    }

    const filtered = payments.filter(payment => {
      const paymentDate = dayjs(payment.dueDate)
      return paymentDate.isSame(date, 'day')
    })
    setFilteredPayments(filtered)
  }

  const columns = [
    {
      title: 'ឈ្មោះ',
      dataIndex: 'pawnerName',
      key: 'pawnerName',
      className: 'text-lg'
    },
    {
      title: 'លេខទូរស័ព្ទ',
      dataIndex: 'pawnerPhone',
      key: 'pawnerPhone',
      className: 'text-lg'
    },
    {
      title: 'ដង',
      dataIndex: 'term',
      key: 'term',
      className: 'text-lg'
    },
    {
      title: 'ចំនួនទឹកប្រាក់ត្រូវបង់',
      dataIndex: 'amount',
      key: 'amount',
      className: 'text-lg',
      render: (amount: string) => (
        <span>USD {Number(amount).toLocaleString()}</span>
      )
    },
    {
      title: 'ថ្ងៃត្រូវបង់',
      dataIndex: 'dueDate',
      key: 'dueDate',
      className: 'text-lg',
      render: (date: string) => dayjs(date).format('DD/MM/YYYY')
    },
    {
      title: 'ស្ងៃហួសកាលកំណត់',
      dataIndex: 'daysOverdue',
      key: 'daysOverdue',
      className: 'text-lg',
      render: (days: number) => (
        <Tag color={days > 0 ? 'red' : 'green'} className="text-lg">
          {days > 0 ? `${days} ថ្ងៃ` : 'មិនទាន់ដល់'}
        </Tag>
      )
    }
  ]

  const handleRowClick = (record: DuePayment) => {
    setSelectedPawnerId(record.pawnerId)
    setIsDetailModalVisible(true)
  }

  const handleModalClose = () => {
    setIsDetailModalVisible(false)
    setSelectedPawnerId(null)
  }

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">អ្នកបញ្ចាំដែលដល់ថ្ងៃបង់ប្រាក់</h2>
            <DatePicker 
              onChange={handleDateChange}
              placeholder="ជ្រើសរើសកាលបរិច្ឆេទ"
              className="text-lg"
              format="DD/MM/YYYY"
              defaultValue={dayjs()}
            />
          </div>

          <Table
            columns={columns}
            dataSource={filteredPayments}
            rowKey="paymentId"
            loading={loading}
            onRow={(record) => ({
              onClick: () => handleRowClick(record),
              style: { cursor: 'pointer' }
            })}
            className="text-lg"
            bordered
          />
        </div>
      </motion.div>

      <Modal
        title="ព័ត៌មានលម្អិត"
        open={isDetailModalVisible}
        onCancel={handleModalClose}
        footer={null}
        width="100%"
        style={{ 
          maxWidth: '100%', 
          top: 0, 
          paddingBottom: 0,
          height: '100vh'
        }}
        bodyStyle={{ 
          height: 'calc(100vh - 55px)',
          overflow: 'auto'
        }}
        className="full-screen-modal"
      >
        {selectedPawnerId && (
          <PawnerDetail id={selectedPawnerId} />
        )}
      </Modal>
    </div>
  )
}
