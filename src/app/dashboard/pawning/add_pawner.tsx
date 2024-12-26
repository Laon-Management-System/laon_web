'use client'
import React from 'react'
import { Form, Input, InputNumber, DatePicker, Select, Button, Typography, Space, Card } from 'antd'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { apiService } from '../../../services/api.service'
import dayjs from 'dayjs'
import { SaveOutlined, CloseOutlined } from '@ant-design/icons'

const { Title } = Typography

interface PawnerFormData {
  name: string
  phone: string
  gender: string
  address?: string
  itemPawned: string
  amount: number
  currency: 'USD' | 'KHR'
  duration: number
  startDate: dayjs.Dayjs
  interestRate: number
  description?: string
}

export default function AddPawner() {
  const router = useRouter()
  const [form] = Form.useForm()

  const handleSubmit = async (values: PawnerFormData) => {
    try {
      await apiService.createPawner({
        name: values.name,
        phone: values.phone,
        address: values.address || '',
        gender: values.gender,
        itemPawned: values.itemPawned,
        amount: values.amount,
        currency: values.currency,
        duration: values.duration,
        startDate: dayjs(values.startDate).format('YYYY-MM-DD'),
        interestRate: values.interestRate,
        description: values.description || ''
      })

      toast.success('បញ្ចាំត្រូវបានបន្ថែមដោយជោគជ័យ')
      router.push('/dashboard/pawning/pawner')
    } catch (error: any) {
      console.error('Failed to add pawner:', error)
      toast.error(error.response?.data?.message || 'មានបញ្ហាក្នុងការបន្ថែមការបញ្ចាំ')
    }
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="w-full px-4">
        <Card 
          bordered={false}
          className="shadow-xl rounded-2xl"
          styles={{ 
            body: { padding: '2rem' } 
          }}
        >
          <Title level={2} className="text-center mb-8">
            ថែមការបញ្ចាំថ្មី
          </Title>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{
              currency: 'USD',
              duration: 1,
              interestRate: 0,
              startDate: dayjs()
            }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <Form.Item
                name="name"
                label="ឈ្មោះ"
                rules={[{ required: true, message: 'សូមបញ្ចូលឈ្មោះ!' }]}
              >
                <Input size="large" className="rounded-lg" />
              </Form.Item>

              <Form.Item
                name="phone"
                label="លេខទូរស័ព្ទ"
                rules={[{ required: true, message: 'សូមបញ្ចូលលេខទូរស័ព្ទ!' }]}
              >
                <Input size="large" className="rounded-lg" />
              </Form.Item>

              <Form.Item
                name="itemPawned"
                label="វត្ថុបញ្ចាំ"
                rules={[{ required: true, message: 'សូមបញ្ចូលវត្ថុបញ្ចាំ!' }]}
              >
                <Input size="large" className="rounded-lg" />
              </Form.Item>

              <Form.Item
                name="amount"
                label="ចំនួនទឹកប្រាក់"
                rules={[{ required: true, message: 'សូមបញ្ចូលចំនួនទឹកប្រាក់!' }]}
              >
                <InputNumber 
                  size="large"
                  className="w-full rounded-lg"
                  formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value!.replace(/\$\s?|(,*)/g, '')}
                />
              </Form.Item>

              <Form.Item
                name="currency"
                label="រូបិយប័ណ្ណ"
                rules={[{ required: true, message: 'សូមជ្រើសរើសរូបិយប័ណ្ណ!' }]}
              >
                <Select size="large" className="rounded-lg">
                  <Select.Option value="USD">USD</Select.Option>
                  <Select.Option value="KHR">KHR</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="duration"
                label="រយៈពេល (ខែ)"
                rules={[{ required: true, message: 'សូមបញ្ចូលរយៈពេល!' }]}
              >
                <InputNumber min={1} size="large" className="w-full rounded-lg" />
              </Form.Item>

              <Form.Item
                name="startDate"
                label="ថ្ងៃចាប់ផ្តើម"
                rules={[{ required: true, message: 'សូមជ្រើសរើសថ្ងៃចាប់ផ្តើម!' }]}
              >
                <DatePicker size="large" className="w-full rounded-lg" />
              </Form.Item>

              <Form.Item
                name="interestRate"
                label="អត្រាការប្រាក់ (%)"
                rules={[{ required: true, message: 'សូមបញ្ចូលអត្រាការប្រាក់!' }]}
              >
                <InputNumber
                  min={0}
                  max={100}
                  step={0.01}
                  size="large"
                  className="w-full rounded-lg"
                />
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

            <Form.Item
              name="address"
              label="អាសយដ្ឋាន"
            >
              <Input.TextArea 
                rows={3}
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item
              name="description"
              label="ការពិពណ៌នា"
            >
              <Input.TextArea 
                rows={4}
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item className="flex justify-end mt-8">
              <Space size="middle">
                <Button 
                  size="large"
                  icon={<CloseOutlined />}
                  onClick={handleCancel}
                  className="rounded-lg"
                >
                  បោះបង់
                </Button>
                <Button
                  type="primary"
                  size="large"
                  icon={<SaveOutlined />}
                  htmlType="submit"
                  className="rounded-lg"
                >
                  រក្សាទុក
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  )
}
