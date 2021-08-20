import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import { Form, Input, Button} from 'antd'
import MinimartLayout from '@/layouts/MinimartLayout'
import { storeService } from 'services'

export default function Edit(props) {
  const dataService = props?.storeData
  const router = useRouter()
  const [form] = Form.useForm()
  const [storeData, setStoreData] = useState(null)
  const [fetching, setFetching] = useState(false)

  useEffect(() => {
    if (dataService.status === 200) {
      const { store } = dataService.data

      setStoreData(store)
      form.setFieldsValue(storeData)
    }
  }, [form, dataService, storeData])

  const onFinish = (values) => {
    // console.log('Success:', values)
    editStore(storeData.id, values)
  }

  const onFinishFailed = (errorInfo) => {
    // console.log('Failed:', errorInfo)
  }

  function editStore(id, data) {
    setFetching(true)

    return storeService
      .update(id, data)
      .then((result) => {
        // console.log(result)
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
          router.replace(router.asPath)
          // router.push('/minimart')
        })
      })
      .catch((error) => {
        // console.log(error)

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
      <MinimartLayout title={`แก้ไขข้อมูลร้านค้า: ${storeData?.name}`}>
        <Form
          form={form}
          name="basic"
          layout={'vertical'}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="ชื่อร้านค้า"
            name="name"
            rules={[
              {
                required: true,
                message: 'ชื่อร้านค้า จำเป็นต้องกรอก',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="คำอธิบายร้านค้า"
            name="description"
            rules={[
              {
                required: true,
                message: 'คำอธิบายร้านค้า จำเป็นต้องกรอก',
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            label="เบอร์ติดต่อร้านค้า"
            name="phone_number"
            rules={[
              {
                required: true,
                message: 'เบอร์ติดต่อร้านค้า จำเป็นต้องกรอก',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="ที่อยู่ร้านค้า"
            name="address"
            rules={[
              {
                required: true,
                message: 'ที่อยู่ร้านค้า จำเป็นต้องกรอก',
              },
            ]}
          >
            <Input />
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
                แก้ไขข้อมูล
              </Button>
            )}
          </Form.Item>
        </Form>
      </MinimartLayout>
    </>
  )
}
