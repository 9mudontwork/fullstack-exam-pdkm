/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/display-name */

import { useEffect, useState } from 'react'
import Link from 'next/link'

import { Table, Tag, Space, Button, Popconfirm } from 'antd'
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'

import { productService } from 'services'
import { useRouter } from 'next/router'

export default function List() {
  const [fetching, setFetching] = useState(true)
  const [products, setProducts] = useState([])
  const [mounted, setMounted] = useState()

  useEffect(() => {
    if (!mounted) {
      productService.getAll().then((results) => {
        let datas = []

        results.data.map((item, index) => {
          datas.push({
            key: index,
            id: item.id,
            name: item.name,
            description: item.description,
            price: item.price,
            unit: item.unit,
          })
        })

        setFetching(false)
        setProducts(datas)

        // console.log(results)
      })
    }

    setMounted(true)
  }, [])

  const columns = [
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
      render: (text) => <a>{text}</a>,
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
      title: 'หน่วย',
      dataIndex: 'unit',
      key: 'unit',
    },
    {
      title: 'จัดการ',
      key: 'action',
      render: (text, record) => {
        return (
          <Space size="middle">
            <Link passHref href={`/product/edit/${record.id}`}>
              <Button icon={<EditOutlined />} size="small" />
            </Link>
            <Popconfirm
              title={() => {
                return (
                  <>
                    ต้องการลบใช่หรือไม่ ? <br />
                    สินค้าจะถูกนำออกจากทุกร้านค้า
                  </>
                )
              }}
              onConfirm={() => handleDelete(record)}
            >
              <Button danger icon={<DeleteOutlined />} size="small" />
            </Popconfirm>
          </Space>
        )
      },
    },
  ]

  function handleDelete(record) {
    if (deleteStore(record.id)) {
      const dataSource = [...products]
      setProducts(dataSource.filter((item) => item.key !== record.key))
    }
  }

  function deleteStore(id) {
    setFetching(true)

    return productService
      .delete(id)
      .then((result) => {
        // console.log('success del: ' + result)
        setFetching(false)
        return true
      })
      .catch((error) => {
        // console.log('success err: ' + error)

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
      <Link href="/product/create">
        <a>
          <Button icon={<PlusOutlined />}>เพิ่มสินค้า</Button>
        </a>
      </Link>
      <Table
        className="mt-4"
        loading={fetching}
        columns={columns}
        dataSource={products}
        pagination={{
          defaultCurrent: 1,
          total: products.length,
          defaultPageSize: 10,
        }}
      />
    </>
  )
}
