import React, {memo, useEffect, useState} from 'react'
import {Table, Tag} from 'antd'
import {ColumnsType} from 'antd/es/table'

type TagType = 'success' | 'pending'

interface TransactionProps {
  key: number
  order_no: string
  price?: number
  tag?: TagType
}

const columns: ColumnsType<TransactionProps> = [
  {
    title: 'Order_No',
    dataIndex: 'order_no',
    key: 'order_no',
    width: 200,
    align: 'center',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    width: 195,
    align: 'center',
    render: (text: any) => `$${text}`,
  },
  {
    title: 'Status',
    key: 'tag',
    dataIndex: 'tag',
    align: 'center',
    width: 100,
    // eslint-disable-next-line
    render: function (tag: any) {
      const color = tag === 'pending' ? 'magenta' : 'green'
      return (
        <Tag color={color} key={tag}>
          {tag}
        </Tag>
      )
    },
  },
]

const TransactionTable: React.FC = () => {
  const [tableList, setTableList] = useState<TransactionProps[]>([])

  useEffect(() => {
  }, [])

  return (
    <div>
      <Table columns={columns} dataSource={tableList} pagination={false} />
    </div>
  )
}

export default memo(TransactionTable)
