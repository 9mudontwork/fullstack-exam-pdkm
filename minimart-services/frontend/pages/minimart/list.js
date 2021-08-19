/* eslint-disable react/display-name */

import { useEffect, useState } from 'react'
import Link from 'next/link'

import { Table, Tag, Space, Button, Popconfirm } from 'antd'
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'

import { storeService } from 'services'

export default function List() {
  const [fetching, setFetching] = useState(true)
  const [stores, setStores] = useState([])

  useEffect(() => {
    storeService.getAll().then((results) => {
      let datas = []

      results.data.map((item, index) => {
        datas.push({
          key: index,
          id: item.id,
          name: item.name,
          description: item.description,
          phone_number: item.phone_number,
          address: item.address,
        })
      })

      setFetching(false)
      setStores(datas)

      console.log(results)
    })
  }, [])

  const columns = [
    {
      title: '#',
      dataIndex: 'key',
      key: 'key',
      render: (key) => key + 1,
    },
    {
      title: 'ชื่อร้านค้า',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'คำอธิบายร้านค้า',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'เบอร์ติดต่อร้านค้า',
      dataIndex: 'phone_number',
      key: 'phone_number',
    },
    {
      title: 'ที่อยู่ร้านค้า',
      dataIndex: 'address',
      key: 'address',
    },
    // {
    //   title: 'Tags',
    //   key: 'tags',
    //   dataIndex: 'tags',
    //   render: (tags) => (
    //     <>
    //       {tags.map((tag) => {
    //         let color = tag.length > 5 ? 'geekblue' : 'green'
    //         if (tag === 'loser') {
    //           color = 'volcano'
    //         }
    //         return (
    //           <Tag color={color} key={tag}>
    //             {tag.toUpperCase()}
    //           </Tag>
    //         )
    //       })}
    //     </>
    //   ),
    // },
    {
      title: 'จัดการ',
      key: 'action',
      render: (text, record) => {
        return (
          <Space size="middle">
            <Button icon={<EditOutlined />} size="small" />
            <Popconfirm title="ต้องการลบใช่หรือไม่ ?" onConfirm={() => handleDelete(record)}>
              <Button danger icon={<DeleteOutlined />} size="small" />
            </Popconfirm>
          </Space>
        )
      },
    },
  ]

  function handleDelete(record) {
    if (deleteStore(record.id)) {
      const dataSource = [...stores]
      setStores(dataSource.filter((item) => item.key !== record.key))
    }
  }

  function deleteStore(id) {
    setFetching(true)

    return storeService
      .delete(id)
      .then((result) => {
        console.log(result)
        setFetching(false)
        return true
      })
      .catch((error) => {
        console.log(error)

        if (error.status === 400) {
          let message = ''
          for (const [index, errorMessages] of Object.entries(error.message)) {
            errorMessages.forEach((errorMessage) => {
              message += `<span>${errorMessage}</span><br>`
            })
          }
          Swal.fire({
            icon: 'error',
            allowOutsideClick: false,
            backdrop: true,
            confirmButtonColor: '#1890FF',
            confirmButtonText: 'ตกลง',
            html: `<div>${message}</div>`,
          })
        } else {
          Swal.fire({
            icon: 'error',
            allowOutsideClick: false,
            backdrop: true,
            confirmButtonColor: '#1890FF',
            confirmButtonText: 'ตกลง',
            text: 'เกิดข้อผิดพลาดบางอย่าง ไม่สามารถลบข้อมูลได้',
          })
        }

        setFetching(false)
        return false
      })
  }

  return (
    <>
      <Link href="/minimart/create">
        <a>
          <Button icon={<PlusOutlined />}>เพิ่มร้านค้า</Button>
        </a>
      </Link>
      <Table
        className="mt-4"
        loading={fetching}
        columns={columns}
        dataSource={stores}
        pagination={{
          defaultCurrent: 1,
          total: stores.length,
          defaultPageSize: 10,
        }}
      />
    </>
  )
}
