'use client'
import React, { useState, useEffect } from 'react'
import { Table, Button, Space, Modal, message, Popconfirm } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { PawnerService } from '../../../services/pawner.service'
import type { Pawner } from '../../../types/pawn.types'
import { motion } from 'framer-motion'
import dayjs from 'dayjs'
import PawnerDetail from './pawnerDetail'

export default function UpdateDeletePawner() {
  const [pawners, setPawners] = useState<Pawner[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPawner, setSelectedPawner] = useState<Pawner | null>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const fetchPawners = async () => {
    try {
      setLoading(true)
      const response = await PawnerService.search()
      setPawners(response.data || [])
    } catch (error) {
      console.error('Error fetching pawners:', error)
      message.error('មានបញ្ហាក្នុងការទញយកទិន្នន័យ')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPawners()
  }, [])

  const handleEdit = (record: Pawner) => {
    setSelectedPawner(record)
    setIsModalVisible(true)
  }

  const handleDelete = async (id: number) => {
    try {
      await PawnerService.deletePawner(id)
      message.success('បានលុបដោយជោគជ័យ')
      fetchPawners() // Refresh the list
    } catch (error) {
      message.error('មានបញ្ហាក្នុងការលុប')
    }
  }

  const columns = [
    {
      title: 'ឈ្មោះ',
      dataIndex: 'name',
      key: 'name',
      className: 'text-lg'
    },
    {
      title: 'លេខទូរស័ព្ទ',
      dataIndex: 'phone',
      key: 'phone',
      className: 'text-lg'
    },
    {
      title: 'វត្ថុបញ្ចាំ',
      dataIndex: 'itemPawned',
      key: 'itemPawned',
      className: 'text-lg'
    },
    {
      title: 'ចំនួនទឹកប្រាក់',
      dataIndex: 'amount',
      key: 'amount',
      className: 'text-lg',
      render: (amount: number, record: Pawner) => 
        `${record.currentPawn.currency} ${amount.toLocaleString()}`
    },
    {
      title: 'ការប្រាក់',
      dataIndex: 'interestRate',
      key: 'interestRate',
      className: 'text-lg',
      render: (rate: string) => `${rate}%`
    },
    {
      title: 'រយៈពេល',
      dataIndex: 'duration',
      key: 'duration',
      className: 'text-lg',
      render: (duration: number) => `${duration} ខែ`
    },
    {
      title: 'សកម្មភាព',
      key: 'action',
      className: 'text-lg',
      render: (_: any, record: Pawner) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            className="bg-blue-500"
          >
            កែប្រែ
          </Button>
          <Popconfirm
            title="តើអ្នកប្រាកដថាចង់លុបមែនទេ?"
            onConfirm={() => handleDelete(record.id)}
            okText="យល់ព្រម"
            cancelText="បោះបង់"
          >
            <Button 
              danger 
              icon={<DeleteOutlined />}
            >
              លុប
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">កែប្រែអ្នកបញ្ចាំ</h2>

          <Table
            columns={columns}
            dataSource={pawners}
            rowKey="id"
            loading={loading}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `សរុប ${total} ជួរ`
            }}
            className="text-lg"
            bordered
          />
        </div>
      </motion.div>

      <Modal
        title="កែប្រែអ្នកបញ្ចាំ"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
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
        {selectedPawner && (
          <PawnerDetail 
            id={selectedPawner.id} 
            mode="edit" 
            onClose={() => {
              setIsModalVisible(false)
              fetchPawners() // Refresh the list after update
            }}
          />
        )}
      </Modal>
    </div>
  )
}
