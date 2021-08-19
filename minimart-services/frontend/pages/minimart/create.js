import React, { useEffect, useState } from 'react'

import { Form, Input, Button, Checkbox, Row, Col } from 'antd'
import { PoweroffOutlined } from '@ant-design/icons'

import MinimartLayout from '@/layouts/MinimartLayout'
import InputThaiAddress from '@/components/InputThaiAddress'

import { storeService } from 'services'

export default function Home() {
  const [form] = Form.useForm()

  const [address, setAddress] = useState({
    subdistrict: '',
    district: '',
    province: '',
    zipcode: '',
    fulladdr: '',
  })

  const onChange = (targetName) => (targetValue) => {
    setAddress({ ...address, [targetName]: targetValue })
  }
  const onSelect = (addresses) => {
    setAddress({ ...address, ...addresses })
    form.setFieldsValue(addresses)
  }

  const [fetching, setFetching] = useState(false)

  const onFinish = (values) => {
    console.log('Success:', values)
    createStore(values)
  }

  const onFinishFailed = (errorInfo) => {
    // console.log('Failed:', errorInfo)
  }

  function createStore(data) {
    setFetching(true)
    return storeService
      .create(data)
      .then((result) => {
        console.log(result)
        setFetching(false)
      })
      .catch((error) => {
        console.log(error)
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

          {/* <Row gutter={[16, 16]}>
            <Col span={6}>
              <Form.Item
                label="ตำบล"
                name="subdistrict"
                rules={[
                  {
                    required: true,
                    message: 'ตำบล จำเป็นต้องกรอก',
                  },
                ]}
              >
                <InputThaiAddress
                  style={{ maxWidth: 350 }}
                  field={'subdistrict'}
                  value={address.subdistrict}
                  onChange={onChange('subdistrict')}
                  onSelect={onSelect}
                />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                label="อำเภอ"
                name="district"
                rules={[
                  {
                    required: true,
                    message: 'อำเภอ จำเป็นต้องกรอก',
                  },
                ]}
              >
                <InputThaiAddress
                  style={{ maxWidth: 350 }}
                  field={'district'}
                  value={address.district}
                  onChange={onChange('district')}
                  onSelect={onSelect}
                />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                label="จังหวัด"
                name="province"
                rules={[
                  {
                    required: true,
                    message: 'จังหวัด จำเป็นต้องกรอก',
                  },
                ]}
              >
                <InputThaiAddress
                  style={{ maxWidth: 350 }}
                  field={'province'}
                  value={address.province}
                  onChange={onChange('province')}
                  onSelect={onSelect}
                />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                label="รหัสไปรษณีย์"
                name="zipcode"
                rules={[
                  {
                    required: true,
                    message: 'รหัสไปรษณีย์ จำเป็นต้องกรอก',
                  },
                ]}
              >
                <InputThaiAddress
                  style={{ maxWidth: 350 }}
                  field={'zipcode'}
                  value={address.zipcode}
                  onChange={onChange('zipcode')}
                  onSelect={onSelect}
                />
              </Form.Item>
            </Col>
          </Row> */}

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
