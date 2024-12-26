'use client'
import React, { useEffect, useState } from 'react'
import { Card, Table, Tag, Descriptions, Divider, Spin, Form, Input, InputNumber, DatePicker, Select, Button, message, Empty } from 'antd'
import { PawnerService } from '../../../services/pawner.service'
import type { Pawner } from '../../../types/pawn.types'
import dayjs from 'dayjs'
import { SaveOutlined, CloseOutlined, DownloadOutlined } from '@ant-design/icons'
import PawnHistoryCard from './components/PawnHistoryCard'

interface PaymentSchedule {
  id: number;
  pawnerId: number;
  term: number;
  amount: string;
  status: string;
  dueDate: string;
  paidDate: string | null;
  createdAt: string;
  updatedAt: string;
}

interface Props {
  id: number;
  mode?: 'view' | 'edit';
  onClose?: () => void;
}

export default function PawnerDetail({ id, mode = 'view', onClose }: Props) {
  const [form] = Form.useForm<Pawner>()
  const [pawner, setPawner] = useState<Pawner | null>(null)
  const [loading, setLoading] = useState(true)
  const [payments, setPayments] = useState<PaymentSchedule[]>([])
  const [showHistory, setShowHistory] = useState(false)

  useEffect(() => {
    const fetchPawnerDetails = async () => {
      try {
        setLoading(true)
        const data = await PawnerService.getById(id)
        setPawner(data)
        setPayments(data?.payments || [])
        if (mode === 'edit') {
          form.setFieldsValue({
            ...data,
            startDate: dayjs(data.startDate)
          })
        }
      } catch (error) {
        console.error('Error fetching pawner details:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPawnerDetails()
  }, [id, form, mode])

  const handleSubmit = async (values: Partial<Pawner>) => {
    try {
      const changedValues = form.getFieldsValue();
      const updateData = {
        name: changedValues.name,
        phone: changedValues.phone,
        address: changedValues.address,
        gender: changedValues.gender,
        currentPawn: {
          itemPawned: changedValues.currentPawn?.itemPawned,
          amount: changedValues.currentPawn?.amount?.toString(),
          duration: Number(changedValues.currentPawn?.duration),
          interestRate: changedValues.currentPawn?.interestRate?.toString(),
          description: changedValues.currentPawn?.description
        }
      };

      await PawnerService.updatePawner(id, updateData);
      message.success('បានកែប្រែដោយជោគជ័យ');
      onClose?.();
    } catch (error) {
      console.error('Error updating pawner:', error);
      message.error('មានបញ្ហាក្នុងការកែប្រែ');
    }
  };

  const handleDownload = async () => {
    try {
      if (!pawner) return;
      await PawnerService.downloadPaymentTable(id, pawner.name);
      message.success('បានទាញយកតារាងដោយជោគជ័យ');
    } catch (error) {
      console.error('Error downloading table:', error);
      message.error('មានបញ្ហាក្នុង���ារទាញយកតារាង');
    }
  };

  const paymentColumns = [
    {
      title: 'ដង',
      dataIndex: 'term',
      key: 'term',
      className: 'text-lg'
    },
    {
      title: 'ថ្ងៃត្រូវបង់',
      dataIndex: 'dueDate',
      key: 'dueDate',
      className: 'text-lg'
    },
    {
      title: 'ប្រូវបង់',
      dataIndex: 'amount',
      key: 'amount',
      className: 'text-lg',
      render: (amount: string | number) => <span className="text-lg">{Number(amount).toLocaleString()}</span>
    },
    {
      title: 'ស្ថានភាព',
      dataIndex: 'status',
      key: 'status',
      className: 'text-lg',
      render: (status: string) => {
        const colors: { [key: string]: string } = {
          'មិនទាន់បង់': 'gold',
          'បានបង់': 'green',
          'ហួសកាលកំណត់': 'red'
        }
        return <Tag className="text-lg" color={colors[status] || 'gold'}>{status}</Tag>
      }
    }
  ]

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><Spin size="large" /></div>
  }

  if (!pawner) {
    return <div className="text-lg">No data found</div>
  }

  if (mode === 'edit') {
    return (
      <div className="p-6">
        <Card className="mb-6">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="space-y-6"
            initialValues={{
              ...pawner,
              startDate: pawner ? dayjs(pawner.currentPawn.startDate) : undefined
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <Form.Item
                name="name"
                label="ឈ្មោះ"
                rules={[{ required: true, message: 'សូមបញ្ចូលឈ្មោះ!' }]}
              >
                <Input size="large" />
              </Form.Item>

              <Form.Item
                name="phone"
                label="លេខទូរស័ព្ទ"
                rules={[{ required: true, message: 'សូមបញ្ចូលលេខទូរស័ព្ទ!' }]}
              >
                <Input size="large" />
              </Form.Item>

              <Form.Item
                name={['currentPawn', 'itemPawned']}
                label="វត្ថុបញ្ចាំ"
                rules={[{ required: true, message: 'សូមបញ្ចូលត្ថុបញ្ចាំ!' }]}
              >
                <Input size="large" />
              </Form.Item>

              <Form.Item
                name={['currentPawn', 'amount']}
                label="ចំនួនទឹកប្រាក់"
                rules={[{ required: true, message: 'សូមបញ្ចូលចំនួនទឹកប្រាក់!' }]}
              >
                <InputNumber size="large" className="w-full" />
              </Form.Item>

              <Form.Item
                name="currency"
                label="រូបិយប័ណ្ណ"
                rules={[{ required: true, message: 'សូមជ្រើសរើសរូបិយប័ណ្ណ!' }]}
              >
                <Select size="large">
                  <Select.Option value="USD">USD</Select.Option>
                  <Select.Option value="KHR">KHR</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="duration"
                label="រយៈពេល (ខែ)"
                rules={[{ required: true, message: 'សូមបញ្ចូលរយៈពេល!' }]}
              >
                <InputNumber min={1} size="large" className="w-full" />
              </Form.Item>

              <Form.Item
                name="startDate"
                label="ថ្ងៃចាប់ផ្តើម"
                rules={[{ required: true, message: 'សូមជ្រើសរើសថ្ងៃចាប់ផ្តើម!' }]}
              >
                <DatePicker size="large" className="w-full" />
              </Form.Item>

              <Form.Item
                name="interestRate"
                label="អត្រាការប្រាក់ (%)"
                rules={[{ required: true, message: 'សូមបញ្ចូលអត្រាការប្���ាក់!' }]}
              >
                <InputNumber min={0} max={100} step={0.01} size="large" className="w-full" />
              </Form.Item>

              <Form.Item
                name="gender"
                label="ភេទ"
                rules={[{ required: true, message: 'សូមជ្រើសរើសភេទ!' }]}
              >
                <Select size="large">
                  <Select.Option value="ប្រុស">ប្រុស</Select.Option>
                  <Select.Option value="ស្រី">ស្រី</Select.Option>
                </Select>
              </Form.Item>
            </div>

            <Form.Item name="address" label="អាសយដ្ឋាន">
              <Input.TextArea rows={3} />
            </Form.Item>

            <Form.Item className="flex justify-end mt-8">
              <Button.Group>
                <Button 
                  size="large"
                  icon={<CloseOutlined />}
                  onClick={onClose}
                >
                  បោះបង់
                </Button>
                <Button
                  type="primary"
                  size="large"
                  icon={<SaveOutlined />}
                  htmlType="submit"
                >
                  រក្សាទុក
                </Button>
              </Button.Group>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">ព័ត៌មានលម្អិត</h2>
        <Button 
          type="primary"
          icon={<DownloadOutlined />}
          onClick={() => handleDownload()}
          className="bg-blue-500"
        >
          ទាញយកតារាងបង់ប្រាក់
        </Button>
      </div>

      <Card className="mb-6" styles={{ body: { padding: '1.5rem' } }}>
        <Descriptions bordered className="text-lg">
          <Descriptions.Item label="ឈ្មោះ"><span className="text-lg">{pawner.name}</span></Descriptions.Item>
          <Descriptions.Item label="ភេទ"><span className="text-lg">{pawner.gender}</span></Descriptions.Item>
          <Descriptions.Item label="លេខទូរស័ព្ទ"><span className="text-lg">{pawner.phone}</span></Descriptions.Item>
          <Descriptions.Item label="អាសយដ្ឋាន"><span className="text-lg">{pawner.address}</span></Descriptions.Item>
          <Descriptions.Item label="វ្ថុបញ្ចាំ">
            <span className="text-lg">{pawner.currentPawn.itemPawned}</span>
          </Descriptions.Item>
          <Descriptions.Item label="ចំនួនទឹកប្រាក់">
            <span className="text-lg">
              {pawner.currentPawn.currency} {pawner.currentPawn.amount.toLocaleString()}
            </span>
          </Descriptions.Item>
          <Descriptions.Item label="ការប្រាក់">
            <span className="text-lg">{pawner.currentPawn.interestRate}%</span>
          </Descriptions.Item>
          <Descriptions.Item label="រយៈពេល">
            <span className="text-lg">{pawner.currentPawn.duration} ខែ</span>
          </Descriptions.Item>
          <Descriptions.Item label="ថ្ងៃចាប់ផ្តើម">
            <span className="text-lg">{pawner.currentPawn.startDate}</span>
          </Descriptions.Item>
          <Descriptions.Item label="ថ្ងៃបញ្ចប់">
            <span className="text-lg">{pawner.currentPawn.endDate}</span>
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Divider orientation="left"><span className="text-xl">តារាងបង់ប្រាក់</span></Divider>
      
      <Table 
        columns={paymentColumns}
        dataSource={payments}
        rowKey="term"
        pagination={false}
        bordered
        className="text-lg"
        summary={pageData => {
          const totalAmount = pageData.reduce((sum, payment) => sum + Number(payment.amount), 0)

          return (
            <Table.Summary.Row className="text-lg">
              <Table.Summary.Cell index={0} colSpan={2}>សរុប</Table.Summary.Cell>
              <Table.Summary.Cell index={2}>{totalAmount.toLocaleString()}</Table.Summary.Cell>
              <Table.Summary.Cell index={3}></Table.Summary.Cell>
            </Table.Summary.Row>
          )
        }}
      />

      <Button
        type="default"
        onClick={() => setShowHistory(!showHistory)}
        className="mb-4"
      >
        {showHistory ? 'លាក់ប្រវត្តិ' : 'បង្ហាញប្រវត្តិ'}
      </Button>

      {showHistory && pawner.pawnHistory && pawner.pawnHistory.length > 0 ? (
        <PawnHistoryCard pawnHistory={pawner.pawnHistory} />
      ) : showHistory && (
        <Empty description="មិនមានប្រវត្តិបញ្ចាំ" />
      )}
    </div>
  )
}
