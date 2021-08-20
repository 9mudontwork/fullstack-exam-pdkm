/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import { Form, Input, Button, Checkbox, Row, Col, Alert, InputNumber, Select } from 'antd'
import MinimartLayout from '@/layouts/MinimartLayout'
import { categoryService, productService } from 'services'

export default function Create() {
  const router = useRouter()
  const [form] = Form.useForm()
  const [fetching, setFetching] = useState(false)
  const [categories, setCategories] = useState([])
  const [mounted, setMounted] = useState(false)
  const { Option } = Select

  useEffect(() => {
    if (!mounted) {
      categoryService.getAll().then((results) => {
        let datas = []

        results.data.map((item, index) => {
          datas.push({
            id: item.id,
            name: item.name,
          })
        })

        setFetching(false)
        setCategories(datas)
      })
    }

    setMounted(true)
  }, [])

  const onFinish = (values) => {
    console.log('Success:', values)
    createProduct(values)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  function createProduct(data) {
    setFetching(true)

    return productService
      .create(data)
      .then((result) => {
        console.log('create success: ' + result)

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
          router.push('/product')
        })
      })
      .catch((error) => {
        console.log('create error: ' + error)

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

  return (
    <>
      <MinimartLayout title="เพิ่มร้านค้า">
        <Form
          form={form}
          name="basic"
          layout={'vertical'}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="ชื่อสินค้า"
            name="name"
            rules={[
              {
                required: true,
                message: 'ชื่อสินค้า จำเป็นต้องกรอก',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="รายละเอียสินค้า"
            name="description"
            rules={[
              {
                required: true,
                message: 'รายละเอียสินค้า จำเป็นต้องกรอก',
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            label="ราคาสินค้า"
            name="price"
            rules={[
              {
                required: true,
                message: 'ราคาสินค้า จำเป็นต้องกรอก',
              },
            ]}
          >
            <InputNumber className="min-w-[150px]" />
          </Form.Item>

          <Form.Item
            label="หน่วยสินค้า"
            name="unit"
            rules={[
              {
                required: true,
                message: 'หน่วยสินค้า จำเป็นต้องกรอก',
              },
            ]}
          >
            <Input className="max-w-[200px]" />
          </Form.Item>

          <Form.Item
            label="หมวดหมู่สินค้า"
            name="categories_id"
            rules={[
              {
                required: true,
                message: 'หมวดหมู่สินค้า จำเป็นต้องเลือก',
              },
            ]}
          >
            <Select style={{ width: 200 }} placeholder="เลือกหมวหมู่สินค้า">
              {categories.map((category, index) => {
                return (
                  <Option key={index} value={category.id}>
                    {category.name}
                  </Option>
                )
              })}
            </Select>
          </Form.Item>

          {/* https://stackoverflow.com/questions/65010399/react-antd-form-disable-submit-button */}
          <Form.Item shouldUpdate>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                loading={fetching}
                // disabled={
                //   !form.isFieldsTouched(true) ||
                //   form.getFieldsError().filter(({ errors }) => errors.length).length > 0
                // }
              >
                บันทึก
              </Button>
            )}
          </Form.Item>
        </Form>
      </MinimartLayout>
    </>
  )
}
