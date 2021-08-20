/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import {
  Form,
  Input,
  Button,
  Checkbox,
  Row,
  Col,
  Alert,
  Descriptions,
  Table,
  Popconfirm,
} from 'antd'
import MinimartLayout from '@/layouts/MinimartLayout'
import { storeService } from 'services'
import Link from 'next/link'
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'

export default function View(props) {
  const storeData = props?.storeData
  const router = useRouter()
  const [form] = Form.useForm()
  const [fetching, setFetching] = useState(false)
  const [productTable, setProductTable] = useState([])

  useEffect(() => {
    if (storeData.status === 200) {
      // form.setFieldsValue(storeData.data)
    }

    if (storeData.status === 404) {
      //
    }
  }, [storeData])

  useEffect(() => {
    let datas = []

    const { products } = storeData.data

    products.map((item, index) => {
      datas.push({
        key: index,
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        unit: item.unit,
      })
    })
    setProductTable(datas)
  }, [storeData])

  const productColumns = [
    {
      title: '#',
      dataIndex: 'key',
      key: 'key',
      render: (key) => key + 1,
    },
    {
      title: 'ชื่อสินค้า',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <>
          <Link href={`/products/${record.id}`}>
            <a>{text}</a>
          </Link>
        </>
      ),
    },
    {
      title: 'รายละเอียดสินค้า',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'ราคาสินค้า',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'หน่วยสินค้า',
      dataIndex: 'unit',
      key: 'unit',
    },
    {
      title: 'จัดการ',
      key: 'action',
      render: (text, record) => {
        return (
          <Space size="middle">
            <Link passHref href={`/store/edit/${record.id}`}>
              <Button icon={<EditOutlined />} size="small" />
            </Link>
            <Popconfirm title="ต้องการลบใช่หรือไม่ ?" onConfirm={() => handleDelete(record)}>
              <Button danger icon={<DeleteOutlined />} size="small" />
            </Popconfirm>
          </Space>
        )
      },
    },
  ]

  const { store, poducts } = storeData.data

  return (
    <>
      <MinimartLayout title={`แก้ไขข้อมูลร้านค้า: ${store.name}`}>
        {/* https://ant.design/components/descriptions/ */}
        <Descriptions title="ข้อมูลร้านค้า">
          <Descriptions.Item label="ชื่อร้านค้า">{store.name}</Descriptions.Item>
          <Descriptions.Item label="คำอธิบายร้านค้า">{store.description}</Descriptions.Item>
          <Descriptions.Item label="เบอร์โทรศัพท์">{store.phone_number}</Descriptions.Item>
          <Descriptions.Item label="ที่อยู่">{store.address}</Descriptions.Item>
        </Descriptions>

        <p className="mt-4 text-base font-semibold">รายการสินค้าทั้งหมดภายในร้านค้า</p>
        <Button icon={<PlusOutlined />}>เพิ่มสินค้า</Button>
        <Table
          className="mt-4"
          loading={fetching}
          columns={productColumns}
          dataSource={productTable}
          pagination={{
            defaultCurrent: 1,
            total: productTable.length,
            defaultPageSize: 10,
          }}
        />
      </MinimartLayout>
    </>
  )
}
