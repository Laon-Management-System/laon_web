import React from 'react';
import { Card, Descriptions, Tag, Table, Divider } from 'antd';
import { PawnData } from '../../../../types/pawn.types';

interface PawnHistoryCardProps {
  pawnHistory: PawnData[];
}

export default function PawnHistoryCard({ pawnHistory }: PawnHistoryCardProps) {
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
      render: (amount: string) => <span className="text-lg">{Number(amount).toLocaleString()}</span>
    },
    {
      title: 'ថ្ងៃបានបង់',
      dataIndex: 'paidDate',
      key: 'paidDate',
      className: 'text-lg'
    },
    {
      title: 'ស្ថានភាព',
      dataIndex: 'status',
      key: 'status',
      className: 'text-lg',
      render: (status: string) => {
        const colors: { [key: string]: string } = {
          'មិនទាន់បង់': 'gold',
          'បង់រួច': 'green',
          'ហួសកាលកំណត់': 'red'
        }
        return <Tag className="text-lg" color={colors[status] || 'gold'}>{status}</Tag>
      }
    }
  ];

  return (
    <div className="space-y-6">
      {pawnHistory.map((pawn, index) => (
        <Card 
          key={pawn.id} 
          className="mb-6"
          title={
            <div className="flex justify-between items-center">
              <span>ប្រវត្តិបញ្ចាំ #{index + 1}</span>
              <Tag color={pawn.status === 'បានលោះ' ? 'green' : 'gold'}>
                {pawn.status}
              </Tag>
            </div>
          }
        >
          <Descriptions bordered className="text-lg">
            <Descriptions.Item label="វត្ថុបញ្ចាំ">{pawn.itemPawned}</Descriptions.Item>
            <Descriptions.Item label="ចំនួនទឹកប្រាក់">
              {pawn.currency} {Number(pawn.amount).toLocaleString()}
            </Descriptions.Item>
            <Descriptions.Item label="ការប្រាក់">{pawn.interestRate}%</Descriptions.Item>
            <Descriptions.Item label="រយៈពេល">{pawn.duration} ខែ</Descriptions.Item>
            <Descriptions.Item label="ថ្ងៃចាប់ផ្តើម">{pawn.startDate}</Descriptions.Item>
            <Descriptions.Item label="ថ្ងៃបញ្ចប់">{pawn.endDate}</Descriptions.Item>
            <Descriptions.Item label="ប្រាក់បង់ប្រចាំខែ">
              {pawn.currency} {Number(pawn.monthlyPayment).toLocaleString()}
            </Descriptions.Item>
            <Descriptions.Item label="ប្រាក់ត្រូវបង់សរុប">
              {pawn.currency} {Number(pawn.finalPayment).toLocaleString()}
            </Descriptions.Item>
            <Descriptions.Item label="បរិយាយ">{pawn.description}</Descriptions.Item>
          </Descriptions>

          {pawn.payments && (
            <>
              <Divider orientation="left">
                <span className="text-lg">តារាងបង់ប្រាក់</span>
              </Divider>
              <Table 
                columns={paymentColumns}
                dataSource={pawn.payments}
                rowKey="term"
                pagination={false}
                bordered
                className="text-lg"
              />
            </>
          )}
        </Card>
      ))}
    </div>
  );
} 