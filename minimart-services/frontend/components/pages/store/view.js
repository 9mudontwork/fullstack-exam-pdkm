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
  Space,
  Modal,
  Select,
} from 'antd'
import MinimartLayout from '@/layouts/MinimartLayout'
import { storeService } from 'services'
import Link from 'next/link'
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'

export default function View(props) {
  const storeData = props?.storeData
  const router = useRouter()
  const [addProductForm] = Form.useForm()
  const [fetching, setFetching] = useState(false)
  const [productTable, setProductTable] = useState([])
  const [visibleModal, setVisibleModal] = useState(false)
  const { Option } = Select

  useEffect(() => {
    //
  }, [])

  useEffect(() => {
    let datas = []

    const { products, store } = storeData.data

    products.map((item, index) => {
      datas.push({
        key: index,
        storeId: store.id,
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
          <Link href={`/product/${record.id}`}>
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
      title: 'ราคาสินค้า (บาท)',
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
            <Link passHref href={`/product/edit/${record.id}`}>
              <Button icon={<EditOutlined />} size="small" />
            </Link>
            <Popconfirm
              title="ต้องการลบใช่หรือไม่ ?"
              onConfirm={() => handleDeleteProductColumn(record)}
            >
              <Button danger icon={<DeleteOutlined />} size="small" />
            </Popconfirm>
          </Space>
        )
      },
    },
  ]

  function handleDeleteProductColumn(record) {
    if (deleteProductOnStore(record.id)) {
      const dataSource = [...productTable]
      setProductTable(dataSource.filter((item) => item.key !== record.key))
    }
  }

  function deleteProductOnStore(productId) {
    setFetching(true)

    const { store } = storeData.data

    return storeService
      .deleteProduct(store.id, productId)
      .then((result) => {
        // console.log('delete ok: ' + result)
        setFetching(false)
        return true
      })
      .catch((error) => {
        // console.log('delete err:' + error)

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

  function showModal() {
    setVisibleModal(true)
  }

  function hideModal() {
    setVisibleModal(false)
    addProductForm.resetFields()
  }

  const onAddProduct = (values) => {
    addProductToStore(values)
  }

  function addProductToStore(data) {
    setFetching(true)

    const { store } = storeData.data

    return storeService
      .addProduct(store.id, data)
      .then((result) => {
        // console.log('create success: ' + result)

        setFetching(false)
        Swal.fire({
          icon: 'success',
          allowOutsideClick: false,
          backdrop: true,
          confirmButtonColor: '#1890FF',
          confirmButtonText: 'ตกลง',
          // title: result.message,
          html: result.message,
        }).then((swalResult) => {
          router.push(router.asPath)
          hideModal()
        })
      })
      .catch((error) => {
        // console.log('create error: ' + error)

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
            text: 'เกิดข้อผิดพลาดบางอย่าง ไม่สามารถบันทึกข้อมูลได้',
          })
        }

        setFetching(false)
      })
  }

  const onFinishFailed = (errorInfo) => {
    // console.log('Failed:', errorInfo)
  }

  const { store, poducts, productLists } = storeData.data

  const productListOptions = () => {
    let options = []

    productLists.map((product, index) => {
      options.push(
        <Option key={index} value={product.id}>
          {product.name} {product.price} บาท/{product.unit}
        </Option>
      )
    })

    return options
  }

  function handleSelectChange(value) {
    // console.log(`selected ${value}`)
  }

  return (
    <>
      <MinimartLayout title={`ข้อมูลร้านค้า: ${store.name}`}>
        <Descriptions title="ข้อมูลร้านค้า">
          <Descriptions.Item label="ชื่อร้านค้า">{store.name}</Descriptions.Item>
          <Descriptions.Item label="คำอธิบายร้านค้า">{store.description}</Descriptions.Item>
          <Descriptions.Item label="เบอร์โทรศัพท์">{store.phone_number}</Descriptions.Item>
          <Descriptions.Item label="ที่อยู่">{store.address}</Descriptions.Item>
        </Descriptions>

        <p className="mt-4 text-base font-semibold">รายการสินค้าทั้งหมดภายในร้านค้า</p>

        <Button icon={<PlusOutlined />} onClick={showModal}>
          เพิ่มสินค้า
        </Button>

        <Modal
          title={`เพิ่มสินค้าภายในร้าน: ${store.name}`}
          visible={visibleModal}
          // onOk={hideModal}
          onCancel={hideModal}
          maskClosable={false}
          okText="บันทึก"
          cancelText="ยกเลิก"
          footer={[
            <Button key="cancel" onClick={hideModal}>
              ยกเลิก
            </Button>,
            <Button type="primary" form="add_product_form" key="submit" htmlType="submit">
              บันทึก
            </Button>,
          ]}
        >
          <Form
            id="add_product_form"
            form={addProductForm}
            name="basic"
            layout={'vertical'}
            onFinish={onAddProduct}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="เลือกสินค้า"
              name="categories_id"
              rules={[
                {
                  required: true,
                  message: 'จำเป็นต้องเลือก สินค้า',
                },
              ]}
            >
              <Select
                mode="multiple"
                allowClear
                showSearch
                placeholder="เลือกสินค้า"
                onChange={handleSelectChange}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {productListOptions()}
              </Select>
            </Form.Item>
          </Form>
        </Modal>

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
