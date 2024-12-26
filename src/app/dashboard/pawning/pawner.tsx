'use client'
import React, { useState, useEffect } from 'react'
import {
  Table,
  Input,
  Select,
  Space,
  message,
  Modal,
} from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import type { Pawner } from '../../../types/pawn.types'
import { PawnerStatus } from '../../../types/pawn.types'
import { PawnerService } from '../../../services/pawner.service'
import { useRouter } from 'next/navigation'
import PawnerDetail from './pawnerDetail'

export default function Pawner() {
  const router = useRouter()
  const [pawners, setPawners] = useState<Pawner[]>([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [status, setStatus] = useState<PawnerStatus | undefined>()
  const [selectedPawnerId, setSelectedPawnerId] = useState<number | null>(null)
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false)

  const fetchPawners = async () => {
    try {
      setLoading(true)
      const response = await PawnerService.search(searchQuery, status)
      console.log('Fetched data:', response) // Add this for debugging
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
  }, [searchQuery, status])

  const handleAddNew = () => {
    router.push('/dashboard/pawning/add_pawner')
  }

  const handleEdit = (record: Pawner) => {
    router.push(`/dashboard/pawning/edit_pawner/${record.id}`)
  }

  const handleViewDetails = (record: Pawner) => {
    router.push(`/dashboard/pawning/details/${record.id}`)
  }

  const handleRowClick = (record: Pawner) => {
    setSelectedPawnerId(record.id)
    setIsDetailModalVisible(true)
  }

  const handleModalClose = () => {
    setIsDetailModalVisible(false)
    setSelectedPawnerId(null)
  }

  const columns = [
    {
      title: 'ឈ្មោះ',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'លេទ',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'លេខទូរស័ព្ទ',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'អត្ថុបញ្ចាំ',
      dataIndex: 'itemPawned',
      key: 'itemPawned',
    },
    {
      title: 'ចំនួនទឹកប្រាក់',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number, record: Pawner) => 
        `${record.currentPawn.currency} ${amount.toLocaleString()}`
    },
    {
      title: 'ការប្រាក់',
      dataIndex: 'interestRate',
      key: 'interestRate',
      render: (rate: string) => `${rate}%`
    },
    {
      title: 'រយៈពេល',
      dataIndex: 'duration',
      key: 'duration',
      render: (duration: number) => `${duration} ខែ`
    },
    {
      title: 'ស្ថានភាព',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <span className={`px-2 py-1 rounded-full text-sm ${
          status === 'កំពុងដញ្ចាំ' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {status}
        </span>
      )
    }
  ]

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-black">អ្នកបញ្ចាំ</h1>
          <Space>
            <Input
              placeholder="ស្វែងរក..."
              prefix={<SearchOutlined />}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: 200 }}
            />
            <Select
              placeholder="ស្ថានភាព"
              allowClear
              style={{ width: 120 }}
              onChange={(value) => setStatus(value)}
            >
              <Select.Option value={PawnerStatus.ACTIVE}>កំពុងបញ្ចាំ</Select.Option>
              <Select.Option value={PawnerStatus.COMPLETED}>បានលោះ</Select.Option>
            </Select>
          </Space>
        </div>

        <Table
          columns={columns}
          dataSource={pawners}
          rowKey="id"
          loading={loading}
          pagination={false}
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
            style: { cursor: 'pointer' }
          })}
        />
      </div>

      <Modal
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
