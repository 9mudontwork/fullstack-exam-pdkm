/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react'
import { Descriptions } from 'antd'
import MinimartLayout from '@/layouts/MinimartLayout'

export default function View(props) {
  const productServiceResults = props?.productServiceResults
  const [product, setProduct] = useState(null)
  const [category, setCategory] = useState(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (!mounted) {
      const product = productServiceResults.data.product
      const category = productServiceResults.data.category
      setProduct(product)
      setCategory(category)
      setMounted(true)
    }
  }, [mounted, productServiceResults])

  return (
    <>
      <MinimartLayout title={`ข้อมูลสินค้า: ${product?.name}`}>
        <Descriptions title="ข้อมูลสินค้า" column={1}>
          <Descriptions.Item label="ชื่อสินค้า">{product?.name}</Descriptions.Item>
          <Descriptions.Item label="รายละเอียดสินค้า">{product?.description}</Descriptions.Item>
          <Descriptions.Item label="ราคาสินค้า">{product?.price} บาท</Descriptions.Item>
          <Descriptions.Item label="หน่วยนับสินค้า">{product?.unit}</Descriptions.Item>
        </Descriptions>
        <Descriptions title="หมวดหมู่สินค้า" column={1}>
          <Descriptions.Item label="ชื่อหมวดหมู่">{category?.name}</Descriptions.Item>
          <Descriptions.Item label="คำอธิบายหมวดหมู่สินค้า">
            {category?.description}
          </Descriptions.Item>
        </Descriptions>
      </MinimartLayout>
    </>
  )
}
